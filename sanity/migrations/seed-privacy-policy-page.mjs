/**
 * Seed the Privacy Policy page into the flexible page.sections[] model.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dm3m4n0d',
  dataset: 'production',
  apiVersion: '2026-03-31',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const block = (text, key, style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
});

async function main() {
  await client.createOrReplace({
    _id: 'page-privacy-policy',
    _type: 'page',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy-policy' },
    seo: {
      title: 'Privacy Policy — The Road to Zero',
      description: 'Learn how The Road to Zero collects, uses, and protects personal information on this website.',
    },
    sections: [
      {
        _key: 'hero',
        _type: 'heroSection',
        eyebrow: 'Legal',
        title: 'Privacy Policy',
        text: 'This Privacy Policy explains how The Road to Zero collects, uses, and protects information submitted through this website.',
      },
      {
        _key: 'legal-content',
        _type: 'legalSection',
        title: 'Your Privacy Matters',
        content: [
          block('Effective Date: April 11, 2026', 'pp-1'),
          block('The Road to Zero respects your privacy and is committed to protecting the personal information you share with us through this website.', 'pp-2'),
          block('Information We Collect', 'pp-3', 'h3'),
          block('We may collect personal information you voluntarily provide, such as your name, phone number, email address, and any details you submit through contact forms, booking requests, or other website inquiries.', 'pp-4'),
          block('We may also collect limited technical information automatically, such as browser type, device type, IP address, and pages visited, in order to improve website performance and user experience.', 'pp-5'),
          block('How We Use Information', 'pp-6', 'h3'),
          block('We use the information collected to respond to inquiries, provide requested services, coordinate bookings, improve our website, and communicate important service-related updates.', 'pp-7'),
          block('We do not sell or rent your personal information to third parties.', 'pp-8'),
          block('Third-Party Services', 'pp-9', 'h3'),
          block('This website may use trusted third-party services for scheduling, hosting, analytics, form handling, or embedded content. Those providers may process information according to their own privacy policies.', 'pp-10'),
          block('If you choose to book services through an external booking platform, information you provide there will also be governed by that platform’s privacy practices.', 'pp-11'),
          block('Cookies and Analytics', 'pp-12', 'h3'),
          block('Our website may use cookies or similar technologies to understand traffic patterns, improve site functionality, and enhance your browsing experience. You can adjust your browser settings to limit or disable cookies.', 'pp-13'),
          block('Data Security', 'pp-14', 'h3'),
          block('We take reasonable administrative, technical, and organizational measures to protect the information submitted through this website. However, no method of transmission over the internet or electronic storage is completely secure.', 'pp-15'),
          block('Your Choices', 'pp-16', 'h3'),
          block('You may contact us at any time to request updates or corrections to the personal information you have submitted through this website.', 'pp-17'),
          block('Medical and Health Information', 'pp-18', 'h3'),
          block('Please do not submit sensitive medical or health information through general website contact forms unless specifically requested through a secure process. If you become a client, any clinical or treatment-related information will be handled separately in accordance with applicable professional and legal obligations.', 'pp-19'),
          block('Policy Updates', 'pp-20', 'h3'),
          block('We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.', 'pp-21'),
          block('Contact', 'pp-22', 'h3'),
          block('If you have questions about this Privacy Policy, please contact The Road to Zero through the website contact information or booking channels provided on the site.', 'pp-23'),
        ],
      },
      {
        _key: 'cta',
        _type: 'ctaSection',
        title: 'Questions About This Policy?',
        text: 'If you would like clarification about how website information is handled, reach out and we’ll point you in the right direction.',
        actions: [
          { _key: 'contact', label: 'Contact Us', href: '/contact' },
          { _key: 'services', label: 'View Services', href: '/services' },
        ],
      },
    ],
  });

  console.log('✓ page-privacy-policy');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
