import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercelAdapter from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.battleelectricfl.com',
  // Canonical and sitemap emit slash-less URLs; make internal routing agree
  // so a reintroduced trailing-slash link fails fast in dev (BAT-34).
  trailingSlash: 'never',
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
  adapter: vercelAdapter({ imageService: true }),
  server: {
    host: true,
    port: 4321,
    allowedHosts: ['9dfd4794cbd8.ngrok-free.app']
  }
});