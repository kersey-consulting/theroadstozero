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

const imageShowcaseItem = {
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
  ],
};

const reviewItem = {
  type: 'object',
  fields: [
    defineField({ name: 'reviewerName', title: 'Reviewer Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'reviewerMeta', title: 'Reviewer Meta', type: 'string' }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5,
      options: {
        list: [
          { title: '1 star', value: 1 },
          { title: '2 stars', value: 2 },
          { title: '3 stars', value: 3 },
          { title: '4 stars', value: 4 },
          { title: '5 stars', value: 5 },
        ],
      },
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({ name: 'reviewText', title: 'Review Text', type: 'text', rows: 5, validation: (r) => r.required() }),
    defineField({ name: 'reviewDate', title: 'Review Date', type: 'date' }),
    defineField({ name: 'sourceLabel', title: 'Source Label', type: 'string' }),
    defineField({ name: 'sourceUrl', title: 'Source URL', type: 'url' }),
  ],
};

const withUntitled = (value?: string) => value || 'Untitled section';
const withCount = (label: string, count?: number) => `${count ?? 0} ${label}${count === 1 ? '' : 's'}`;

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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Used on category listing pages',
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
            defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
            defineField({ name: 'image', title: 'Foreground Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imageShadow', title: 'Image Shadow', type: 'boolean', initialValue: true }),
            defineField({
              name: 'imageMaxWidth',
              title: 'Image Max Width',
              type: 'string',
              description: 'Optional CSS width value like 380px, 520px, min(100%, 380px), or 100%.',
            }),
            defineField({
              name: 'imagePosition', title: 'Image Position', type: 'string', initialValue: 'right',
              options: { list: [{ title: 'Right', value: 'right' }, { title: 'Left', value: 'left' }], layout: 'radio' },
            }),
            defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'actions', title: 'Actions', type: 'array', of: [sectionAction] }),
          ],
          preview: {
            select: { title: 'title', eyebrow: 'eyebrow' },
            prepare: ({ title, eyebrow }) => ({ title: 'Hero Section', subtitle: withUntitled(title || eyebrow) }),
          },
        }),
        defineArrayMember({
          name: 'richTextSection',
          title: 'Rich Text Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
          ],
          preview: {
            select: { title: 'title' },
            prepare: ({ title }) => ({ title: 'Rich Text Section', subtitle: withUntitled(title) }),
          },
        }),
        defineArrayMember({
          name: 'cardsSection',
          title: 'Cards Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
            defineField({
              name: 'maxCardsPerRow',
              title: 'Max Cards Per Row',
              type: 'number',
              initialValue: 4,
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                ],
                layout: 'radio',
              },
              validation: (r) => r.min(1).max(4),
            }),
            defineField({ name: 'cards', title: 'Cards', type: 'array', of: [simpleCard] }),
          ],
          preview: {
            select: { title: 'title', cards: 'cards' },
            prepare: ({ title, cards }) => ({ title: 'Cards Section', subtitle: title || withCount('card', cards?.length) }),
          },
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
          preview: {
            select: { title: 'title', tags: 'tags' },
            prepare: ({ title, tags }) => ({ title: 'Tag List Section', subtitle: title || withCount('tag', tags?.length) }),
          },
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
          preview: {
            select: { title: 'title', actions: 'actions' },
            prepare: ({ title, actions }) => ({ title: 'CTA Section', subtitle: title || withCount('action', actions?.length) }),
          },
        }),
        defineArrayMember({
          name: 'imageShowcaseSection',
          title: 'Image Showcase Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Section Title', type: 'string' }),
            defineField({ name: 'intro', title: 'Section Intro', type: 'array', of: [{ type: 'block' }] }),
            defineField({
              name: 'items',
              title: 'Images',
              type: 'array',
              of: [imageShowcaseItem],
              validation: (r) => r.min(1).max(2).required(),
            }),
          ],
          preview: {
            select: { title: 'title', items: 'items' },
            prepare: ({ title, items }) => ({ title: 'Image Showcase Section', subtitle: title || withCount('image', items?.length) }),
          },
        }),
        defineArrayMember({
          name: 'reviewsSection',
          title: 'Reviews Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
            defineField({
              name: 'maxReviewsPerRow',
              title: 'Max Reviews Per Row',
              type: 'number',
              initialValue: 3,
              options: {
                list: [
                  { title: '1', value: 1 },
                  { title: '2', value: 2 },
                  { title: '3', value: 3 },
                  { title: '4', value: 4 },
                ],
                layout: 'radio',
              },
              validation: (r) => r.min(1).max(4),
            }),
            defineField({ name: 'reviews', title: 'Reviews', type: 'array', of: [reviewItem], validation: (r) => r.min(1) }),
            defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
            defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', reviews: 'reviews' },
            prepare: ({ title, reviews }) => ({ title: 'Reviews Section', subtitle: title || withCount('review', reviews?.length) }),
          },
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
      name: 'keyBenefits',
      title: 'Key Benefits (short list)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Brief bullet points for listing cards',
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
