#!/usr/bin/env node
/**
 * Keeps the downloadable starter template in sync with this app's source.
 *
 *   node scripts/sync-template.mjs          # verify (used by `npm run template:check`)
 *   node scripts/sync-template.mjs --write  # regenerate after changing src/
 *
 * Mirrored files are copied to `src/app/pages/docs/template-src/` with a `.txt`
 * suffix so the Angular compiler ignores them while the CLI still serves them
 * as static assets. `manifest.json` is what the download button reads at
 * runtime to build the ZIP.
 */
import { readdir, readFile, mkdir, writeFile, rm, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  MIRRORED_DIRS,
  MIRRORED_FILES,
  OVERRIDES,
  ZIP_SRC_ROOT,
  isExcluded
} from './template-manifest.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const TEMPLATE_SRC = join(ROOT, 'src/app/pages/docs/template-src');
const MIRROR_DIR = join(TEMPLATE_SRC, 'mirror');
const OVERRIDE_DIR = join(TEMPLATE_SRC, '_overrides');

const write = process.argv.includes('--write');

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

/** Every source file that should end up in the template, as src-relative paths. */
async function collectMirrored() {
  const files = [];

  for (const dir of MIRRORED_DIRS) {
    const absolute = join(SRC, dir);
    if (!existsSync(absolute)) {
      throw new Error(`Manifest lists a missing directory: src/${dir}`);
    }
    files.push(...(await walk(absolute)).map(file => relative(SRC, file)));
  }
  files.push(...MIRRORED_FILES);

  return files.filter(file => !isExcluded(file)).sort();
}

async function run() {
  const mirrored = await collectMirrored();
  const problems = [];
  const entries = [];

  if (write) {
    await rm(MIRROR_DIR, { recursive: true, force: true });
  }

  for (const relativePath of mirrored) {
    const source = await readFile(join(SRC, relativePath), 'utf8');
    const mirrorPath = join(MIRROR_DIR, `${relativePath}.txt`);

    if (write) {
      await mkdir(dirname(mirrorPath), { recursive: true });
      await writeFile(mirrorPath, source);
    } else if (!existsSync(mirrorPath)) {
      problems.push(`missing mirror for src/${relativePath}`);
    } else if ((await readFile(mirrorPath, 'utf8')) !== source) {
      problems.push(`out of date: src/${relativePath}`);
    }

    entries.push({ src: `mirror/${relativePath}.txt`, dest: `${ZIP_SRC_ROOT}/${relativePath}` });
  }

  for (const [file, dest] of Object.entries(OVERRIDES)) {
    const absolute = join(OVERRIDE_DIR, file);
    if (!existsSync(absolute)) {
      problems.push(`missing override: _overrides/${file}`);
      continue;
    }
    await stat(absolute);
    entries.push({ src: `_overrides/${file}`, dest });
  }

  entries.sort((a, b) => a.dest.localeCompare(b.dest));
  const manifest = {
    name: 'groman2-template',
    generatedFrom: 'src/ (mirrored) + template-src/_overrides',
    files: entries
  };
  const manifestJson = `${JSON.stringify(manifest, null, 2)}\n`;
  const manifestPath = join(TEMPLATE_SRC, 'manifest.json');

  if (write) {
    await mkdir(TEMPLATE_SRC, { recursive: true });
    await writeFile(manifestPath, manifestJson);
    console.log(`Template synced: ${entries.length} files.`);
    return;
  }

  if (!existsSync(manifestPath)) problems.push('missing manifest.json');
  else if ((await readFile(manifestPath, 'utf8')) !== manifestJson) problems.push('manifest.json is stale');

  if (problems.length > 0) {
    console.error('Template is out of sync with src/:\n');
    for (const problem of problems) console.error(`  - ${problem}`);
    console.error('\nRun: npm run template:sync');
    process.exit(1);
  }

  console.log(`Template is in sync (${entries.length} files).`);
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
