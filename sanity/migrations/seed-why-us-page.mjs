/**
 * Seed the Why Us page into the flexible page.sections[] model.
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
    _id: 'page-why-us',
    _type: 'page',
    title: 'Why Us',
    slug: { _type: 'slug', current: 'why-us' },
    seo: {
      title: 'Why Us — The Road to Zero',
      description: 'Learn the philosophy behind The Road to Zero and our RN-led, personalized approach to wellness and aesthetics.',
    },
    sections: [
      {
        _key: 'hero',
        _type: 'heroSection',
        eyebrow: 'Our Philosophy',
        title: 'Why The Road To Zero',
        text: 'Welcome to The Road to Zero, a sanctuary for wellness, beauty, and transformative balance. Your journey toward confidence, vitality, and restoration begins here.',
        actions: [
          { _key: 'book', label: 'Book a Consultation', href: 'https://booking.hydreight.com/widget-business/fk58k' },
          { _key: 'services', label: 'Explore Services', href: '/services' },
        ],
      },
      {
        _key: 'intro',
        _type: 'richTextSection',
        title: 'A Return to Balance',
        content: pt([
          'The Road to Zero is an RN-led medical wellness and aesthetics practice offering IV therapy, wellness injections, and aesthetic services. Our approach is conservative, personalized, and safety-focused — designed to restore balance, support recovery, and enhance natural beauty.',
          'The Road to Zero represents a journey back to balance: a return to your body\'s natural baseline, where health, beauty, and vitality can thrive.',
          'In a world of constant stress, burnout, toxins, poor nutrition, inflammation, and environmental strain, our bodies drift away from equilibrium.',
          'The “Road” symbolizes progress with patience, because healing is a process, not a shortcut.',
        ]),
      },
      {
        _key: 'zero-cards',
        _type: 'cardsSection',
        title: 'What “Zero” Represents',
        intro: 'The “Zero” in our name reflects restoration — a return to the roots of wellness and balance.',
        cards: [
          { _key: 'stress', title: 'Zero Stress', description: 'Calming the nervous system and creating space for healing.' },
          { _key: 'depletion', title: 'Zero Depletion', description: 'Restoring hydration, nutrients, and energy at the cellular level.' },
          { _key: 'imbalance', title: 'Zero Imbalance', description: 'Supporting hormonal, metabolic, and cellular balance.' },
          { _key: 'barriers', title: 'Zero Barriers', description: 'Bringing wellness directly to the client through concierge, personalized care.' },
        ],
      },
      {
        _key: 'closing',
        _type: 'richTextSection',
        title: 'Our Promise',
        content: pt([
          'Through personalized, science-backed treatments delivered directly to you, we guide each client on their journey back to alignment, vitality, renewal, beauty, and rejuvenation.',
        ]),
      },
      {
        _key: 'cta',
        _type: 'ctaSection',
        title: 'Begin Your Journey Back to Balance',
        text: 'If you\'re ready to restore, renew, and realign with your most vibrant self, we would be honored to guide you there.',
        actions: [
          { _key: 'book', label: 'Book a Consultation', href: 'https://booking.hydreight.com/widget-business/fk58k' },
          { _key: 'services', label: 'View Services', href: '/services' },
        ],
      },
    ],
  });

  console.log('✓ page-why-us');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
