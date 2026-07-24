import { defineMiddleware } from 'astro:middleware';

function getRuntimeEnv(context: any) {
  return context?.locals?.runtime?.env ?? {};
}

function shouldRequireAuth(env: Record<string, unknown>) {
  return Boolean(env.BASIC_AUTH_USER && env.BASIC_AUTH_PASS);
}

function isAdminApiRequest(request: Request) {
  const { pathname } = new URL(request.url);
  return pathname.startsWith('/admin/api/');
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

  // Admin API routes have their own credential set (ADMIN_USER / ADMIN_PASSWORD).
  // On gated lower environments, the admin UI sends those credentials in the
  // Authorization header. If preview Basic Auth runs first, it consumes the same
  // header and rejects the request before adminAuth can validate it, causing a
  // browser Basic Auth popup that neither credential set can clear cleanly.
  if (isAdminApiRequest(_context.request)) {
    return next();
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
