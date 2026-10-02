# Quiz architecture

## Files

| File | Role |
|---|---|
| `data/quizData.ts` | Questions, options (with trait, icon, tone), personas, product inventory, default affiliate tag |
| `lib/quiz/scoring.ts` | `scoreAnswers`, `rankTraits` (tie-breaks), `buildResult` (persona plus the 3 picks plus alternatives) |
| `lib/quiz/affiliate.ts` | `buildAffiliateUrl(product, { tag, persona, slot, campaign, extra })` |
| `lib/quiz/storage.ts` | Saved result in localStorage (`sw.quiz.v1`); answers only, re-scored on load |
| `components/quiz/QuizFunnel.tsx` | State machine: `quiz → analyzing (1.5s) → results`; returning visitors land on results |
| `components/quiz/QuizModal.tsx` | Steps, progress, option cards, back, auto-advance |

## Data model

```ts
type Trait = 'calm' | 'tactile' | 'compression' | 'focus';   // rename freely: 3-5 traits work
QuizQuestion { id, step /* short progress label */, title, subtitle, options: QuizOption[] }
QuizOption   { id, label, description, icon, tone, trait }
Persona      { trait, name, badgeWord, tagline, summary, icon, tone }
ProductRecommendation {
  id, name, badge, description, traits /* ordered: first = lead trait */,
  highlights[3], slots: ('best'|'quiet'|'multipack')[], quiet: boolean,
  icon, tone, amazonQuery, asin?, imageUrl?, rating?, reviewCount?
}
```

To change the domain (for example skincare, coffee, or pet toys), rename the traits, rewrite the
questions/personas/products, rename the slot labels in `ProductCard.tsx`
(`SLOT_LABELS`), and change the "quiet" filter to whatever the second tier
means (e.g. "budget", "sensitive skin"). In `buildResult` that is the
`p.quiet` filter plus the `answers[3] === 'silent'` signal.

## Scoring

1. One point per answer to the option's trait.
2. Rank traits by score. Ties are common with 4 questions, so break them by a fixed
   question priority (the "preferred feel" question first, then "who for", then the rest),
   then by TRAITS order. Results stay deterministic.
3. Primary trait → persona. Secondary trait (second, score > 0) → badge
   "<primary.badgeWord> & <secondary.badgeWord> Seeker".
4. Product fit = Σ score[trait_i] × (2 for the lead trait, 1 otherwise) + 3 if lead
   trait == primary + 1 if quiet and the visitor wants quiet.
5. Best = top fit among `slots.includes('best')`; Quiet = top among quiet-eligible,
   excluding Best; Multi-pack = top among `multipack`. Alternatives = up to 2
   other 'best' products whose lead trait ≠ primary, preferring the secondary trait.
6. The inventory must give every trait at least one 'best' and one quiet candidate.
   The test "every possible answer combination produces a full result" enforces this.

## Affiliate links

- Amazon product page if `asin` matches `/^[A-Z0-9]{10}$/`, else a search for `amazonQuery`.
- `tag` comes from `NEXT_PUBLIC_AMAZON_TAG`, validated, with a fallback default.
- `ascsubtag` is `sw_<persona>_<slot>[_<utm_source>_<utm_campaign>]`, made of alphanumeric
  tokens (24 chars each, 64 total). Campaign tokens are added only when analytics consent
  exists (`readAttribution`). It shows in Associates reports, so earnings split by
  profile, tier and campaign with no revenue data in analytics.
- Every outbound link: `target="_blank" rel="sponsored noopener noreferrer"`, plus an
  `affiliate_click` event (product_id, slot, persona, destination_host).
- Other networks: keep `buildAffiliateUrl` as the single choke point and add their
  params through `extra`, or add a `network` field to products.

## Tests (node --test, no framework)

`package.json`: `"test": "node --experimental-strip-types --test \"lib/**/*.test.ts\""`
Imports inside lib/ use explicit `.ts` extensions and relative paths, and tsconfig sets
`"allowImportingTsExtensions": true`. Update `scoring.test.ts`'s option-count
assertion (`[4, 4, 3, 3]`) and persona names when the data changes.
