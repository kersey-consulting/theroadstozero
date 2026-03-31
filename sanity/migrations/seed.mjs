/**
 * Seed script — pushes all hardcoded content into Sanity.
 *
 * Usage:
 *   node sanity/migrations/seed.mjs
 *
 * Requires SANITY_TOKEN env var (Editor-level API token).
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// ── Helpers ──

async function createOrReplace(doc) {
  try {
    const result = await client.createOrReplace(doc);
    console.log(`  ✓ ${result._type}: ${result._id}`);
    return result;
  } catch (err) {
    console.error(`  ✗ ${doc._type}: ${doc._id} — ${err.message}`);
    throw err;
  }
}

function slug(str) {
  return { _type: 'slug', current: str };
}

// ── 1. Site Settings ──

async function seedSiteSettings() {
  console.log('\n📋 Site Settings');
  await createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    businessName: 'The Road to Zero',
    phone: '801-682-7939',
    email: 'info@theroadstozero.com',
    bookingUrl: 'https://booking.hydreight.com/widget-business/fk58k',
    socialLinks: [
      { _key: 'facebook', platform: 'facebook', url: 'https://www.facebook.com/theroadtozero0/' },
      { _key: 'instagram', platform: 'instagram', url: 'https://www.instagram.com/theroadtozero0/' },
      { _key: 'youtube', platform: 'youtube', url: 'https://www.youtube.com/@Theroadtozero0' },
      { _key: 'tiktok', platform: 'tiktok', url: 'https://www.tiktok.com/@Theroadtozero0' },
    ],
  });
}

// ── 2. Navigation ──

async function seedNavigation() {
  console.log('\n🧭 Navigation');
  await createOrReplace({
    _id: 'mainNavigation',
    _type: 'navigation',
    items: [
      { _key: 'home', label: 'Home', href: '/' },
      { _key: 'about', label: 'About Us', href: '/about' },
      { _key: 'whyus', label: 'Why Us', href: '/why-us' },
      { _key: 'location', label: 'Locations', href: '/locations' },
      {
        _key: 'services', label: 'Services', href: '/services',
        children: [
          { _key: 'aesthetic-treatments', label: 'Aesthetic Treatments', href: '/services/aesthetic-treatments' },
          { _key: 'body-transformation', label: 'Body Transformation', href: '/services/body-transformation' },
          { _key: 'iv-therapy', label: 'IV Therapy & Vitamin Injections', href: '/services/iv-therapy' },
          { _key: 'medical-weight-management', label: 'Medical Weight Management', href: '/services/medical-weight-management' },
          { _key: 'peptide-hormone-support', label: 'Peptide & Hormone Support', href: '/services/peptide-hormone-support' },
          { _key: 'holistic-services', label: 'Holistic Services', href: '/services/holistic-services' },
        ],
      },
    ],
  });
}

// ── 3. Service Categories ──

const categories = [
  { id: 'cat-aesthetic-treatments', title: 'Aesthetic Treatments', slugStr: 'aesthetic-treatments', description: 'Subtle, natural-looking enhancements designed to restore balance and refresh your appearance.', order: 1 },
  { id: 'cat-body-transformation', title: 'Body Transformation', slugStr: 'body-transformation', description: 'A comprehensive, medically guided approach to transforming your body.', order: 2 },
  { id: 'cat-iv-therapy', title: 'IV Therapy & Vitamin Injections', slugStr: 'iv-therapy', description: 'Customized IV infusions and vitamin injections for hydration, recovery, beauty, and wellness.', order: 3 },
  { id: 'cat-medical-weight-management', title: 'Medical Weight Management', slugStr: 'medical-weight-management', description: 'GLP-1 medications for sustainable, medically guided weight loss.', order: 4 },
  { id: 'cat-peptide-hormone-support', title: 'Peptide & Hormone Support', slugStr: 'peptide-hormone-support', description: 'Targeted peptide therapies that support natural hormone function and recovery.', order: 5 },
  { id: 'cat-holistic-services', title: 'Holistic Services', slugStr: 'holistic-services', description: 'Reiki energy healing and integrative wellness sessions for mind, body, and spirit.', order: 6 },
];

async function seedCategories() {
  console.log('\n📂 Service Categories');
  for (const cat of categories) {
    await createOrReplace({
      _id: cat.id,
      _type: 'serviceCategory',
      title: cat.title,
      slug: slug(cat.slugStr),
      description: cat.description,
      order: cat.order,
    });
  }
}

// ── 4. Services (IV Therapy & Injections) ──

function makePortableText(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `block-${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `span-${i}`, text, marks: [] }],
  }));
}

const ivServices = [
  {
    id: 'svc-plain-hydration', name: 'Plain Hydration', slugStr: 'plain-hydration', type: 'IV Drip', order: 1,
    tagline: 'Restore. Replenish. Rebalance.',
    heroText: 'A pure Lactated Ringer solution to rapidly restore hydration and replenish essential electrolytes. Gentle, effective, and fast-acting — the perfect foundation for recovery and wellness.',
    shortDescription: 'A pure Lactated Ringer solution to rapidly restore hydration and replenish essential electrolytes. Gentle, effective, and fast-acting — the perfect foundation for recovery.',
    keyBenefits: ['Rapid hydration', 'Replenishes electrolytes', 'Pre/post event support'],
    description: [
      "Lactated Ringer (LR) is a balanced electrolyte solution commonly used to restore hydration and replenish essential minerals. It contains sodium, potassium, calcium, and chloride in proportions close to the body's own fluid composition.",
      'This treatment is designed to flush toxins, rehydrate the body, and restore energy after stress, alcohol, travel, or intense workouts. It is one of the most popular mobile IV hydration options because clients feel noticeable results quickly.',
      'Plain Hydration serves as an excellent stand-alone drip or as the base solution for custom IV therapy with added vitamins, amino acids, or minerals tailored to your unique wellness goals.',
    ],
    benefits: [
      { title: 'Rapid Hydration', description: 'Quickly restores fluids for clients experiencing dehydration due to exercise, illness, heat exposure, or travel and jet lag.' },
      { title: 'Replenishes Electrolytes', description: 'Contains sodium, potassium, calcium, and chloride — helping prevent muscle cramps, fatigue, dizziness, and dehydration-related headaches.' },
      { title: 'Supports Muscle & Nerve Function', description: 'Essential electrolytes improve muscle contraction, nerve signaling, and overall energy throughout the body.' },
      { title: 'Safe & Gentle', description: 'Ideal for clients who need hydration without extra vitamins or additives. Well-tolerated and fast-acting for nearly all individuals.' },
      { title: 'Recovery Support', description: 'Helps clients feel better faster after illness, alcohol intake, or long workouts. Can serve as the base for customized drips.' },
      { title: 'Pre/Post Event Hydration', description: 'Popular before or after long flights, events, or sports activities. Helps prevent fatigue, dehydration, and electrolyte imbalances.' },
    ],
  },
  {
    id: 'svc-athlete-recovery', name: 'Athlete Recovery', slugStr: 'athlete-recovery', type: 'IV Drip', order: 2,
    tagline: 'Replenish. Restore. Perform.',
    heroText: 'Accelerate recovery and feel stronger for every workout. Designed to rehydrate, replenish nutrients, reduce muscle soreness, and get you back to peak performance faster.',
    shortDescription: 'Designed to rehydrate, replenish nutrients, reduce muscle soreness, and accelerate recovery after intense training, workouts, or competitions.',
    keyBenefits: ['Rapid rehydration', 'Reduces muscle soreness & cramps', 'Boosts energy & mental focus'],
    description: [
      'The Athlete Recovery IV is designed for athletes, fitness enthusiasts, and active clients who want to feel their best faster after intense training, workouts, or competitions.',
      'Amino acids and B12 help with muscle conditioning, recovery, and endurance. This blend also assists the nervous system, metabolism, and protein synthesis — giving your body the tools it needs to rebuild and perform.',
      "Whether you're training for a race, recovering from competition, or simply pushing your limits in the gym, this infusion delivers the nutrients your body needs directly to the bloodstream for maximum absorption.",
    ],
    benefits: [
      { title: 'Rapid Rehydration', description: 'IV fluids quickly restore lost water and electrolytes, helping prevent cramping, fatigue, and dizziness after exercise.' },
      { title: 'Replenishes Essential Nutrients', description: 'B-Complex, B12, magnesium, and amino acids restore vitamins and minerals depleted during workouts.' },
      { title: 'Reduces Muscle Soreness & Cramps', description: 'Magnesium and amino acids help relax muscles and reduce post-workout pain, supporting faster recovery between sessions.' },
      { title: 'Boosts Energy & Mental Focus', description: 'B12 and B-complex help clients feel alert, focused, and energized — improving performance in subsequent sessions.' },
      { title: 'Supports Immune & Cellular Health', description: 'Antioxidants like Vitamin C and Glutathione reduce oxidative stress from intense training and help prevent illness.' },
      { title: 'Prepares the Body for Peak Performance', description: 'Helps athletes feel stronger, faster, and more resilient — ready for whatever comes next.' },
    ],
    addOns: [
      { name: 'Vitamin B12', detail: 'Supports energy, metabolism, and red blood cell production. Often felt within 24–48 hours.' },
      { name: 'Amino Blend', detail: 'Ornithine 50mg, Arginine 100mg, Lysine 50mg, Citrulline 50mg — supports muscle recovery and protein synthesis.' },
      { name: 'B-Complex (BPlex)', detail: 'B1, B2, B3, B5, B6 blend supporting energy metabolism, nerve function, and endurance.' },
      { name: 'Glutathione', detail: 'The master antioxidant — reduces oxidative stress from intense training and supports cellular recovery.' },
      { name: 'Taurine', detail: 'Supports cardiovascular function, muscle performance, and nervous system health.' },
    ],
    pairWith: ['Energy IV', 'Fat Burner IV', 'Myers Cocktail', 'B12 Injection'],
  },
  {
    id: 'svc-beauty-youth', name: 'Beauty & Youth', slugStr: 'beauty-youth', type: 'IV Drip', order: 3,
    tagline: 'Hydrate. Rejuvenate. Shine.',
    heroText: 'Your ultimate beauty boost from the inside out. Supports glowing skin, stronger hair and nails, and cellular anti-aging — so the glow you feel is the youth you see.',
    shortDescription: 'Supports glowing skin, hair, and nails while promoting cellular health, anti-aging, and overall vitality. Your ultimate beauty boost from the inside out.',
    keyBenefits: ['Radiant, glowing skin', 'Stronger hair & nails', 'Anti-aging cellular support'],
    description: [
      'The Beauty & Youth IV Drip is designed to support radiant skin, hair, and nails while promoting cellular health, anti-aging, and overall vitality from the inside out.',
      'This infusion provides essential nutrients, antioxidants, and vitamins that support hormone pathways, reduce oxidative stress, and nourish the body to produce fatty acids that prevent premature and visible skin aging.',
      'Popular before weddings, photoshoots, vacations, or as an ongoing beauty maintenance treatment, clients notice a visible radiance boost alongside lasting improvements in skin texture, clarity, and overall glow.',
    ],
    benefits: [
      { title: 'Radiant, Glowing Skin', description: 'Glutathione, Vitamin C, and Biotin help reduce oxidative stress, brighten skin tone, and support collagen production for youthful, supple skin.' },
      { title: 'Stronger Hair & Nails', description: 'Biotin, B vitamins, and trace minerals promote healthy hair growth and stronger nails, and help repair damage from stress or environmental factors.' },
      { title: 'Anti-Aging & Cellular Support', description: 'Antioxidants like Glutathione and Vitamin C combat free radical damage and support healthy aging at the cellular level.' },
      { title: 'Deep Skin Hydration', description: 'IV fluids restore hydration, plumping the skin and reducing dryness, dullness, and loss of elasticity.' },
      { title: 'Boosts Energy & Overall Wellness', description: 'B-Complex and B12 support energy, mental clarity, and stress resilience so you feel as good as you look.' },
      { title: 'Pre-Event Glow', description: 'Popular before weddings, vacations, and photoshoots. Clients love the immediate radiance boost that lasts for days.' },
    ],
    addOns: [
      { name: 'Biotin', detail: 'Supports healthy hair growth, stronger nails, and skin health. A cornerstone beauty vitamin.' },
      { name: 'Glutathione', detail: 'The master antioxidant — brightens skin tone, reduces hyperpigmentation, and supports collagen production.' },
      { name: 'B-Complex (BPlex)', detail: 'B vitamins support cellular turnover, circulation, and overall skin vitality.' },
      { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Manganese, and Copper — essential trace minerals for skin repair and cellular function.' },
    ],
  },
  {
    id: 'svc-immune', name: 'Immune Boost', slugStr: 'immune', type: 'IV Drip', order: 4,
    tagline: 'Defend. Recover. Thrive.',
    heroText: "Strengthen your body's natural defenses, fight off infections faster, and stay at your best — especially popular during cold & flu season, travel, or periods of high stress.",
    shortDescription: "Strengthens the body's natural defenses, fights off infections, and supports overall wellness. Especially popular during cold & flu season, travel, or times of high stress.",
    keyBenefits: ['Strengthens immunity', 'Faster recovery from illness', 'Antioxidant support'],
    description: [
      'The Immune Boost IV delivers a powerful combination of hydration, immune-supporting vitamins, and antioxidants directly into the bloodstream for faster, more effective absorption than oral supplements.',
      "It helps replenish depleted nutrients, reduce fatigue, and support the body's ability to respond to stress and illness. Whether you're already feeling run-down or trying to stay ahead of seasonal illness, this drip gives your immune system the tools it needs.",
      'Especially popular during cold and flu season, before and after travel, or during periods of high physical or emotional stress — the Immune IV is ideal for clients who want to stay healthy, recover faster, and maintain peak wellness year-round.',
    ],
    benefits: [
      { title: 'Strengthens Immunity', description: 'High-dose Vitamin C, Zinc, and B vitamins help boost the immune system and support white blood cell function.' },
      { title: 'Faster Recovery', description: 'Helps reduce the severity and duration of illness. Ideal for clients feeling run-down, fatigued, or recently exposed.' },
      { title: 'Rehydrates & Replenishes', description: 'IV fluids restore electrolytes and hydration lost from illness or stress, preventing dehydration-related fatigue.' },
      { title: 'Reduces Stress & Fatigue', description: 'B-Complex vitamins support nervous system function, helping clients feel more energized and resilient.' },
      { title: 'Antioxidant Support', description: 'Glutathione and Vitamin C neutralize free radicals and oxidative stress, protecting cells and promoting cellular health.' },
      { title: 'Pre-Travel or Event Boost', description: 'Strengthens immunity before flights, vacations, or large gatherings — helping prevent getting sick during high-risk periods.' },
    ],
    addOns: [
      { name: 'Glutathione', detail: 'The master antioxidant — supercharges immune defense, supports detoxification, and reduces oxidative stress.' },
      { name: 'Vitamin B12', detail: 'Boosts energy and supports red blood cell production. Ideal for clients feeling run-down or exhausted.' },
      { name: 'Extra Vitamin C', detail: 'Enhances immune cell function, supports collagen and tissue repair, and amplifies antioxidant protection.' },
      { name: 'Zinc Booster', detail: "Strengthens the body's first line of immune defense. Helps shorten duration of colds and viral symptoms." },
      { name: 'Extra Fluids', detail: 'Improves hydration, helps flush toxins, and supports circulation and overall recovery.' },
      { name: 'Magnesium', detail: 'Calms the body, reduces stress and muscle tension, and supports sleep and nervous system balance.' },
    ],
  },
  {
    id: 'svc-detox-hangover', name: 'Detox & Hangover Recovery', slugStr: 'detox-hangover', type: 'IV Drip', order: 5,
    tagline: 'Flush. Restore. Revive.',
    heroText: 'Rehydrate, detoxify, and recover in one revitalizing drip. Designed to flush toxins, restore essential nutrients, and get you feeling like yourself again — fast.',
    shortDescription: 'Flush toxins, rehydrate, and restore energy after stress, alcohol, travel, or intense workouts.',
    keyBenefits: ['Rapid rehydration', 'Liver detoxification support', 'Reduces hangover symptoms'],
    description: [
      'The Detox & Hangover Recovery IV contains essential vitamins and minerals to combat dehydration and reduce oxidative stress on the liver, cardiovascular, and endocrine systems by assisting in detoxification of the body.',
      'This formula also reduces nausea, which is particularly helpful during recovery from alcohol, illness, or travel. Clients feel noticeable results quickly — making this one of the most popular mobile IV therapy options.',
      "Whether you're recovering from a night out, a long trip, an illness, or simply feeling toxic and depleted, this drip helps your body reset and return to balance.",
    ],
    benefits: [
      { title: 'Rapid Rehydration', description: 'Restores fluid balance after dehydration from alcohol, illness, travel, or exercise. Reduces fatigue, dizziness, and brain fog.' },
      { title: 'Detoxification Support', description: 'Glutathione, Vitamin C, and B vitamins help neutralize free radicals and support liver function and natural detox pathways.' },
      { title: 'Reduces Hangover Symptoms', description: 'Minimizes nausea, headaches, and body aches — significantly speeding up recovery after alcohol or social events.' },
      { title: 'Boosts Energy & Mental Clarity', description: 'B-Complex and B12 enhance energy production. Clients feel alert and refreshed within 30–60 minutes.' },
      { title: 'Muscle Recovery', description: 'Magnesium and amino acids reduce muscle cramps and soreness, supporting quicker recovery after physical activity.' },
      { title: 'Enhances Overall Wellness', description: 'Clients often report feeling lighter, more balanced, and less stressed — like a full system reset.' },
    ],
    addOns: [
      { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Manganese, and Copper — essential for cellular detox and metabolic function.' },
      { name: 'Glutathione', detail: 'The master antioxidant — supports liver detoxification, neutralizes free radicals, and speeds recovery.' },
      { name: 'Glutamine', detail: 'Supports gut health and intestinal lining repair — beneficial after alcohol or inflammation.' },
      { name: 'B-Complex (BPlex)', detail: 'B1 through B6 to replenish B vitamins depleted by alcohol and support energy metabolism.' },
    ],
  },
  {
    id: 'svc-energy', name: 'Energy IV', slugStr: 'energy', type: 'IV Drip', order: 6,
    tagline: 'Power Up. Feel Clear. Go.',
    heroText: 'Fast, clean energy — no crash, no jitters. Your ultimate formula for hydration, vitamins, and cellular energy all in one drip.',
    shortDescription: 'Fast, clean energy to power through your day. Reduces inflammatory responses and combats fatigue.',
    keyBenefits: ['Fast energy boost', 'Reduces fatigue & brain fog', 'Supports mood & nervous system'],
    description: [
      'The Energy IV combines amino acids, vitamins, and minerals to reduce inflammatory responses and combat fatigue by improving muscle recovery at a cellular level through anti-oxidation, serotonin production support, and cellular energy processes.',
      "Whether you're dealing with work-related burnout, post-travel exhaustion, chronic tiredness, or simply wanting more focus and drive, this drip delivers fast, clean energy that lasts.",
      'IV nutrients work faster and more effectively than oral supplements because they bypass the digestive system and enter the bloodstream immediately. Clients typically feel results within 20–40 minutes.',
    ],
    benefits: [
      { title: 'Fast Energy Boost', description: 'Replenishes essential vitamins and minerals that support cellular energy production. Clients feel alert and ready within 20–40 minutes.' },
      { title: 'Reduces Fatigue', description: 'Ideal for clients experiencing work-related burnout, chronic tiredness, or jet lag. Restores both mental and physical energy.' },
      { title: 'Supports Nervous System & Mood', description: 'B-Complex and B12 help regulate neurotransmitters, improving focus and reducing stress.' },
      { title: 'Enhances Athletic Performance', description: 'Amino acids and electrolytes help muscles recover after workouts and boost stamina and endurance.' },
      { title: 'Hydration + Vital Nutrients', description: 'IV fluids restore fluids and electrolytes faster than oral hydration.' },
      { title: 'Safe, Quick & Convenient', description: 'Works in 20–40 minutes with minimal downtime. Perfect for busy clients who need results fast.' },
    ],
    addOns: [
      { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Copper, and Manganese to support cellular energy and nervous system function.' },
      { name: 'MIC + B12', detail: 'Methionine, Inositol, Choline, and B12 — supports fat metabolism, liver health, and sustained energy.' },
      { name: 'Lipo Mino', detail: 'Lipotropic vitamins with B12 to enhance fat burning, energy, and metabolic support.' },
      { name: 'Amino Blend', detail: 'Glutamine, Ornithine, Arginine, Lysine, and Citrulline — supports muscle recovery and sustained energy production.' },
    ],
    pairWith: ['Athlete Recovery IV', 'Myers Cocktail', 'B12 Injection', 'B-Complex Injection'],
  },
  {
    id: 'svc-fat-burner', name: 'Metabolism & Fat Burner', slugStr: 'fat-burner', type: 'IV Drip', order: 7,
    tagline: 'Burn. Energize. Transform.',
    heroText: 'Boost metabolism, burn fat, and power up your energy naturally.',
    shortDescription: 'Boost metabolism, burn fat, and power up your energy naturally.',
    keyBenefits: ['Boosts metabolism', 'Enhances fat breakdown', 'Mood improvement & appetite control'],
    description: [
      'The Metabolism & Fat Burner IV is the perfect blend of lipotropic compounds, B vitamins, and amino acids to transport fatty acids into mitochondria where they can be burned for energy.',
      'IV nutrients work faster and more effectively than oral supplements, making this an ideal support treatment alongside diet, exercise, and GLP-1 weight management programs.',
      'This drip is especially popular for clients who are working through weight-loss plateaus or looking for complementary metabolic support alongside peptide or GLP-1 therapy.',
    ],
    benefits: [
      { title: 'Boosts Metabolism', description: 'B12, B-Complex, Carnitine, and MIC help the body convert fat into usable energy and improve metabolic function.' },
      { title: 'Enhances Fat Breakdown', description: 'Carnitine and MIC assist with fat mobilization, helping the body burn stored fat more efficiently.' },
      { title: 'Increases Natural Energy', description: 'Because fat is used as fuel, clients experience steady energy, less fatigue, and reduced brain fog.' },
      { title: 'Liver Detox & Hormone Balance', description: 'Choline and methionine help the liver process fats and toxins more effectively.' },
      { title: 'Enhances Workout Performance', description: 'A great option for gym clients, fitness programs, and athletes wanting more stamina.' },
      { title: 'Breaks Weight-Loss Plateaus', description: 'Perfect for clients struggling with low energy, slow metabolism, or difficulty staying motivated.' },
    ],
    addOns: [
      { name: 'MIC + B12', detail: 'Methionine 25mg, Inositol 50mg, Choline 50mg, B12 330mcg — core lipotropic compounds.' },
      { name: 'Lipo Mino (without Carnitine)', detail: 'Pyridoxine, Methionine, Inositol, Choline, B12, Thiamine, Riboflavin.' },
      { name: 'Lipo Stat Plus', detail: 'Methionine, Inositol, Choline, B6, Cyanocobalamin.' },
      { name: 'Lipo Mino with Carnitine', detail: 'Full lipotropic blend with L-Carnitine. Up to 6 weeks maximum.' },
    ],
    pairWith: ['Energy IV', 'Athlete Recovery IV', 'Medical Weight Management', 'Peptide & Hormone Support'],
  },
  {
    id: 'svc-myers-cocktail', name: 'Myers Cocktail', slugStr: 'myers-cocktail', type: 'IV Drip', order: 8,
    tagline: 'The Gold Standard of IV Wellness.',
    heroText: 'The most popular and in-demand infusion in the industry. A powerful blend of Vitamin C, B-Complex, Magnesium, and Calcium.',
    shortDescription: 'The most popular IV infusion in the industry. A powerful blend of Vitamin C, B-Complex, Magnesium, and Calcium.',
    keyBenefits: ['Energy boost', 'Immune & stress support', 'Migraine & headache relief'],
    description: [
      'The Myers Cocktail is one of the most well-known and widely used IV formulas, celebrated for its broad range of benefits and reliable results.',
      'This blend of B vitamins, Vitamin C, Magnesium, and Calcium work in combination to increase metabolism, replace electrolytes lost by dehydration, and facilitate enzymatic reactions in intracellular processes.',
      "Whether you're looking for energy, immune support, migraine relief, muscle recovery, or simply a comprehensive wellness reset — the Myers Cocktail is the go-to choice.",
    ],
    benefits: [
      { title: 'Energy Boost', description: 'The combination of B vitamins, Vitamin C, and minerals helps fight fatigue, burnout, and exhaustion.' },
      { title: 'Immune Support', description: 'High-dose Vitamin C strengthens immune function and helps prevent or reduce the severity of illness.' },
      { title: 'Stress & Mood Support', description: 'Magnesium and B vitamins help regulate the nervous system, reducing stress, anxiety, and irritability.' },
      { title: 'Migraine & Headache Relief', description: 'The Myers is famous for relieving migraines, tension headaches, and muscle spasms.' },
      { title: 'Muscle Recovery & Performance', description: 'Athletes love the Myers for its support of electrolyte balance, muscle relaxation, and quicker post-workout recovery.' },
      { title: 'Overall Wellness & Balance', description: 'The perfect all-around drip for clients who want to feel better, stronger, and more mentally clear.' },
    ],
    addOns: [
      { name: 'Glutathione', detail: 'The ultimate finishing touch — the master antioxidant for deeper detox, skin brightening, and cellular renewal.' },
      { name: 'B12 Boost', detail: 'Add extra B12 for enhanced energy, metabolism support, and immune resilience.' },
      { name: 'Zinc', detail: 'Strengthens immune response and supports wound healing and cellular repair.' },
    ],
    pairWith: ['Athlete Recovery IV', 'Immune Boost IV', 'Glutathione Injection', 'B12 Injection'],
  },
  {
    id: 'svc-migraine', name: 'Migraine Relief', slugStr: 'migraine', type: 'IV Drip', order: 9,
    tagline: 'Fast Relief. Gentle Care.',
    heroText: "Helps reduce pain, relax muscles, calm nausea, and rehydrate — often giving clients meaningful relief within 20–40 minutes.",
    shortDescription: 'Helps reduce pain, relax muscles, calm nausea, and rehydrate — often giving clients relief within 20–40 minutes.',
    keyBenefits: ['Fast pain relief', 'Reduces nausea & light sensitivity', 'Restores hydration quickly'],
    description: [
      'The Migraine Relief IV is a multifaceted infusion designed to improve vascular function linked to migraine attacks, reduce nausea, and restore hydration.',
      'Even mild dehydration can trigger migraines. Combined with magnesium deficiency and nervous system dysregulation, migraines can be debilitating.',
      'This treatment is ideal for clients who experience frequent migraines, tension headaches, menstrual-related head pain, or stress-triggered migraines.',
    ],
    benefits: [
      { title: 'Fast Relief', description: 'Helps calm headache intensity, muscle tightness, and throbbing pain — often within 20–40 minutes.' },
      { title: 'Reduces Nausea & Sensitivity', description: 'Addresses nausea while hydration eases dizziness, light sensitivity, and disorientation.' },
      { title: 'Relaxes Muscles & Eases Tension', description: 'Magnesium works directly on tension headaches, menstrual-related migraines, and stress-triggered muscle tightness.' },
      { title: 'Restores Hydration', description: 'Even mild dehydration can trigger or worsen migraines. IV fluids provide immediate replenishment.' },
      { title: 'Calms the Nervous System', description: 'B vitamins and magnesium help regulate the brain pathways involved in migraine activity.' },
      { title: 'Gets You Back to Your Day', description: 'Perfect for clients who cannot afford to lose a day to pain.' },
    ],
    addOns: [
      { name: 'B-Complex (BPlex)', detail: 'B1 through B6 to support nervous system function and help regulate brain pathways involved in migraine activity.' },
      { name: 'Glutamine', detail: 'Supports gut health and tissue repair.' },
      { name: 'Acetaminophen (oral)', detail: '1000mg oral acetaminophen for additional pain relief.' },
      { name: 'Glutathione', detail: 'Anti-inflammatory and detox support to reduce oxidative stress.' },
      { name: 'Extra Fluids', detail: 'Additional IV fluids for deeper hydration.' },
      { name: 'Magnesium Booster', detail: 'Extra magnesium specifically for tension headaches and menstrual migraines.' },
    ],
  },
  {
    id: 'svc-prenatal', name: 'Prenatal Hydration', slugStr: 'prenatal', type: 'IV Drip', order: 10,
    tagline: 'Gentle Support for Expecting Moms.',
    heroText: 'Designed to support pregnant clients experiencing nausea, dehydration, fatigue, or difficulty keeping fluids down.',
    shortDescription: 'Designed to support pregnant clients experiencing nausea, dehydration, fatigue, or difficulty keeping fluids down. Consultation required.',
    keyBenefits: ['Hydration & nausea support', 'Electrolyte balance', 'Gentle & pregnancy-safe'],
    description: [
      'This vitamin combination supports methylation — a key process for a healthy pregnancy — while also improving nausea and providing folic acid.',
      'Pregnant women commonly experience dehydration due to first-trimester nausea, food aversions, low appetite, and increased fluid demands.',
      'As a Registered Nurse and Midwife, Rachel brings exceptional clinical expertise and compassion to prenatal IV therapy. A consultation is required.',
    ],
    requiresConsultation: true,
    benefits: [
      { title: 'Hydration Support', description: 'Restores fluids quickly and safely — addressing dehydration from nausea, vomiting, and food aversions.' },
      { title: 'Nausea Relief', description: 'Provider-guided add-ons can address nausea and vomiting.' },
      { title: 'Electrolyte Balance', description: "Pregnancy increases the body's need for magnesium, potassium, calcium, and sodium." },
      { title: 'Increased Energy', description: 'Pregnancy-related fatigue is extremely common. Rehydration combined with B vitamins supports energy.' },
      { title: 'Headache Relief', description: 'Dehydration and pregnancy hormones often trigger headaches. IV fluids help reduce intensity.' },
      { title: 'Gentle on the Stomach', description: 'IV therapy bypasses the digestive system entirely — ideal when oral supplements are not tolerated.' },
    ],
    addOns: [
      { name: 'B-Complex (BPlex)', detail: 'B1 through B6 for energy support and nausea reduction. Consultation required.' },
      { name: 'Ondansetron (Zofran)', detail: 'Provider-prescribed anti-nausea medication. Requires a note from your OB/GYN.' },
    ],
  },
  {
    id: 'svc-nr-infusion', name: 'NR IV Infusion', slugStr: 'nr-infusion', type: 'IV Drip', order: 11,
    tagline: 'Cellular Energy. Longevity Support.',
    heroText: 'Nicotinamide Riboside (NR) is a direct NAD+ precursor — supporting cellular energy production, metabolism, and DNA repair.',
    shortDescription: 'Nicotinamide Riboside (NR) is a direct precursor to NAD+, supporting cellular energy production, metabolism, and DNA repair.',
    keyBenefits: ['Supports NAD+ levels', 'Cellular energy & metabolism', 'Anti-aging & DNA repair support'],
    description: [
      'Nicotinamide Riboside (NR) is a form of Vitamin B3 and a direct precursor to NAD+, a critical coenzyme involved in cellular energy production, metabolism, and DNA repair.',
      "NAD+ is found in every cell of the body and is essential for the function of mitochondria, DNA repair enzymes, and sirtuins — proteins associated with healthy aging and longevity.",
      'The NR IV Infusion delivers Nicotinamide Riboside directly to the bloodstream for maximum bioavailability.',
    ],
    benefits: [
      { title: 'Supports NAD+ Levels', description: 'NR is one of the most efficient NAD+ precursors. IV delivery maximizes absorption.' },
      { title: 'Cellular Energy Production', description: 'NAD+ is essential to mitochondrial function. Higher NAD+ means more cellular vitality.' },
      { title: 'DNA Repair Support', description: 'NAD+ activates DNA repair enzymes (PARPs) that help the body correct cellular damage.' },
      { title: 'Mental Clarity & Focus', description: 'Many clients report improved cognitive function and sharper focus following NR infusions.' },
      { title: 'Improved Recovery', description: 'Enhanced cellular repair and energy translates to faster recovery from exercise, illness, and daily demands.' },
      { title: 'Longevity & Anti-Aging', description: 'Supporting NAD+ levels is one of the most researched areas of longevity science.' },
    ],
    pairWith: ['Myers Cocktail', 'Glutathione Injection', 'B12 Injection', 'Athlete Recovery IV'],
  },
  {
    id: 'svc-b12-injection', name: 'Vitamin B12 Injection', slugStr: 'b12-injection', type: 'IM Injection', order: 12,
    tagline: 'Clean Energy. Lifted Mood. Clear Focus.',
    heroText: 'A powerful dose of Vitamin B12 to enhance energy, support metabolism, lift mood, improve focus, and strengthen immunity.',
    shortDescription: 'A powerful dose of Vitamin B12 to enhance energy, support metabolism, lift mood, improve focus, and strengthen immunity.',
    keyBenefits: ['Natural energy boost', 'Supports metabolism & weight management', 'Enhances mood & mental clarity'],
    description: [
      'Vitamin B12 Intramuscular Injection is one of the most requested and impactful wellness add-ons available.',
      'B12 is an essential nutrient that many people are deficient in — particularly those following plant-based diets, individuals over 50, or anyone with digestive issues.',
      'This injection can be offered as a stand-alone service in just 2–5 minutes, or paired with any IV drip for amplified results.',
    ],
    benefits: [
      { title: 'Natural Energy Boost', description: 'B12 helps convert food into usable energy. Clients often feel a noticeable boost within 24–48 hours.' },
      { title: 'Supports Metabolism & Weight Management', description: 'Helps the body metabolize fats and carbohydrates.' },
      { title: 'Enhances Mood & Mental Clarity', description: 'Supports neurotransmitter balance (serotonin and dopamine).' },
      { title: 'Improves Sleep Regulation', description: 'B12 plays a role in melatonin production.' },
      { title: 'Red Blood Cell Production', description: 'Essential for oxygen transport and overall vitality.' },
      { title: 'Boosts Immune Function', description: 'Helps maintain healthy nerve cells and immune responses.' },
    ],
    pairWith: ['Myers Cocktail', 'Energy IV', 'Athlete Recovery IV', 'Metabolism & Fat Burner IV'],
  },
  {
    id: 'svc-b-complex-injection', name: 'Vitamin B-Complex Injection', slugStr: 'b-complex-injection', type: 'IM Injection', order: 13,
    tagline: 'Energize. Balance. Restore.',
    heroText: 'A comprehensive blend of all essential B vitamins — supporting energy, metabolism, brain function, immunity, and cellular repair.',
    shortDescription: 'A blend of essential B vitamins (B1–B12) that together support energy, metabolism, brain function, immunity, and cellular repair.',
    keyBenefits: ['Boosts natural energy & stamina', 'Supports healthy metabolism', 'Strengthens immunity'],
    description: [
      'The Vitamin B-Complex Injection contains a blend of essential B vitamins (B1, B2, B3, B5, B6, B7, B9, and B12).',
      'B vitamins support the immune system, red and white blood cell production, energy levels, cardiovascular health, and nervous system function.',
      'This injection is an excellent foundational add-on to virtually any IV drip, or can be offered as a quick stand-alone service.',
    ],
    benefits: [
      { title: 'Boosts Natural Energy', description: 'Helps convert food into usable energy at the cellular level. Reduces fatigue without the crash.' },
      { title: 'Enhances Mood & Mental Clarity', description: 'Supports neurotransmitter production (serotonin and dopamine).' },
      { title: 'Supports Healthy Metabolism', description: 'Essential for carbohydrate, protein, and fat metabolism.' },
      { title: 'Strengthens Immunity', description: 'B vitamins support cell repair and red blood cell production.' },
      { title: 'Improves Skin, Hair & Nail Health', description: 'Supports cellular turnover and tissue repair.' },
      { title: 'Supports Nervous System Health', description: 'Helps maintain healthy nerve function and reduces stress-related tension.' },
    ],
    pairWith: ['Myers Cocktail', 'Energy IV', 'Athlete Recovery IV', 'Detox & Hangover Recovery IV'],
  },
  {
    id: 'svc-glutathione-injection', name: 'Glutathione Injection', slugStr: 'glutathione-injection', type: 'IM Injection', order: 14,
    tagline: 'The Master Antioxidant.',
    heroText: "The body's most powerful antioxidant. Brightens skin, supports liver detox, boosts immunity, and revives cellular energy.",
    shortDescription: "The body's master antioxidant. Brightens skin, supports liver detox, boosts immunity, and revives cellular energy.",
    keyBenefits: ['Powerful cellular detox', 'Skin brightening & anti-aging', 'Immune support & liver health'],
    description: [
      "Glutathione is known as the body's master antioxidant — a powerhouse molecule made of glutamine, cysteine, and glycine that is naturally produced in the liver.",
      'As we age, stress accumulates, or toxin exposure increases, glutathione levels decline. This IM injection delivers a concentrated dose directly into the muscle.',
      'The Glutathione Injection is one of the most requested add-ons at The Road to Zero because it amplifies the benefits of nearly every other treatment.',
    ],
    benefits: [
      { title: 'Powerful Antioxidant & Cellular Detox', description: 'Neutralizes free radicals and oxidative stress. Supports liver detoxification pathways.' },
      { title: 'Skin Brightening & Anti-Aging', description: 'Reduces hyperpigmentation and dark spots. Promotes a more even, brighter skin tone.' },
      { title: 'Immune Support', description: 'Strengthens immune-cell function and helps the body respond better to infections and stress.' },
      { title: 'Energy Boost & Mental Clarity', description: "Supports mitochondrial function — the cell's energy factories." },
      { title: 'Liver Support & Post-Exposure Recovery', description: 'Helps break down and eliminate toxins and metabolic waste.' },
      { title: 'Amplifies IV Results', description: 'Glutathione pairs exceptionally well with Vitamin C, B-Complex, NAD+, Magnesium, and amino blends.' },
    ],
    pairWith: ['Myers Cocktail', 'Beauty & Youth IV', 'Detox & Hangover Recovery IV', 'Immune Boost IV', 'NR IV Infusion'],
  },
];

async function seedServices() {
  console.log('\n💉 Services (IV Therapy & Injections)');
  for (const svc of ivServices) {
    const doc = {
      _id: svc.id,
      _type: 'service',
      name: svc.name,
      slug: slug(svc.slugStr),
      category: { _type: 'reference', _ref: 'cat-iv-therapy' },
      type: svc.type,
      tagline: svc.tagline,
      heroText: svc.heroText,
      shortDescription: svc.shortDescription,
      keyBenefits: svc.keyBenefits,
      description: makePortableText(svc.description),
      order: svc.order,
      requiresConsultation: svc.requiresConsultation || false,
      benefits: svc.benefits.map((b, i) => ({
        _key: `benefit-${i}`,
        title: b.title,
        description: b.description,
      })),
    };

    if (svc.addOns) {
      doc.addOns = svc.addOns.map((a, i) => ({
        _key: `addon-${i}`,
        name: a.name,
        detail: a.detail,
      }));
    }

    // pairWith stored as text for now (would need references once all services exist)
    // We'll skip pairsWith references for simplicity — can be added in Studio

    await createOrReplace(doc);
  }
}

// ── 5. Staff Member ──

async function seedStaff() {
  console.log('\n👩‍⚕️ Staff Members');
  await createOrReplace({
    _id: 'staff-rachel',
    _type: 'staffMember',
    name: 'Rachel',
    role: 'Founder & Owner',
    credentials: 'RN, Midwife, Certified IV Therapy Provider, Botulinum & Dermal Filler Clinician, Reiki Practitioner',
    bio: makePortableText([
      'Rachel has spent her career caring for individuals across the full spectrum of life, from welcoming new life as a midwife to supporting families during end-of-life care in hospice.',
      'These experiences shaped her deep understanding of what it truly means to care for others.',
      'Her personal journey of healing and balance inspired the creation of The Road to Zero, a space dedicated to helping individuals restore vitality, confidence, and inner alignment.',
      "Through personalized wellness therapies and aesthetic treatments, Rachel's mission is to help every client feel their absolute best — mind, body, and spirit.",
    ]),
    order: 1,
  });
}

// ── Run ──

async function main() {
  console.log('🌱 Seeding Sanity content...\n');
  console.log(`Project: dm3m4n0d`);
  console.log(`Dataset: production`);

  await seedSiteSettings();
  await seedNavigation();
  await seedCategories();
  await seedServices();
  await seedStaff();

  console.log('\n✅ Done! All content seeded successfully.');
  console.log('Open your Sanity Studio to verify: http://localhost:3333');
}

main().catch((err) => {
  console.error('\n❌ Seed failed:', err.message);
  process.exit(1);
});
