---
name: product-site-builder
description: Build the right high-converting page or site for a product. Profile the product (vertical, catalog size, price, monetization, traffic, regulation), pick the matching archetype (quiz funnel, single-product landing page, comparison/best-of affiliate page, lead-gen/service page, advertorial, collection, waitlist) and design preset, then build it in Next.js (App Router) + Tailwind + Lucide from tested templates, with tracked affiliate/checkout links, consent-gated Google + Vercel analytics, compliance guardrails, and an optional PDF marketing guide. Use whenever the user wants a landing page, sales page, product page, funnel, quiz, "best X" review page, lead page, or a site for something they sell or promote, even if they only describe the product or attach a spec or example design.
---

# Product site builder

A kit extracted from real builds (shopsquishyworld.com). The product decides the page:
profile it, choose an archetype and a design preset, then assemble the page from tested templates
instead of writing from scratch.

```
templates/
  shared/       analytics + consent, link builder, root layout, fonts, theme presets, guide template
  sections/     themed section components (Hero, ProductGrid, ComparisonTable, LeadForm...), site config
  archetypes/
    quiz-funnel/    4-question quiz → 1.5 s analysis → persona + 3-tier picks (self-contained)
    landing-page/   single-product sales page        (/product)
    comparison/     "best X for Y" affiliate page    (/best)
    lead-gen/       service enquiry + /api/lead      (/contact)
references/     intake, archetypes, verticals, design-presets, sections, monetization,
                compliance, analytics, quiz-architecture, quiz-design, marketing-guide
scripts/        screenshot-flow.mjs (walks a quiz), screenshot-pages.mjs (any pages, any preset),
                render-pdf.mjs (HTML → PDF with inlined Google Fonts)
```

## Workflow

### 1. Profile the product
Read every attachment first (specs, example sites, screenshots, reports). If the Read tool
can't render a PDF, extract it with PyMuPDF (`pip install pymupdf`). For tall single-page PDFs, render
clipped slices to PNG. A marked-up example (circles, arrows) is the design target.
Fill in the product profile in `references/intake.md`. Ask one short round of questions only
for unknowns that change the archetype or compliance; otherwise state your assumptions.

### 2. Choose the archetype, preset and sections
- Archetype: the decision table and per-archetype section recipes are in `references/archetypes.md`.
- Vertical guidance (default archetype, preset, what to lead with, watch-outs): `references/verticals.md`.
- Preset (pastel / bold / clinical / natural / dark): `references/design-presets.md`.
Tell the user your choice in one or two lines with the reason ("many similar SKUs where the right
pick depends on the person → quiz funnel, pastel preset").

### 3. Copy the templates
Inspect the target repo first (Next version, Tailwind config, existing layout, analytics,
privacy/disclosure pages). With no app yet:
`npx create-next-app@14 --ts --tailwind --app --eslint --no-src-dir --import-alias "@/*"`.
```bash
SKILL=<path to this skill>
cp -rn "$SKILL/templates/shared/." .          # always (-n never overwrites)
cp -rn "$SKILL/templates/sections/." .        # for every archetype except a quiz-only build
cp -rn "$SKILL/templates/archetypes/<name>/." .
rm -rf docs/marketing-guide-template.html     # unless making the guide (step 6)
npm i lucide-react @vercel/analytics
```
Merge rather than overwrite existing files:
- **tailwind.config.ts:** `brand` colors, palettes, fonts, keyframes; `./data/**` in `content`.
- **app/globals.css:** theme preset blocks.
- **Root layout:** add `ConsentBanner`, `RouteEvents`, `VercelAnalytics` and the Consent Mode snippet.
- **lib/analytics/events.ts:** append events to an existing allowlist rather than replacing it.
- **package.json:** `"test": "node --experimental-strip-types --test \"lib/**/*.test.ts\""`.
- **tsconfig:** `"allowImportingTsExtensions": true`.
- **Site with its own header:** if a page needs its own chrome, move the existing pages into an `app/(site)/` route
  group (URLs unchanged) and render the root `not-found.tsx` inside that layout explicitly.

### 4. Fill in the content
- **Section pages:** brand and theme go in `data/site.ts`; copy, products and links go in `data/<archetype>.ts`;
  the font pair goes in `app/fonts.ts`. Pages only compose sections (catalog in `references/sections.md`).
- **Quiz:** follow `references/quiz-architecture.md`, starting with `data/quizData.ts`, `SLOT_LABELS` and the tests.
- **Every outbound link:** build it with `lib/links.ts` (or the quiz's `lib/quiz/affiliate.ts`) and mark paid
  links `sponsored`. See `references/monetization.md` for Amazon, other networks, Shopify/Stripe and lead webhooks.
- **Copy rules:** read `references/compliance.md` before writing any copy. It overrides specs on fake social
  proof, prices, health claims and consent. Tell the user each substitution you make.
- **Brand placeholders:** find leftovers with `grep -rn "Brand Name\|\[product\]\|Squishy\|replace" app components data`.

### 5. Wire up the site and verify
- **Site pages:** update privacy (storage, events, sub-tags, form data) and disclosure (affiliate links). Add routes to
  the sitemap and nav, and link the new page from the home page.
- **Checks:** `npx tsc --noEmit && npm run lint && npm test && npm run build`, then run the app and:
  - `node "$SKILL/scripts/screenshot-pages.mjs" http://localhost:3100 ./shots /product /best`
    (flags horizontal overflow; add `--theme=<preset>` to compare presets);
  - `node "$SKILL/scripts/screenshot-flow.mjs" http://localhost:3100/quiz ./shots` for quizzes
    (prints every affiliate URL and checks that a returning visitor sees their saved result).
- **Look at the screenshots** on mobile and desktop and fix what's off.
- **Playwright:** install it in a scratch folder if needed. With a preinstalled Chromium, don't run `playwright install`;
  set `PW_CHROMIUM` if launch fails.
- **Stopping the server:** kill it by PID (`ps aux | grep "[n]ext-server"`), never with `pkill -f "next start"` from a
  shell whose own command line contains that text.

### 6. Optional: marketing guide
Adapt `shared/docs/marketing-guide-template.html` (structure and quotable benchmark figures in
`references/marketing-guide.md`), then
`node "$SKILL/scripts/render-pdf.mjs" in.html out.pdf`. Check the page count, eyeball the pages, and send the PDF.

### 7. Hand off
Commit and push to the branch you were told to use. Push to `main` only when asked. Then tell the user:
- the archetype and preset you chose, and why;
- the compliance substitutions you made;
- what needs their input: real ASINs or checkout links, product photos (their own or licensed, 4:3, at least 1200×900),
  `LEAD_WEBHOOK_URL`, the analytics IDs, and enabling Vercel Analytics.
