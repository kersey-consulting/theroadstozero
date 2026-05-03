import { defineMiddleware } from 'astro:middleware';

const PROD_HOSTS = new Set(['theroadstozero.com', 'www.theroadstozero.com']);

function isPreviewEnv() {
  const env = (process.env.CF_PAGES_BRANCH || process.env.CF_PAGES_COMMIT_SHA || '').trim();
  const context = (process.env.CF_PAGES || '').trim();
  const nodeEnv = (process.env.NODE_ENV || '').trim();

  if (process.env.BASIC_AUTH_FORCE === 'true') return true;
  if (process.env.BASIC_AUTH_FORCE === 'false') return false;

  if (env) return true;
  if (context && nodeEnv !== 'production') return true;
  return false;
}

function shouldRequireAuth(url: URL) {
  const hostname = url.hostname.toLowerCase();
  return isPreviewEnv() || !PROD_HOSTS.has(hostname);
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

export const onRequest = defineMiddleware(async (context, next) => {
  if (!shouldRequireAuth(context.url)) {
    return next();
  }

  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASS;

  if (!expectedUser || !expectedPass) {
    return new Response('Basic auth environment variables are not configured', {
      status: 500,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const credentials = decodeBasicAuth(context.request.headers.get('authorization'));
  if (!credentials) {
    return unauthorized();
  }

  if (credentials.user !== expectedUser || credentials.pass !== expectedPass) {
    return unauthorized();
  }

  return next();
});
