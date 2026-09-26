export interface AdminAuthEnv {
  ADMIN_USER?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
  BASIC_AUTH_USER?: string;
  BASIC_AUTH_PASS?: string;
}

/** Name is scoped to /admin so it is never sent with ordinary page requests. */
export const ADMIN_SESSION_COOKIE = 'trtz_admin_session';

/** Eight hours — long enough for a working day, short enough to expire. */
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function credentialsFor(env: AdminAuthEnv) {
  return {
    user: env.ADMIN_USER || env.BASIC_AUTH_USER,
    pass: env.ADMIN_PASSWORD || env.BASIC_AUTH_PASS,
  };
}

export function isAdminConfigured(env: AdminAuthEnv) {
  const { user, pass } = credentialsFor(env);
  return Boolean(user && pass);
}

/**
 * With no credentials configured, allow access only under `astro dev`.
 *
 * This used to return `true` unconditionally so the panel stayed usable before
 * secrets were set up. In production that is a fail-open on a data endpoint:
 * this site runs with no site-wide Basic Auth, so a single missing or renamed
 * Cloudflare secret would have published the client's full Google Analytics
 * history to anyone who found the URL. Production now fails closed.
 */
function allowWhenUnconfigured() {
  return import.meta.env.DEV;
}

/** Length-independent comparison, so a wrong password cannot be narrowed down
 *  by timing the response. */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function decodeBasicAuth(header: string | null) {
  if (!header || !header.startsWith('Basic ')) return null;

  try {
    const encoded = header.slice(6).trim();
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    const separatorIndex = decoded.indexOf(':');
    if (separatorIndex === -1) return null;

    return {
      user: decoded.slice(0, separatorIndex),
      pass: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

/** Validates a username/password pair against the configured admin credentials. */
export function verifyAdminCredentials(user: string, pass: string, env: AdminAuthEnv) {
  const expected = credentialsFor(env);
  if (!expected.user || !expected.pass) return allowWhenUnconfigured();
  return safeEqual(user, expected.user) && safeEqual(pass, expected.pass);
}

/** HTTP Basic check, kept so the API stays reachable from curl and scripts. */
export function requireAdminAuth(request: Request, env: AdminAuthEnv) {
  if (!isAdminConfigured(env)) return allowWhenUnconfigured();

  const credentials = decodeBasicAuth(request.headers.get('authorization'));
  if (!credentials) return false;

  return verifyAdminCredentials(credentials.user, credentials.pass, env);
}

// ── Session cookie ──
//
// The panel used to keep base64 credentials in sessionStorage and gate the UI
// in JavaScript, which meant the real password was readable by any script on
// the origin and the pages themselves were served to anyone. It now issues a
// signed, HttpOnly cookie instead, and the middleware enforces it server-side.

const encoder = new TextEncoder();

function base64UrlEncode(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  return atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
}

/**
 * Signing key. A dedicated `ADMIN_SESSION_SECRET` is preferred; without one the
 * admin password is used, which needs no extra configuration and has the useful
 * property that changing the password invalidates every existing session.
 */
function signingSecret(env: AdminAuthEnv) {
  const { pass } = credentialsFor(env);
  return env.ADMIN_SESSION_SECRET || pass || '';
}

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return base64UrlEncode(new Uint8Array(signature));
}

export async function createSessionToken(user: string, env: AdminAuthEnv) {
  const secret = signingSecret(env);
  if (!secret) return null;

  const payload = base64UrlEncode(
    encoder.encode(JSON.stringify({ u: user, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })),
  );

  return `${payload}.${await sign(payload, secret)}`;
}

async function verifySessionToken(token: string, env: AdminAuthEnv) {
  const secret = signingSecret(env);
  if (!secret) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  // Verify before parsing, so unsigned input never reaches JSON.parse.
  if (!safeEqual(signature, await sign(payload, secret))) return false;

  try {
    const { exp } = JSON.parse(base64UrlDecode(payload)) as { exp?: number };
    return typeof exp === 'number' && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function readCookie(request: Request, name: string) {
  const header = request.headers.get('cookie');
  if (!header) return null;

  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return null;
}

export async function hasValidAdminSession(request: Request, env: AdminAuthEnv) {
  if (!isAdminConfigured(env)) return allowWhenUnconfigured();

  const token = readCookie(request, ADMIN_SESSION_COOKIE);
  return token ? verifySessionToken(token, env) : false;
}

/**
 * `Secure` is safe to send unconditionally — browsers treat http://localhost as
 * a secure context, so it does not break `astro dev`. `SameSite=Strict` keeps
 * the cookie off cross-site requests entirely, and `Path=/admin` keeps it off
 * every public page.
 */
export function sessionCookie(token: string) {
  return `${ADMIN_SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/admin; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearedSessionCookie() {
  return `${ADMIN_SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/admin; Max-Age=0`;
}

export function unauthorizedAdminResponse() {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
