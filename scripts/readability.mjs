#!/usr/bin/env node
/**
 * Readability check for WCAG 3.1.5 (Reading Level, AAA) over the built pages in dist/.
 *
 * Measures every page except the bilingual 404 after removing proper names and titles (the
 * criterion asks for that), using the usual formulas per language:
 *   en  Flesch-Kincaid grade level (0.39 ASL + 11.8 ASW - 15.59)
 *   de  Wiener Sachtextformel 1 (school grade) and Flesch-Amstad reading ease (180 - ASL - 58.5 ASW)
 * The criterion's bar is "lower secondary education" (ISCED 2), i.e. a grade level up to 9.
 *
 * Syllables are estimated heuristically, so treat the numbers as indicative, not exact.
 *
 *   npm run build && node scripts/readability.mjs
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url);
const LIMIT = 9;

/** Proper names and titles, removed before measuring (WCAG 3.1.5). */
const NAMES = [
  'Hissi-Web', 'Hissi', 'Berlin', 'Brandenburg', 'Alexanderplatz', 'Hauptbahnhof', 'Ostkreuz', 'Warschauer Straße', 'Ringbahn',
  'Apple Watch', 'Apple Karten', 'Apple Maps', 'Apple', 'iPhone', 'iOS', 'iCloud', 'Siri', 'TestFlight', 'App Store',
  'Android', 'Google Play', 'Google Maps SDK', 'Google', 'GitHub', 'accessibility.cloud', 'transit.accessibility.cloud',
  'Sozialhelden e.V.', 'Sozialhelden', 'bunny.net', 'BunnyWay d.o.o.', 'Slowenien', 'Slovenia', 'a11yland', 'Ingo Stöcker',
  'Blankenburger Straße', 'Deutschland', 'Germany', 'Kobe24LAL@gmx.de', 'U2', 'ISO', 'EN',
];

const decode = (s) =>
  s.replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ' })[e]);

/** Visible text of a page; block ends become sentence ends so headings and list items count as sentences. */
function textOf(html) {
  return decode(
    html
      .replace(/<(script|style|svg|template)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+class="[^"]*\bsr\b[^"]*"[^>]*>[\s\S]*?<\/[a-z]+>/gi, ' ')
      .replace(/<\/(p|li|h[1-6]|figcaption|small|dd|dt|td|th|time)>|<br\s*\/?>/gi, '. ')
      .replace(/<[^>]+>/g, ' '),
  );
}

function stripNames(text) {
  for (const name of NAMES) text = text.split(name).join(' ');
  return text;
}

const syllablesEN = (w) => {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  return Math.max(1, (w.match(/[aeiouy]{1,2}/g) ?? []).length);
};
const syllablesDE = (w) => Math.max(1, (w.toLowerCase().match(/[aeiouyäöü]+/g) ?? []).length);

function measure(text, lang) {
  const sentences = text
    .split(/(?<=[.!?…:])\s+|\n+/)
    .map((s) => s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim())
    .filter((s) => /\p{L}{2,}/u.test(s));
  const words = sentences.flatMap((s) => s.split(/\s+/).filter((w) => /\p{L}/u.test(w)));
  const syl = words.map(lang === 'de' ? syllablesDE : syllablesEN);
  const n = words.length;
  const asl = n / sentences.length;
  const asw = syl.reduce((a, b) => a + b, 0) / n;
  if (lang === 'en') {
    const grade = 0.39 * asl + 11.8 * asw - 15.59;
    const ease = 206.835 - 1.015 * asl - 84.6 * asw;
    return { sentences: sentences.length, words: n, asl, asw, grade, ease, formula: 'Flesch-Kincaid' };
  }
  const ms = (100 * syl.filter((s) => s >= 3).length) / n;
  const iw = (100 * words.filter((w) => w.length > 6).length) / n;
  const es = (100 * syl.filter((s) => s === 1).length) / n;
  const grade = 0.1935 * ms + 0.1672 * asl + 0.1297 * iw - 0.0327 * es - 0.875;
  const ease = 180 - asl - 58.5 * asw;
  return { sentences: sentences.length, words: n, asl, asw, grade, ease, formula: 'Wiener Sachtextformel 1' };
}

async function* pages(dir, prefix = '/') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith('_')) yield* pages(join(dir, entry.name), `${prefix}${entry.name}/`);
    else if (entry.name === 'index.html') yield [prefix, join(dir, entry.name)];
  }
}

const rows = [];
let failed = false;
for await (const [path, file] of pages(DIST.pathname)) {
  const html = await readFile(file, 'utf8');
  const lang = /<html[^>]*\blang="en"/.test(html) ? 'en' : 'de';
  const m = measure(stripNames(textOf(html)), lang);
  const ok = m.grade <= LIMIT;
  failed ||= !ok;
  rows.push({ page: path, lang, sentences: m.sentences, words: m.words, 'words/sentence': m.asl.toFixed(1), 'syll/word': m.asw.toFixed(2), grade: m.grade.toFixed(1), ease: m.ease.toFixed(0), [`≤ ${LIMIT}`]: ok ? 'yes' : 'NO' });
}
console.table(rows);
console.log(`grade: en = Flesch-Kincaid, de = Wiener Sachtextformel 1; ease: en = Flesch, de = Flesch-Amstad (higher is easier)`);
process.exitCode = failed ? 1 : 0;
