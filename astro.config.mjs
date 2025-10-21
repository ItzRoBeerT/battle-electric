import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vercelAdapter from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercelAdapter(),
  server: {
    host: true,
    port: 4321,
    allowedHosts: ['9dfd4794cbd8.ngrok-free.app']
  }
});