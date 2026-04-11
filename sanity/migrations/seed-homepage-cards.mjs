/**
 * Seed homepage card fields onto serviceCategory documents.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const updates = [
  {
    id: 'cat-aesthetic-treatments',
    data: {
      homeCardTitle: 'Aesthetic Treatments',
      homeCardDescription: '<ul><li>Botulinum</li><li>Dermal Fillers</li></ul><br/><p><b>Coming Soon:</b></p><ul><li>PRP hair restoration</li><li>Dermaneedling</li><li>Microdermabrasion</li><li>Chemical Peels</li><li>Facial PRP</li><li>Hair restoration: PDO & PRP</li></ul>',
      homeCardOrder: 1,
      homeCardEnabled: true,
    },
  },
  {
    id: 'cat-body-transformation',
    data: {
      homeCardTitle: 'Body Transformation',
      homeCardDescription: '<p><b>Coming Soon:</b></p><ul><li>Body Shaping and Contouring</li><li>Skin Firmness and Tightening</li><li>Fat and Cellulite Reduction</li><li>Facial Toning and Rejuvenation</li><li>Laser treatments</li><li>Hair removal</li><li>Tattoo, Birthmark, Age or sun spot removal</li></ul>',
      homeCardOrder: 2,
      homeCardEnabled: true,
    },
  },
  {
    id: 'cat-iv-therapy',
    data: {
      homeCardTitle: 'IV Therapy & Vitamin Injections',
      homeCardDescription: '<ul><li>Myers Cocktail</li><li>Immunity Boost</li><li>Beauty & Anti-Aging</li><li>Detox & Hangover Recovery</li><li>Athletic Recovery</li></ul>',
      homeCardOrder: 3,
      homeCardEnabled: true,
    },
  },
  {
    id: 'cat-medical-weight-management',
    data: {
      homeCardTitle: 'Medical Weight Management',
      homeCardDescription: '<ul><li>Semaglutide</li><li>Tirzepatide</li></ul>',
      homeCardOrder: 4,
      homeCardEnabled: true,
    },
  },
  {
    id: 'cat-peptide-hormone-support',
    data: {
      homeCardTitle: 'Peptide & Hormone Support',
      homeCardDescription: '<p>Peptide therapy supports natural hormone function, improved recovery, better sleep, and enhanced vitality.</p><p>These treatments help optimize performance, energy levels, and overall wellness.</p>',
      homeCardOrder: 5,
      homeCardEnabled: true,
    },
  },
  {
    id: 'cat-holistic-services',
    data: {
      homeCardTitle: 'Holistic Services',
      homeCardDescription: '<p>Healing goes beyond the physical. Rachel\'s holistic services support mind, body, and spirit alignment through Reiki energy healing and integrative wellness sessions.</p><p>Offerings include:</p><ul><li>Reiki energy healing</li><li>Integrative wellness sessions</li><li>Mind-body-spirit alignment</li></ul>',
      homeCardOrder: 6,
      homeCardEnabled: true,
    },
  },
];

async function main() {
  if (!process.env.SANITY_TOKEN) throw new Error('Missing SANITY_TOKEN');
  for (const item of updates) {
    await client.patch(item.id).set(item.data).commit();
    console.log(`✓ ${item.id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
