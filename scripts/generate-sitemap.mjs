import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadPosts } from './load-posts.mjs';
import { SITE_URL } from '../src/utils/seo.js';
import { toIsoDate } from '../src/utils/dates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, '../public');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'sitemap.xml');
const blogPosts = await loadPosts();

const toXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const today = new Date().toISOString().split('T')[0];

const urls = [
  {
    loc: `${SITE_URL}/`,
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: today,
  },
  {
    loc: `${SITE_URL}/servicios`,
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: today,
  },
  {
    loc: `${SITE_URL}/otros-servicios`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: today,
  },
  {
    loc: `${SITE_URL}/ortodoncia`,
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: today,
  },
  {
    loc: `${SITE_URL}/casos-de-exito`,
    changefreq: 'monthly',
    priority: '0.85',
    lastmod: today,
  },
  {
    loc: `${SITE_URL}/agenda`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: today,
  },
  {
    loc: `${SITE_URL}/contacto`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: today,
  },
  {
    loc: `${SITE_URL}/blogs`,
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: today,
  },
  ...blogPosts.map((post) => ({
    loc: `${SITE_URL}/blogs/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: toIsoDate(post.date) || today,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${toXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(OUTPUT_PATH, sitemap, 'utf8');

console.log(`Sitemap generated at ${OUTPUT_PATH}`);
