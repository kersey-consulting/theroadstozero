import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'goldLogo',
      title: 'Gold Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Hydreight booking widget URL',
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      description:
        'The studio address. Used for the LocalBusiness structured data Google reads for local search and Maps — keep it identical to the Google Business Profile listing.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'streetAddress',
          title: 'Street Address',
          type: 'string',
          description: 'Street, suite and studio number on one line, e.g. "1893 E. Skyline Dr, Suite 104, Studio #4"',
        }),
        defineField({ name: 'addressLocality', title: 'City', type: 'string' }),
        defineField({ name: 'addressRegion', title: 'State', type: 'string', description: 'Two-letter code, e.g. "UT"' }),
        defineField({ name: 'postalCode', title: 'ZIP Code', type: 'string' }),
        defineField({
          name: 'addressCountry',
          title: 'Country',
          type: 'string',
          description: 'Two-letter code, e.g. "US"',
          initialValue: 'US',
        }),
      ],
    }),
    defineField({
      name: 'geo',
      title: 'Map Coordinates',
      description:
        'Latitude/longitude of the studio. Optional, but helps Google place the business accurately in Maps and "near me" results.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'latitude', title: 'Latitude', type: 'number' }),
        defineField({ name: 'longitude', title: 'Longitude', type: 'number' }),
      ],
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps Link',
      type: 'url',
      description: 'Link to the business on Google Maps.',
    }),
    defineField({
      name: 'hoursDescription',
      title: 'Hours',
      type: 'string',
      description: 'Plain-language opening hours, e.g. "By Appointment Only".',
    }),
    defineField({
      name: 'areaServed',
      title: 'Areas Served',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Places the concierge/mobile service covers, e.g. "Utah", "Ogden", "Salt Lake City". Listed in structured data so search engines understand the service radius.',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      description: 'Google\'s relative price indicator — one to four dollar signs, e.g. "$$".',
      validation: (r) => r.regex(/^\${1,4}$/, { name: 'one to four dollar signs' }).warning(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'homeServiceCategories',
      title: 'Homepage Service Categories',
      description: 'Select and order the service categories shown on the homepage cards.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'serviceCategory' }] }],
    }),
  ],
  preview: {
    select: { title: 'businessName' },
  },
});
