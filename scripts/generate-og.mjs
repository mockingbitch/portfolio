/**
 * Generates the default Open Graph image at public/og-default.png.
 * Run with `npm run og` after changing the headline in src/data/profile.ts.
 *
 * Uses sharp (already installed as part of Astro's image pipeline) and the
 * system sans-serif font, so the result may vary slightly between machines.
 */
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile(new URL('../src/data/profile.ts', import.meta.url), 'utf8');
const read = (key, fallback) =>
  source.match(new RegExp(`${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1]?.replace(/\\'/g, "'") ?? fallback;
const escape = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const name = escape(read('name', ''));
const primary = escape(read('primary', 'Building Scalable Systems.'));
const secondary = escape(read('secondary', 'Engineering Better Solutions.'));

const font = "font-family='Helvetica Neue, Helvetica, Arial, sans-serif'";
const mono = "font-family='Menlo, SF Mono, Consolas, monospace'";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0d12"/>
  <rect x="80" y="84" width="14" height="14" fill="#4fd6c4"/>
  <text x="112" y="98" ${font} font-size="26" font-weight="500" fill="#edece8">${name}</text>
  <text x="80" y="330" ${font} font-size="74" font-weight="500" letter-spacing="-2.5" fill="#edece8">${primary}</text>
  <text x="80" y="418" ${font} font-size="74" font-weight="500" letter-spacing="-2.5" fill="#a4a8b0">${secondary}</text>
  <rect x="80" y="508" width="1040" height="1" fill="#333b49"/>
  <text x="80" y="552" ${mono} font-size="19" letter-spacing="1.5" fill="#838894">SENIOR SOFTWARE ENGINEER  /  SOLUTION ARCHITECT  /  SYSTEM DESIGN</text>
</svg>`;

const output = new URL('../public/og-default.png', import.meta.url);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output.pathname);
console.log('Wrote public/og-default.png');
