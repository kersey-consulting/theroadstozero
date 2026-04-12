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
  name: 'page',
  title: 'Page',
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
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
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
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              initialValue: 'right',
              options: {
                list: [
                  { title: 'Right', value: 'right' },
                  { title: 'Left', value: 'left' },
                ],
                layout: 'radio',
              },
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
          name: 'featuredServiceCategoriesSection',
          title: 'Featured Service Categories Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
            defineField({
              name: 'categories',
              title: 'Featured Categories',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'serviceCategory' }] }],
              validation: (r) => r.min(1),
            }),
          ],
        }),
        defineArrayMember({
          name: 'staffSection',
          title: 'Staff Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
            defineField({
              name: 'staffMembers',
              title: 'Staff Members',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'staffMember' }] }],
            }),
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
          name: 'splitContentSection',
          title: 'Split Content Section',
          type: 'object',
          fields: [
            defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              initialValue: 'right',
              options: {
                list: [
                  { title: 'Right', value: 'right' },
                  { title: 'Left', value: 'left' },
                ],
                layout: 'radio',
              },
            }),
            defineField({ name: 'actions', title: 'Actions', type: 'array', of: [sectionAction] }),
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
        defineArrayMember({
          name: 'contactSection',
          title: 'Contact Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 }),
            defineField({ name: 'phone', title: 'Phone', type: 'string' }),
            defineField({ name: 'email', title: 'Email', type: 'string' }),
            defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
            defineField({ name: 'hours', title: 'Hours', type: 'text', rows: 3 }),
          ],
        }),
        defineArrayMember({
          name: 'legalSection',
          title: 'Legal Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'SEO Title', type: 'string' }),
        defineField({ name: 'description', title: 'SEO Description', type: 'text', rows: 3 }),
        defineField({ name: 'image', title: 'OG Image', type: 'image' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
});
