import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [react()],
  adapter: cloudflare(),
  output: 'server',
  site: 'https://theroadstozero.com',
  // Handled here rather than in public/_redirects: _routes.json routes /* to the
  // SSR worker, so Cloudflare's static-asset redirect layer never sees these
  // paths. Astro resolves them inside the worker, which does run.
  redirects: {
    // Slug was renamed in Sanity to drop the capital C. Without this the old URL
    // is a soft 404 — it returns 200 with an empty "Service" stub page.
    '/services/holistic-services/Cupping': {
      status: 301,
      destination: '/services/holistic-services/cupping',
    },
    '/services/aesthetic-treatments/chemical-peel-coming-soon': {
      status: 301,
      destination: '/services/aesthetic-treatments/chemical-peel',
    },
    '/services/aesthetic-treatments/dermaneedling-coming-soon': {
      status: 301,
      destination: '/services/aesthetic-treatments/dermaneedling',
    },
    '/services/aesthetic-treatments/dermaplaning-coming-soon': {
      status: 301,
      destination: '/services/aesthetic-treatments/dermaplaning',
    },
    '/services/aesthetic-treatments/microdermabrasion-coming-soon': {
      status: 301,
      destination: '/services/aesthetic-treatments/microdermabrasion',
    },
    '/services/aesthetic-treatments/facial-prp-treatment-coming-soon': {
      status: 301,
      destination: '/services/aesthetic-treatments/facial-prp-treatment',
    },
    '/services/aesthetic-treatments/facial-pdo-thread-lift-coming-soon': {
      status: 301,
      destination: '/services/aesthetic-treatments/facial-pdo-thread-lift',
    },
    '/services/aesthetic-treatments/prp-hair-restoration-coming-soon': {
      status: 301,
      destination: '/services/aesthetic-treatments/prp-hair-restoration',
    },
    '/services/iv-therapy/l-cartnitine-iv-infusion-and-im-injection': {
      status: 301,
      destination: '/services/iv-therapy/l-carnitine-iv-infusion-and-im-injection',
    },
  },
});
