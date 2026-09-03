# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Uses **pnpm** (pnpm-lock.yaml present).

- `pnpm dev` — dev server at http://localhost:4321 (host exposed; allowedHosts includes an ngrok tunnel in astro.config.mjs)
- `pnpm build` — production build to `./dist/`
- `pnpm preview` — preview production build

No lint or test tooling is configured. TypeScript uses Astro's `strict` tsconfig; type-check with `pnpm astro check` if needed.

## Architecture

Marketing site for Battle Electric (electrical services, South Florida). Astro 5 with `output: 'server'` (SSR) and the Vercel adapter — pages are server-rendered serverless functions, not static. Styling is Tailwind CSS 4 via the `@tailwindcss/vite` plugin (no tailwind.config; global styles in `src/styles/global.css`).

- `src/pages/` — file-based routes: home, `contact-us`, and `services/` (ev-charging with level-1/2/3 subpages, electrical-panel, smart-panel).
- `src/layouts/Layout.astro` — the single shared layout: SEO props (title/description/canonical/robots), Vercel Analytics + Speed Insights, Astro `ClientRouter` view transitions, and an inline Ad360 tracking pixel in `<head>`. All pages wrap in it.
- `src/sections/` — page-specific building blocks, grouped in subfolders per service page (`ev-charging/`, `electrical-panel/`, `smart-panel/`); root-level files belong to the home page.
- `src/components/` — reusable pieces (Header, Footer, Carousel, ContactForm, buttons/anchors).
- `src/actions/index.ts` — the only backend logic: an Astro Action (`contact`) handling the contact form with Zod validation (US phone normalization), a honeypot field (`phone_verify`) that fake-succeeds for bots, an optional Zapier webhook post, and two Resend emails (admin notification + user confirmation) with inline HTML templates.

`GoogleReviews.astro` contains hardcoded review data — the Google Places API integration was deliberately removed (see commit history); don't reintroduce it.

## Environment variables

- `RESEND_API_KEY` — required for contact-form emails
- `ZAPIER_WEBHOOK_URL` — optional; lead forwarding to Zapier

## Workflow

Issues are tracked in Linear (team **Battleelectric**, `BAT-*`). The flow per task:

1. Create a branch off `dev` for each Linear issue (e.g. `bat-12-fix-contact-form`).
2. PR the branch into `dev`.
3. When ready to release, merge `dev` → `main`, which **auto-deploys to production** on Vercel.

Because `dev` → `main` goes straight to prod, treat `dev` as near-production: never commit directly to `dev`, and verify changes before merging into it (`pnpm build` and `pnpm astro check` must pass; smoke-test affected pages with `pnpm dev`).
