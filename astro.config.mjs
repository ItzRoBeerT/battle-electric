import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercelAdapter from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.battleelectricfl.com',
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Deploy date, stamped at build time. Used as <lastmod> in the sitemap:
      // honest freshness signal that updates on every deploy.
      __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10))
    }
  },
  adapter: vercelAdapter(),
  server: {
    host: true,
    port: 4321,
    allowedHosts: ['9dfd4794cbd8.ngrok-free.app']
  }
});