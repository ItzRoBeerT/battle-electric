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
    allowedHosts: ['69d8b959a668.ngrok-free.app']
  }
});