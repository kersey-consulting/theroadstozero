export interface Benefit {
  title: string;
  description: string;
}

export interface AddOn {
  name: string;
  detail: string;
}

export interface ServicePageData {
  type: 'IV Drip' | 'IM Injection';
  name: string;
  slug: string;
  tagline: string;
  heroText: string;
  shortDescription: string;
  keyBenefits: string[];
  description: string[];
  benefits: Benefit[];
  addOns?: AddOn[];
  pairWith?: string[];
  requiresConsultation?: boolean;
}

export const ivServices: ServicePageData[] = [
  {
    type: 'IV Drip',
    name: 'Plain Hydration',
    slug: 'plain-hydration',
    tagline: 'Restore. Replenish. Rebalance.',
    heroText: 'A pure Lactated Ringer solution to rapidly restore hydration and replenish essential electrolytes. Gentle, effective, and fast-acting — the perfect foundation for recovery and wellness.',
    shortDescription: 'A pure Lactated Ringer solution to rapidly restore hydration and replenish essential electrolytes. Gentle, effective, and fast-acting — the perfect foundation for recovery.',
    keyBenefits: ['Rapid hydration', 'Replenishes electrolytes', 'Pre/post event support'],
    description: [
      'Lactated Ringer (LR) is a balanced electrolyte solution commonly used to restore hydration and replenish essential minerals. It contains sodium, potassium, calcium, and chloride in proportions close to the body\'s own fluid composition.',
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
    type: 'IV Drip',
    name: 'Athlete Recovery',
    slug: 'athlete-recovery',
    tagline: 'Replenish. Restore. Perform.',
    heroText: 'Accelerate recovery and feel stronger for every workout. Designed to rehydrate, replenish nutrients, reduce muscle soreness, and get you back to peak performance faster.',
    shortDescription: 'Designed to rehydrate, replenish nutrients, reduce muscle soreness, and accelerate recovery after intense training, workouts, or competitions.',
    keyBenefits: ['Rapid rehydration', 'Reduces muscle soreness & cramps', 'Boosts energy & mental focus'],
    description: [
      'The Athlete Recovery IV is designed for athletes, fitness enthusiasts, and active clients who want to feel their best faster after intense training, workouts, or competitions.',
      'Amino acids and B12 help with muscle conditioning, recovery, and endurance. This blend also assists the nervous system, metabolism, and protein synthesis — giving your body the tools it needs to rebuild and perform.',
      'Whether you\'re training for a race, recovering from competition, or simply pushing your limits in the gym, this infusion delivers the nutrients your body needs directly to the bloodstream for maximum absorption.',
    ],
    addOns: [
      { name: 'Vitamin B12', detail: 'Supports energy, metabolism, and red blood cell production. Often felt within 24–48 hours.' },
      { name: 'Amino Blend', detail: 'Ornithine 50mg, Arginine 100mg, Lysine 50mg, Citrulline 50mg — supports muscle recovery and protein synthesis.' },
      { name: 'B-Complex (BPlex)', detail: 'B1, B2, B3, B5, B6 blend supporting energy metabolism, nerve function, and endurance.' },
      { name: 'Glutathione', detail: 'The master antioxidant — reduces oxidative stress from intense training and supports cellular recovery.' },
      { name: 'Taurine', detail: 'Supports cardiovascular function, muscle performance, and nervous system health.' },
    ],
    pairWith: ['Energy IV', 'Fat Burner IV', 'Myers Cocktail', 'B12 Injection'],
    benefits: [
      { title: 'Rapid Rehydration', description: 'IV fluids quickly restore lost water and electrolytes, helping prevent cramping, fatigue, and dizziness after exercise.' },
      { title: 'Replenishes Essential Nutrients', description: 'B-Complex, B12, magnesium, and amino acids restore vitamins and minerals depleted during workouts.' },
      { title: 'Reduces Muscle Soreness & Cramps', description: 'Magnesium and amino acids help relax muscles and reduce post-workout pain, supporting faster recovery between sessions.' },
      { title: 'Boosts Energy & Mental Focus', description: 'B12 and B-complex help clients feel alert, focused, and energized — improving performance in subsequent sessions.' },
      { title: 'Supports Immune & Cellular Health', description: 'Antioxidants like Vitamin C and Glutathione reduce oxidative stress from intense training and help prevent illness.' },
      { title: 'Prepares the Body for Peak Performance', description: 'Helps athletes feel stronger, faster, and more resilient — ready for whatever comes next.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'Beauty & Youth',
    slug: 'beauty-youth',
    tagline: 'Hydrate. Rejuvenate. Shine.',
    heroText: 'Your ultimate beauty boost from the inside out. Supports glowing skin, stronger hair and nails, and cellular anti-aging — so the glow you feel is the youth you see.',
    shortDescription: 'Supports glowing skin, hair, and nails while promoting cellular health, anti-aging, and overall vitality. Your ultimate beauty boost from the inside out.',
    keyBenefits: ['Radiant, glowing skin', 'Stronger hair & nails', 'Anti-aging cellular support'],
    description: [
      'The Beauty & Youth IV Drip is designed to support radiant skin, hair, and nails while promoting cellular health, anti-aging, and overall vitality from the inside out.',
      'This infusion provides essential nutrients, antioxidants, and vitamins that support hormone pathways, reduce oxidative stress, and nourish the body to produce fatty acids that prevent premature and visible skin aging.',
      'Popular before weddings, photoshoots, vacations, or as an ongoing beauty maintenance treatment, clients notice a visible radiance boost alongside lasting improvements in skin texture, clarity, and overall glow.',
    ],
    addOns: [
      { name: 'Biotin', detail: 'Supports healthy hair growth, stronger nails, and skin health. A cornerstone beauty vitamin.' },
      { name: 'Glutathione', detail: 'The master antioxidant — brightens skin tone, reduces hyperpigmentation, and supports collagen production.' },
      { name: 'B-Complex (BPlex)', detail: 'B vitamins support cellular turnover, circulation, and overall skin vitality.' },
      { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Manganese, and Copper — essential trace minerals for skin repair and cellular function.' },
    ],
    benefits: [
      { title: 'Radiant, Glowing Skin', description: 'Glutathione, Vitamin C, and Biotin help reduce oxidative stress, brighten skin tone, and support collagen production for youthful, supple skin.' },
      { title: 'Stronger Hair & Nails', description: 'Biotin, B vitamins, and trace minerals promote healthy hair growth and stronger nails, and help repair damage from stress or environmental factors.' },
      { title: 'Anti-Aging & Cellular Support', description: 'Antioxidants like Glutathione and Vitamin C combat free radical damage and support healthy aging at the cellular level.' },
      { title: 'Deep Skin Hydration', description: 'IV fluids restore hydration, plumping the skin and reducing dryness, dullness, and loss of elasticity.' },
      { title: 'Boosts Energy & Overall Wellness', description: 'B-Complex and B12 support energy, mental clarity, and stress resilience so you feel as good as you look.' },
      { title: 'Pre-Event Glow', description: 'Popular before weddings, vacations, and photoshoots. Clients love the immediate radiance boost that lasts for days.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'Immune Boost',
    slug: 'immune',
    tagline: 'Defend. Recover. Thrive.',
    heroText: 'Strengthen your body\'s natural defenses, fight off infections faster, and stay at your best — especially popular during cold & flu season, travel, or periods of high stress.',
    shortDescription: 'Strengthens the body\'s natural defenses, fights off infections, and supports overall wellness. Especially popular during cold & flu season, travel, or times of high stress.',
    keyBenefits: ['Strengthens immunity', 'Faster recovery from illness', 'Antioxidant support'],
    description: [
      'The Immune Boost IV delivers a powerful combination of hydration, immune-supporting vitamins, and antioxidants directly into the bloodstream for faster, more effective absorption than oral supplements.',
      'It helps replenish depleted nutrients, reduce fatigue, and support the body\'s ability to respond to stress and illness. Whether you\'re already feeling run-down or trying to stay ahead of seasonal illness, this drip gives your immune system the tools it needs.',
      'Especially popular during cold and flu season, before and after travel, or during periods of high physical or emotional stress — the Immune IV is ideal for clients who want to stay healthy, recover faster, and maintain peak wellness year-round.',
    ],
    addOns: [
      { name: 'Glutathione', detail: 'The master antioxidant — supercharges immune defense, supports detoxification, and reduces oxidative stress.' },
      { name: 'Vitamin B12', detail: 'Boosts energy and supports red blood cell production. Ideal for clients feeling run-down or exhausted.' },
      { name: 'Extra Vitamin C', detail: 'Enhances immune cell function, supports collagen and tissue repair, and amplifies antioxidant protection.' },
      { name: 'Zinc Booster', detail: 'Strengthens the body\'s first line of immune defense. Helps shorten duration of colds and viral symptoms.' },
      { name: 'Extra Fluids', detail: 'Improves hydration, helps flush toxins, and supports circulation and overall recovery.' },
      { name: 'Magnesium', detail: 'Calms the body, reduces stress and muscle tension, and supports sleep and nervous system balance.' },
    ],
    benefits: [
      { title: 'Strengthens Immunity', description: 'High-dose Vitamin C, Zinc, and B vitamins help boost the immune system and support white blood cell function.' },
      { title: 'Faster Recovery', description: 'Helps reduce the severity and duration of illness. Ideal for clients feeling run-down, fatigued, or recently exposed.' },
      { title: 'Rehydrates & Replenishes', description: 'IV fluids restore electrolytes and hydration lost from illness or stress, preventing dehydration-related fatigue.' },
      { title: 'Reduces Stress & Fatigue', description: 'B-Complex vitamins support nervous system function, helping clients feel more energized and resilient.' },
      { title: 'Antioxidant Support', description: 'Glutathione and Vitamin C neutralize free radicals and oxidative stress, protecting cells and promoting cellular health.' },
      { title: 'Pre-Travel or Event Boost', description: 'Strengthens immunity before flights, vacations, or large gatherings — helping prevent getting sick during high-risk periods.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'Detox & Hangover Recovery',
    slug: 'detox-hangover',
    tagline: 'Flush. Restore. Revive.',
    heroText: 'Rehydrate, detoxify, and recover in one revitalizing drip. Designed to flush toxins, restore essential nutrients, and get you feeling like yourself again — fast.',
    shortDescription: 'Flush toxins, rehydrate, and restore energy after stress, alcohol, travel, or intense workouts. Combats dehydration and reduces oxidative stress on the liver and cardiovascular system.',
    keyBenefits: ['Rapid rehydration', 'Liver detoxification support', 'Reduces hangover symptoms'],
    description: [
      'The Detox & Hangover Recovery IV contains essential vitamins and minerals to combat dehydration and reduce oxidative stress on the liver, cardiovascular, and endocrine systems by assisting in detoxification of the body.',
      'This formula also reduces nausea, which is particularly helpful during recovery from alcohol, illness, or travel. Clients feel noticeable results quickly — making this one of the most popular mobile IV therapy options.',
      'Whether you\'re recovering from a night out, a long trip, an illness, or simply feeling toxic and depleted, this drip helps your body reset and return to balance.',
    ],
    addOns: [
      { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Manganese, and Copper — essential for cellular detox and metabolic function.' },
      { name: 'Glutathione', detail: 'The master antioxidant — supports liver detoxification, neutralizes free radicals, and speeds recovery.' },
      { name: 'Glutamine', detail: 'Supports gut health and intestinal lining repair — beneficial after alcohol or inflammation.' },
      { name: 'B-Complex (BPlex)', detail: 'B1 through B6 to replenish B vitamins depleted by alcohol and support energy metabolism.' },
    ],
    benefits: [
      { title: 'Rapid Rehydration', description: 'Restores fluid balance after dehydration from alcohol, illness, travel, or exercise. Reduces fatigue, dizziness, and brain fog.' },
      { title: 'Detoxification Support', description: 'Glutathione, Vitamin C, and B vitamins help neutralize free radicals and support liver function and natural detox pathways.' },
      { title: 'Reduces Hangover Symptoms', description: 'Minimizes nausea, headaches, and body aches — significantly speeding up recovery after alcohol or social events.' },
      { title: 'Boosts Energy & Mental Clarity', description: 'B-Complex and B12 enhance energy production. Clients feel alert and refreshed within 30–60 minutes.' },
      { title: 'Muscle Recovery', description: 'Magnesium and amino acids reduce muscle cramps and soreness, supporting quicker recovery after physical activity.' },
      { title: 'Enhances Overall Wellness', description: 'Clients often report feeling lighter, more balanced, and less stressed — like a full system reset.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'Energy IV',
    slug: 'energy',
    tagline: 'Power Up. Feel Clear. Go.',
    heroText: 'Fast, clean energy — no crash, no jitters. Your ultimate formula for hydration, vitamins, and cellular energy all in one drip, designed to help you power through your day.',
    shortDescription: 'Fast, clean energy to power through your day. Reduces inflammatory responses and combats fatigue by improving muscle recovery at a cellular level through anti-oxidation and serotonin support.',
    keyBenefits: ['Fast energy boost', 'Reduces fatigue & brain fog', 'Supports mood & nervous system'],
    description: [
      'The Energy IV combines amino acids, vitamins, and minerals to reduce inflammatory responses and combat fatigue by improving muscle recovery at a cellular level through anti-oxidation, serotonin production support, and cellular energy processes.',
      'Whether you\'re dealing with work-related burnout, post-travel exhaustion, chronic tiredness, or simply wanting more focus and drive, this drip delivers fast, clean energy that lasts.',
      'IV nutrients work faster and more effectively than oral supplements because they bypass the digestive system and enter the bloodstream immediately. Clients typically feel results within 20–40 minutes.',
    ],
    addOns: [
      { name: 'Mineral Blend', detail: 'Magnesium, Zinc, Copper, and Manganese to support cellular energy and nervous system function.' },
      { name: 'MIC + B12', detail: 'Methionine, Inositol, Choline, and B12 — supports fat metabolism, liver health, and sustained energy.' },
      { name: 'Lipo Mino', detail: 'Lipotropic vitamins with B12 to enhance fat burning, energy, and metabolic support.' },
      { name: 'Amino Blend', detail: 'Glutamine, Ornithine, Arginine, Lysine, and Citrulline — supports muscle recovery and sustained energy production.' },
    ],
    pairWith: ['Athlete Recovery IV', 'Myers Cocktail', 'B12 Injection', 'B-Complex Injection'],
    benefits: [
      { title: 'Fast Energy Boost', description: 'Replenishes essential vitamins and minerals that support cellular energy production. Clients feel alert and ready within 20–40 minutes.' },
      { title: 'Reduces Fatigue', description: 'Ideal for clients experiencing work-related burnout, chronic tiredness, or jet lag. Restores both mental and physical energy.' },
      { title: 'Supports Nervous System & Mood', description: 'B-Complex and B12 help regulate neurotransmitters, improving focus and reducing stress. Magnesium relaxes muscles and calms tension.' },
      { title: 'Enhances Athletic Performance', description: 'Amino acids and electrolytes help muscles recover after workouts and boost stamina and endurance for active clients.' },
      { title: 'Hydration + Vital Nutrients', description: 'IV fluids restore fluids and electrolytes faster than oral hydration, combating mild dehydration that can cause low energy or brain fog.' },
      { title: 'Safe, Quick & Convenient', description: 'Works in 20–40 minutes with minimal downtime. Perfect for busy clients who need results fast.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'Metabolism & Fat Burner',
    slug: 'fat-burner',
    tagline: 'Burn. Energize. Transform.',
    heroText: 'Boost metabolism, burn fat, and power up your energy naturally. Essential amino acids, vitamins, and B12 transport fatty acids into mitochondria where they can be burned for fuel.',
    shortDescription: 'Boost metabolism, burn fat, and power up your energy naturally. Essential amino acids and vitamins transport fatty acids into mitochondria where they are burned for energy.',
    keyBenefits: ['Boosts metabolism', 'Enhances fat breakdown', 'Mood improvement & appetite control'],
    description: [
      'The Metabolism & Fat Burner IV is the perfect blend of lipotropic compounds, B vitamins, and amino acids to transport fatty acids into mitochondria where they can be burned for energy. An extra benefit is mood improvement and additional appetite control.',
      'IV nutrients work faster and more effectively than oral supplements, making this an ideal support treatment alongside diet, exercise, and GLP-1 weight management programs.',
      'This drip is especially popular for clients who are working through weight-loss plateaus, wanting to boost their metabolism before a big event, or looking for complementary metabolic support alongside peptide or GLP-1 therapy.',
    ],
    addOns: [
      { name: 'MIC + B12', detail: 'Methionine 25mg, Inositol 50mg, Choline 50mg, B12 330mcg — core lipotropic compounds for fat mobilization and liver support.' },
      { name: 'Lipo Mino (without Carnitine)', detail: 'Pyridoxine, Methionine, Inositol, Choline, B12, Thiamine, Riboflavin — comprehensive fat metabolism support.' },
      { name: 'Lipo Stat Plus', detail: 'Methionine, Inositol, Choline, B6, Cyanocobalamin — targeted lipotropic and metabolic support.' },
      { name: 'Lipo Mino with Carnitine', detail: 'Full lipotropic blend with L-Carnitine for enhanced fat transport into mitochondria. Up to 6 weeks maximum.' },
    ],
    pairWith: ['Energy IV', 'Athlete Recovery IV', 'Medical Weight Management', 'Peptide & Hormone Support'],
    benefits: [
      { title: 'Boosts Metabolism', description: 'B12, B-Complex, Carnitine, and MIC help the body convert fat into usable energy and improve metabolic function.' },
      { title: 'Enhances Fat Breakdown', description: 'Carnitine and MIC assist with fat mobilization, helping the body burn stored fat more efficiently — especially alongside diet and exercise.' },
      { title: 'Increases Natural Energy', description: 'Because fat is used as fuel, clients experience steady energy, less fatigue, and reduced brain fog throughout the day.' },
      { title: 'Liver Detox & Hormone Balance', description: 'Choline and methionine help the liver process fats and toxins more effectively, supporting better digestion and overall wellness.' },
      { title: 'Enhances Workout Performance', description: 'A great option for gym clients, fitness programs, and athletes wanting more stamina and faster body composition changes.' },
      { title: 'Breaks Weight-Loss Plateaus', description: 'Perfect for clients struggling with low energy, slow metabolism, or difficulty staying motivated on their weight-loss journey.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'Myers Cocktail',
    slug: 'myers-cocktail',
    tagline: 'The Gold Standard of IV Wellness.',
    heroText: 'The most popular and in-demand infusion in the industry. A powerful blend of Vitamin C, B-Complex, Magnesium, and Calcium delivering broad, noticeable results — the "gold standard" IV drip.',
    shortDescription: 'The most popular and in-demand IV infusion in the industry. A powerful blend of Vitamin C, B-Complex, Magnesium, and Calcium — known for delivering broad, noticeable results.',
    keyBenefits: ['Energy boost', 'Immune & stress support', 'Migraine & headache relief'],
    description: [
      'The Myers Cocktail is one of the most well-known and widely used IV formulas, celebrated for its broad range of benefits and reliable results. It contains Vitamin C, B-Complex, Magnesium, and Calcium, with optional additions of B12, Zinc, and Glutathione.',
      'This blend of B vitamins, Vitamin C, Magnesium, and Calcium work in combination to increase metabolism, replace electrolytes lost by dehydration, and facilitate enzymatic reactions in intracellular processes. This revitalizes the body, enhances relaxation, aids recovery, and supports cardiovascular wellness.',
      'Whether you\'re looking for energy, immune support, migraine relief, muscle recovery, or simply a comprehensive wellness reset — the Myers Cocktail is the go-to choice for clients at all stages of their health journey.',
    ],
    addOns: [
      { name: 'Glutathione', detail: 'The ultimate finishing touch — the master antioxidant for deeper detox, skin brightening, and cellular renewal.' },
      { name: 'B12 Boost', detail: 'Add extra B12 for enhanced energy, metabolism support, and immune resilience.' },
      { name: 'Zinc', detail: 'Strengthens immune response and supports wound healing and cellular repair.' },
    ],
    pairWith: ['Athlete Recovery IV', 'Immune Boost IV', 'Glutathione Injection', 'B12 Injection'],
    benefits: [
      { title: 'Energy Boost', description: 'The combination of B vitamins, Vitamin C, and minerals helps fight fatigue, burnout, and exhaustion — clients feel noticeably revitalized.' },
      { title: 'Immune Support', description: 'High-dose Vitamin C strengthens immune function and helps prevent or reduce the severity of illness.' },
      { title: 'Stress & Mood Support', description: 'Magnesium and B vitamins help regulate the nervous system, reducing stress, anxiety, and irritability.' },
      { title: 'Migraine & Headache Relief', description: 'The Myers is famous for relieving migraines, tension headaches, and muscle spasms. The magnesium and B-complex combination is clinically recognized.' },
      { title: 'Muscle Recovery & Performance', description: 'Athletes love the Myers for its support of electrolyte balance, muscle relaxation, and quicker post-workout recovery.' },
      { title: 'Overall Wellness & Balance', description: 'The perfect all-around drip for clients who want to feel better, stronger, and more mentally clear in every area of life.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'Migraine Relief',
    slug: 'migraine',
    tagline: 'Fast Relief. Gentle Care.',
    heroText: 'Helps reduce pain, relax muscles, calm nausea, and rehydrate — often giving clients meaningful relief within 20–40 minutes. Don\'t lose a day to migraine pain.',
    shortDescription: 'Helps reduce pain, relax muscles, calm nausea, and rehydrate — often giving clients relief within 20–40 minutes. Improves vascular function linked to migraine attacks.',
    keyBenefits: ['Fast pain relief', 'Reduces nausea & light sensitivity', 'Restores hydration quickly'],
    description: [
      'The Migraine Relief IV is a multifaceted infusion designed to improve vascular function linked to migraine attacks, reduce nausea, and restore hydration — addressing multiple triggers and symptoms at once.',
      'Even mild dehydration can trigger migraines. Combined with magnesium deficiency and nervous system dysregulation, migraines can be debilitating. This infusion works on all three pathways simultaneously.',
      'This treatment is ideal for clients who experience frequent migraines, tension headaches, menstrual-related head pain, or stress-triggered migraines and want fast, effective relief without waiting for oral medications to kick in.',
    ],
    addOns: [
      { name: 'B-Complex (BPlex)', detail: 'B1 through B6 to support nervous system function and help regulate the brain pathways involved in migraine activity.' },
      { name: 'Glutamine', detail: 'Supports gut health and tissue repair. Beneficial for clients whose migraines are triggered by gut inflammation.' },
      { name: 'Acetaminophen (oral)', detail: '1000mg oral acetaminophen for additional pain relief alongside the IV infusion.' },
      { name: 'Glutathione', detail: 'Anti-inflammatory and detox support to reduce oxidative stress that can contribute to migraine severity.' },
      { name: 'Extra Fluids', detail: 'Additional IV fluids for deeper hydration — especially helpful for clients with severe dehydration.' },
      { name: 'Magnesium Booster', detail: 'Extra magnesium specifically for tension headaches, menstrual migraines, and muscle-related head pain.' },
    ],
    benefits: [
      { title: 'Fast Relief', description: 'Helps calm headache intensity, muscle tightness, and throbbing pain — often within 20–40 minutes of starting the infusion.' },
      { title: 'Reduces Nausea & Sensitivity', description: 'Addresses nausea while hydration eases dizziness, light sensitivity, and the disorientation that accompanies severe migraines.' },
      { title: 'Relaxes Muscles & Eases Tension', description: 'Magnesium works directly on tension headaches, menstrual-related migraines, and stress-triggered muscle tightness.' },
      { title: 'Restores Hydration', description: 'Even mild dehydration can trigger or worsen migraines. IV fluids provide immediate, effective replenishment.' },
      { title: 'Calms the Nervous System', description: 'B vitamins and magnesium help regulate the brain pathways involved in migraine activity and nerve sensitivity.' },
      { title: 'Gets You Back to Your Day', description: 'Perfect for clients who cannot afford to lose a day to pain. Many clients return to normal activity within hours.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'Prenatal Hydration',
    slug: 'prenatal',
    tagline: 'Gentle Support for Expecting Moms.',
    heroText: 'Designed to support pregnant clients experiencing nausea, dehydration, fatigue, or difficulty keeping fluids down — safe, gentle, and provider-guided from start to finish.',
    shortDescription: 'Designed to support pregnant clients experiencing nausea, dehydration, fatigue, or difficulty keeping fluids down. Supports methylation, reduces nausea, and provides folic acid. Consultation required.',
    keyBenefits: ['Hydration & nausea support', 'Electrolyte balance', 'Gentle & pregnancy-safe'],
    description: [
      'This vitamin combination supports methylation — a key process for a healthy pregnancy — while also improving nausea and providing folic acid to reduce structural abnormalities. It is specially formulated to be safe for pregnant clients when administered under medical supervision.',
      'Pregnant women commonly experience dehydration due to first-trimester nausea, food aversions, low appetite, and the increased fluid demands of a growing pregnancy. IV therapy bypasses the digestive system entirely, providing immediate absorption without worsening nausea.',
      'As a Registered Nurse and Midwife, Rachel brings exceptional clinical expertise and compassion to prenatal IV therapy. A consultation is required, and all treatments are tailored to the individual client\'s needs and provider guidance.',
    ],
    addOns: [
      { name: 'B-Complex (BPlex)', detail: 'B1 through B6 for energy support and nausea reduction. Consultation required before adding to prenatal drips.' },
      { name: 'Ondansetron (Zofran)', detail: 'Provider-prescribed anti-nausea medication for severe nausea. Requires a note from your OB/GYN and a full consultation.' },
    ],
    requiresConsultation: true,
    benefits: [
      { title: 'Hydration Support', description: 'Restores fluids quickly and safely — addressing dehydration from nausea, vomiting, food aversions, and increased fluid needs during pregnancy.' },
      { title: 'Nausea Relief', description: 'Provider-guided add-ons can address nausea and vomiting, making it easier to eat, hydrate, and feel more comfortable.' },
      { title: 'Electrolyte Balance', description: 'Pregnancy increases the body\'s need for magnesium, potassium, calcium, and sodium. Balanced electrolytes improve energy, muscle function, and overall comfort.' },
      { title: 'Increased Energy', description: 'Pregnancy-related fatigue is extremely common. Rehydration combined with provider-approved B vitamins supports cellular energy and mental clarity.' },
      { title: 'Headache Relief', description: 'Dehydration and pregnancy hormones often trigger headaches. IV fluids and electrolytes help reduce headache intensity and restore overall well-being.' },
      { title: 'Gentle on the Stomach', description: 'IV therapy bypasses the digestive system entirely, providing relief without worsening nausea — ideal when oral supplements aren\'t tolerated.' },
    ],
  },
  {
    type: 'IV Drip',
    name: 'NR IV Infusion',
    slug: 'nr-infusion',
    tagline: 'Cellular Energy. Longevity Support.',
    heroText: 'Nicotinamide Riboside (NR) is a direct NAD+ precursor — supporting cellular energy production, metabolism, and DNA repair at the deepest level. Anti-aging from the inside out.',
    shortDescription: 'Nicotinamide Riboside (NR) is a direct precursor to NAD+, a critical coenzyme involved in cellular energy production, metabolism, and DNA repair — supporting healthy aging from the inside out.',
    keyBenefits: ['Supports NAD+ levels', 'Cellular energy & metabolism', 'Anti-aging & DNA repair support'],
    description: [
      'Nicotinamide Riboside (NR) is a form of Vitamin B3 and a direct precursor to NAD+, a critical coenzyme involved in cellular energy production, metabolism, and DNA repair. NAD+ levels naturally decline with age, stress, and chronic fatigue — and NR helps the body naturally restore them.',
      'NAD+ is found in every cell of the body and is essential for the function of mitochondria (the cell\'s energy factories), DNA repair enzymes, and sirtuins — proteins associated with healthy aging and longevity. When NAD+ levels decline, cellular energy, recovery, and resilience all suffer.',
      'The NR IV Infusion delivers Nicotinamide Riboside directly to the bloodstream for maximum bioavailability — supporting energy, mental clarity, recovery, and healthy aging in ways that oral supplements cannot match.',
    ],
    pairWith: ['Myers Cocktail', 'Glutathione Injection', 'B12 Injection', 'Athlete Recovery IV'],
    benefits: [
      { title: 'Supports NAD+ Levels', description: 'NR is one of the most efficient NAD+ precursors. IV delivery maximizes absorption and raises NAD+ levels faster than oral supplementation.' },
      { title: 'Cellular Energy Production', description: 'NAD+ is essential to mitochondrial function — the process by which your cells convert nutrients into usable energy. Higher NAD+ means more cellular vitality.' },
      { title: 'DNA Repair Support', description: 'NAD+ activates DNA repair enzymes (PARPs) that help the body identify and correct cellular damage — supporting healthy aging and reduced cellular stress.' },
      { title: 'Mental Clarity & Focus', description: 'Many clients report improved cognitive function, sharper focus, and mental clarity following NR infusions — particularly those experiencing brain fog or cognitive fatigue.' },
      { title: 'Improved Recovery', description: 'Enhanced cellular repair and energy production translates to faster recovery from exercise, illness, and the demands of daily life.' },
      { title: 'Longevity & Anti-Aging', description: 'Supporting NAD+ levels is one of the most researched areas of longevity science. NR therapy may support healthy aging at the foundational, cellular level.' },
    ],
  },
  {
    type: 'IM Injection',
    name: 'Vitamin B12 Injection',
    slug: 'b12-injection',
    tagline: 'Clean Energy. Lifted Mood. Clear Focus.',
    heroText: 'A powerful dose of Vitamin B12 to enhance energy, support metabolism, lift mood, improve focus, and strengthen immunity. The ideal weekly or biweekly injection for sustained wellness.',
    shortDescription: 'A powerful dose of Vitamin B12 to enhance energy, support metabolism, lift mood, improve focus, and strengthen immunity. The perfect weekly or biweekly injection for sustained wellness.',
    keyBenefits: ['Natural energy boost', 'Supports metabolism & weight management', 'Enhances mood & mental clarity'],
    description: [
      'Vitamin B12 Intramuscular Injection (methylcobalamin or cyanocobalamin) is one of the most requested and impactful wellness add-ons available. It supports energy, metabolism, brain function, and red blood cell production — and clients often feel results within 24–48 hours.',
      'B12 is an essential nutrient that many people are deficient in — particularly those following plant-based diets, individuals over 50, or anyone with digestive issues affecting nutrient absorption. IM injection bypasses the digestive system entirely for full, immediate absorption.',
      'This injection can be offered as a stand-alone service in just 2–5 minutes, or paired with any IV drip for amplified results. It is a popular weekly or biweekly add-on for clients on weight management, energy optimization, or general wellness programs.',
    ],
    pairWith: ['Myers Cocktail', 'Energy IV', 'Athlete Recovery IV', 'Metabolism & Fat Burner IV'],
    benefits: [
      { title: 'Natural Energy Boost', description: 'B12 helps convert food into usable energy and supports adrenal function. Clients often feel a noticeable boost in energy within 24–48 hours.' },
      { title: 'Supports Metabolism & Weight Management', description: 'Helps the body metabolize fats and carbohydrates. Often used alongside GLP-1 programs and lipotropic injections for enhanced metabolic results.' },
      { title: 'Enhances Mood & Mental Clarity', description: 'Supports neurotransmitter balance (serotonin and dopamine). Helps improve focus, productivity, and mental fog — great for stressed or overworked clients.' },
      { title: 'Improves Sleep Regulation', description: 'B12 plays a role in melatonin production. Clients who struggle with sleep cycles may experience more balanced, restful sleep.' },
      { title: 'Red Blood Cell Production', description: 'Essential for oxygen transport and overall vitality. Helps prevent fatigue and weakness related to low B12 or mild anemia.' },
      { title: 'Boosts Immune Function', description: 'Helps maintain healthy nerve cells and immune responses — especially useful during cold/flu season, travel, or periods of high stress.' },
    ],
  },
  {
    type: 'IM Injection',
    name: 'Vitamin B-Complex Injection',
    slug: 'b-complex-injection',
    tagline: 'Energize. Balance. Restore.',
    heroText: 'A comprehensive blend of all essential B vitamins — supporting energy, metabolism, brain function, immunity, and cellular repair. One of the most foundational and widely requested wellness injections.',
    shortDescription: 'A blend of essential B vitamins (B1–B12) that together support energy, metabolism, brain function, immunity, and cellular repair — one of the most popular and foundational wellness injections.',
    keyBenefits: ['Boosts natural energy & stamina', 'Supports healthy metabolism', 'Strengthens immunity'],
    description: [
      'The Vitamin B-Complex Injection contains a blend of essential B vitamins (B1, B2, B3, B5, B6, B7, B9, and B12). Together they act as cofactors in metabolizing carbohydrates, fats, and proteins — making them essential for energy, cellular repair, and metabolic health.',
      'B vitamins support the immune system, red and white blood cell production, energy levels, cardiovascular health, inflammation response, and nervous system function. A deficiency in even one B vitamin can affect all the others.',
      'This injection is an excellent foundational add-on to virtually any IV drip, or can be offered as a quick stand-alone service. It is particularly popular for clients on weight management programs, athletes, and anyone dealing with burnout or mental fatigue.',
    ],
    pairWith: ['Myers Cocktail', 'Energy IV', 'Athlete Recovery IV', 'Detox & Hangover Recovery IV'],
    benefits: [
      { title: 'Boosts Natural Energy', description: 'Helps convert food into usable energy at the cellular level. Supports adrenal function and nervous system balance. Reduces fatigue without the crash.' },
      { title: 'Enhances Mood & Mental Clarity', description: 'Supports neurotransmitter production (serotonin and dopamine). Improves focus, concentration, and stress resilience for mentally drained clients.' },
      { title: 'Supports Healthy Metabolism', description: 'Essential for carbohydrate, protein, and fat metabolism. Assists weight-loss programs and metabolic balance — often paired with GLP-1 or lipotropic therapies.' },
      { title: 'Strengthens Immunity', description: 'B vitamins support cell repair and red blood cell production. Helps the body respond better to stress, illness, and inflammation.' },
      { title: 'Improves Skin, Hair & Nail Health', description: 'Supports cellular turnover and tissue repair. Enhances collagen production and circulation — great for beauty and overall vitality.' },
      { title: 'Supports Nervous System Health', description: 'Helps maintain healthy nerve function and reduces symptoms of stress-related tension, headaches, and irritability.' },
    ],
  },
  {
    type: 'IM Injection',
    name: 'Glutathione Injection',
    slug: 'glutathione-injection',
    tagline: 'The Master Antioxidant.',
    heroText: 'The body\'s most powerful antioxidant. Brightens skin, supports liver detox, boosts immunity, and revives cellular energy — supercharging every IV drip it accompanies.',
    shortDescription: 'The body\'s master antioxidant. Brightens skin, supports liver detox, boosts immunity, and revives cellular energy. Supercharges any IV drip for deeper, more powerful results.',
    keyBenefits: ['Powerful cellular detox', 'Skin brightening & anti-aging', 'Immune support & liver health'],
    description: [
      'Glutathione is known as the body\'s master antioxidant — a powerhouse molecule made of glutamine, cysteine, and glycine that is naturally produced in the liver. It plays a central role in detoxification, immune defense, and protecting cells from oxidative damage.',
      'As we age, stress accumulates, or toxin exposure increases, glutathione levels decline. This IM injection delivers a concentrated dose directly into the muscle for rapid, effective absorption — far superior to oral glutathione supplements, which break down in the digestive system.',
      'The Glutathione Injection is one of the most requested add-ons at The Road to Zero because it amplifies the benefits of nearly every other treatment — whether an IV drip, aesthetic procedure, or wellness program.',
    ],
    pairWith: ['Myers Cocktail', 'Beauty & Youth IV', 'Detox & Hangover Recovery IV', 'Immune Boost IV', 'NR IV Infusion'],
    benefits: [
      { title: 'Powerful Antioxidant & Cellular Detox', description: 'Neutralizes free radicals and oxidative stress. Supports liver detoxification pathways and protects cells from environmental toxins, chemicals, and pollution.' },
      { title: 'Skin Brightening & Anti-Aging', description: 'Reduces hyperpigmentation and dark spots. Promotes a more even, brighter skin tone by inhibiting melanin production and supporting collagen.' },
      { title: 'Immune Support', description: 'Strengthens immune-cell function and helps the body respond better to infections, inflammation, and stress.' },
      { title: 'Energy Boost & Mental Clarity', description: 'Supports mitochondrial function — the cell\'s energy factories. Many clients report feeling lighter, clearer, and less sluggish after treatment.' },
      { title: 'Liver Support & Post-Exposure Recovery', description: 'Helps break down and eliminate toxins and metabolic waste. Excellent after alcohol, medications, heavy workouts, or exposure to environmental stressors.' },
      { title: 'Amplifies IV Results', description: 'Glutathione pairs exceptionally well with Vitamin C, B-Complex, NAD+, Magnesium, and amino blends — making every drip work harder and deeper.' },
    ],
  },
];

// Helper to split into drips and injections
export const ivDrips = ivServices.filter(s => s.type === 'IV Drip');
export const imInjections = ivServices.filter(s => s.type === 'IM Injection');
