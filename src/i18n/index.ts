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
