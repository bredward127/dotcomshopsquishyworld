# Page archetypes

Pick one primary archetype per page. A site can combine them (e.g. a comparison page
that links into a quiz), but every page has one job and one primary CTA.

| Archetype | Best when | Primary CTA | Template | Route |
|---|---|---|---|---|
| **Quiz funnel** | Many similar SKUs; the right pick depends on the person (skincare, coffee, supplements, toys, pet food, mattresses, gifts) | Start quiz → product picks | `archetypes/quiz-funnel` | `/quiz` |
| **Single-product landing** | One hero product, demo-able, impulse-to-considered price, paid social | Buy / Check price | `archetypes/landing-page` | `/product` |
| **Comparison / best-of** | Affiliate monetization, search intent ("best X for Y"), several brands | See price (per pick) | `archetypes/comparison` | `/best` |
| **Lead-gen / service** | Services, local businesses, quote-based or high-consideration offers | Request a call / quote | `archetypes/lead-gen` | `/contact` |
| **Advertorial** | Problem-unaware cold traffic; needs a story before a pitch | Continue to product/quiz | compose from sections | `/story` |
| **Collection** | Existing catalog, repeat buyers, browsing intent | Shop item | compose from sections | `/shop` |
| **Waitlist** | Pre-launch, validating demand | Join waitlist | lead-gen with one email field | `/waitlist` |

## Section recipes (in order)

**Quiz funnel**: built-in page. Disclosure strip → header → hero (CTA anchors to #quiz)
→ quiz card visible immediately → dark "why a quiz" band → lineup of personas →
how it works → promise box → final CTA → footer. See quiz-architecture.md and quiz-design.md.

**Single-product landing**: AnnouncementBar → SiteHeader (CTA) → Hero (2 CTAs plus true
bullets) → ProofBar → ProblemSolution → FeatureGrid → HowItWorks → (ComparisonTable vs
"the usual way", optional) → Faq (real objections: price, returns, shipping, fit) →
PromiseBox → FinalCta → SiteFooter.

**Comparison**: SiteHeader → Hero ("Updated <month>", CTA jumps to #picks) → ProductGrid
(featured = Best overall, plus Budget and Premium) → ComparisonTable → FeatureGrid "How we
chose" (true method only) → Faq including "Do you earn from these links?" → SiteFooter.

**Lead-gen**: SiteHeader → Hero (CTA → #form, response-time bullet) → ProofBar (service
area, availability, licensing if true) → HowItWorks (3 steps of the process) → LeadForm →
Faq ("what happens to my details") → SiteFooter. Set `site.disclosure = ''`.

**Advertorial**: SiteHeader (no nav) → Hero styled as an article headline (eyebrow
"Advertisement") → ProblemSolution as the story beats → FeatureGrid "what changed" →
DarkBand → FinalCta to the landing page or quiz. Label it as an advertisement at the
top. No fake bylines, fake news branding, or fabricated "I tried it" stories.

**Collection**: SiteHeader → short Hero → ProductGrid (6-12, no featured) → ProofBar →
Faq → SiteFooter.

**Waitlist**: Hero → FeatureGrid (3 reasons) → LeadForm (email only, `id="waitlist"`) → SiteFooter.

## Building a section page
1. Copy `templates/sections/` (once per project) and the archetype folder.
2. Put all copy and products in `data/<archetype>.ts`. Pages only compose sections.
3. Build every outbound URL with `buildLink` from `lib/links.ts` (Amazon tag + sub-tag,
   or any network's params), and mark paid links `sponsored: true`.
4. Pick the theme in `data/site.ts` and the matching font pair in `app/fonts.ts`.
