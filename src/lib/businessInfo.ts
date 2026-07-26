/**
 * Normalises the `siteSettings` singleton into the business facts the
 * structured data needs, filling any gap from the constants below.
 *
 * The fallbacks mirror the pattern already used in `Header.astro` and
 * `Footer.astro`: a Sanity outage, an empty field, or a dataset that has not
 * had `sanity/migrations/seed-business-profile.mjs` run against it must never
 * cause the site to emit a half-populated LocalBusiness. Incomplete structured
 * data is worse than none — Google will read it and record the omissions.
 */

export interface BusinessAddress {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface SiteSettings {
  businessName?: string;
  phone?: string;
  email?: string;
  bookingUrl?: string;
  logo?: string;
  goldLogo?: string;
  address?: BusinessAddress;
  geo?: { latitude?: number; longitude?: number };
  mapUrl?: string;
  hoursDescription?: string;
  areaServed?: string[];
  priceRange?: string;
  socialLinks?: Array<{ platform?: string; url?: string }>;
}

export interface BusinessProfile {
  name: string;
  phone?: string;
  email?: string;
  bookingUrl?: string;
  logo?: string;
  address?: BusinessAddress;
  geo?: { latitude: number; longitude: number };
  mapUrl?: string;
  hoursDescription?: string;
  areaServed: string[];
  priceRange?: string;
  sameAs: string[];
}

// No `phone` default on purpose. The client removed the phone number from the
// site, so structured data must not reassert it — a number in the markup that
// appears nowhere on the page is exactly the inconsistency Google discounts.
// If they add it back, filling in Site Settings → Phone Number is enough; the
// `telephone` property returns on its own.
const DEFAULTS = {
  name: 'The Road to Zero',
  email: 'info@theroadstozero.com',
  address: {
    streetAddress: '1893 E. Skyline Dr, Suite 104, Studio #4',
    addressLocality: 'South Ogden',
    addressRegion: 'UT',
    postalCode: '84403',
    addressCountry: 'US',
  },
  geo: { latitude: 41.1526204, longitude: -111.9328482 },
  mapUrl: 'https://maps.app.goo.gl/oibvNrXQZSPwkgAc7',
  hoursDescription: 'By Appointment Only',
  areaServed: ['Utah', 'South Ogden', 'Ogden', 'Salt Lake City', 'Davis County', 'Weber County'],
  priceRange: '$$',
  sameAs: ['https://www.facebook.com/theroadtozero0/', 'https://www.instagram.com/theroadtozero0/'],
} as const;

const trimmed = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const text = value.trim();
  return text === '' ? undefined : text;
};

/** Merges the Sanity address with the fallback field by field, so a partially
 *  filled address in the Studio still produces a complete PostalAddress. */
function resolveAddress(address?: BusinessAddress): BusinessAddress {
  return {
    streetAddress: trimmed(address?.streetAddress) ?? DEFAULTS.address.streetAddress,
    addressLocality: trimmed(address?.addressLocality) ?? DEFAULTS.address.addressLocality,
    addressRegion: trimmed(address?.addressRegion) ?? DEFAULTS.address.addressRegion,
    postalCode: trimmed(address?.postalCode) ?? DEFAULTS.address.postalCode,
    addressCountry: trimmed(address?.addressCountry) ?? DEFAULTS.address.addressCountry,
  };
}

function resolveGeo(geo?: { latitude?: number; longitude?: number }) {
  const { latitude, longitude } = geo ?? {};
  // Both halves or neither — a lone coordinate is meaningless and Google rejects it.
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    return { latitude, longitude };
  }
  return { ...DEFAULTS.geo };
}

export function resolveBusinessProfile(settings?: SiteSettings | null): BusinessProfile {
  const socialUrls = (settings?.socialLinks ?? [])
    .map((link) => trimmed(link?.url))
    .filter((url): url is string => Boolean(url));

  const areaServed = (settings?.areaServed ?? [])
    .map((area) => trimmed(area))
    .filter((area): area is string => Boolean(area));

  return {
    name: trimmed(settings?.businessName) ?? DEFAULTS.name,
    // Undefined unless the client sets it in Sanity; `compact()` then drops the
    // `telephone` property entirely rather than emitting an empty one.
    phone: trimmed(settings?.phone),
    email: trimmed(settings?.email) ?? DEFAULTS.email,
    bookingUrl: trimmed(settings?.bookingUrl),
    // The gold ring logo is the square mark; it reads better as a Google
    // Business/Knowledge Panel thumbnail than the wide wordmark.
    logo: trimmed(settings?.goldLogo) ?? trimmed(settings?.logo),
    address: resolveAddress(settings?.address),
    geo: resolveGeo(settings?.geo),
    mapUrl: trimmed(settings?.mapUrl) ?? DEFAULTS.mapUrl,
    hoursDescription: trimmed(settings?.hoursDescription) ?? DEFAULTS.hoursDescription,
    areaServed: areaServed.length > 0 ? areaServed : [...DEFAULTS.areaServed],
    priceRange: trimmed(settings?.priceRange) ?? DEFAULTS.priceRange,
    sameAs: socialUrls.length > 0 ? socialUrls : [...DEFAULTS.sameAs],
  };
}
