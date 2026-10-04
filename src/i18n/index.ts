import de, { type Strings } from './de';
import en from './en';
import { defaultLocale, isLocale, type Locale } from './routes';

const dictionaries: Record<Locale, Strings> = { de, en };

/** Resolves the locale of the current page; anything unknown (or undefined) is the default. */
export function localeOf(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Strings for a page: `const s = t(Astro.currentLocale)`. */
export function t(value: string | undefined): Strings {
  return dictionaries[localeOf(value)];
}

export { de, en };
export type { Strings };
export * from './routes';

/** Prefixes a site-absolute path with the configured base (only differs from '/' on a preview deployment). */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base ? `${base}${path}` : path;
}
