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
  // ── CSP PHASE 2 (BAT-40) ─────────────────────────────────────────────
  // Phase 1 ships the SAME policy as Content-Security-Policy-Report-Only
  // via vercel.json (union of all per-route hashes). After ~1 week of
  // clean reports in production:
  //   1. uncomment this block (staticHeaders:true already forwards it as
  //      per-route enforcing headers),
  //   2. remove the Report-Only entry from vercel.json.
  // If any inline script changes, regenerate its hash from the built HTML.
  //   security: {
  //     csp: {
  //       scriptDirective: {
  //         // No strict-dynamic: it makes browsers ignore 'self'/host sources,
  //         // which would block our own static module scripts. The host
  //         // allowlist covers what the trackers inject dynamically.
  //         resources: [
  //           "'self'",
  //           'https://www.googletagmanager.com',
  //           'https://connect.facebook.net',
  //           'https://cdn.ad360.media',
  //           'https://online-booking.housecallpro.com',
  //           'https://va.vercel-scripts.com'
  //         ],
  //         // Astro hashes the scripts it generates, but not is:inline ones.
  //         // These are the four tracker snippets in Layout.astro (GTM, Meta
  //         // Pixel, SPA bridge, Ad360) — REGENERATE if any of them changes:
  //         // hash the exact inner text of the <script> from the built HTML.
  //         hashes: [
  //           'sha256-V86N9YA+Tmu+4Vq5T1jF8AUlmTPfFyEKPj1Y5qHBtKA=',
  //           'sha256-5bZjipOcHJRbs8a2jq8t65SQe6oclvKZEGaV49GkH0o=',
  //           'sha256-485lgz23hc0JU6MyDvIE4QSa6v3vFhhhWjMh5hNzNew=',
  //           'sha256-AN0nehn/z1vExzKKGP/X2xeWT6BiAYiNoeCqdSsxT40=',
  //           // contact-us: HCP iframe origin listener; thank-you: lead event
  //           'sha256-WD74pqCTIGKnNT3xqKykD0gQ+KrCsiAWukDnVjZ3hVs=',
  //           'sha256-TVXxxXLvq7pggito6Fr5n/zUHz0IYIuqKNPpiFKXI0c='
  //         ]
  //       },
  //       styleDirective: {
  //         resources: [
  //           "'self'",
  //           // style="" attributes (GTM/Meta noscript, a few components) —
  //           // scoped to style-src-attr only; element styles stay hash-based.
  //           { resource: "'unsafe-inline'", kind: 'attribute' }
  //         ]
  //       },
  //       directives: [
  //         "default-src 'self'",
  //         "img-src 'self' data: https://www.facebook.com https://www.googletagmanager.com",
  //         "connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://www.facebook.com https://stats.g.doubleclick.net https://*.ad360.media",
  //         'frame-src https://book.housecallpro.com https://www.googletagmanager.com',
  //         "font-src 'self'",
  //         "base-uri 'self'",
  //         "form-action 'self' https://book.housecallpro.com"
  //       ]
  //     }
  //   },
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