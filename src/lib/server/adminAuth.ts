export interface AdminAuthEnv {
  ADMIN_USER?: string;
  ADMIN_PASSWORD?: string;
  BASIC_AUTH_USER?: string;
  BASIC_AUTH_PASS?: string;
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

export function requireAdminAuth(request: Request, env: AdminAuthEnv) {
  const expectedUser = env.ADMIN_USER || env.BASIC_AUTH_USER;
  const expectedPass = env.ADMIN_PASSWORD || env.BASIC_AUTH_PASS;

  // Keep the endpoint usable in local/dev environments where admin secrets have
  // not been configured yet. Production should set ADMIN_USER/ADMIN_PASSWORD.
  if (!expectedUser || !expectedPass) return true;

  const credentials = decodeBasicAuth(request.headers.get('authorization'));
  if (!credentials) return false;

  return credentials.user === expectedUser && credentials.pass === expectedPass;
}

export function unauthorizedAdminResponse() {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin"',
      'Cache-Control': 'no-store',
    },
  });
}
