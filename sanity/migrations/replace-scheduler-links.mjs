/**
 * Point every section button that links to the old online scheduler at `#book`,
 * and drop the retired siteSettings.bookingUrl field.
 *
 * Background: booking moved from the Profile Aesthetic scheduler to call/text.
 * `#book` renders as BookButton — "Text to Book" on phones, the phone number on
 * desktop (src/lib/booking.ts). The site already treats scheduler URLs as
 * booking buttons, so this is cleanup rather than a prerequisite for the
 * deploy; it just stops the dead URL living on in content.
 *
 * Labels are left alone: BookButton ignores them. Safe to run repeatedly.
 *
 * Usage:
 *   SANITY_TOKEN=<editor-token> node sanity/migrations/replace-scheduler-links.mjs [--dry-run]
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const dryRun = process.argv.includes('--dry-run');
const SCHEDULER_HOSTS = ['profileaestheticmanagement.com', 'hydreight.com'];

function isSchedulerUrl(href) {
  try {
    const { hostname } = new URL(href);
    return SCHEDULER_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

async function main() {
  // Drafts included, so an unpublished edit doesn't bring the old link back.
  const docs = await client.fetch(
    `*[_type in ["page", "service", "serviceCategory"] && defined(sections)]{ _id, sections }`,
    {},
    { perspective: 'raw' },
  );

  let total = 0;
  for (const doc of docs) {
    if (!Array.isArray(doc.sections)) continue;

    let changed = 0;
    const sections = doc.sections.map((section) => {
      if (!Array.isArray(section?.actions)) return section;
      const actions = section.actions.map((action) => {
        if (!isSchedulerUrl(action?.href)) return action;
        changed += 1;
        return { ...action, href: '#book' };
      });
      return { ...section, actions };
    });

    if (changed === 0) continue;
    if (!dryRun) await client.patch(doc._id).set({ sections }).commit();
    total += changed;
    console.log(`${dryRun ? '~' : '✓'} ${doc._id} (${changed})`);
  }

  const settings = await client.fetch(`*[_type == "siteSettings" && defined(bookingUrl)]._id`, {}, { perspective: 'raw' });
  for (const id of settings) {
    if (!dryRun) await client.patch(id).unset(['bookingUrl']).commit();
    console.log(`${dryRun ? '~' : '✓'} ${id}: unset bookingUrl`);
  }

  console.log(`\n${dryRun ? 'Would update' : 'Updated'} ${total} button(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
