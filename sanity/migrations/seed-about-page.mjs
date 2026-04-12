/**
 * Seed the About page into the new flexible page.sections[] model.
 * Uses existing staffMember reference for Rachel.
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
    _id: 'page-about',
    _type: 'page',
    title: 'About',
    slug: { _type: 'slug', current: 'about' },
    seo: {
      title: 'About — The Road to Zero',
      description: 'Compassionate care for the whole person.',
    },
    sections: [
      {
        _key: 'hero',
        _type: 'heroSection',
        eyebrow: 'About the founder & owner',
        title: 'Compassionate care for the whole person',
        text: 'RN, Midwife, licensed healthcare administrator, Botulinum and Dermal Filler clinician, certified IV therapy provider, and Reiki practitioner. Rachel\'s mission is to help clients feel rejuvenated, confident, and aligned through personalized care that supports mind, body, and spirit.',
        actions: [
          { _key: 'book', label: 'Book a Consultation', href: 'https://booking.hydreight.com/widget-business/fk58k' },
          { _key: 'services', label: 'Explore Services', href: '/services' },
        ],
      },
      {
        _key: 'story',
        _type: 'richTextSection',
        title: 'A life devoted to caring for others',
        content: pt([
          'Rachel has had the blessing of supporting life at both its beginning and its end. Welcoming new life into the world as a midwife and walking alongside individuals and families during the end-of-life journey in hospice care.',
          'These experiences gave her a deep appreciation for the full spectrum of life and a compassionate understanding of what it means to truly care for others.',
          'Her personal journey began with a search for balance, self-discovery, self-love, and healing. Over time, that journey evolved into a professional mission: creating a safe, nurturing, and holistic space where wellness begins from within.',
        ]),
      },
      {
        _key: 'staff',
        _type: 'staffSection',
        title: 'Featured Clinician',
        intro: 'Meet the clinician behind The Road to Zero.',
        staffMembers: [{ _key: 'rachel', _type: 'reference', _ref: 'staff-rachel' }],
      },
      {
        _key: 'credentials',
        _type: 'cardsSection',
        title: 'Credentials & Specialties',
        cards: [
          { _key: 'clinical', title: 'Clinical Background', description: 'Registered Nurse\nMidwife\nLicensed healthcare Administrator' },
          { _key: 'credentials', title: 'Credentials', description: 'AACM (American Academy of Cosmetic medicine)\nAMET (Aesthetic Medical Educators training)\nEmpire Medical' },
          { _key: 'specialties', title: 'Specialties', description: 'Aesthetics Specialist\nDermal Filler clinician\nReiki practitioner' },
        ],
      },
      {
        _key: 'approach',
        _type: 'richTextSection',
        title: 'A holistic approach to wellness and confidence',
        content: pt([
          'Whether you are seeking stress relief, emotional or physical balance, increased energy, hormone support, weight management, or cosmetic rejuvenation, Rachel\'s goal is to guide you toward feeling your absolute best.',
          'Her approach blends medical knowledge, aesthetic expertise, and holistic care to support lasting wellness from the inside out.',
          'Every experience is designed to feel personal, supportive, and grounded in compassion.',
        ]),
      },
      {
        _key: 'approach-tags',
        _type: 'tagListSection',
        title: 'What clients may be looking for',
        tags: [
          'Stress relief and renewed balance',
          'Improved energy and recovery',
          'Hormone and wellness support',
          'Weight management guidance',
          'Natural-looking cosmetic rejuvenation',
          'Mind, body, and spirit alignment',
        ],
      },
      {
        _key: 'services',
        _type: 'tagListSection',
        title: 'Services Rachel is honored to offer',
        intro: 'Rachel looks forward to sharing the restorative and empowering benefits of these services in a way that feels thoughtful, personalized, and aligned with each client\'s goals.',
        tags: [
          'IV Therapy',
          'GLP-1 Medications',
          'Peptides',
          'Aesthetic Treatments',
          'Botulinum',
          'Dermal Fillers',
          'Reiki',
        ],
      },
      {
        _key: 'cta',
        _type: 'ctaSection',
        title: 'Thank you for trusting Rachel with your wellness journey',
        text: 'If you are ready to feel more rejuvenated, confident, and supported, Rachel would be honored to walk alongside you.',
        actions: [
          { _key: 'book', label: 'Book Appointment', href: 'https://booking.hydreight.com/widget-business/fk58k' },
          { _key: 'services', label: 'View Services', href: '/services' },
        ],
      },
    ],
  });

  console.log('✓ page-about');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
