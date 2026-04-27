/**
 * Migrate structured serviceCategory content into sections[].
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const pt = (paragraphs, prefix) => (paragraphs ?? []).filter(Boolean).map((text, i) => ({
  _type: 'block',
  _key: `${prefix}-${i}`,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `${prefix}-${i}-span`, text, marks: [] }],
}));

const blocksToParagraphs = (blocks) =>
  (Array.isArray(blocks) ? blocks : []).map((b) => b.children?.map((c) => c.text).join('')?.trim()).filter(Boolean);

async function main() {
  const categories = await client.fetch(`*[_type == "serviceCategory"]{
    _id, title, slug, description, eyebrow, heroTitle, heroText, heroImage,
    introTitle, introBody,
    cardSectionTitle, cardSectionSubtitle,
    supportingSectionTitle, supportingItems,
    secondarySectionTitle, secondaryItems,
    infoCards,
    tagSectionTitle, tagSectionIntro, tagLinks,
    ctaTitle, ctaText, ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref,
    "services": *[_type == "service" && references(^._id)] | order(order asc){ _id }
  }`);

  for (const category of categories) {
    const sections = [];

    if (category.eyebrow || category.heroTitle || category.heroText || category.heroImage) {
      sections.push({
        _key: 'hero',
        _type: 'heroSection',
        eyebrow: category.eyebrow,
        title: category.heroTitle || category.title,
        content: pt([category.heroText || category.description].filter(Boolean), `${category._id}-hero`),
        backgroundImage: category.heroImage,
        actions: [
          category.ctaPrimaryLabel && (category.ctaPrimaryHref || '') ? {
            _key: 'primary',
            label: category.ctaPrimaryLabel,
            href: category.ctaPrimaryHref,
          } : { _key: 'book', label: 'Book a Consultation', href: 'https://booking.hydreight.com/widget-business/fk58k' },
          { _key: 'services', label: 'View All Services', href: '/services' },
        ].filter(Boolean),
      });
    }

    const introParagraphs = blocksToParagraphs(category.introBody);
    if (category.introTitle || introParagraphs.length) {
      sections.push({
        _key: 'intro',
        _type: 'richTextSection',
        title: category.introTitle,
        content: pt(introParagraphs, `${category._id}-intro`),
      });
    }

    if (category.cardSectionTitle || category.cardSectionSubtitle || (category.services?.length ?? 0) > 0) {
      sections.push({
        _key: 'services',
        _type: 'serviceListSection',
        title: category.cardSectionTitle || 'Services',
        intro: category.cardSectionSubtitle,
        services: (category.services ?? []).map((service, i) => ({
          _key: `service-${i}`,
          _type: 'reference',
          _ref: service._id,
        })),
      });
    }

    if ((category.supportingItems?.length ?? 0) > 0) {
      sections.push({
        _key: 'supporting',
        _type: 'cardsSection',
        title: category.supportingSectionTitle,
        cards: category.supportingItems.map((item, i) => ({
          _key: `support-${i}`,
          title: item.title,
          description: item.description,
        })),
      });
    }

    if ((category.secondaryItems?.length ?? 0) > 0) {
      sections.push({
        _key: 'secondary',
        _type: 'cardsSection',
        title: category.secondarySectionTitle,
        cards: category.secondaryItems.map((item, i) => ({
          _key: `secondary-${i}`,
          title: item.title,
          description: item.description,
        })),
      });
    }

    if ((category.infoCards?.length ?? 0) > 0) {
      sections.push({
        _key: 'info-cards',
        _type: 'cardsSection',
        title: category.tagSectionTitle || category.secondarySectionTitle,
        intro: category.tagSectionIntro,
        cards: category.infoCards.map((card, i) => ({
          _key: `info-${i}`,
          title: card.title,
          description: (card.items ?? []).join('\n'),
        })),
      });
    }

    if ((category.tagLinks?.length ?? 0) > 0) {
      sections.push({
        _key: 'tags',
        _type: 'tagListSection',
        title: category.tagSectionTitle,
        intro: category.tagSectionIntro,
        tags: category.tagLinks.map((link) => link.label),
      });
    }

    if (category.ctaTitle || category.ctaText || category.ctaPrimaryLabel || category.ctaSecondaryLabel) {
      sections.push({
        _key: 'cta',
        _type: 'ctaSection',
        title: category.ctaTitle,
        text: category.ctaText,
        actions: [
          category.ctaPrimaryLabel && category.ctaPrimaryHref ? {
            _key: 'primary',
            label: category.ctaPrimaryLabel,
            href: category.ctaPrimaryHref,
          } : null,
          category.ctaSecondaryLabel && category.ctaSecondaryHref ? {
            _key: 'secondary',
            label: category.ctaSecondaryLabel,
            href: category.ctaSecondaryHref,
          } : null,
        ].filter(Boolean),
      });
    }

    await client.patch(category._id).set({ sections }).commit();
    console.log(`✓ ${category._id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
