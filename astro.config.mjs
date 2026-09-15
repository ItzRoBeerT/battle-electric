import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercelAdapter from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.battleelectricfl.com',
  // Canonical and sitemap emit slash-less URLs; make internal routing agree
  // so a reintroduced trailing-slash link fails fast in dev (BAT-34).
  trailingSlash: 'never',
  // Astro 7 defaults to 'jsx' whitespace stripping, which can join inline
  // elements that relied on natural whitespace. Keep the v5/v6 semantics so
  // the rendered HTML stays byte-stable (BAT-35).
  compressHTML: true,
  // Fully static: every page is prerendered at build time and served from the
  // CDN — no serverless function in the request path (BAT-28).
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Deploy date, stamped at build time. Used as <lastmod> in the sitemap:
      // honest freshness signal that updates on every deploy.
      __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10))
    }
  },
  // staticHeaders lets Astro-feature headers (e.g. the CSP planned in
  // BAT-40) reach Vercel's config for prerendered pages. Cache-Control for
  // HTML lives in vercel.json (BAT-38) — the adapter option does not cover
  // custom cache headers.
  adapter: vercelAdapter({ imageService: true, staticHeaders: true }),
  // Inter is self-hosted via the Fonts API (BAT-37): downloaded at build,
  // served from our own domain with automatic preload + metric fallbacks.
  // Weights audited from actual usage; italics dropped (single decorative
  // use, browser synthesis covers it).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700, 900],
      styles: ['normal'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif']
    }
  ],
  // Visible links are prefetched when they enter the viewport, so MPA
  // navigations feel instant (BAT-36).
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true
  },
  server: {
    host: true,
    port: 4321
  }
});