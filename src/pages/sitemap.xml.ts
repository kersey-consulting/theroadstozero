import type { APIRoute } from 'astro';
import { getSanityClient } from '@/lib/sanity';

// Server-rendered so newly published Sanity content appears without a rebuild.
export const prerender = false;

// Hand-built routes with their own file in src/pages. Most former top-level pages
// are now self-serve `page` documents emitted by the dynamic loop below; only
// pages with a custom route (/, /contact) or with no backing doc (service index
// listings) are listed here. Excludes /sandbox and /404.
// `pageSlug` links a route to its Sanity `page` document so we can pull a real
// lastmod from `_updatedAt`. Routes without a backing doc omit it.
const STATIC_ROUTES: Array<{ path: string; pageSlug?: string }> = [
  { path: '/', pageSlug: 'home' },
  { path: '/contact', pageSlug: 'contact' },
  { path: '/services' },
  { path: '/services/iv-therapy' },
];

type SitemapEntry = { loc: string; lastmod?: string };

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const GET: APIRoute = async ({ site, locals }) => {
  const origin = (site?.origin ?? 'https://theroadstozero.com').replace(/\/$/, '');
  const sanity = getSanityClient((locals as any)?.runtime?.env);

  const [pages, categories, services] = await Promise.all([
    sanity
      .fetch<Array<{ slug: string; _updatedAt: string }>>(
        `*[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      )
      .catch(() => []),
    sanity
      .fetch<Array<{ slug: string; _updatedAt: string }>>(
        `*[_type == "serviceCategory" && defined(slug.current) && slug.current != "iv-therapy"]{
          "slug": slug.current, _updatedAt
        }`,
      )
      .catch(() => []),
    sanity
      .fetch<Array<{ slug: string; categorySlug: string; _updatedAt: string }>>(
        `*[_type == "service" && defined(slug.current) && defined(category->slug.current)]{
          "slug": slug.current,
          "categorySlug": category->slug.current,
          _updatedAt
        }`,
      )
      .catch(() => []),
  ]);

  // lastmod lookup for static routes backed by a Sanity `page` document.
  const pageUpdatedAt = new Map(pages.map((page) => [page.slug, page._updatedAt]));

  const entries: SitemapEntry[] = STATIC_ROUTES.map((route) => ({
    loc: `${origin}${route.path}`,
    lastmod: route.pageSlug ? pageUpdatedAt.get(route.pageSlug) : undefined,
  }));

  // Slugs already emitted above via a hardcoded route, or that map to a different
  // canonical URL (`home` → `/`) / have no public catch-all page. Everything else
  // is a self-serve `page` document rendered by src/pages/[...slug].astro.
  const coveredSlugs = new Set<string>(
    STATIC_ROUTES.map((route) => route.pageSlug).filter((slug): slug is string => Boolean(slug)),
  );
  for (const slug of ['home', 'services', 'sandbox', '404']) coveredSlugs.add(slug);

  for (const page of pages) {
    if (coveredSlugs.has(page.slug)) continue;
    entries.push({ loc: `${origin}/${page.slug}`, lastmod: page._updatedAt });
  }

  for (const category of categories) {
    entries.push({ loc: `${origin}/services/${category.slug}`, lastmod: category._updatedAt });
  }

  for (const service of services) {
    const path =
      service.categorySlug === 'iv-therapy'
        ? `/services/iv-therapy/${service.slug}`
        : `/services/${service.categorySlug}/${service.slug}`;
    entries.push({ loc: `${origin}${path}`, lastmod: service._updatedAt });
  }

  // De-dupe by loc, keeping the most recent lastmod.
  const byLoc = new Map<string, SitemapEntry>();
  for (const entry of entries) {
    const existing = byLoc.get(entry.loc);
    if (!existing || (entry.lastmod && (!existing.lastmod || entry.lastmod > existing.lastmod))) {
      byLoc.set(entry.loc, entry);
    }
  }

  const urls = [...byLoc.values()]
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod.slice(0, 10)}</lastmod>` : '';
      return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Cache at the edge for an hour; new content shows up within that window.
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
};
