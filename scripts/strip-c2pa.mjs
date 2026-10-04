#!/usr/bin/env node
// Removes the C2PA <metadata> block (~8 KB) from an SVG. Usage: node strip-c2pa.mjs in.svg out.svg
import { readFileSync, writeFileSync } from 'node:fs';
const [input, output = input] = process.argv.slice(2);
if (!input) { console.error('usage: strip-c2pa.mjs <in.svg> [out.svg]'); process.exit(1); }
const svg = readFileSync(input, 'utf8')
  .replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
  .replace(/\s+xmlns:c2pa="[^"]*"/g, '');
writeFileSync(output, svg);
