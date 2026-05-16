import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: 'static',
  site: 'https://parachutefestival.de',

  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],

  adapter: cloudflare()
});