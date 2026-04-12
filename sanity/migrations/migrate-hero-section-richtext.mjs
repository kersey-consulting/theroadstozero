/**
 * Convert heroSection.text into heroSection.content portable text blocks.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const toBlocks = (text, prefix) => text
  .split(/\n\s*\n/)
  .map((chunk) => chunk.trim())
  .filter(Boolean)
  .map((chunk, i) => ({
    _type: 'block',
    _key: `${prefix}-${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${prefix}-${i}-span`, text: chunk, marks: [] }],
  }));

async function migrateDoc(doc) {
  if (!Array.isArray(doc.sections)) return false;

  let changed = false;
  const sections = doc.sections.map((section, i) => {
    if (section?._type !== 'heroSection' || !section.text || Array.isArray(section.content)) {
      return section;
    }
    changed = true;
    const { text, ...rest } = section;
    return {
      ...rest,
      content: toBlocks(text, `${doc._id}-hero-${i}`),
    };
  });

  if (!changed) return false;
  await client.patch(doc._id).set({ sections }).commit();
  console.log(`✓ ${doc._id}`);
  return true;
}

async function main() {
  const docs = await client.fetch(`*[_type in ["page", "service"] && defined(sections)]{ _id, sections }`);
  for (const doc of docs) {
    await migrateDoc(doc);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
