import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const legacyFields = [
  'tagline',
  'heroText',
  'description',
  'heroImage',
  'benefits',
  'addOns',
  'pairsWith',
  'requiresConsultation',
];

async function main() {
  const docs = await client.fetch(`*[_type == "service" && (
    defined(tagline) ||
    defined(heroText) ||
    defined(description) ||
    defined(heroImage) ||
    defined(benefits) ||
    defined(addOns) ||
    defined(pairsWith) ||
    defined(requiresConsultation)
  )]{ _id, name }`);

  if (!docs.length) {
    console.log('No service documents still have legacy detail fields.');
    return;
  }

  for (const doc of docs) {
    await client.patch(doc._id).unset(legacyFields).commit();
    console.log(`✓ Removed legacy detail fields from ${doc._id} (${doc.name})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
