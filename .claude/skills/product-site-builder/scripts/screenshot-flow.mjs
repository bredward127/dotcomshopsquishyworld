// Walk the quiz like a visitor and screenshot every phase, on phone and desktop.
//
//   node screenshot-flow.mjs [url] [outDir] [answerIndex]
//
// Defaults: http://localhost:3000/quiz, ./shots, 0 (always picks the first
// option; pass 1, 2... to steer toward other profiles). Needs `playwright`
// resolvable (npm i playwright in any folder; do not run `playwright install`
// when a browser is preinstalled; set PW_CHROMIUM=/path/to/chromium if needed).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:3000/quiz';
const out = (process.argv[3] ?? './shots').replace(/\/$/, '') + '/';
const pick = Number(process.argv[4] ?? 0);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
for (const [name, viewport] of [['mobile', { width: 390, height: 844 }], ['desktop', { width: 1280, height: 900 }]]) {
  const ctx = await browser.newContext({ viewport });
  // Pre-decide the consent banner so it does not cover screenshots.
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('sam.consent.v1', JSON.stringify({ analytics: 'denied', ads: 'denied', decidedAt: 'qa' }));
    } catch {}
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: 'load' });
  await page.screenshot({ path: `${out}${name}-0-hero.png` });
  await page.locator('#quiz').scrollIntoViewIfNeeded();

  for (let step = 1; step <= 10; step++) {
    const options = page.locator('#quiz button[aria-pressed]');
    if ((await options.count()) === 0) break;
    await page.screenshot({ path: `${out}${name}-${step}-question.png` });
    await options.nth(Math.min(pick, (await options.count()) - 1)).click();
    await page.waitForTimeout(700);
  }
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}${name}-analyzing.png` });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}${name}-results-full.png`, fullPage: true });

  const links = await page.$$eval('a[rel*=sponsored]', (as) => as.map((a) => a.href));
  console.log(`[${name}] page errors:`, errors.length ? errors : 'none');
  console.log(`[${name}] affiliate links:`, links.length);
  for (const l of links) console.log('   ', l);

  await page.reload({ waitUntil: 'load' });
  console.log(`[${name}] returning visitor sees saved result:`, await page.isVisible('text=Welcome back'));
  await ctx.close();
}
await browser.close();
console.log('Screenshots in', out);
