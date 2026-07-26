import type { BusinessProfile } from './businessInfo';

export interface FaqItem {
  question?: string;
  answer?: Array<{
    children?: Array<{ text?: string }>;
  }>;
}

export interface PageSection {
  _type?: string;
  items?: FaqItem[];
}

interface BuildJsonLdOptions {
  title: string;
  description?: string;
  url: string;
  sections?: PageSection[];
  business?: BusinessProfile | null;
  service?: ServiceSchemaInput | null;
  breadcrumbs?: BreadcrumbItem[];
  /** Absolute site origin, e.g. `https://theroadstozero.com`. */
  siteOrigin?: string;
}

export interface ServiceSchemaInput {
  name?: string;
  description?: string;
  image?: string;
  /** "IV Drip", "IM Injection", "Treatment", "Program" — from the service doc. */
  type?: string;
  category?: { title?: string } | null;
}

export interface BreadcrumbItem {
  name: string;
  /** Absolute or root-relative URL. */
  url: string;
}

const stripPortableText = (blocks: FaqItem['answer'] = []) => {
  return blocks
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const clean = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const text = value.replace(/\s+/g, ' ').trim();
  return text === '' ? undefined : text;
};

/** Drops undefined/empty keys so no `"telephone": null` ever reaches the page. */
function compact<T extends Record<string, any>>(input: T): T {
  const output: Record<string, any> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined || value === null || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    output[key] = value;
  }
  return output as T;
}

/** The site-wide identifier every other node points at, so the business is
 *  described once and referenced everywhere rather than redefined per page. */
export const businessNodeId = (siteOrigin: string) => `${siteOrigin.replace(/\/$/, '')}/#business`;

/**
 * The LocalBusiness node, emitted on every page.
 *
 * Typed as both `MedicalBusiness` (GLP-1 weight management, IV therapy,
 * injectables) and `HealthAndBeautyBusiness` (aesthetics, holistic services) —
 * both are LocalBusiness subtypes, and the pair describes the practice more
 * accurately than either alone.
 */
export function buildBusinessJsonLd(business: BusinessProfile, siteOrigin: string) {
  const origin = siteOrigin.replace(/\/$/, '');

  const address = business.address
    ? compact({
        '@type': 'PostalAddress',
        streetAddress: business.address.streetAddress,
        addressLocality: business.address.addressLocality,
        addressRegion: business.address.addressRegion,
        postalCode: business.address.postalCode,
        addressCountry: business.address.addressCountry,
      })
    : undefined;

  const geo = business.geo
    ? {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      }
    : undefined;

  // `openingHours` takes a machine-readable range ("Mo-Fr 09:00-17:00"); there
  // is no valid way to express "By Appointment Only" in it, and emitting the
  // phrase there would be invalid markup. The appointment-only nature is
  // conveyed by the ReserveAction below and in the human-readable description.
  const potentialAction = business.bookingUrl
    ? {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: business.bookingUrl,
          inLanguage: 'en-US',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: { '@type': 'Reservation', name: 'Book an appointment' },
      }
    : undefined;

  return compact({
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
    '@id': businessNodeId(origin),
    name: business.name,
    url: `${origin}/`,
    description: business.hoursDescription
      ? `${business.name} is a concierge aesthetics and wellness practice serving Utah, ${business.hoursDescription.toLowerCase()}.`
      : undefined,
    telephone: business.phone,
    email: business.email,
    image: business.logo,
    logo: business.logo,
    priceRange: business.priceRange,
    address,
    geo,
    hasMap: business.mapUrl,
    areaServed: business.areaServed,
    sameAs: business.sameAs,
    potentialAction,
  });
}

/**
 * A `Service` node for a single treatment page, delegating the provider
 * details to the business node on the same page rather than repeating them.
 */
export function buildServiceJsonLd(
  service: ServiceSchemaInput,
  { url, siteOrigin, business }: { url: string; siteOrigin: string; business?: BusinessProfile | null },
) {
  const name = clean(service.name);
  if (!name) return null;

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url.replace(/\/$/, '')}#service`,
    name,
    description: clean(service.description),
    url,
    image: clean(service.image),
    // "IV Drip" / "Treatment" is more specific than the category, so prefer it.
    serviceType: clean(service.type) ?? clean(service.category?.title),
    category: clean(service.category?.title),
    provider: { '@id': businessNodeId(siteOrigin) },
    areaServed: business?.areaServed,
  });
}

/** Resolves root-relative breadcrumb URLs against the site origin. */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[], siteOrigin: string) {
  const origin = siteOrigin.replace(/\/$/, '');
  const usable = items.filter((item) => clean(item.name) && clean(item.url));
  if (usable.length < 2) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: usable.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: clean(item.name),
      item: item.url.startsWith('http') ? item.url : `${origin}${item.url}`,
    })),
  };
}

export function buildJsonLd({
  title,
  description = '',
  url,
  sections = [],
  business = null,
  service = null,
  breadcrumbs = [],
  siteOrigin = '',
}: BuildJsonLdOptions) {
  const jsonLd: Record<string, any>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url,
    },
  ];

  if (business && siteOrigin) {
    jsonLd.push(buildBusinessJsonLd(business, siteOrigin));
  }

  if (breadcrumbs.length > 0 && siteOrigin) {
    const breadcrumbNode = buildBreadcrumbJsonLd(breadcrumbs, siteOrigin);
    if (breadcrumbNode) jsonLd.push(breadcrumbNode);
  }

  if (service && siteOrigin) {
    const serviceNode = buildServiceJsonLd(service, { url, siteOrigin, business });
    if (serviceNode) jsonLd.push(serviceNode);
  }

  const faqItems = sections
    .filter((section) => section._type === 'faqSection')
    .flatMap((section) => section.items ?? [])
    .filter((item) => item.question && Array.isArray(item.answer) && item.answer.length > 0)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripPortableText(item.answer),
      },
    }))
    .filter((item) => item.acceptedAnswer.text);

  if (faqItems.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems,
    });
  }

  return jsonLd;
}
