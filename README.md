# The Road to Zero — Aesthetics & Wellness

A static marketing site built with **Astro** and **Sanity CMS**, designed for fast performance, easy content management, and zero-JS content pages.

---

## Architecture

```
┌─────────────────┐       build time        ┌──────────────────┐
│  Sanity Studio   │ ──── webhook ────────▶ │  Cloudflare Pages │
│  (content CMS)   │                        │  (static hosting)  │
└────────┬────────┘                        └────────┬─────────┘
         │                                          │
         ▼                                          ▼
┌─────────────────┐                        ┌──────────────────┐
│  Sanity Content  │ ◀── GROQ queries ──── │   Astro (SSG)     │
│  Lake (API/CDN)  │      at build time     │   generates HTML  │
└─────────────────┘                        └──────────────────┘
```

**How it works:**

1. Content authors edit in Sanity Studio and hit Publish
2. Sanity fires a webhook to Cloudflare Pages
3. Cloudflare triggers a build — Astro fetches all content from Sanity via GROQ queries
4. Astro generates static HTML files (23+ pages)
5. Cloudflare serves those files from edge locations worldwide

**No runtime server.** Visitors hit static HTML on Cloudflare's CDN. Sanity is only contacted at build time.

### Key Design Decisions

- **Zero JS on content pages.** Only the Header ships JavaScript (React island via `client:load`) for mobile menu and submenu interactivity. All other pages are pure static HTML.
- **IV therapy detail pages** are generated from a single `[slug].astro` dynamic route, not 14 individual files.
- **Graceful fallbacks.** Every Sanity fetch has a hardcoded fallback so the site builds even if Sanity is unreachable.

---

## What Lives Where

### Sanity CMS (dynamic, editable)

| Content Type | Schema | Description |
|---|---|---|
| **Site Settings** | `siteSettings` | Business name, phone, email, booking URL, social links, logos |
| **Navigation** | `navigation` | Full menu tree with dropdown support |
| **Service Categories** | `serviceCategory` | IV Therapy, Aesthetic Treatments, etc. (6 categories) |
| **Services** | `service` | Individual treatments with benefits, add-ons, descriptions (14 IV/injection services) |
| **Staff Members** | `staffMember` | Name, role, credentials, bio, photo |
| **Pages** | `page` | Generic pages with portable text body and SEO fields |

### Static / Hardcoded (in Astro templates)

| Content | File(s) | Notes |
|---|---|---|
| Home page sections | `src/pages/index.astro` | Hero text, product cards, value propositions, referral program |
| About page | `src/pages/about.astro` | Rachel's story, credentials, philosophy |
| Aesthetic Treatments | `src/pages/services/aesthetic-treatments.astro` | Treatments, philosophy, credentials |
| Body Transformation | `src/pages/services/body-transformation.astro` | Pillars, outcomes, program links |
| Medical Weight Management | `src/pages/services/medical-weight-management.astro` | Medications, program steps |
| Peptide & Hormone Support | `src/pages/services/peptide-hormone-support.astro` | Therapies, benefits |
| Holistic Services | `src/pages/services/holistic-services.astro` | Offerings, principles |
| IV service data (fallback) | `src/data/iv-services.ts` | Used if Sanity is unreachable |

> **Migration path:** The hardcoded service category pages can be migrated to Sanity by extending the `page` or `serviceCategory` schemas with section-based content. The IV services are already fully CMS-driven.

---

## Project Structure

