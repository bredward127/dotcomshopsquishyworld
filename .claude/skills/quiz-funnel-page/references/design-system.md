# Design system: pastel DTC quiz funnel

The look is modeled on a high-converting product-finder page: one long,
centered, mobile-first column with a quiz card embedded in the page. That
card is the part that converts.

## Tokens (templates/tailwind.config.ts)

| Token | Use |
|---|---|
| `cream` (#FFF8EE page, 200/300 borders and fills) | Page background, card borders |
| `plum` (#241B35) / `plum-muted` (#6E6480) | Text, dark sections, primary buttons |
| `lavender-600/700` | Headline accent word, option titles, selected ring |
| `mint-400/600` | Positive accents, Best Match pill, check marks |
| `peach-*`, `sky-*` | Extra illustration tones |

Fonts come from `next/font/google` in the funnel layout: **Fredoka** for display
(rounded, friendly) and **Nunito** for body. To rebrand, swap these two and the
token hexes. Keep the contrast: dark plum text on cream, with one saturated accent.

## Page sections, in order (templates/app/(quiz)/quiz/page.tsx)

1. **Disclosure strip** (dark, one line) with the affiliate statement.
2. **Header**: wordmark, small pill badge ("Sensory Finder 2.0"), one outbound "View all" link.
3. **Hero**: eyebrow pill, big display headline with ONE accent-colored phrase,
   one-sentence subhead, a single dark pill CTA that anchors to `#quiz`, then
   2-3 diamond-bullet proof points that are *true* (time, no email, privacy).
4. **Quiz card** (`#quiz`): visible immediately, not hidden behind the CTA.
5. **Dark "why a quiz" band**: one bold line, two sentences, one highlighted phrase.
6. **Lineup**: the personas or products as cards with an illustration tile.
7. **How it works**: 01 / 02 / 03 cards with big accent numerals.
8. **Promise box**: bordered, centered, states the honest guarantee.
9. **Final CTA**: "Still reading? The quiz takes 60 seconds." plus a button.
10. **Footer**: affiliate disclosure, not-medical-advice line, privacy and disclosure links.

## Quiz card details (components/quiz/QuizModal.tsx)

- Header row: Back (hidden on step 1) on the left, "Step N of M" on the right (aria-live).
- Segmented progress: one bar per question, filling with a mint→lavender gradient
  (`transition-[width] duration-500`). The current segment shows 1/3 filled.
- Question: centered display heading (gets focus on step change, but never on
  first load), with a muted subtitle underneath.
- Options: large touch targets in a 1-col (mobile) / 2-col grid. Each has a pastel
  **illustration tile** on the left (Lucide icon on a gradient with soft blobs) and
  the title (accent color) plus description on the right. There's a check circle in the corner.
  Hover lifts the card; selected adds a lavender border, a 4px ring and a shadow; pressing scales to 0.98.
- Auto-advance 380 ms after a tap; answers are locked during that delay.
- Each step animates in with `animate-rise-in`, keyed on the question id.

## Analyzing screen (components/quiz/AnalyzingScreen.tsx)

Exactly 1.5 s: a squishing gradient blob with a ping halo, the title
"Analyzing <noun> profile…", a progress bar, and three checklist lines ticking
off. The funnel scrolls it into view because it is shorter than a question.

## Results (components/quiz/ResultsView.tsx + ProductCard.tsx)

- Persona header card: illustration tile, "Your … profile" pill, persona name
  (display, 3xl–4xl), a combined badge line ("Deep Pressure & Quiet Focus Seeker"),
  a bold tagline plus summary, trait bars, and chips of the chosen answers.
- **3-tier grid**: Best Match (dark plum card, mint ring, raised on desktop),
  Quiet Alternative (white, lavender), Multi-Pack Value (cream, peach). Each card
  has an image or tile, slot pill, badge, name, description, 3 check highlights,
  a full-width pill CTA "See price on Amazon ↗", and "Affiliate link · opens Amazon in a new tab" underneath.
- Trust row of four true statements, then 1-2 "different texture" alternates,
  then Retake and a not-medical-advice line.

## Illustrations without photos

`ToneTile` (components/quiz/icons.tsx) draws a gradient tile, two blurred
circles (use `aspect-square`, never h/w fractions, or they turn into pills), and a
Lucide icon. Use it until real product photos exist; `imageUrl` replaces it per product.
Product images: 4:3, at least 1200×900, centered subject, plain light background, WebP.
They are cropped to 16:9 on phones.

## Mobile checklist

- 16 px side gutters, nothing wider than the viewport.
- Option cards stay at least 64 px tall; the CTA stays full width on cards.
- After each answer, if the new question's heading is above the fold, scroll it to center.
- Respect `prefers-reduced-motion` (globals.css kills animations).
