// Render an HTML document (e.g. the marketing guide) to a print-quality PDF.
//
//   node render-pdf.mjs input.html output.pdf
//
// Google Fonts <link> tags are fetched and inlined as base64 first, because
// headless Chromium often cannot reach fonts.googleapis.com through a proxy
// while Node's fetch can. Without this step the PDF silently falls back to
// system fonts.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('usage: node render-pdf.mjs input.html output.pdf');
  process.exit(1);
}

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
let html = readFileSync(input, 'utf8');

for (const [tag, href] of [...html.matchAll(/<link[^>]+href="(https:\/\/fonts\.googleapis\.com[^"]+)"[^>]*>/g)]) {
  try {
    let css = await (await fetch(href.replace(/&amp;/g, '&'), { headers: { 'User-Agent': UA } })).text();
    // Keep latin subsets only to keep the file small.
    const blocks = [...css.matchAll(/\/\* ([\w-]+) \*\/\s*(@font-face \{[\s\S]*?\})/g)].filter((m) => m[1] === 'latin');
    const inlined = [];
    for (const [, , block] of blocks) {
      const url = block.match(/url\((https:[^)]+)\)/)[1];
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      inlined.push(block.replace(url, `data:font/woff2;base64,${buf.toString('base64')}`));
    }
    html = html.replace(tag, `<style>${inlined.join('\n')}</style>`);
    console.log(`inlined ${inlined.length} font faces`);
  } catch (e) {
    console.warn('font inline failed, keeping <link>:', e.message);
  }
}

const tmp = join(dirname(resolve(output)), `.render-${Date.now()}.html`);
writeFileSync(tmp, html);
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const page = await browser.newPage();
await page.goto(`file://${tmp}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: output, printBackground: true, preferCSSPageSize: true });
await browser.close();
(await import('node:fs')).unlinkSync(tmp);
console.log('wrote', output);
