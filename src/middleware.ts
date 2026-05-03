import { defineMiddleware } from 'astro:middleware';

function getRuntimeEnv(context: any) {
  return context?.locals?.runtime?.env ?? {};
}

function shouldRequireAuth(env: Record<string, unknown>) {
  return Boolean(env.BASIC_AUTH_USER && env.BASIC_AUTH_PASS);
}

function envPresence(context: any) {
  const env = getRuntimeEnv(context);
  return {
    BASIC_AUTH_USER: Boolean(env.BASIC_AUTH_USER),
    BASIC_AUTH_PASS: Boolean(env.BASIC_AUTH_PASS),
    SANITY_PREVIEW_ENABLED: Boolean(env.SANITY_PREVIEW_ENABLED),
    SANITY_PREVIEW_TOKEN: Boolean(env.SANITY_PREVIEW_TOKEN),
    CF_PAGES: Boolean(env.CF_PAGES),
    CF_PAGES_BRANCH: Boolean(env.CF_PAGES_BRANCH),
    NODE_ENV: typeof env.NODE_ENV === 'string' ? env.NODE_ENV : null,
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
  const env = getRuntimeEnv(_context);

  if (_context.url.pathname === '/__env-check') {
    return new Response(JSON.stringify(envPresence(_context), null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  }

  if (!shouldRequireAuth(env)) {
    return next();
  }

  const expectedUser = String(env.BASIC_AUTH_USER);
  const expectedPass = String(env.BASIC_AUTH_PASS);

  const credentials = decodeBasicAuth(_context.request.headers.get('authorization'));
  if (!credentials) {
    return unauthorized();
  }

  if (credentials.user !== expectedUser || credentials.pass !== expectedPass) {
    return unauthorized();
  }

  return next();
});
