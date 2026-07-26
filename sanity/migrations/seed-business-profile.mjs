/**
 * Seed the LocalBusiness profile fields on siteSettings.
 *
 * These back the MedicalBusiness JSON-LD emitted site-wide (src/lib/schema.ts).
 * Until now the address lived only in page copy on /locations, so it was never
 * visible to search engines as structured data.
 *
 * Deliberately does not seed `phone`: the client has taken the phone number off
 * the site for the time being. If they put it back, setting Site Settings →
 * Phone Number is all that is needed — the `telephone` property follows.
 *
 * Only writes fields that are currently empty — re-running will not clobber
 * edits the client has since made in the Studio.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const values = {
  address: {
    streetAddress: '1893 E. Skyline Dr, Suite 104, Studio #4',
    addressLocality: 'South Ogden',
    addressRegion: 'UT',
    postalCode: '84403',
    addressCountry: 'US',
  },
  // Resolved from the "Navigate" link on the /locations hero.
  geo: { latitude: 41.1526204, longitude: -111.9328482 },
  mapUrl: 'https://maps.app.goo.gl/oibvNrXQZSPwkgAc7',
  hoursDescription: 'By Appointment Only',
  areaServed: ['Utah', 'South Ogden', 'Ogden', 'Salt Lake City', 'Davis County', 'Weber County'],
  priceRange: '$$',
};

async function main() {
  const current = await client.fetch('*[_id == "siteSettings"][0]');
  if (!current) throw new Error('No siteSettings document found');

  const isEmpty = (v) =>
    v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);

  const patch = {};
  for (const [key, value] of Object.entries(values)) {
    if (isEmpty(current[key])) {
      patch[key] = value;
    } else {
      console.log(`· skipped ${key} (already set)`);
    }
  }

  if (Object.keys(patch).length === 0) {
    console.log('Nothing to do — every field is already populated.');
    return;
  }

  await client.patch('siteSettings').set(patch).commit();
  for (const key of Object.keys(patch)) console.log(`✓ siteSettings.${key}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
