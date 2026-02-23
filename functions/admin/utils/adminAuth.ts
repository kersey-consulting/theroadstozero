export function requireAdminAuth(
    request: { headers: { get(name: string): string | null } },
    env: {
        ADMIN_USER: string;
        ADMIN_PASSWORD: string;
    }
): boolean {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return false;
    }

    try {
        const encoded = authHeader.slice(6);
        const decoded = atob(encoded);
        const [username, password] = decoded.split(':');

        return (
            username === env.ADMIN_USER &&
            password === env.ADMIN_PASSWORD
        );
    } catch {
        return false;
    }
}
