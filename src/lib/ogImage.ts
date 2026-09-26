// Open Graph image resolution.
//
// No page on the site emitted `og:image`, so every share on Facebook, iMessage,
// Slack and LinkedIn rendered as a blank card. The plumbing was half-built —
// `BaseLayout` accepted an `ogImage` prop that nothing ever passed.
//
// Two shapes have to be handled. `seo.image` is a Sanity image *object* (it is
// projected raw by the GROQ queries), while section images arrive as bare asset
// URL strings because the projections resolve them with `image.asset->url`.

import { urlFor } from './sanity';

/** The size every major platform crops to. Declared in the tags so scrapers
 *  can lay out the card before the image finishes downloading. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

// --color-background. Used to letterbox images that are not already 1.91:1.
const OG_BACKGROUND = 'fbfaf5';

const SANITY_IMAGE_HOST = 'https://cdn.sanity.io/images/';

// The square gold ring logo. Padded onto the brand background it makes a clean,
// on-brand share card, which is the best available default — the dataset holds
// exactly one landscape image wide enough to use instead, and it is a texture.
const FALLBACK_LOGO =
  'https://cdn.sanity.io/images/dm3m4n0d/production/6de66371b67aa31705989511fa30f361ad944fcd-1024x1024.png';

/**
 * Two fits, chosen by where the image came from.
 *
 * `crop` for images picked automatically. The content images in this dataset
 * are already ~16:9 *and* carry a cream border baked into the source, so
 * cropping to 1.91:1 trims into that existing border and yields a full-bleed
 * card. Padding them instead would double the border up.
 *
 * `fill` for images somebody chose deliberately — a page's `seo.image`, the
 * site-wide default, or the square logo. Those are shown whole on the brand
 * background; cropping the round logo to 1.91:1 would slice the top and bottom
 * clean off.
 *
 * `fm=jpg` rather than `auto=format` throughout: some scrapers still reject
 * WebP/AVIF, and a card that fails to render beats nothing by less than a
 * slightly larger file costs.
 */
type Fit = 'crop' | 'fill';

const OG_QUERY: Record<Fit, string> = {
  crop: `w=${OG_IMAGE_WIDTH}&h=${OG_IMAGE_HEIGHT}&fit=crop&fm=jpg&q=80`,
  fill: `w=${OG_IMAGE_WIDTH}&h=${OG_IMAGE_HEIGHT}&fit=fill&bg=${OG_BACKGROUND}&fm=jpg&q=80`,
};

function fromUrl(url: string, fit: Fit): string | undefined {
  if (!url.startsWith(SANITY_IMAGE_HOST)) {
    // Local assets under /public can't be transformed; they still need to be
    // absolute for OG, which the caller handles.
    return url;
  }
  // SVGs have no raster form to hand a scraper.
  const base = url.split('?')[0];
  if (base.toLowerCase().endsWith('.svg')) return undefined;

  return `${base}?${OG_QUERY[fit]}`;
}

function fromImageObject(source: unknown, fit: Fit): string | undefined {
  try {
    const builder = urlFor(source as never)
      .width(OG_IMAGE_WIDTH)
      .height(OG_IMAGE_HEIGHT)
      .fit(fit)
      .format('jpg')
      .quality(80);

    return (fit === 'fill' ? builder.bg(OG_BACKGROUND) : builder).url();
  } catch {
    // A malformed or unresolvable asset reference should fall through to the
    // next candidate rather than break the page.
    return undefined;
  }
}

function resolveCandidate(candidate: unknown, fit: Fit): string | undefined {
  if (!candidate) return undefined;
  if (typeof candidate === 'string') {
    return candidate.trim() ? fromUrl(candidate.trim(), fit) : undefined;
  }
  if (typeof candidate === 'object') return fromImageObject(candidate, fit);
  return undefined;
}

interface Section {
  imageUrl?: string | null;
  backgroundImageUrl?: string | null;
  /** Image showcase sections hold their images per item, not on the section. */
  items?: Array<{ image?: unknown }> | null;
}

