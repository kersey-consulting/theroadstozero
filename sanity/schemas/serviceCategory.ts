import { defineType, defineField } from 'sanity';

const simpleCard = {
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
};

const infoCard = {
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] }),
  ],
};

const tagLink = {
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'Href', type: 'string', validation: (r) => r.required() }),
  ],
};

export default defineType({
  name: 'serviceCategory',
  title: 'Service Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),

    defineField({ name: 'eyebrow', title: 'Hero Eyebrow', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero Title Override', type: 'string' }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({ name: 'introTitle', title: 'Intro Section Title', type: 'string' }),
    defineField({
      name: 'introBody',
      title: 'Intro Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({ name: 'cardSectionTitle', title: 'Card Section Title', type: 'string' }),
    defineField({ name: 'cardSectionSubtitle', title: 'Card Section Subtitle', type: 'text', rows: 3 }),

    defineField({ name: 'supportingSectionTitle', title: 'Supporting Section Title', type: 'string' }),
    defineField({
      name: 'supportingItems',
      title: 'Supporting Items',
      type: 'array',
      of: [simpleCard],
    }),

    defineField({ name: 'secondarySectionTitle', title: 'Secondary Section Title', type: 'string' }),
    defineField({
      name: 'secondaryItems',
      title: 'Secondary Items',
      type: 'array',
      of: [simpleCard],
    }),

    defineField({
      name: 'infoCards',
      title: 'Info Cards',
      type: 'array',
      of: [infoCard],
    }),

    defineField({ name: 'tagSectionTitle', title: 'Tag Section Title', type: 'string' }),
    defineField({ name: 'tagSectionIntro', title: 'Tag Section Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'tagLinks',
      title: 'Tag Links',
      type: 'array',
      of: [tagLink],
    }),

    defineField({ name: 'homeCardTitle', title: 'Homepage Card Title Override', type: 'string' }),
    defineField({
      name: 'homeCardDescription',
      title: 'Homepage Card Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'homeCardImage',
      title: 'Homepage Card Image Override',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'homeCardOrder', title: 'Homepage Card Order', type: 'number' }),
    defineField({ name: 'homeCardEnabled', title: 'Show on Homepage', type: 'boolean', initialValue: true }),

    defineField({ name: 'ctaTitle', title: 'CTA Title', type: 'string' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'text', rows: 4 }),
    defineField({ name: 'ctaPrimaryLabel', title: 'CTA Primary Label', type: 'string' }),
    defineField({ name: 'ctaPrimaryHref', title: 'CTA Primary Href', type: 'string' }),
    defineField({ name: 'ctaSecondaryLabel', title: 'CTA Secondary Label', type: 'string' }),
    defineField({ name: 'ctaSecondaryHref', title: 'CTA Secondary Href', type: 'string' }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'SEO Title', type: 'string' }),
        defineField({ name: 'description', title: 'SEO Description', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
});
