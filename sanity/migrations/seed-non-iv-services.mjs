/**
 * Seed non-IV service cards into Sanity as real `service` documents.
 *
 * Usage:
 *   SANITY_TOKEN=your-token node sanity/migrations/seed-non-iv-services.mjs
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const slug = (current) => ({ _type: 'slug', current });
const pt = (paragraphs) => paragraphs.map((text, i) => ({
  _type: 'block',
  _key: `block-${i}`,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `span-${i}`, text, marks: [] }],
}));

async function createOrReplace(doc) {
  const result = await client.createOrReplace(doc);
  console.log(`✓ ${result._id}`);
}

const services = [
  {
    _id: 'svc-botulinum-toxin', name: 'Botulinum Toxin', category: 'cat-aesthetic-treatments', type: 'Treatment', order: 100,
    slugStr: 'botulinum-toxin', tagline: 'Wrinkle Relaxing',
    shortDescription: "Botulinum is used to restore what time, stress, and gravity have taken — not to change identity. Rachel's philosophy centers on facial balance, proportion, and natural restoration.",
    keyBenefits: ['Forehead lines & frown lines (11s)', "Crow's feet & brow lift", 'Lip flip & chin dimpling', 'Jaw slimming (masseter)', 'Hyperhidrosis (excessive sweating)'],
  },
  {
    _id: 'svc-dermal-fillers', name: 'Dermal Fillers', category: 'cat-aesthetic-treatments', type: 'Treatment', order: 101,
    slugStr: 'dermal-fillers', tagline: 'Volume Restoration',
    shortDescription: 'Hyaluronic acid fillers restore lost volume, smooth deeper lines, and enhance natural contours — all with a conservative hand and a focus on looking refreshed, never overdone.',
    keyBenefits: ['Lip enhancement & definition', 'Cheek & mid-face volume', 'Nasolabial folds & marionette lines', 'Under-eye hollows (tear troughs)', 'Jawline & chin contouring'],
  },
  {
    _id: 'svc-prp-hair-restoration', name: 'PRP Hair Restoration', category: 'cat-aesthetic-treatments', type: 'Treatment', order: 102,
    slugStr: 'prp-hair-restoration', tagline: 'Hair Restoration',
    shortDescription: "Platelet-Rich Plasma (PRP) therapy uses your body's own growth factors to stimulate hair follicles, encourage regrowth, and restore thickness — a natural, non-surgical approach.",
    keyBenefits: ['Thinning hair & early hair loss', 'Male & female pattern hair loss', 'Hairline restoration support', 'Scalp health & follicle stimulation'],
  },
  {
    _id: 'svc-glp-1-medications', name: 'GLP-1 Medications', category: 'cat-body-transformation', type: 'Program', order: 200,
    slugStr: 'glp-1-medications', tagline: 'Weight Management',
    shortDescription: 'Medically supervised GLP-1 and GLP-1/GIP receptor agonists (Semaglutide, Tirzepatide) regulate appetite, support metabolic health, and assist in sustainable fat loss.',
    keyBenefits: ['Reduces appetite and cravings', 'Supports blood sugar regulation', 'Promotes sustainable fat loss', 'Personalized dosing plans'],
  },
  {
    _id: 'svc-peptide-hormone-program', name: 'Peptide & Hormone Support', category: 'cat-body-transformation', type: 'Program', order: 201,
    slugStr: 'peptide-hormone-support-program', tagline: 'Hormone & Recovery',
    shortDescription: 'Targeted peptide therapies support natural hormone function, improve recovery, optimize sleep quality, and enhance overall energy — helping your body perform at its best.',
    keyBenefits: ['Growth hormone optimization', 'Improved recovery & sleep', 'Increased energy & vitality', 'Body composition support'],
  },
  {
    _id: 'svc-iv-metabolism-support', name: 'IV Metabolism Support', category: 'cat-body-transformation', type: 'Program', order: 202,
    slugStr: 'iv-metabolism-support', tagline: 'Cellular Nutrition',
    shortDescription: 'Our Metabolism & Fat Burner IV delivers amino acids, B vitamins, and lipotropic compounds directly to the bloodstream — accelerating fat metabolism and boosting energy at the cellular level.',
    keyBenefits: ['Boosts metabolism & fat burning', 'Increases natural energy', 'Supports liver health', 'Enhances workout performance'],
  },
  {
    _id: 'svc-lipotropic-injections', name: 'Lipotropic Injections', category: 'cat-body-transformation', type: 'Program', order: 203,
    slugStr: 'lipotropic-injections', tagline: 'Injections',
    shortDescription: 'MIC (Methionine, Inositol, Choline) and B12 injections assist with fat mobilization, liver detox, and metabolic support — a popular weekly or biweekly add-on to any transformation program.',
    keyBenefits: ['Fat mobilization support', 'Liver detox assistance', 'Energy & mood improvement', 'Appetite and craving support'],
  },
  {
    _id: 'svc-semaglutide', name: 'Semaglutide', category: 'cat-medical-weight-management', type: 'Program', order: 300,
    slugStr: 'semaglutide', tagline: 'GLP-1',
    shortDescription: 'A GLP-1 receptor agonist that works by mimicking a natural hormone to reduce appetite, slow gastric emptying, and improve blood sugar regulation — supporting sustainable, meaningful weight loss.',
    keyBenefits: ['Reduces appetite and food cravings', 'Slows digestion for longer satiety', 'Supports blood sugar balance', 'Weekly subcutaneous injection', 'Personalized dosing titration'],
  },
  {
    _id: 'svc-tirzepatide', name: 'Tirzepatide', category: 'cat-medical-weight-management', type: 'Program', order: 301,
    slugStr: 'tirzepatide', tagline: 'GLP-1 / GIP',
    shortDescription: 'A dual GLP-1 and GIP receptor agonist offering enhanced metabolic effects. Tirzepatide targets two hormone pathways simultaneously, delivering powerful appetite suppression and metabolic improvement.',
    keyBenefits: ['Dual-action hormone pathway targeting', 'Greater average weight loss vs. GLP-1 alone', 'Improves insulin sensitivity', 'Weekly subcutaneous injection', 'Personalized dosing titration'],
  },
  {
    _id: 'svc-sermorelin-cjc-1295', name: 'Sermorelin & CJC-1295', category: 'cat-peptide-hormone-support', type: 'Program', order: 400,
    slugStr: 'sermorelin-cjc-1295', tagline: 'Growth Hormone Support',
    shortDescription: 'Growth hormone releasing peptides that stimulate the pituitary gland to naturally produce more growth hormone — supporting fat loss, muscle development, recovery, and deep sleep.',
    keyBenefits: ['Stimulates natural growth hormone release', 'Supports lean muscle development', 'Improves sleep quality & recovery', 'Promotes fat metabolism'],
  },
  {
    _id: 'svc-bpc-157', name: 'BPC-157', category: 'cat-peptide-hormone-support', type: 'Program', order: 401,
    slugStr: 'bpc-157', tagline: 'Recovery & Repair',
    shortDescription: 'A body protective compound with powerful healing and regenerative properties. BPC-157 supports tissue repair, reduces inflammation, and accelerates recovery from injury or intense training.',
    keyBenefits: ['Accelerates tissue & tendon healing', 'Reduces inflammation & pain', 'Supports gut health', 'Enhances workout recovery'],
  },
  {
    _id: 'svc-aod-9604', name: 'AOD-9604', category: 'cat-peptide-hormone-support', type: 'Program', order: 402,
    slugStr: 'aod-9604', tagline: 'Fat Loss',
    shortDescription: 'A modified fragment of human growth hormone specifically developed to stimulate fat breakdown without the blood sugar effects of full HGH — ideal for targeted body composition improvement.',
    keyBenefits: ['Stimulates fat metabolism', 'Supports body composition goals', 'No impact on blood sugar', 'Often combined with GLP-1 programs'],
  },
  {
    _id: 'svc-ipamorelin', name: 'Ipamorelin', category: 'cat-peptide-hormone-support', type: 'Program', order: 403,
    slugStr: 'ipamorelin', tagline: 'Energy & Performance',
    shortDescription: 'A highly selective growth hormone secretagogue that stimulates GH release with minimal side effects. Ipamorelin is popular for energy, recovery, improved sleep, and anti-aging support.',
    keyBenefits: ['Clean growth hormone pulse stimulation', 'Improved energy & vitality', 'Better sleep & recovery', 'Anti-aging cellular support'],
  },
  {
    _id: 'svc-reiki', name: 'Reiki', category: 'cat-holistic-services', type: 'Treatment', order: 500,
    slugStr: 'reiki', tagline: 'Energy Healing',
    shortDescription: "Reiki is a Japanese energy healing modality that works by channeling universal life force energy through the practitioner's hands to promote relaxation, reduce stress, and support the body's natural healing processes.",
    keyBenefits: ['Deep relaxation & stress relief', 'Emotional balance & clarity', "Supports the body's natural healing", 'Reduces anxiety & tension', 'Promotes overall sense of well-being'],
  },
  {
    _id: 'svc-integrative-wellness-sessions', name: 'Integrative Wellness Sessions', category: 'cat-holistic-services', type: 'Treatment', order: 501,
    slugStr: 'integrative-wellness-sessions', tagline: 'Mind-Body Alignment',
    shortDescription: 'Holistic wellness conversations that address the connection between mind, body, and spirit — exploring stress, lifestyle, and emotional factors that influence your overall health and vitality.',
    keyBenefits: ['Whole-person health assessment', 'Stress and lifestyle guidance', 'Emotional and mental wellness support', 'Complement to medical treatments'],
  },
];

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Missing SANITY_TOKEN');
    process.exit(1);
  }

  for (const svc of services) {
    await createOrReplace({
      _id: svc._id,
      _type: 'service',
      name: svc.name,
      slug: slug(svc.slugStr),
      category: { _type: 'reference', _ref: svc.category },
      type: svc.type,
      tagline: svc.tagline,
      shortDescription: svc.shortDescription,
      keyBenefits: svc.keyBenefits,
      description: pt([svc.shortDescription]),
      order: svc.order,
      requiresConsultation: false,
    });
  }

  console.log('Done seeding non-IV services');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
