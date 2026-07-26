import { defineMiddleware } from 'astro:middleware';
import { getRuntimeEnv } from '@/lib/server/runtimeEnv';
import { hasValidAdminSession, requireAdminAuth, type AdminAuthEnv } from '@/lib/server/adminAuth';

function shouldRequireAuth(env: Record<string, unknown>) {
  return Boolean(env.BASIC_AUTH_USER && env.BASIC_AUTH_PASS);
}

function isAdminApiRequest(request: Request) {
  const { pathname } = new URL(request.url);
  return pathname.startsWith('/admin/api/');
}

/**
 * Paths under /admin that must stay reachable without a session, or there
 * would be no way to obtain one.
 */
function isAdminPublicPath(pathname: string) {
  return pathname === '/admin' || pathname === '/admin/' || pathname === '/admin/api/session';
}

function isAdminPath(pathname: string) {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

function unauthorized() {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Preview"',
      'Cache-Control': 'no-store',
    },
  });
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

export const onRequest = defineMiddleware(async (_context, next) => {
  const env = await getRuntimeEnv(_context.locals);
  const { pathname } = new URL(_context.request.url);

  // 1. Preview Basic Auth, which gates the whole site on lower environments.
  //
  // Admin API routes are exempt: they carry their own credential set, and if
  // the preview gate ran first it would consume the same Authorization header
  // and reject the request before adminAuth could validate it, producing a
  // browser popup that neither credential set clears cleanly.
  if (!isAdminApiRequest(_context.request) && shouldRequireAuth(env)) {
    const credentials = decodeBasicAuth(_context.request.headers.get('authorization'));
    if (
      !credentials
      || credentials.user !== String(env.BASIC_AUTH_USER)
      || credentials.pass !== String(env.BASIC_AUTH_PASS)
    ) {
      return unauthorized();
    }
  }

  // 2. Admin session gate.
  //
  // The panel used to be gated only in client-side JavaScript, so /admin and
  // /admin/analytics were served to anyone who asked. Enforcing it here means
  // an unauthenticated request never reaches the page at all.
  if (isAdminPath(pathname) && !isAdminPublicPath(pathname)) {
    // Either a browser session cookie or HTTP Basic, so the API stays usable
    // from curl and scripts without a login round-trip.
    const authorised = await hasValidAdminSession(_context.request, env as AdminAuthEnv)
      || requireAdminAuth(_context.request, env as AdminAuthEnv);

    if (!authorised) {
      // A page request should land back on the login screen; an API request
      // gets a status its caller can act on rather than a redirect to HTML.
      return isAdminApiRequest(_context.request)
        ? new Response('Unauthorized', { status: 401, headers: { 'Cache-Control': 'no-store' } })
        : new Response(null, { status: 302, headers: { Location: '/admin', 'Cache-Control': 'no-store' } });
    }
  }

  return next();
});
