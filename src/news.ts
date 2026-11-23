/** The changelog: one `news` collection entry per release and language, newest first. */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export type NewsEntry = CollectionEntry<'news'>;

export async function newsFor(locale: Locale): Promise<NewsEntry[]> {
  const entries = await getCollection('news', ({ data }) => data.locale === locale);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || b.id.localeCompare(a.id));
}

/** Fragment id of an entry on the news page; the file name is shared by both languages. */
export const anchorOf = (entry: NewsEntry): string => `v${entry.id.split('/').pop()}`;

/** Frontmatter dates are parsed as UTC midnight, so they are formatted in UTC too. */
export const formatDate = (date: Date, locale: Locale): string =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date);

export const isoDate = (date: Date): string => date.toISOString().slice(0, 10);
