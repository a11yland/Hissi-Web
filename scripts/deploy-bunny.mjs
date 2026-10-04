#!/usr/bin/env node
/**
 * Deploys dist/ to a bunny.net Storage Zone and purges the Pull Zone.
 *
 * Steps: hash dist/, list the zone, upload what changed (assets first, HTML last), delete what is gone,
 * purge. No dependencies beyond Node 22 (fetch, crypto, fs).
 *
 * Env: BUNNY_STORAGE_ZONE, BUNNY_STORAGE_PASSWORD (the zone's AccessKey), BUNNY_STORAGE_ENDPOINT
 * (e.g. storage.bunnycdn.com), BUNNY_API_KEY (account key, for the purge), BUNNY_PULLZONE_ID.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, posix, relative, sep } from 'node:path';

const DIST = 'dist';
const CONCURRENCY = 8;
const RETRIES = 3;

const env = (name) => {
  const value = process.env[name];
  if (!value) {
    console.error(`missing environment variable ${name}`);
    process.exit(1);
  }
  return value;
};

const zone = env('BUNNY_STORAGE_ZONE');
const password = env('BUNNY_STORAGE_PASSWORD');
const endpoint = env('BUNNY_STORAGE_ENDPOINT');
const apiKey = env('BUNNY_API_KEY');
const pullZoneId = env('BUNNY_PULLZONE_ID');
const storageBase = `https://${endpoint}/${zone}`;

/** Fetch with retries on network errors and 5xx; 4xx fails immediately. */
async function request(url, init, expected) {
  let lastError;
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    try {
      const response = await fetch(url, init);
      if (expected.includes(response.status)) return response;
      const body = await response.text().catch(() => '');
      if (response.status >= 500) {
        lastError = new Error(`${init.method ?? 'GET'} ${url} → ${response.status} ${body}`);
      } else {
        throw new Error(`${init.method ?? 'GET'} ${url} → ${response.status} ${body}`);
      }
    } catch (error) {
      if (error instanceof Error && /→ 4\d\d/.test(error.message)) throw error;
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** attempt));
  }
  throw lastError;
}

/** Runs `worker` over `items` with bounded concurrency. */
async function pool(items, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length > 0) await worker(queue.shift());
  });
  await Promise.all(runners);
}

async function walkLocal(dir, base = dir) {
  const files = new Map();
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const [k, v] of await walkLocal(full, base)) files.set(k, v);
    } else if (entry.isFile()) {
      const content = await readFile(full);
      const rel = relative(base, full).split(sep).join(posix.sep);
      files.set(rel, { content, size: (await stat(full)).size, sha256: createHash('sha256').update(content).digest('hex').toUpperCase() });
    }
  }
  return files;
}

async function listRemote(path = '') {
  const files = new Map();
  const response = await request(`${storageBase}/${path}`, { headers: { AccessKey: password, accept: 'application/json' } }, [200]);
  for (const item of await response.json()) {
    const rel = path ? `${path}${item.ObjectName}` : item.ObjectName;
    if (item.IsDirectory) {
      for (const [k, v] of await listRemote(`${rel}/`)) files.set(k, v);
    } else {
      files.set(rel, { size: item.Length, checksum: item.Checksum ? String(item.Checksum).toUpperCase() : undefined });
    }
  }
  return files;
}

const alwaysUpload = (rel) => /\.(html|xml|txt)$/.test(rel);
const isPage = (rel) => /\.(html|xml|txt)$/.test(rel);

const local = await walkLocal(DIST);
const remote = await listRemote();
console.log(`local: ${local.size} files, remote: ${remote.size} files`);

const changed = [...local.entries()].filter(([rel, file]) => {
  const existing = remote.get(rel);
  if (!existing) return true;
  if (existing.checksum) return existing.checksum !== file.sha256;
  return alwaysUpload(rel) || existing.size !== file.size;
});
const assets = changed.filter(([rel]) => !isPage(rel));
const pages = changed.filter(([rel]) => isPage(rel));

let uploaded = 0;
let bytes = 0;
const upload = async ([rel, file]) => {
  await request(
    `${storageBase}/${rel}`,
    {
      method: 'PUT',
      headers: { AccessKey: password, Checksum: file.sha256, 'Content-Type': 'application/octet-stream' },
      body: file.content,
    },
    [201],
  );
  uploaded++;
  bytes += file.size;
};
// Assets first, so no published page ever references a file that is not there yet.
await pool(assets, upload);
await pool(pages, upload);

const stale = [...remote.keys()].filter((rel) => !local.has(rel));
await pool(stale, async (rel) => {
  await request(`${storageBase}/${rel}`, { method: 'DELETE', headers: { AccessKey: password } }, [200, 404]);
});

await request(`https://api.bunny.net/pullzone/${pullZoneId}/purgeCache`, { method: 'POST', headers: { AccessKey: apiKey } }, [204, 200]);

console.log(`uploaded ${uploaded} (${(bytes / 1024).toFixed(0)} kB), skipped ${local.size - uploaded}, deleted ${stale.length}, purged pull zone ${pullZoneId}`);
