import { defineMiddleware } from 'astro:middleware';

function getRuntimeEnv(context: any) {
  return context?.locals?.runtime?.env ?? {};
}

function shouldRequireAuth(env: Record<string, unknown>) {
  return Boolean(env.BASIC_AUTH_USER && env.BASIC_AUTH_PASS);
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
