// Full-page screenshots of any pages, on phone and desktop, optionally under
// a different theme preset (to compare presets before committing to one).
//
//   node screenshot-pages.mjs <baseUrl> <outDir> <path> [path...] [--theme=bold]
//
// Example: node screenshot-pages.mjs http://localhost:3000 ./shots /product /best --theme=natural
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
const theme = args.find((a) => a.startsWith('--theme='))?.split('=')[1];
const [base, outDir, ...paths] = args.filter((a) => !a.startsWith('--'));
if (!base || !outDir || !paths.length) {
  console.error('usage: node screenshot-pages.mjs <baseUrl> <outDir> <path> [path...] [--theme=name]');
  process.exit(1);
}
const out = outDir.replace(/\/$/, '') + '/';
mkdirSync(out, { recursive: true });

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
for (const [device, viewport] of [['mobile', { width: 390, height: 844 }], ['desktop', { width: 1280, height: 900 }]]) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('sam.consent.v1', JSON.stringify({ analytics: 'denied', ads: 'denied', decidedAt: 'qa' }));
    } catch {}
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const path of paths) {
    await page.goto(base.replace(/\/$/, '') + path, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    if (theme) await page.evaluate((t) => document.querySelectorAll('[data-theme]').forEach((el) => el.setAttribute('data-theme', t)), theme);
    // Horizontal overflow is the most common mobile layout bug.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = `${device}${path.replace(/\//g, '-') || '-home'}${theme ? '-' + theme : ''}.png`;
    await page.screenshot({ path: out + name, fullPage: true });
    console.log(`${name}  horizontal overflow: ${overflow > 1 ? overflow + 'px  <-- FIX' : 'none'}`);
  }
  if (errors.length) console.log(`[${device}] page errors:`, errors);
  await ctx.close();
}
await browser.close();
