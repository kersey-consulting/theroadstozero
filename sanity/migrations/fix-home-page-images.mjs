/**
 * Replace temporary string homepage image fields with real Sanity image references.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const imageRef = (_ref) => ({ _type: 'image', asset: { _type: 'reference', _ref } });

async function main() {
  const page = await client.fetch(`*[_id == "page-home"][0]{_id, sections}`);
  if (!page?._id || !Array.isArray(page.sections)) throw new Error('page-home not found');

  const assets = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename in [
    "gold-ring-logo.png",
    "rachel-profile.jpeg",
    "savings.jpeg",
    "referral.webp"
  ]]{_id, originalFilename}`);

  const byName = Object.fromEntries(assets.map((a) => [a.originalFilename, a._id]));

  const sections = page.sections.map((section) => {
    if (section._key === 'hero' && byName['gold-ring-logo.png']) {
      return { ...section, image: imageRef(byName['gold-ring-logo.png']) };
    }
    if (section._key === 'about-rachel' && byName['rachel-profile.jpeg']) {
      return { ...section, image: imageRef(byName['rachel-profile.jpeg']) };
    }
    if (section._key === 'mobile-services' && byName['savings.jpeg']) {
      return { ...section, image: imageRef(byName['savings.jpeg']) };
    }
    if (section._key === 'referral-program' && byName['referral.webp']) {
      return { ...section, image: imageRef(byName['referral.webp']) };
    }
    return section;
  });

  await client.patch('page-home').set({ sections }).commit();
  console.log('✓ page-home images fixed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
