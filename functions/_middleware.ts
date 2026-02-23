import type { EventContext } from '@cloudflare/workers-types';

interface Env {
    BASIC_AUTH_USER: string;
    BASIC_AUTH_PASS: string;
}

export async function onRequest(
    context: EventContext<Env, string, unknown>
) {
    const url = new URL(context.request.url);
    const hostname = url.hostname;

    const isDefaultDomain = hostname.endsWith('pages.dev')
        || hostname.startsWith('staging.')
        || hostname.startsWith('dev.');

    if (!isDefaultDomain) {
        return context.next();
    }

    const authHeader = context.request.headers.get('Authorization');

    const USERNAME = context.env.BASIC_AUTH_USER;
    const PASSWORD = context.env.BASIC_AUTH_PASS;

    const expectedAuth =
        'Basic ' + btoa(`${USERNAME}:${PASSWORD}`);

    if (authHeader !== expectedAuth) {
        return new Response('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Preview Site"',
            },
        });
    }

    return context.next();
}
