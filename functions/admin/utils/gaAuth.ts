export async function getGaAccessToken(env: {
    GA_CLIENT_EMAIL: string;
    GA_PRIVATE_KEY: string;
}) {
    const now = Math.floor(Date.now() / 1000);

    const header = {
        alg: 'RS256',
        typ: 'JWT',
    };

    const claimSet = {
        iss: env.GA_CLIENT_EMAIL,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
    };

    const encode = (obj: object) =>
        btoa(JSON.stringify(obj))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

    const unsignedJwt = `${encode(header)}.${encode(claimSet)}`;

    const key = await crypto.subtle.importKey(
        'pkcs8',
        pemToArrayBuffer(env.GA_PRIVATE_KEY),
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        key,
        new TextEncoder().encode(unsignedJwt)
    );

    const jwt = `${unsignedJwt}.${arrayBufferToBase64Url(signature)}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt,
        }),
    });

    if (!res.ok) {
        throw new Error(`GA auth failed: ${await res.text()}`);
    }

    const json = await res.json();
    return json.access_token as string;
}

function pemToArrayBuffer(pem: string) {
    const b64 = pem
        .replace(/-----BEGIN PRIVATE KEY-----/, '')
        .replace(/-----END PRIVATE KEY-----/, '')
        .replace(/\\n/g, '')
        .trim();

    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToBase64Url(buffer: ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
