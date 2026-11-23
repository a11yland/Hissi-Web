#!/usr/bin/env node
// One-off: builds public/og-<locale>.png (1200×630) from the feature graphics in src/assets/brand/ and
// public/apple-touch-icon.png (180×180) from the iOS icon export. Uses sharp, which Astro already depends on. Re-run when the artwork changes.
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const ART_REPO = process.env.ART_REPO ?? '../../Kobe/LiftBoy/artwork';
const locales = ['de', 'en'];
const feature = (locale) => `src/assets/brand/feature-graphic-${locale}.png`;
const icon = `${ART_REPO}/logo/png/hissi-ios-hell-1024.png`;
for (const f of locales.map(feature)) {
  if (!existsSync(f)) { console.error(`missing: ${f}`); process.exit(1); }
}

const cream = { r: 0xfb, g: 0xf3, b: 0xe4, alpha: 1 };
// 1024×500 → cover 1200×630: scaled to the full height, 45 px cropped off each side (the claim sits in the centre)
for (const locale of locales) {
  await sharp(feature(locale)).resize(1200, 630, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile(`public/og-${locale}.png`);
}
console.log('wrote public/og-de.png and public/og-en.png');
// The icon export lives outside this repository; without it the committed touch icon stays as it is.
if (existsSync(icon)) {
  await sharp(icon).resize(180, 180).flatten({ background: cream }).png().toFile('public/apple-touch-icon.png');
  console.log('wrote public/apple-touch-icon.png');
} else {
  console.warn(`skipped public/apple-touch-icon.png, missing: ${icon}`);
}
