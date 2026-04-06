import { defineType, defineField, defineArrayMember } from 'sanity';

const sectionAction = {
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'Href', type: 'string', validation: (r) => r.required() }),
  ],
};

const simpleCard = {
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
};

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'serviceCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Treatment Type',
      type: 'string',
      options: {
        list: [
          { title: 'IV Drip', value: 'IV Drip' },
          { title: 'IM Injection', value: 'IM Injection' },
          { title: 'Treatment', value: 'Treatment' },
          { title: 'Program', value: 'Program' },
        ],
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short punchy tagline (e.g. "The Gold Standard of Wellness.")',
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      rows: 4,
      description: 'Paragraph shown in the hero section',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Used on category listing pages',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text body for the service detail page',
    }),
    defineField({
      name: 'sections',
      title: 'Detail Page Sections',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'heroSection',
          title: 'Hero Section',
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
            defineField({ name: 'image', title: 'Foreground Image', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'imagePosition', title: 'Image Position', type: 'string', initialValue: 'right',
              options: { list: [{ title: 'Right', value: 'right' }, { title: 'Left', value: 'left' }], layout: 'radio' },
            }),
            defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'actions', title: 'Actions', type: 'array', of: [sectionAction] }),
          ],
        }),
        defineArrayMember({
          name: 'richTextSection',
          title: 'Rich Text Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
          ],
        }),
        defineArrayMember({
          name: 'cardsSection',
          title: 'Cards Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
            defineField({ name: 'cards', title: 'Cards', type: 'array', of: [simpleCard] }),
          ],
        }),
        defineArrayMember({
          name: 'tagListSection',
          title: 'Tag List Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
            defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
          ],
        }),
        defineArrayMember({
          name: 'ctaSection',
          title: 'CTA Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
            defineField({ name: 'actions', title: 'Actions', type: 'array', of: [sectionAction] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'keyBenefits',
      title: 'Key Benefits (short list)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Brief bullet points for listing cards',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits (detailed)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'addOns',
      title: 'Available Add-Ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'detail', title: 'Detail', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'pairsWith',
      title: 'Pairs Well With',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'requiresConsultation',
      title: 'Requires Consultation',
      type: 'boolean',
      initialValue: false,
    }),
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
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'image',
    },
  },
});
