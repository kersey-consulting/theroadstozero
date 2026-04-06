/**
 * Set page heroSection backgroundImage to existing Sand asset.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const sandImage = {
  _type: 'image',
  asset: { _type: 'reference', _ref: 'image-bb020ce78d55bf8054be1534227a8feca75cfc2b-5760x3840-jpg' },
};

async function setForPage(pageId) {
  const page = await client.getDocument(pageId);
  if (!page?.sections) throw new Error(`Missing sections for ${pageId}`);
  const sections = page.sections.map((section) =>
    section._type === 'heroSection' ? { ...section, backgroundImage: sandImage } : section
  );
  await client.patch(pageId).set({ sections }).commit();
  console.log(`✓ ${pageId}`);
}

async function main() {
  await setForPage('page-about');
  await setForPage('page-why-us');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