// Below this an image is too small to be worth using over the logo card.
//
// Set deliberately low: 168 of the 170 section images in this dataset are
// 400-599px wide, so a stricter gate would send almost every page to the same
// generic logo card. Feed placements on Facebook and LinkedIn render share
// images at roughly 500-600px, so a 500px source is close to native there and
// the upscale to 1200 only shows at the largest placements — a worthwhile
// trade for a share card that actually depicts the treatment.
//
// Re-uploading the source images larger would sharpen every card with no code
// change; see the image-resolution note in SEO-DEV-TASKS.md.
const MIN_SOURCE_WIDTH = 400;

// Sanity encodes intrinsic dimensions in both the asset ref and the filename:
// `image-<hash>-500x281-png` and `<hash>-500x281.png`.
const REF_DIMENSIONS = /-(\d+)x(\d+)-[a-z0-9]+$/i;
const FILE_DIMENSIONS = /-(\d+)x(\d+)\.[a-zA-Z0-9]+$/;

function candidateWidth(candidate: unknown): number | undefined {
  if (typeof candidate === 'string') {
    const match = candidate.split('?')[0].match(FILE_DIMENSIONS);
    return match ? Number(match[1]) : undefined;
  }
  const ref = (candidate as { asset?: { _ref?: string }; _ref?: string })?.asset?._ref
    ?? (candidate as { _ref?: string })?._ref;
  if (typeof ref === 'string') {
    const match = ref.match(REF_DIMENSIONS);
    return match ? Number(match[1]) : undefined;
  }
  return undefined;
}

/**
 * The page's own images, best first.
 *
 * Foreground images come before showcase items, and shared background textures
 * come last — a page's actual subject makes a far better share card than the
 * sand texture every hero sits on.
 */
export function sectionImageCandidates(sections: Section[] = []): unknown[] {
  const foreground: unknown[] = [];
  const showcase: unknown[] = [];
  const background: unknown[] = [];

  for (const section of sections) {
    if (typeof section?.imageUrl === 'string' && section.imageUrl.trim()) {
      foreground.push(section.imageUrl);
    }
    for (const item of section?.items ?? []) {
      if (item?.image) showcase.push(item.image);
    }
    if (typeof section?.backgroundImageUrl === 'string' && section.backgroundImageUrl.trim()) {
      background.push(section.backgroundImageUrl);
    }
  }

  return [...foreground, ...showcase, ...background];
}

export interface OgImage {
  url: string;
  width: number;
  height: number;
}

/**
 * Picks the most specific image available, in order:
 *   1. the page's own `seo.image` override
 *   2. the page's lead image, if it is large enough to fill the card
 *   3. the site-wide default from Site Settings
 *   4. the logo, padded onto the brand background
 *
 * The size gate applies only to images picked automatically. An image the
 * client set deliberately is honoured whatever its size — that is their call,
 * not ours.
 */
export function resolveOgImage(candidates: {
  seoImage?: unknown;
  sections?: Section[];
  settingsImage?: unknown;
}): OgImage {
  const derived = sectionImageCandidates(candidates.sections ?? []).filter((candidate) => {
    const width = candidateWidth(candidate);
    // An unparseable name means an unknown size; allow it rather than discard
    // a possibly good image.
    return width === undefined || width >= MIN_SOURCE_WIDTH;
  });

  const ordered: Array<[unknown, Fit]> = [
    [candidates.seoImage, 'fill'],
    ...derived.map((candidate) => [candidate, 'crop'] as [unknown, Fit]),
    [candidates.settingsImage, 'fill'],
    [FALLBACK_LOGO, 'fill'],
  ];

  for (const [candidate, fit] of ordered) {
    const url = resolveCandidate(candidate, fit);
    if (url) return { url, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT };
  }

  // Unreachable — the logo is a plain transformable URL — but typed for safety.
  return { url: FALLBACK_LOGO, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT };
}