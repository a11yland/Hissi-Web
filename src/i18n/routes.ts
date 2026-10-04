/** Route table: the single source for internal links, the language switch, hreflang and the sitemap. */
export const SITE = 'https://hissi.app';

export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export type PageKey = 'home' | 'support' | 'privacy' | 'legal';

/** Slugs are translated, so Astro's locale helpers (which assume a shared slug) are not used. */
export const paths: Record<PageKey, Record<Locale, string>> = {
  home: { de: '/', en: '/en/' },
  support: { de: '/support/', en: '/en/support/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
  legal: { de: '/impressum/', en: '/en/legal-notice/' },
};

export const isLocale = (value: unknown): value is Locale => locales.includes(value as Locale);
export const other = (locale: Locale): Locale => (locale === 'de' ? 'en' : 'de');
export const abs = (key: PageKey, locale: Locale): string => new URL(paths[key][locale], SITE).href;

/** Finds the page a pathname belongs to (trailing-slash form), if any. */
export function pageFor(pathname: string): PageKey | undefined {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return (Object.keys(paths) as PageKey[]).find((key) =>
    locales.some((locale) => paths[key][locale] === normalized),
  );
}
