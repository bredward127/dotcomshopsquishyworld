# Design presets

Five presets share one component set via CSS variables (`templates/shared/app/globals.css`).
Set `site.theme` in `data/site.ts` and uncomment the matching pair in `app/fonts.ts`.
Preview any page under another preset without rebuilding:
`node scripts/screenshot-pages.mjs <base> ./shots /product --theme=bold`.

| Preset | Feel | Background / ink / accent | Fonts | Fits |
|---|---|---|---|---|
| `pastel` | Soft, playful, friendly | cream #FFF8EE / plum #241B35 / lavender #7757D6 + mint | Fredoka + Nunito | Toys, kids, pets, gifts, gentle wellness |
| `bold` | Loud, editorial, confident | off-white #FFF9F0 / near-black #15110E / red #D42A25 + amber | Anton + Inter | Food & drink, hot sauce, streetwear, fitness, energy |
| `clinical` | Calm, precise, trustworthy | slate-50 / slate-900 / teal #0F766E + blue | Manrope + Inter | Health devices, skincare, finance, education, services |
| `natural` | Warm, crafted, earthy | linen #F6F1E9 / forest #2F3E2C / terracotta #A9522F + olive | Fraunces + Work Sans | Home, coffee, organic food, clean beauty, travel |
| `dark` | Technical, premium | #0B0F17 / #E6EAF2 / electric blue #5B8CFF + lime | Space Grotesk + Inter | Gadgets, gaming, automotive, entertainment |

If the user supplies brand colors, edit one preset's RGB channels instead of
adding classes. Check that accent vs `accent-ink` contrast stays ≥ 4.5:1 (button text).

## Layout principles (all presets)
- One centered column, max-w-5xl; 16 px gutters; no horizontal scroll (the screenshot script flags it).
- One accent-colored phrase in the hero headline; one primary CTA style per page.
- Big type: hero 2.5rem mobile / 3.75rem desktop; section titles 1.875–2.25rem.
- Rounded-3xl cards with 2px `brand-line` borders; featured item inverted into `brand-band`.
- A dark band roughly mid-page breaks rhythm; the final CTA repeats the hero promise.
- Respect `prefers-reduced-motion`; native `<details>` for FAQ; real `<table>` on desktop
  that turns into stacked cards on phones.
- The original reference design (a product-finder quiz page with a condensed display font,
  a red accent and a cream background) is the `bold` preset. The SquishyWorld build is `pastel`.
