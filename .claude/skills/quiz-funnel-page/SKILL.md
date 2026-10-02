---
name: quiz-funnel-page
description: Build a high-converting, mobile-first quiz / product-finder funnel or DTC landing page in Next.js (App Router) + Tailwind + Lucide, with persona scoring, a 3-tier recommendation grid, tracked affiliate (Amazon Associates) links, consent-gated Google + Vercel analytics, and an optional PDF marketing guide. Use whenever the user asks for a quiz funnel, "find your match" page, product recommender, affiliate landing page, or a page "like the SquishyWorld quiz", even if they only hand over a spec or an example screenshot.
---

# Quiz funnel page

A proven kit extracted from the shopsquishyworld.com Sensory Match quiz. It covers:
- **Flow:** hero → 4-question quiz card → 1.5 s "Analyzing…" screen → persona + Best Match /
  Alternative / Multi-Pack grid.
- **Mechanics:** affiliate links with sub-tracking, saved results for returning visitors.
- **Design:** a pastel cream/mint/lavender DTC look.

Working code lives in `templates/`. Copy it, then customize. Don't rewrite it from scratch.

## Workflow

### 1. Read the inputs
- Read every spec, example page or screenshot the user attached. PDFs: if the Read
  tool can't render them, extract the text with PyMuPDF (`pip install pymupdf`; `import fitz`). For tall
  single-page PDFs, render clipped slices to PNG and look at them.
- If the user marked up an example (circles, arrows), treat the marked part as the
  design target.
- Inspect the target repo: Next.js version, Tailwind config, existing layout/header,
  analytics, privacy/disclosure pages. If there's no app yet, scaffold one with
  `npx create-next-app@14 --ts --tailwind --app --eslint --no-src-dir --import-alias "@/*"`.

### 2. Copy the templates
```bash
SKILL=<path to this skill>          # e.g. .claude/skills/quiz-funnel-page
cp -rn "$SKILL/templates/." .        # -n: never overwrite existing files
npm i lucide-react @vercel/analytics
```
Then merge rather than overwrite where the project already has files:
- **tailwind.config.ts:** merge in the color, font, keyframe and animation tokens, and add `./data/**` to `content`.
- **app/layout.tsx:** if the site already has a root layout, keep it. Add `<ConsentBanner/>`,
  `<RouteEvents/>`, `<VercelAnalytics/>` and the Consent Mode snippet.
- **Separate header for the funnel:** if the site's root layout renders a header the funnel shouldn't
  show, move the existing pages into an `app/(site)/` route group with their own
  layout. URLs don't change. Then render the root `not-found.tsx` inside that layout explicitly.
- **lib/analytics/events.ts:** if the project already has an allowlist, append the 5 quiz events
  instead of replacing it, and update its tests.
- **package.json:** set `"test": "node --experimental-strip-types --test \"lib/**/*.test.ts\""`.
- **tsconfig:** set `"allowImportingTsExtensions": true`.

### 3. Customize the content (most of the work)
Everything brand-specific is plain strings. Find them with
`grep -rn "Squishy\|squish\|Sensory" app components data lib`.
1. **`data/quizData.ts`:** traits, 4 questions (keep 3-4 options each), personas
   (name, badgeWord, tagline, summary), products (8-12; every trait needs at least one
   `best` and one quiet/second-tier candidate, and there should be 2-3 `multipack`). Keep `rating`/`reviewCount`
   unset. Use `amazonQuery` searches until the user supplies real ASINs.
2. **`components/quiz/ProductCard.tsx`:** set `SLOT_LABELS` to the tier names from the spec.
3. **`components/quiz/ResultsView.tsx`:** set the trait labels/colors and the trust row (true statements only).
4. **Brand chrome:** `FunnelHeader.tsx`, `FunnelFooter.tsx`, `(quiz)/layout.tsx` (fonts) and `quiz/page.tsx`
   (hero copy, proof bullets, sections).
5. **Affiliate tag:** default `DEFAULT_AFFILIATE_TAG` in quizData, override with `NEXT_PUBLIC_AMAZON_TAG`
   (add it to `.env.example`). For non-Amazon networks, adapt `lib/quiz/affiliate.ts` (see the architecture reference).
6. **Tests:** update `lib/quiz/scoring.test.ts` (the option counts and the expected spec-example badge).

Before writing copy, read `references/compliance.md`. It overrides the spec on fake social proof, prices,
health claims and consent, and you must tell the user about each substitution.

### 4. Wire up the site
- Add a privacy-page section (localStorage key, events sent, sub-tag contents) and update
  the disclosure page to say affiliate links exist.
- Add `/quiz` to the sitemap/nav and link it from the home page.
- Document the events in the measurement docs, if the repo has them.

### 5. Verify (all of it, before saying done)
```bash
npx tsc --noEmit && npm run lint && npm test && npm run build
npx next start -p 3100 &              # or npm run dev
node "$SKILL/scripts/screenshot-flow.mjs" http://localhost:3100/quiz ./shots
```
- Look at the screenshots, both mobile (390 px) and desktop: hero, a selected option, analyzing,
  results. Fix anything off-screen, overflowing, or stuck.
- The script prints every affiliate URL. Confirm `tag=` and `ascsubtag=` are on each, and that
  "returning visitor sees saved result: true".
- Install playwright in a scratch folder if needed (`npm i playwright`). If Chromium is
  preinstalled, don't run `playwright install`; set `PW_CHROMIUM` to its path if launch fails.
- When killing the dev server, never `pkill -f "next start"` from a shell whose own command
  line contains that text. Kill by PID instead (`ps aux | grep "[n]ext-server"`).

### 6. Optional: marketing guide PDF
Copy `templates/docs/marketing-guide-template.html` to `docs/marketing/<name>.html`, rewrite
it for the new brand/personas (rules and allowed benchmark figures are in
`references/marketing-guide.md`), then:
```bash
node "$SKILL/scripts/render-pdf.mjs" docs/marketing/<name>.html docs/marketing/<name>.pdf
```
Check the page count and render pages to PNG to eyeball them. Send the PDF to the user.

### 7. Hand off
Commit with a clear message and push to the branch you were told to use. Push to `main` only when the user asks.
Then tell the user:
- what still needs their input: real ASINs, product photos (4:3, at least 1200×900, their own or licensed,
  never Amazon's), enabling Vercel Analytics in the dashboard;
- which spec items you changed for compliance, and why.

## References
- `references/design-system.md`: tokens, section order, quiz card, results anatomy
- `references/quiz-architecture.md`: data model, scoring, affiliate URL rules, tests
- `references/compliance.md`: honesty, Amazon Associates, health claims, consent
- `references/analytics.md`: Consent Mode, event allowlist, Vercel Analytics
- `references/marketing-guide.md`: guide structure and quotable benchmark figures
