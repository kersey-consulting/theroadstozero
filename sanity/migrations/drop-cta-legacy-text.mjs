/**
 * Remove the legacy ctaSection.text field, once the rich-text build is live.
 *
 * Background: migrate-cta-section-richtext.mjs renamed `text` to `content`.
 * It was run before the new build was deployed, so the then-live code — which
 * still read `text` — rendered every CTA body empty. `text` was written back
 * alongside `content` to restore the site without waiting on a deploy, leaving
 * both fields populated.
 *
 * `text` is no longer in the schema, so it now shows in the Studio as an
 * unknown field. Run this once the deploy carrying the new CtaSection is live
 * and verified. Safe to run repeatedly.
 *
 * Only removes `text` where `content` is present and non-empty, so a section
 * that somehow never migrated keeps its copy.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function main() {
  const docs = await client.fetch(
    `*[_type in ["page", "service", "serviceCategory"] && defined(sections)]{ _id, sections }`,
  );

  let dropped = 0;
  let kept = 0;

  for (const doc of docs) {
    if (!Array.isArray(doc.sections)) continue;

    let changed = 0;
    const sections = doc.sections.map((section) => {
      if (section?._type !== 'ctaSection' || section.text === undefined) return section;

      if (!Array.isArray(section.content) || section.content.length === 0) {
        console.warn(`! ${doc._id}: CTA still has no content — keeping its text`);
        kept += 1;
        return section;
      }

      changed += 1;
      const { text, ...rest } = section;
      return rest;
    });

    if (changed === 0) continue;
    await client.patch(doc._id).set({ sections }).commit();
    dropped += changed;
    console.log(`✓ ${doc._id} (${changed})`);
  }

  console.log(`\nDropped legacy text from ${dropped} CTA section(s).${kept ? ` Kept ${kept}.` : ''}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
