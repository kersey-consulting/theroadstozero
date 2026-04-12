/**
 * Upload images to Sanity and attach them to existing documents.
 *
 * Usage:
 *   SANITY_TOKEN=your-token node sanity/migrations/upload-assets.mjs
 *
 * Run from the repo root directory.
 */

import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function uploadImage(filePath, filename) {
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ File not found: ${filePath}`);
    return null;
  }

  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
  });

  console.log(`  ✓ Uploaded: ${filename} → ${asset._id}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function patchDocument(docId, fields) {
  await client.patch(docId).set(fields).commit();
  console.log(`  ✓ Patched: ${docId}`);
}

// ── 1. Site Settings — logos ──

async function uploadSiteLogos() {
  console.log('\n🏷️  Site Settings — Logos');

  const logo = await uploadImage('public/icons/gold-logo.png', 'gold-logo.png');
  const goldLogo = await uploadImage('public/icons/gold-ring-logo.png', 'gold-ring-logo.png');

  const fields = {};
  if (logo) fields.logo = logo;
  if (goldLogo) fields.goldLogo = goldLogo;

  if (Object.keys(fields).length > 0) {
    await patchDocument('siteSettings', fields);
  }
}

// ── 2. Staff — Rachel's photo ──

async function uploadStaffPhotos() {
  console.log('\n👩‍⚕️  Staff — Rachel');

  const photo = await uploadImage('public/assets/MyPicture_356x475.jpeg', 'rachel-profile.jpeg');
  if (photo) {
    await patchDocument('staff-rachel', { photo });
  }

  // Also upload the full-size version as a separate asset for potential hero use
  await uploadImage('public/assets/MyPicture.jpeg', 'rachel-full.jpeg');
}

// ── 3. Service Categories — images ──

const categoryImages = [
  { id: 'cat-aesthetic-treatments', file: 'public/assets/home/Aesthetics.png', name: 'aesthetics.png' },
  { id: 'cat-body-transformation', file: 'public/assets/home/Body.png', name: 'body-transformation.png' },
  { id: 'cat-iv-therapy', file: 'public/assets/home/IV.png', name: 'iv-therapy.png' },
  { id: 'cat-medical-weight-management', file: 'public/assets/home/GLP-1.png', name: 'glp-1.png' },
  { id: 'cat-peptide-hormone-support', file: 'public/assets/home/peptide.png', name: 'peptide.png' },
  { id: 'cat-holistic-services', file: 'public/assets/home/holistic.jpg', name: 'holistic.jpg' },
];

async function uploadCategoryImages() {
  console.log('\n📂 Service Categories — Images');

  for (const cat of categoryImages) {
    const image = await uploadImage(cat.file, cat.name);
    if (image) {
      await patchDocument(cat.id, { image });
    }
  }
}

// ── 4. Hero / background images ──

async function uploadHeroImages() {
  console.log('\n🖼️  Hero & Background Images');

  // Upload Sand.jpeg as a reusable hero background
  const sandHero = await uploadImage('public/assets/Sand.jpeg', 'sand-hero-background.jpeg');

  // Attach as heroImage to all IV services that use it
  if (sandHero) {
    const ivServiceIds = [
      'svc-plain-hydration', 'svc-athlete-recovery', 'svc-beauty-youth',
      'svc-immune', 'svc-detox-hangover', 'svc-energy', 'svc-fat-burner',
      'svc-myers-cocktail', 'svc-migraine', 'svc-prenatal', 'svc-nr-infusion',
      'svc-b12-injection', 'svc-b-complex-injection', 'svc-glutathione-injection',
    ];

    for (const id of ivServiceIds) {
      await patchDocument(id, { heroImage: sandHero });
    }

    // Also attach to service categories as a hero image option
    for (const cat of categoryImages) {
      await patchDocument(cat.id, { heroImage: sandHero });
    }
  }

  // Upload Referral image
  await uploadImage('public/assets/home/Referral.webp', 'referral.webp');

  // Upload other home page images for future CMS use
  await uploadImage('public/assets/home/Aesthetic.png', 'aesthetic-alt.png');
  await uploadImage('public/assets/home/IV_Therapy.png', 'iv-therapy-alt.png');
  await uploadImage('public/assets/home/Hormone.png', 'hormone.png');
  await uploadImage('public/assets/home/savings.jpeg', 'savings.jpeg');
  await uploadImage('public/assets/Sand2.png', 'sand2-background.png');
}

// ── Run ──

async function main() {
  console.log('🌱 Uploading assets to Sanity...');
  console.log(`Project: dm3m4n0d`);
  console.log(`Dataset: production`);

  await uploadSiteLogos();
  await uploadStaffPhotos();
  await uploadCategoryImages();
  await uploadHeroImages();

  console.log('\n✅ All assets uploaded and attached to documents!');
  console.log('Open your Sanity Studio to verify the images appear on each document.');
}

main().catch((err) => {
  console.error('\n❌ Upload failed:', err.message);
  process.exit(1);
});
