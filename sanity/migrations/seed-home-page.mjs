/**
 * Seed the Home page into the flexible page.sections[] model.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const pt = (paragraphs) => paragraphs.map((text, i) => ({
  _type: 'block',
  _key: `block-${i}`,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `span-${i}`, text, marks: [] }],
}));

async function main() {
  await client.createOrReplace({
    _id: 'page-home',
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    seo: {
      title: 'The Road to Zero — Aesthetics & Wellness',
      description: 'Welcome to our sanctuary for Wellness, Beauty, and Transformative balance.',
    },
    sections: [
      {
        _key: 'hero',
        _type: 'heroSection',
        title: 'The Road to Zero',
        text: 'Welcome to our sanctuary for Wellness, Beauty, and Transformative balance. Your journey toward confidence, vitality, and restoration begins here. We believe true Glow comes from within, nourishing the body, uplifting the spirit, and enhancing the natural beauty you already possess.\n\nWith science-backed treatments, a personalized approach, and holistic care, we\'re here to help you reset, restore, and realign with your best self. From IV hydration and peptides to hormone support, GLP therapy, and aesthetic enhancements, every service is crafted to elevate your well-being.\n\nStep into a space dedicated to renewal, and allow us to guide you toward total rejuvenation because you deserve to look, feel, and live your most vibrant, balanced, and radiant life.',
        image: { _type: 'image', asset: { _type: 'reference', _ref: 'image-523dd5b83f374960c9e0d7efa353f22f89399b33-1024x1024-png' } },
        imagePosition: 'left',
        actions: [
          { _key: 'book', label: 'Book a Consultation', href: 'https://booking.hydreight.com/widget-business/fk58k' },
          { _key: 'services', label: 'Explore Our Services', href: '/services' },
        ],
      },
      {
        _key: 'overview',
        _type: 'richTextSection',
        title: 'Restore Balance. Reclaim Vitality. Renew Confidence.',
        content: pt([
          'At The Road to Zero, wellness and aesthetics come together through personalized, medically guided care. Our treatments support your body\'s natural ability to restore balance, recover from stress, and enhance your natural beauty.',
          'We focus on enhancing natural aesthetics with a conservative approach, supporting metabolism, hormones, and recovery, restoring hydration, nutrients, and cellular energy, and guiding you to feel aligned in mind, body, and spirit.',
          'Book your consultation and begin your journey back to balance.',
        ]),
      },
      {
        _key: 'featured-categories',
        _type: 'featuredServiceCategoriesSection',
        title: 'Our Services',
        intro: 'Explore our featured wellness and aesthetics categories.',
        categories: [
          { _key: 'cat-1', _type: 'reference', _ref: 'cat-aesthetic-treatments' },
          { _key: 'cat-2', _type: 'reference', _ref: 'cat-body-transformation' },
          { _key: 'cat-3', _type: 'reference', _ref: 'cat-iv-therapy' },
          { _key: 'cat-4', _type: 'reference', _ref: 'cat-medical-weight-management' },
          { _key: 'cat-5', _type: 'reference', _ref: 'cat-peptide-hormone-support' },
          { _key: 'cat-6', _type: 'reference', _ref: 'cat-holistic-services' },
        ],
      },
      {
        _key: 'why-us',
        _type: 'cardsSection',
        title: 'Why The Road to Zero?',
        intro: 'The Road to Zero represents a return to balance where health, beauty, and vitality naturally thrive.',
        cards: [
          { _key: 'stress', title: 'Zero Stress', description: 'Calming the nervous system and supporting emotional balance.' },
          { _key: 'depletion', title: 'Zero Depletion', description: 'Restoring hydration, essential nutrients, and energy.' },
          { _key: 'imbalance', title: 'Zero Imbalance', description: 'Supporting hormonal, metabolic, and cellular health.' },
          { _key: 'barriers', title: 'Zero Barriers', description: 'Providing accessible wellness treatments that meet you where you are.' },
        ],
      },
      {
        _key: 'about-rachel',
        _type: 'splitContentSection',
        eyebrow: 'About Us',
        title: 'About Us',
        content: pt([
          'RN, Midwife, Certified IV Therapy Provider Botox & Dermal Filler Clinician, Reiki Practitioner.',
          'Rachel has spent her career caring for individuals across the full spectrum of life, from welcoming new life as a midwife to supporting families during end-of-life care in hospice.',
          'These experiences shaped her deep understanding of what it truly means to care for others.',
          'Her personal journey of healing and balance inspired the creation of The Road to Zero, a space dedicated to helping individuals restore vitality, confidence, and inner alignment.',
          'Through personalized wellness therapies and aesthetic treatments, Rachel\'s mission is to help every client feel their absolute best, mind, body, and spirit.',
        ]),
        image: { _type: 'image', asset: { _type: 'reference', _ref: 'image-ea330bf50e6efb83133df23029b95dd2fcac8d60-356x475-jpg' } },
        actions: [
          { _key: 'about', label: 'Learn More About The Road to Zero', href: '/about' },
        ],
      },
      {
        _key: 'mobile-services',
        _type: 'splitContentSection',
        eyebrow: 'Concierge Care',
        title: 'We bring wellness to you',
        content: pt([
          'Our concierge services allow you to receive treatments in the comfort of your home or at your business.',
          'We provide services at private residences, corporate offices, spas and salons, fitness centers, yoga and wellness studios, and special events and private parties.',
          'Wellness should be convenient, comfortable, and personalized.',
        ]),
        image: { _type: 'image', asset: { _type: 'reference', _ref: 'image-3fe9abebf39d893e1beb0ccad1f3fe49cf03d906-7200x4800-jpg' } },
        imagePosition: 'left',
        actions: [
          { _key: 'services', label: 'Explore Services', href: '/services' },
        ],
      },
      {
        _key: 'referral-program',
        _type: 'splitContentSection',
        eyebrow: 'Referral Rewards',
        title: 'Share our services and earn rewards',
        content: pt([
          'Share our aesthetic and wellness services with friends and earn income or complimentary services, plus earn an ongoing 3% override bonus from referrals your referred clients generate.',
          'Clients who refer others may receive rewards including Botox treatments, dermal fillers, IV hydration sessions, vitamin injections, and peptide therapy.',
        ]),
        image: { _type: 'image', asset: { _type: 'reference', _ref: 'image-8af7e65eb76fabe680bf632516cec8475b5b32c0-500x331-webp' } },
        actions: [
          { _key: 'referrals', label: 'Learn About the Referral Program', href: '/referral-program' },
        ],
      },
      {
        _key: 'about-tags',
        _type: 'tagListSection',
        title: 'A concierge wellness experience built around you',
        intro: 'Our services are designed to be personalized, convenient, and grounded in thoughtful care.',
        tags: [
          'RN-led care',
          'Conservative aesthetic approach',
          'Hormone and metabolism support',
          'Hydration and recovery support',
          'Mind, body, and spirit alignment',
          'Concierge wellness services',
        ],
      },
      {
        _key: 'cta',
        _type: 'ctaSection',
        title: 'Begin Your Journey Back to Balance',
        text: 'You deserve to feel energized, confident, and aligned. Book your consultation today and take the first step toward restoring your health and vitality.',
        actions: [
          { _key: 'book', label: 'Book Appointment', href: 'https://booking.hydreight.com/widget-business/fk58k' },
          { _key: 'about', label: 'Learn More About Us', href: '/about' },
        ],
      },
    ],
  });

  console.log('✓ page-home');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
