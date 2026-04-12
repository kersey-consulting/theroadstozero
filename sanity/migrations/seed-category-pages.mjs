/**
 * Seed structured serviceCategory page content (Option A).
 *
 * Usage:
 *   SANITY_TOKEN=your-token node sanity/migrations/seed-category-pages.mjs
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

function blocks(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `block-${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `span-${i}`, text, marks: [] }],
  }));
}

function withKeys(items) {
  return items.map((item, i) => ({ _key: `${i}`, ...item }));
}

const categories = [
  {
    id: 'cat-aesthetic-treatments',
    data: {
      eyebrow: 'Services',
      heroTitle: 'Aesthetic Treatments',
      heroText: 'Subtle, natural-looking enhancements designed to restore balance and refresh your appearance — without looking overdone. Because true beauty is a return to your most vibrant, natural self.',
      introTitle: 'Our Philosophy on Aesthetics',
      introBody: blocks([
        'At The Road to Zero, aesthetic treatment is about returning the face to its natural structure and symmetry — to enhance what you have and restore what time has taken, not to change your identity.',
        'Rachel brings a medically trained eye and a conservative hand to every treatment. Trained through the American Academy of Cosmetic Medicine (AACM), Aesthetic Medical Educators Training (AMET), and Empire Medical, her approach is rooted in anatomy, proportion, and balance.',
        "Whether you're looking to soften fine lines, restore lost volume, or simply feel more refreshed — every treatment plan is personalized to your goals and your face.",
      ]),
      cardSectionTitle: 'Treatments Offered',
      cardSectionSubtitle: 'All treatments are performed by or under the supervision of a licensed medical provider. A consultation is required prior to treatment.',
      supportingSectionTitle: 'Our Approach',
      supportingItems: withKeys([
        { title: 'Natural First', description: "Every treatment begins with your natural structure. We enhance what's already there — never change who you are." },
        { title: 'Conservative Touch', description: 'Results should be noticed as looking refreshed and rested — not as having had work done.' },
        { title: 'Facial Balance', description: 'We assess proportion, symmetry, and overall facial harmony before recommending any treatment.' },
        { title: 'Personalized Plans', description: 'Every consultation is unique. Your goals, anatomy, and timeline guide every decision.' },
      ]),
      secondarySectionTitle: 'Credentials & Training',
      tagSectionIntro: 'Rachel holds certifications from the leading aesthetic medicine training institutions, ensuring every treatment is grounded in the highest standards of safety, skill, and care.',
      infoCards: withKeys([
        { title: 'Training & Certifications', items: ['American Academy of Cosmetic Medicine (AACM)', 'Aesthetic Medical Educators Training (AMET)', 'Empire Medical'] },
        { title: 'Clinical Background', items: ['Registered Nurse (RN)', 'Midwife', 'Licensed Healthcare Administrator'] },
        { title: 'Specialties', items: ['Botulinum & Neuromodulators', 'Dermal Filler Clinician', 'PRP Therapy'] },
      ]),
      ctaTitle: 'Ready to Begin Your Aesthetic Journey?',
      ctaText: 'Book a personalized consultation with Rachel and discover what\'s possible with a conservative, natural approach to aesthetic care.',
      ctaPrimaryLabel: 'Book a Consultation',
      ctaPrimaryHref: 'https://booking.hydreight.com/widget-business/fk58k',
      ctaSecondaryLabel: 'Learn About Rachel',
      ctaSecondaryHref: '/about',
    },
  },
  {
    id: 'cat-body-transformation',
    data: {
      eyebrow: 'Services', heroTitle: 'Body Transformation',
      heroText: 'A comprehensive, medically guided approach to transforming your body — combining weight management, hormone support, and cellular nutrition to help you look, feel, and perform at your best.',
      introTitle: 'A Whole-Body Approach',
      introBody: blocks([
        'True body transformation goes beyond diet and exercise. Hormones, metabolism, cellular nutrition, and recovery all play critical roles in how your body looks and feels.',
        'At The Road to Zero, we address body transformation from the inside out — combining medically supervised weight management, targeted peptide and hormone support, and IV-delivered cellular nutrition to create a personalized program built around your goals.',
        'All programs are supervised by Rachel, a Registered Nurse with extensive experience in personalized wellness care. Your health, safety, and results are always the priority.',
      ]),
      cardSectionTitle: 'Transformation Pillars',
      cardSectionSubtitle: 'Our body transformation programs draw from multiple evidence-based approaches, personalized to your unique needs and goals.',
      supportingSectionTitle: 'What to Expect',
      supportingItems: withKeys([
        { title: 'Sustainable Fat Loss', description: 'Programs designed for lasting results, not quick fixes.' },
        { title: 'Improved Body Composition', description: 'Reduce fat, support lean muscle, and optimize how you feel.' },
        { title: 'Elevated Energy', description: 'Feel stronger and more energized throughout your transformation.' },
        { title: 'Medically Guided', description: 'Every program is supervised by a licensed medical provider.' },
      ]),
      tagSectionTitle: 'Explore Specific Programs',
      tagSectionIntro: 'Ready to dive deeper? Explore the individual programs that make up our Body Transformation approach:',
      tagLinks: withKeys([
        { label: 'Medical Weight Management', href: '/services/medical-weight-management' },
        { label: 'Peptide & Hormone Support', href: '/services/peptide-hormone-support' },
        { label: 'Metabolism & Fat Burner IV', href: '/services/iv-therapy/fat-burner' },
        { label: 'Energy IV', href: '/services/iv-therapy/energy' },
        { label: 'B12 Injection', href: '/services/iv-therapy/b12-injection' },
      ]),
      ctaTitle: 'Begin Your Transformation',
      ctaText: 'Book a consultation with Rachel and create a personalized plan that works for your body, your goals, and your life.',
      ctaPrimaryLabel: 'Book a Consultation', ctaPrimaryHref: 'https://booking.hydreight.com/widget-business/fk58k',
      ctaSecondaryLabel: 'Learn About Rachel', ctaSecondaryHref: '/about',
    },
  },
  {
    id: 'cat-medical-weight-management',
    data: {
      eyebrow: 'Services', heroTitle: 'Medical Weight Management',
      heroText: 'GLP-1 medications like Semaglutide and Tirzepatide help regulate appetite, support metabolic health, and assist in sustainable weight loss — all within a medically guided, personalized program.',
      introTitle: 'A Medical Approach to Lasting Change',
      introBody: blocks([
        'Weight management is not a willpower problem — it is a metabolic and hormonal one. GLP-1 and GLP-1/GIP medications work by directly addressing the biological drivers of appetite, blood sugar regulation, and fat storage.',
        'At The Road to Zero, our medical weight management programs are personalized, medically supervised, and designed to complement your lifestyle — not disrupt it. Rachel works closely with each client to create a dosing plan that is both effective and well-tolerated, with ongoing monitoring and support throughout your journey.',
        'These programs are best paired with healthy nutrition, movement, and complementary wellness therapies such as IV hydration, peptide support, and metabolic injections for optimal results.',
      ]),
      cardSectionTitle: 'Medications We Offer',
      cardSectionSubtitle: 'All medications are FDA-approved prescription therapies administered under the supervision of a licensed medical provider. A consultation is required.',
      supportingSectionTitle: 'How the Program Works',
      supportingItems: withKeys([
        { title: '1. Consultation', description: 'A comprehensive intake with Rachel to review your health history, goals, and determine if GLP-1 therapy is appropriate for you.' },
        { title: '2. Personalized Plan', description: 'A custom dosing schedule and program timeline tailored to your body, metabolism, and weight loss goals.' },
        { title: '3. Ongoing Support', description: 'Regular check-ins to monitor progress, adjust dosing as needed, and support your journey with complementary wellness services.' },
        { title: '4. Holistic Integration', description: 'Optional integration of IV therapy, peptides, or nutritional support to amplify your results and overall wellness.' },
      ]),
      tagSectionTitle: 'Complement Your Program',
      tagSectionIntro: 'Maximize your weight management results by combining GLP-1 therapy with these complementary services:',
      tagLinks: withKeys([
        { label: 'Metabolism & Fat Burner IV', href: '/services/iv-therapy/fat-burner' },
        { label: 'B12 Injection', href: '/services/iv-therapy/b12-injection' },
        { label: 'B-Complex Injection', href: '/services/iv-therapy/b-complex-injection' },
        { label: 'Energy IV', href: '/services/iv-therapy/energy' },
        { label: 'Peptide & Hormone Support', href: '/services/peptide-hormone-support' },
      ]),
      ctaTitle: 'Start Your Weight Management Journey',
      ctaText: 'Book a consultation with Rachel to discuss your goals, review your health history, and find the right program for your body.',
      ctaPrimaryLabel: 'Book a Consultation', ctaPrimaryHref: 'https://booking.hydreight.com/widget-business/fk58k',
      ctaSecondaryLabel: 'View Body Transformation', ctaSecondaryHref: '/services/body-transformation',
    },
  },
  {
    id: 'cat-peptide-hormone-support',
    data: {
      eyebrow: 'Services', heroTitle: 'Peptide & Hormone Support',
      heroText: 'Targeted peptide therapies that support natural hormone function, improve recovery, optimize sleep, and enhance vitality — helping your body perform and feel the way it was designed to.',
      introTitle: 'What Are Peptides?',
      introBody: blocks([
        'Peptides are short chains of amino acids — the building blocks of proteins — that act as signaling molecules in the body. They communicate with cells, tissues, and organs to regulate and optimize biological functions including hormone production, tissue repair, metabolism, and immune response.',
        'As we age, the levels of many of these naturally occurring peptides decline. Targeted peptide therapy works by supplementing or stimulating these pathways, helping the body restore its natural capacity for healing, energy, and hormonal balance.',
        'At The Road to Zero, Rachel designs each peptide protocol around your specific health goals, labs, and lifestyle — ensuring a safe, personalized, and effective approach. A comprehensive consultation is required prior to beginning any peptide program.',
      ]),
      cardSectionTitle: 'Peptide Therapies',
      cardSectionSubtitle: 'All protocols are customized, medically supervised, and require a consultation prior to starting. The following are examples of therapies that may be appropriate depending on your health history and goals.',
      supportingSectionTitle: 'Benefits of Peptide Therapy',
      supportingItems: withKeys([
        { title: 'Improved Recovery', description: 'Recover faster from workouts, illness, and the demands of daily life.' },
        { title: 'Better Sleep', description: 'Deeper, more restorative sleep supporting cellular repair and energy.' },
        { title: 'Enhanced Vitality', description: 'Feel more energized, motivated, and mentally clear throughout your day.' },
        { title: 'Hormone Optimization', description: 'Support natural hormone function for balance, mood, and longevity.' },
        { title: 'Body Composition', description: 'Build lean muscle, reduce stubborn fat, and transform your physique.' },
        { title: 'Personalized Care', description: 'Every protocol is individualized based on your health history and goals.' },
      ]),
      tagSectionTitle: 'Pair With Complementary Therapies',
      tagSectionIntro: 'Peptide therapy works beautifully alongside other Road to Zero services for amplified results:',
      tagLinks: withKeys([
        { label: 'Athlete Recovery IV', href: '/services/iv-therapy/athlete-recovery' },
        { label: 'Energy IV', href: '/services/iv-therapy/energy' },
        { label: 'Metabolism & Fat Burner IV', href: '/services/iv-therapy/fat-burner' },
        { label: 'Medical Weight Management', href: '/services/medical-weight-management' },
        { label: 'B12 Injection', href: '/services/iv-therapy/b12-injection' },
      ]),
      ctaTitle: 'Optimize Your Health from Within',
      ctaText: 'Book a consultation with Rachel to explore whether peptide therapy is right for your goals and health history.',
      ctaPrimaryLabel: 'Book a Consultation', ctaPrimaryHref: 'https://booking.hydreight.com/widget-business/fk58k',
      ctaSecondaryLabel: 'Explore Body Transformation', ctaSecondaryHref: '/services/body-transformation',
    },
  },
  {
    id: 'cat-holistic-services',
    data: {
      eyebrow: 'Services', heroTitle: 'Holistic Services',
      heroText: 'Healing is not only physical. Rachel\'s holistic offerings address the mind, body, and spirit connection — providing a deeper layer of restoration, balance, and inner alignment alongside your wellness journey.',
      introTitle: 'The Holistic Dimension of Wellness',
      introBody: blocks([
        'The Road to Zero has always recognized that true healing encompasses more than the physical body. Stress, emotional imbalance, and disconnection from oneself are among the most common — and most overlooked — drivers of poor health and low vitality.',
        'Rachel is a certified Reiki practitioner, and her holistic offerings are woven into the same compassionate philosophy that guides all of her work: to meet each client where they are and support their journey back to balance, wholeness, and radiant well-being.',
        'Whether experienced as a stand-alone session or integrated alongside medical treatments, holistic services provide a meaningful layer of support for the nervous system, the emotions, and the spirit.',
      ]),
      cardSectionTitle: 'Holistic Offerings',
      supportingSectionTitle: 'Our Guiding Principles',
      supportingItems: withKeys([
        { title: 'Whole-Person Care', description: 'True wellness encompasses mind, body, and spirit — not just physical symptoms.' },
        { title: 'Complementary Healing', description: 'Holistic services work beautifully alongside medical treatments to deepen and sustain results.' },
        { title: 'Safe Space', description: 'Every session is held in a compassionate, non-judgmental space guided by Rachel\'s deep care for each client.' },
        { title: 'Inner Alignment', description: 'The goal is alignment — helping you feel at peace, energized, and connected to your truest self.' },
      ]),
      secondarySectionTitle: 'About Rachel\'s Holistic Practice',
      secondaryItems: withKeys([
        { title: 'Rachel\'s Journey', description: 'Rachel is a certified Reiki practitioner whose journey into holistic healing grew from her years supporting clients through some of life\'s most profound moments — birth, illness, and the end of life.' },
        { title: 'Practice Philosophy', description: 'These experiences gave her a profound understanding of the human spirit and the deep need for care that goes beyond the physical. Her holistic sessions are offered with warmth, intention, and the utmost respect for each client\'s unique journey.' },
      ]),
      tagSectionTitle: 'Pair With Wellness Treatments',
      tagSectionIntro: 'Holistic sessions pair beautifully with other Road to Zero services for a truly integrated wellness experience:',
      tagLinks: withKeys([
        { label: 'Myers Cocktail IV', href: '/services/iv-therapy/myers-cocktail' },
        { label: 'Energy IV', href: '/services/iv-therapy/energy' },
        { label: 'Immune Boost IV', href: '/services/iv-therapy/immune' },
        { label: 'Peptide & Hormone Support', href: '/services/peptide-hormone-support' },
      ]),
      ctaTitle: 'Restore Balance. Reconnect Within.',
      ctaText: 'Book a holistic session with Rachel and take a meaningful step toward mind, body, and spirit alignment.',
      ctaPrimaryLabel: 'Book a Session', ctaPrimaryHref: 'https://booking.hydreight.com/widget-business/fk58k',
      ctaSecondaryLabel: 'Learn About Rachel', ctaSecondaryHref: '/about',
    },
  },
];

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Missing SANITY_TOKEN');
    process.exit(1);
  }
  for (const cat of categories) {
    await client.patch(cat.id).set(cat.data).commit();
    console.log(`✓ ${cat.id}`);
  }
  console.log('Done seeding category pages');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
