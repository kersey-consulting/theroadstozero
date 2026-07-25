// Sanity image delivery helpers.
//
// The GROQ projections in `sanity.ts` resolve images to their bare asset URL
// (`"image": image.asset->url`), so the components never receive an image object
// and cannot use `urlFor()`. That meant originals were served untouched — the
// homepage was shipping 27.6 MB of images, including 2000x2000 PNGs displayed at
// under 400px.
//
// Sanity's CDN accepts transform parameters directly on the asset URL, so we can
// resize and re-encode without changing a single GROQ query. The asset filename
// also encodes the intrinsic dimensions (`<hash>-2000x2000.png`), which gives us
// width/height attributes for free — no extra query needed to fix layout shift.

const SANITY_IMAGE_HOST = 'https://cdn.sanity.io/images/';
const FILENAME_DIMENSIONS = /-(\d+)x(\d+)\.([a-zA-Z0-9]+)$/;

export interface ImageAttrs {
  src: string;
  srcset?: string;
  width?: number;
  height?: number;
}

interface ParsedAsset {
  base: string;
  width: number;
  height: number;
  ext: string;
}

function parseAsset(url: string): ParsedAsset | null {
  const base = url.split('?')[0];
  const match = base.match(FILENAME_DIMENSIONS);
  if (!match) return null;

  return {
    base,
    width: Number(match[1]),
    height: Number(match[2]),
    ext: match[3].toLowerCase(),
  };
}

/**
 * SVGs are vectors with nothing to resize or re-encode, so they pass through
 * untouched.
 *
 * GIFs are converted: Sanity preserves animation when re-encoding to WebP
 * (verified against the 32-frame homepage GIF), which cuts it by ~25%. Browsers
 * without WebP fall back to a re-encoded GIF roughly 3% larger than the original
 * — an acceptable trade for well under 1% of traffic.
 */
function isTransformable(parsed: ParsedAsset | null): parsed is ParsedAsset {
  return Boolean(parsed) && parsed!.ext !== 'svg';
}

function transformUrl(parsed: ParsedAsset, width: number, quality: number) {
  // `auto=format` lets the CDN negotiate AVIF/WebP per request and fall back to
  // the original format, so we get modern formats without breaking old browsers.
  return `${parsed.base}?w=${width}&q=${quality}&auto=format`;
}

// Past roughly this width a 2x candidate costs far more than it returns, so the
// retina variant is capped rather than doubling a full-bleed image to 2200px.
const MAX_RETINA_WIDTH = 1600;

interface ImageOptions {
  /** Encoder quality, 1-100. */
  quality?: number;
  /** Emit a 2x candidate. Off for images already served near their intrinsic size. */
  retina?: boolean;
}

/**
 * Build the attributes for an <img> rendered at a known display width.
 *
 * @param url          Bare Sanity asset URL (anything else is passed through).
 * @param displayWidth CSS width the image occupies at its largest, in px.
 */
export function sanityImage(
  url: string | undefined | null,
  displayWidth: number,
  { quality = 75, retina = true }: ImageOptions = {},
): ImageAttrs {
  if (!url) return { src: '' };

  const parsed = url.startsWith(SANITY_IMAGE_HOST) ? parseAsset(url) : null;
  if (!parsed) return { src: url };

  // Never upscale past the original.
  const width = Math.min(displayWidth, parsed.width);
  const height = Math.round((width * parsed.height) / parsed.width);

  // Dimensions still help even when the asset itself can't be re-encoded —
  // they're what stops the layout shifting as the image loads.
  if (!isTransformable(parsed)) return { src: url, width, height };

  const retinaWidth = Math.min(displayWidth * 2, parsed.width, MAX_RETINA_WIDTH);

  return {
    src: transformUrl(parsed, width, quality),
    srcset:
      retina && retinaWidth > width
        ? `${transformUrl(parsed, width, quality)} 1x, ${transformUrl(parsed, retinaWidth, quality)} 2x`
        : undefined,
    width,
    height,
  };
}

/**
 * Single transformed URL for CSS `background-image`, where srcset isn't available.
 */
export function sanityBackgroundImage(
  url: string | undefined | null,
  displayWidth = 1920,
  quality = 70,
): string | undefined {
  if (!url) return undefined;

  const parsed = url.startsWith(SANITY_IMAGE_HOST) ? parseAsset(url) : null;
  if (!isTransformable(parsed)) return url;

  return transformUrl(parsed, Math.min(displayWidth, parsed.width), quality);
}
