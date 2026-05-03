import { defineMiddleware } from 'astro:middleware';

function shouldRequireAuth() {
  return Boolean(process.env.BASIC_AUTH_USER && process.env.BASIC_AUTH_PASS);
}

function envPresence() {
  return {
    BASIC_AUTH_USER: Boolean(process.env.BASIC_AUTH_USER),
    BASIC_AUTH_PASS: Boolean(process.env.BASIC_AUTH_PASS),
    SANITY_PREVIEW_ENABLED: Boolean(process.env.SANITY_PREVIEW_ENABLED),
    SANITY_PREVIEW_TOKEN: Boolean(process.env.SANITY_PREVIEW_TOKEN),
    CF_PAGES: Boolean(process.env.CF_PAGES),
    CF_PAGES_BRANCH: Boolean(process.env.CF_PAGES_BRANCH),
    NODE_ENV: process.env.NODE_ENV || null,
  };
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
  if (_context.url.pathname === '/__env-check') {
    return new Response(JSON.stringify(envPresence(), null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  }

  if (!shouldRequireAuth()) {
    return next();
  }

  const expectedUser = process.env.BASIC_AUTH_USER as string;
  const expectedPass = process.env.BASIC_AUTH_PASS as string;

  const credentials = decodeBasicAuth(_context.request.headers.get('authorization'));
  if (!credentials) {
    return unauthorized();
  }

  if (credentials.user !== expectedUser || credentials.pass !== expectedPass) {
    return unauthorized();
  }

  return next();
});
