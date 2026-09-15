# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Uses **pnpm** (pnpm-lock.yaml present).

- `pnpm dev` — dev server at http://localhost:4321 (host exposed; allowedHosts includes an ngrok tunnel in astro.config.mjs)
- `pnpm build` — production build to `./dist/`
- `pnpm preview` — preview production build

No lint or test tooling is configured. TypeScript uses Astro's `strict` tsconfig; type-check with `pnpm astro check` if needed.

## Architecture

Marketing site for Battle Electric (electrical services, South Florida). Astro 5 with `output: 'static'` and the Vercel adapter (`imageService: true`) — every page is prerendered at build time and served from the CDN; there is no serverless function. Image resizing is handled by Vercel's image CDN (`/_vercel/image`). Styling is Tailwind CSS 4 via the `@tailwindcss/vite` plugin (no tailwind.config; global styles in `src/styles/global.css`).

- `src/pages/` — file-based routes: home, `about-us`, `contact-us`, `license`, `privacy`, `terms`, `service-areas/` (hub + per-city pages), and `services/` (ev-charging with level-1/2/3 subpages, electrical-panel, smart-panel).
- `src/layouts/Layout.astro` — the single shared layout: SEO props (title/description/canonical/robots), Vercel Analytics + Speed Insights, Astro `ClientRouter` view transitions, and an inline Ad360 tracking pixel in `<head>`. All pages wrap in it.
- `src/sections/` — page-specific building blocks, grouped in subfolders per service page (`ev-charging/`, `electrical-panel/`, `smart-panel/`); root-level files belong to the home page.
- `src/components/` — reusable pieces (Header, Footer, Carousel, ContactForm, buttons/anchors).
- `src/data/` — canonical business data: `business.ts` exports `BUSINESS_ID` (schema.org entity `@id`), `LICENSE_NUMBER`, and `LICENSE_LABEL` — the single source of truth for the Florida license (never hardcode `EC…` numbers in pages or copy); `service-areas.ts` (city page content), `reviews.ts` (hardcoded review data).

There is no backend form logic: the contact form is an embedded Housecall Pro widget (`src/components/ContactForm.astro`) — leads go straight to Housecall Pro. A previous in-house Astro Action + Resend email flow was deliberately removed (BAT-27); don't reintroduce it.

`GoogleReviews.astro` contains hardcoded review data — the Google Places API integration was deliberately removed (see commit history); don't reintroduce it.

`public/llms.txt` is a static file and repeats the license number literally — if the license ever changes, update it by hand along with `src/data/business.ts`.

## Environment variables

None required.

## Workflow

Issues are tracked in Linear (team **Battleelectric**, `BAT-*`). The flow per task:

1. Create a branch off `dev` for each Linear issue (e.g. `bat-12-fix-contact-form`).
2. PR the branch into `dev`.
3. When ready to release, merge `dev` → `main`, which **auto-deploys to production** on Vercel.

Because `dev` → `main` goes straight to prod, treat `dev` as near-production: never commit directly to `dev`, and verify changes before merging into it (`pnpm build` and `pnpm astro check` must pass; smoke-test affected pages with `pnpm dev`).
