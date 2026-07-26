import type { SanityClient } from '@sanity/client';

/**
 * Fetch a single document, distinguishing "this document does not exist" from
 * "the lookup itself failed".
 *
 * The routes previously used `.catch(() => null)`, which collapsed both cases
 * into one. That matters now that a missing document produces a 404: a Sanity
 * outage would otherwise return 404 for every service page at once and risk
 * having real pages dropped from the index.
 */
export async function fetchDocument<T>(
  client: SanityClient,
  query: string,
  params: Record<string, unknown> = {},
): Promise<{ doc: T | null; lookupFailed: boolean }> {
  try {
    const doc = await client.fetch<T | null>(query, params);
    return { doc: doc ?? null, lookupFailed: false };
  } catch {
    return { doc: null, lookupFailed: true };
  }
}

/**
 * Returned when the CMS is unreachable. A 503 tells crawlers to come back later
 * and leaves the existing indexed page untouched, which a 404 would not.
 */
export function contentUnavailable() {
  return new Response('This page is temporarily unavailable. Please try again shortly.', {
    status: 503,
    headers: {
      'Retry-After': '120',
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
