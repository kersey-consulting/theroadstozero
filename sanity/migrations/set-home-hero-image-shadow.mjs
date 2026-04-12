import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function main() {
  const page = await client.fetch(`*[_id == "page-home"][0]{sections}`);
  const sections = (page?.sections ?? []).map((section) =>
    section?._key === 'hero' ? { ...section, imageShadow: false } : section,
  );

  await client.patch('page-home').set({ sections }).commit();
  console.log('✓ page-home hero imageShadow set to false');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
