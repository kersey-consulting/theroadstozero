# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All run from the repo root unless noted.

| Command | Purpose |
|---|---|
| `npm run dev` | Astro dev server → http://localhost:4321 (fetches live from Sanity each request) |
| `npm run build` | Production build via the Cloudflare adapter |
| `npm run preview` | Preview the built output locally |
| `cd sanity && npx sanity dev` | Sanity Studio → http://localhost:3333 |
| `cd sanity && npx sanity deploy` | Deploy the Studio to Sanity's CDN |
| `SANITY_TOKEN=<editor-token> node sanity/migrations/<file>.mjs` | Run a content migration/seed script |

There is no test suite or linter configured. The frontend (`/`) and the Studio (`/sanity`) are **separate npm projects** — install dependencies in each.

## Architecture

Astro 5 site for a wellness/aesthetics business, content-managed by Sanity, deployed to **Cloudflare** as a **server (SSR) app** (`output: 'server'` + `@astrojs/cloudflare` adapter in `astro.config.mjs`). Note: the `README.md` still describes an older static/SSG architecture — trust the code and this file over it.

### Content flow
All page content lives in Sanity and is fetched via GROQ at request/build time. Pages are **section-driven**: a Sanity `page` / `serviceCategory` / `service` document holds a `sections[]` array, and `src/components/sections/PageSections.astro` dispatches each section by its `_type` to a matching component in `src/components/sections/`. **To add a new section type you must touch three places:** the Sanity schema (`sanity/schemas/`), a new `*Section.astro` component, and the dispatch chain in `PageSections.astro`. Sections alternate `default`/`alt` visual variants automatically based on their index.

`src/lib/sanity.ts` is the single source of GROQ queries (the `queries` object) and the Sanity client factory. The GROQ projections resolve image assets to URLs (`"image": image.asset->url`) and dereference relations, so templates receive flat, ready-to-render data.

### Routing
- Hardcoded `.astro` files in `src/pages/` for top-level pages (home, about, contact, faq, etc.).
- Dynamic service routes use `getStaticPaths` to enumerate Sanity documents:
  - `services/iv-therapy/[slug].astro` — IV therapy detail pages
  - `services/[slug].astro` — non-IV service **category** pages
  - `services/[category]/[slug].astro` — non-IV individual service pages
- IV therapy is special-cased throughout (queries filter `category->slug.current == "iv-therapy"` or `!= "iv-therapy"`).

### Runtime environment access (important Cloudflare pattern)
Secrets are **not** in `import.meta.env` at runtime on Cloudflare — they arrive via `Astro.locals.runtime.env`. Code must read both: pass the runtime env into helpers and fall back to `import.meta.env`. Follow the existing patterns:
- `getSanityClient(Astro.locals.runtime?.env)` in pages/components.
- The `getEnv(localsEnv, key)` helper in `src/pages/api/contact.ts`.

`PUBLIC_SANITY_PROJECT_ID` (`dm3m4n0d`) and `PUBLIC_SANITY_DATASET` (`production`) are the only `.env` vars; both have hardcoded fallbacks. Sanity fetches are wrapped in `.catch(() => null/[])` so a build never fails on a Sanity outage.

### Preview / draft mode
When `SANITY_PREVIEW_ENABLED === 'true'`, `getSanityClient` returns a client using `perspective: 'drafts'` with `SANITY_PREVIEW_TOKEN` and `useCdn: false`, so unpublished content renders. Otherwise it uses the published, CDN-cached client.

### Basic-auth gate
`src/middleware.ts` protects the **entire site** with HTTP Basic Auth, but only when both `BASIC_AUTH_USER` and `BASIC_AUTH_PASS` runtime env vars are set (used for preview deploys). With them unset, the site is public.

### Contact form
`src/pages/api/contact.ts` (`POST`) handles `ContactForm.astro` submissions, sends mail via the **ZeptoMail** API, includes a `company` honeypot field, escapes HTML, and redirects back to `/contact?contact=success|error`. Requires `CONTACT_MAIL_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` runtime env vars.

### Interactivity
The site is near-zero-JS. The only React island is `HeaderClient.tsx` (mobile menu / dropdowns), mounted from `Header.astro`. `BaseLayout.astro` is the HTML shell and renders Header + Footer, both of which fetch from Sanity (`siteSettings`, `navigation`).

### Styling
Global design tokens and base styles in `src/styles/global.css` (CSS custom properties like `--color-primary`, `--color-secondary`; `snell-roundhand` custom font for headings). Components use scoped Astro `<style>` or CSS Modules (e.g. `Header.module.css`).

## Sanity schemas

Document types in `sanity/schemas/`: `siteSettings` (singleton: business info, logos, social, booking URL), `navigation` (menu tree), `page` (generic section-driven pages, keyed by `slug.current` e.g. `"home"`), `serviceCategory`, `service`, `staffMember`. The `apiVersion` is pinned to `2026-03-31` in `src/lib/sanity.ts`. The `sanity/migrations/` directory holds one-off `.mjs` scripts for seeding and schema migrations — run them with a `SANITY_TOKEN`.