```
├── public/                     # Static assets (images, fonts, icons)
│   ├── assets/
│   │   ├── fonts/
│   │   └── home/
│   └── icons/
├── sanity/                     # Sanity CMS Studio
│   ├── migrations/
│   │   └── seed.mjs            # Content seeding script
│   ├── schemas/                # Document type schemas
│   │   ├── index.ts
│   │   ├── navigation.ts
│   │   ├── page.ts
│   │   ├── service.ts
│   │   ├── serviceCategory.ts
│   │   ├── siteSettings.ts
│   │   └── staffMember.ts
│   ├── sanity.cli.ts
│   ├── sanity.config.ts
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Button.astro         # Zero-JS button component
│   │   ├── Footer.astro         # Fetches from Sanity
│   │   ├── Header.astro         # Fetches from Sanity, renders React island
│   │   ├── HeaderClient.tsx     # React island (mobile menu, submenus)
│   │   ├── Header.module.css
│   │   └── Hero.astro           # Zero-JS hero section
│   ├── data/
│   │   └── iv-services.ts       # Fallback IV service data
│   ├── layouts/
│   │   ├── BaseLayout.astro     # HTML shell, head tags, header/footer
│   │   ├── ServiceHubLayout.astro   # Shared layout for category pages
│   │   └── ServicePageLayout.astro  # Layout for IV detail pages
│   ├── lib/
│   │   └── sanity.ts            # Sanity client + GROQ queries
│   ├── pages/
│   │   ├── index.astro          # Home page
│   │   ├── about.astro          # About page
│   │   └── services/
│   │       ├── index.astro      # Services hub
│   │       ├── aesthetic-treatments.astro
│   │       ├── body-transformation.astro
│   │       ├── holistic-services.astro
│   │       ├── medical-weight-management.astro
│   │       ├── peptide-hormone-support.astro
│   │       └── iv-therapy/
│   │           ├── index.astro      # IV listing page
│   │           └── [slug].astro     # Dynamic IV detail pages (14 pages)
│   └── styles/
│       └── global.css           # Design tokens, reset, base styles
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
└── .gitignore
```

---

## Local Development

### Prerequisites

- Node.js 22+
- npm

### Setup

```bash
# Clone the repo
git clone git@github.com:kersey-consulting/theroadstozero.git
cd theroadstozero

# Install frontend dependencies
npm install

# Install Sanity Studio dependencies
cd sanity
npm install
cd ..

# Create your environment file
cp .env.example .env
# Edit .env with your Sanity project ID and dataset
```

### Running Locally

You'll typically run two terminals:

```bash
# Terminal 1 — Astro dev server (frontend)
npm run dev
# → http://localhost:4321

# Terminal 2 — Sanity Studio (content editing)
cd sanity
npx sanity dev
# → http://localhost:3333
```

**In dev mode**, Astro fetches fresh data from Sanity on every page request — no rebuild needed when content changes. Just edit in the Studio and refresh.

### Build for Production

```bash
npm run build     # Generates static HTML in dist/
npm run preview   # Preview the production build locally
```

### Seeding Content

To populate Sanity with all service data from scratch:

```bash
SANITY_TOKEN=your-editor-token node sanity/migrations/seed.mjs
```

Create a token at [manage.sanity.io](https://manage.sanity.io) → your project → API → Tokens → Add token (Editor role).

---

## Deployment

### Cloudflare Pages

1. Connect the GitHub repo in Cloudflare Pages dashboard
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables:
   - `PUBLIC_SANITY_PROJECT_ID` = your project ID
   - `PUBLIC_SANITY_DATASET` = `production`

### Sanity Studio

Deploy the Studio to Sanity's CDN:

```bash
cd sanity
npx sanity deploy
```

### Auto-Rebuild on Content Changes

Set up a Sanity webhook to trigger Cloudflare Pages builds:

1. In Cloudflare Pages → your project → Settings → Builds → Deploy hooks → Create hook
2. Copy the hook URL
3. In [manage.sanity.io](https://manage.sanity.io) → your project → API → Webhooks → Add webhook
4. Paste the Cloudflare hook URL
5. Set trigger to: **Create**, **Update**, **Delete**

Now publishing content in Sanity automatically rebuilds and deploys the site (~1-2 min).

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | [Astro](https://astro.build) | Static site generation |
| CMS | [Sanity](https://sanity.io) | Headless content management |
| Interactivity | [React](https://react.dev) | Header island only |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) | Edge-hosted static files |
| Styling | CSS Modules + Scoped CSS | Component-level styles |

---

## Common Tasks

| Task | Command | Directory |
|---|---|---|
| Start frontend dev server | `npm run dev` | repo root |
| Start Sanity Studio | `npx sanity dev` | `sanity/` |
| Build for production | `npm run build` | repo root |
| Preview production build | `npm run preview` | repo root |
| Deploy Sanity Studio | `npx sanity deploy` | `sanity/` |
| Seed content | `SANITY_TOKEN=xxx node sanity/migrations/seed.mjs` | repo root |

---

## Design Tokens

The site uses CSS custom properties defined in `src/styles/global.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#705e23` | Text, borders, accents |
| `--color-secondary` | `#d29d00` | Gold highlights, card borders |
| `--color-background` | `#fbfaf5` | Page background |
| `--color-surface` | `#faf4e3` | Card/section backgrounds |
| `--font-family-base` | System font stack | Body text |
| `snell-roundhand` | Custom font | h1, h2 headings |
