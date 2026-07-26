import type { APIRoute } from 'astro';
import { getRuntimeEnv } from '@/lib/server/runtimeEnv';
import {
  clearedSessionCookie,
  createSessionToken,
  sessionCookie,
  verifyAdminCredentials,
  type AdminAuthEnv,
} from '@/lib/server/adminAuth';

export const prerender = false;

function getAuthEnv(locals: App.Locals) {
  return getRuntimeEnv<AdminAuthEnv & Record<string, unknown>>(locals, {
    ADMIN_USER: import.meta.env.ADMIN_USER,
    ADMIN_PASSWORD: import.meta.env.ADMIN_PASSWORD,
    ADMIN_SESSION_SECRET: import.meta.env.ADMIN_SESSION_SECRET,
    BASIC_AUTH_USER: import.meta.env.BASIC_AUTH_USER,
    BASIC_AUTH_PASS: import.meta.env.BASIC_AUTH_PASS,
  });
}

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });

/** Sign in. Exchanges a username and password for a signed session cookie. */
export const POST: APIRoute = async ({ request, locals }) => {
  const env = await getAuthEnv(locals);

  let username = '';
  let password = '';
  try {
    const body = (await request.json()) as { username?: unknown; password?: unknown };
    username = typeof body.username === 'string' ? body.username : '';
    password = typeof body.password === 'string' ? body.password : '';
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (!username || !password || !verifyAdminCredentials(username, password, env)) {
    // Deliberately vague: never reveal which half was wrong, or whether admin
    // credentials are configured at all.
    return json({ error: 'Invalid username or password.' }, 401);
  }

  const token = await createSessionToken(username, env);
  if (!token) {
    // Only reachable when nothing is configured to sign with, which in
    // production means the panel is not set up.
    return json({ error: 'Admin sign-in is not configured.' }, 503);
  }

  return json({ ok: true }, 200, { 'Set-Cookie': sessionCookie(token) });
};

/** Sign out. Expires the cookie; there is no server-side state to discard. */
export const DELETE: APIRoute = async () =>
  json({ ok: true }, 200, { 'Set-Cookie': clearedSessionCookie() });
