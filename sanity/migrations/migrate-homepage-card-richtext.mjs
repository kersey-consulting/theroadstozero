/**
 * Convert homepage card HTML strings into portable text blocks.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const block = (text, key, style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
});

const listItem = (text, key) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
});

const updates = {
  'cat-aesthetic-treatments': [
    listItem('Botulinum', 'a1'),
    listItem('Dermal Fillers', 'a2'),
    block('Coming Soon:', 'a3'),
    listItem('PRP hair restoration', 'a4'),
    listItem('Dermaneedling', 'a5'),
    listItem('Microdermabrasion', 'a6'),
    listItem('Chemical Peels', 'a7'),
    listItem('Facial PRP', 'a8'),
    listItem('Hair restoration: PDO & PRP', 'a9'),
  ],
  'cat-body-transformation': [
    block('Coming Soon:', 'b1'),
    listItem('Body Shaping and Contouring', 'b2'),
    listItem('Skin Firmness and Tightening', 'b3'),
    listItem('Fat and Cellulite Reduction', 'b4'),
    listItem('Facial Toning and Rejuvenation', 'b5'),
    listItem('Laser treatments', 'b6'),
    listItem('Hair removal', 'b7'),
    listItem('Tattoo, Birthmark, Age or sun spot removal', 'b8'),
  ],
  'cat-iv-therapy': [
    listItem('Myers Cocktail', 'c1'),
    listItem('Immunity Boost', 'c2'),
    listItem('Beauty & Anti-Aging', 'c3'),
    listItem('Detox & Hangover Recovery', 'c4'),
    listItem('Athletic Recovery', 'c5'),
  ],
  'cat-medical-weight-management': [
    listItem('Semaglutide', 'd1'),
    listItem('Tirzepatide', 'd2'),
  ],
  'cat-peptide-hormone-support': [
    block('Peptide therapy supports natural hormone function, improved recovery, better sleep, and enhanced vitality.', 'e1'),
    block('These treatments help optimize performance, energy levels, and overall wellness.', 'e2'),
  ],
  'cat-holistic-services': [
    block('Healing goes beyond the physical. Rachel\'s holistic services support mind, body, and spirit alignment through Reiki energy healing and integrative wellness sessions.', 'f1'),
    block('Offerings include:', 'f2'),
    listItem('Reiki energy healing', 'f3'),
    listItem('Integrative wellness sessions', 'f4'),
    listItem('Mind-body-spirit alignment', 'f5'),
  ],
};

async function main() {
  for (const [id, rich] of Object.entries(updates)) {
    await client.patch(id).set({ homeCardDescription: rich }).commit();
    console.log(`✓ ${id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
