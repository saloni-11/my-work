// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// `site` is the live address. It's used for canonical links and the sitemap.
// If you ever change domain, also update the Sitemap line in public/robots.txt.
export default defineConfig({
  site: 'https://salonisamant.com',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
