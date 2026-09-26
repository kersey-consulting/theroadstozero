/**
 * Convert ctaSection.text (plain text) into ctaSection.content portable text.
 *
 * Mirrors migrate-hero-section-richtext.mjs: the field is renamed rather than
 * having its type changed in place, so existing string values never sit in a
 * field the Studio now expects to be an array.
 *
 * Blank lines split paragraphs; single newlines are kept inside a block, where
 * PortableInline renders them as <br />. That matters for the two homepage CTAs,
 * whose gift lists are single-newline separated and currently collapse into one
 * run-on line because HTML folds the newlines into spaces.
 *
 * Idempotent: a section that already has `content` is skipped.
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

  let changed = 0;
  const sections = doc.sections.map((section, i) => {
    if (section?._type !== 'ctaSection' || !section.text || Array.isArray(section.content)) {
      return section;
    }
    const blocks = toBlocks(section.text, `${doc._id}-cta-${i}`);
    if (blocks.length === 0) return section;

    changed += 1;
    const { text, ...rest } = section;
    return { ...rest, content: blocks };
  });

  if (changed === 0) return 0;
  await client.patch(doc._id).set({ sections }).commit();
  console.log(`✓ ${doc._id} (${changed} CTA section${changed === 1 ? '' : 's'})`);
  return changed;
}

async function main() {
  const docs = await client.fetch(
    `*[_type in ["page", "service", "serviceCategory"] && defined(sections)]{ _id, sections }`,
  );

  let total = 0;
  for (const doc of docs) {
    total += await migrateDoc(doc);
  }

  console.log(total === 0 ? 'Nothing to do — no ctaSection still has a `text` value.' : `\nMigrated ${total} CTA section(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
