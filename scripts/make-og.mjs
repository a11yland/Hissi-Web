#!/usr/bin/env node
// One-off: builds public/og.png (1200×630) from the Play feature graphic and public/apple-touch-icon.png (180×180)
// from the iOS icon export. Uses sharp, which Astro already depends on. Re-run when the artwork changes.
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const ANDROID_REPO = process.env.ANDROID_REPO ?? '../Hissi-Android';
const ART_REPO = process.env.ART_REPO ?? '../../Kobe/LiftBoy/artwork';
const feature = `${ANDROID_REPO}/play/feature-graphic.png`;
const icon = `${ART_REPO}/logo/png/hissi-ios-hell-1024.png`;
for (const f of [feature, icon]) {
  if (!existsSync(f)) { console.error(`missing: ${f}`); process.exit(1); }
}

const cream = { r: 0xfb, g: 0xf3, b: 0xe4, alpha: 1 };
// 1024×500 → scale to 1200 wide (586 high), pad to 630 on cream
const scaled = await sharp(feature).resize({ width: 1200 }).toBuffer();
const { height = 0 } = await sharp(scaled).metadata();
const pad = Math.max(0, 630 - height);
await sharp(scaled)
  .extend({ top: Math.floor(pad / 2), bottom: Math.ceil(pad / 2), left: 0, right: 0, background: cream })
  .png({ compressionLevel: 9 })
  .toFile('public/og.png');
await sharp(icon).resize(180, 180).flatten({ background: cream }).png().toFile('public/apple-touch-icon.png');
console.log('wrote public/og.png and public/apple-touch-icon.png');
