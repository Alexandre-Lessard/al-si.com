// Post-build sitemap generator. Walks dist/client/ for *.html files and emits
// dist/client/sitemap.xml with hreflang alternates between FR (fr-CA) and EN.
// All URLs are explicitly prefixed with /fr or /en — there is no bare-locale URL.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE = 'https://al-si.com';
const DIST = 'dist/client';

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (entry === 'index.html') out.push(p);
  }
  return out;
}

function fileToUrl(file) {
  const rel = relative(DIST, file)
    .replace(/\\/g, '/')
    .replace(/\/?index\.html$/, '');
  return '/' + rel;
}

function pairForUrl(url) {
  // Returns { fr, en } prefixed URLs for any /fr or /en URL
  const match = url.match(/^\/(fr|en)(\/.*)?$/);
  if (!match) return null;
  const bare = match[2] || '/';
  const fr = bare === '/' ? '/fr' : `/fr${bare}`;
  const en = bare === '/' ? '/en' : `/en${bare}`;
  return { fr, en };
}

const files = walk(DIST);
const urls = files.map(fileToUrl);
const seenFr = new Set();
const entries = [];
for (const url of urls) {
  const pair = pairForUrl(url);
  if (!pair) continue;
  if (seenFr.has(pair.fr)) continue;
  seenFr.add(pair.fr);
  entries.push(pair);
}

const today = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
];
for (const { fr, en } of entries) {
  for (const lang of ['fr', 'en']) {
    const loc = lang === 'fr' ? `${SITE}${fr}` : `${SITE}${en}`;
    xml.push('  <url>');
    xml.push(`    <loc>${loc}</loc>`);
    xml.push(`    <lastmod>${today}</lastmod>`);
    xml.push(`    <xhtml:link rel="alternate" hreflang="fr-CA" href="${SITE}${fr}" />`);
    xml.push(`    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${en}" />`);
    xml.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${fr}" />`);
    xml.push('  </url>');
  }
}
xml.push('</urlset>');

writeFileSync(join(DIST, 'sitemap.xml'), xml.join('\n') + '\n');
console.log(`✓ sitemap.xml generated with ${entries.length * 2} URLs`);
