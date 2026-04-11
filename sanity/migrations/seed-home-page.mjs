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
        eyebrow: 'RN-led wellness and aesthetics',
        title: 'Restore balance, renew confidence, and return to your most vibrant self',
        text: 'Welcome to our sanctuary for Wellness, Beauty, and Transformative balance. Your journey toward confidence, vitality, and restoration begins here. We believe true glow comes from within, nourishing the body, uplifting the spirit, and enhancing the natural beauty you already possess.',
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
          'We focus on enhancing natural aesthetics with a conservative approach, supporting metabolism, hormones, and recovery, restoring hydration, nutrients, and cellular energy, and helping you feel aligned in mind, body, and spirit.',
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
