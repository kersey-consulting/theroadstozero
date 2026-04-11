/**
 * Seed homepage category references onto siteSettings in desired order.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const refs = [
  'cat-aesthetic-treatments',
  'cat-body-transformation',
  'cat-iv-therapy',
  'cat-medical-weight-management',
  'cat-peptide-hormone-support',
  'cat-holistic-services',
].map((id, i) => ({ _key: `${i}`, _type: 'reference', _ref: id }));

async function main() {
  await client.patch('siteSettings').set({ homeServiceCategories: refs }).commit();
  console.log('✓ siteSettings.homeServiceCategories');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
