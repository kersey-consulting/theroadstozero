import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function main() {
  const docs = await client.fetch(`*[_type == "serviceCategory" && defined(order)]{ _id, title, order }`);

  if (!docs.length) {
    console.log('No serviceCategory documents still have order.');
    return;
  }

  for (const doc of docs) {
    await client.patch(doc._id).unset(['order']).commit();
    console.log(`✓ Removed order from ${doc._id} (${doc.title})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
