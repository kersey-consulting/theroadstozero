import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const textBlock = (text, key) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
});

const blocksFromText = (texts = [], prefix) =>
  texts.filter(Boolean).map((text, index) => textBlock(text, `${prefix}-${index}`));

async function main() {
  const services = await client.fetch(`*[_type == "service"]{
    _id,
    name,
    type,
    tagline,
    heroText,
    shortDescription,
    description,
    requiresConsultation,
    heroImage,
    keyBenefits,
    benefits,
    addOns,
    pairsWith[]->{ name },
    category->{ slug },
    sections
  }`);

  for (const service of services) {
    if (Array.isArray(service.sections) && service.sections.length > 0) {
      console.log(`- Skipped ${service._id}, sections already present`);
      continue;
    }

    const categorySlug = service.category?.slug?.current || service.category?.slug;
    const isIv = categorySlug === 'iv-therapy';
    const sections = [];

    sections.push({
      _key: 'hero',
      _type: 'heroSection',
      eyebrow: service.type || 'Service',
      title: service.name,
      content: blocksFromText([
        service.tagline,
        service.heroText || service.shortDescription,
      ], `${service._id}-hero`),
      backgroundImage: service.heroImage,
      actions: [
        { _key: 'book', label: isIv ? 'Book This Treatment' : 'Book a Consultation', href: 'https://booking.hydreight.com/widget-business/fk58k' },
        { _key: 'back', label: isIv ? 'View All IV Services' : 'View All Services', href: isIv ? '/services/iv-therapy' : '/services' },
      ],
    });

    if (Array.isArray(service.description) && service.description.length > 0) {
      sections.push({
        _key: 'description',
        _type: 'richTextSection',
        title: 'About This Treatment',
        content: service.description,
      });
    }

    if (service.requiresConsultation) {
      sections.push({
        _key: 'consultation-note',
        _type: 'richTextSection',
        title: 'Consultation Required',
        content: blocksFromText([
          'A consultation is required prior to this treatment. Please contact us to schedule.',
        ], `${service._id}-consultation`),
      });
    }

    if (Array.isArray(service.benefits) && service.benefits.length > 0) {
      sections.push({
        _key: 'benefits',
        _type: 'cardsSection',
        title: 'Key Benefits',
        cards: service.benefits.map((benefit, index) => ({
          _key: `benefit-${index}`,
          title: benefit.title,
          description: benefit.description,
        })),
      });
    }

    if (Array.isArray(service.addOns) && service.addOns.length > 0) {
      sections.push({
        _key: 'addons',
        _type: 'cardsSection',
        title: 'Available Add-Ons',
        intro: 'Customize your treatment with targeted add-ons for deeper, more personalized results.',
        cards: service.addOns.map((addon, index) => ({
          _key: `addon-${index}`,
          title: addon.name,
          description: addon.detail,
        })),
      });
    }

    const pairTags = Array.isArray(service.pairsWith) ? service.pairsWith.map((item) => item?.name).filter(Boolean) : [];
    const benefitTags = Array.isArray(service.keyBenefits) ? service.keyBenefits.filter(Boolean) : [];

    if (pairTags.length > 0) {
      sections.push({
        _key: 'pairs-with',
        _type: 'tagListSection',
        title: 'Pairs Well With',
        intro: 'Enhance your results by combining this treatment with:',
        tags: pairTags,
      });
    } else if (benefitTags.length > 0) {
      sections.push({
        _key: 'key-benefit-tags',
        _type: 'tagListSection',
        title: 'Highlights',
        tags: benefitTags,
      });
    }

    sections.push({
      _key: 'cta',
      _type: 'ctaSection',
      title: 'Ready to Begin?',
      text: `Book your ${service.name} session today.${isIv ? ' We come to you — home, office, or wellness studio.' : ''}`,
      actions: [
        { _key: 'book', label: isIv ? 'Book This Treatment' : 'Book a Consultation', href: 'https://booking.hydreight.com/widget-business/fk58k' },
        { _key: 'back', label: isIv ? 'View All IV Services' : 'View All Services', href: isIv ? '/services/iv-therapy' : '/services' },
      ],
    });

    await client.patch(service._id).set({ sections }).commit();
    console.log(`✓ Migrated ${service._id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
