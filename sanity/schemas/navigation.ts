import { defineType, defineField } from 'sanity';

const navItem = {
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL Path',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'children',
      title: 'Dropdown Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL Path',
              type: 'string',
              validation: (r) => r.required(),
            }),
          ],
        },
      ],
    }),
  ],
};

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [navItem],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Main Navigation' }),
  },
});
