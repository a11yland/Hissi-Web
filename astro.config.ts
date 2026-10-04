import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { abs, locales, pageFor, SITE } from './src/i18n/routes';

export default defineConfig({
  // A preview deployment (GitHub Pages) overrides both; links go through href() in src/i18n.
  site: process.env.ASTRO_SITE ?? SITE,
  base: process.env.ASTRO_BASE ?? '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'de',
    locales: [...locales],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (url) => !url.includes('/404'),
      // Slugs are translated per language, so the alternates come from the route table,
      // not from the integration's i18n option (which would emit /en/datenschutz/).
      serialize(item) {
        const key = pageFor(new URL(item.url).pathname);
        if (key) {
          item.links = [
            ...locales.map((locale) => ({ lang: locale, url: abs(key, locale) })),
            { lang: 'x-default', url: abs(key, 'de') },
          ];
        }
        return item;
      },
    }),
  ],
});
