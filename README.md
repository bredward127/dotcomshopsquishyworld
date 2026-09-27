# Sensory Access Michigan

A mobile-first, local sensory-support navigation hub for Metro Detroit and Southeast Michigan. This project provides general educational information, reputable external resources, and local-service discovery. It is not a medical provider, diagnostic tool, crisis service, or therapy practice.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Run `npm install`.
3. Run `npm run dev`.

Do not commit secrets.

## SquishyWorld Sensory Match quiz

`/quiz` is a four-question product-finder funnel with its own chrome
(`app/(quiz)`), separate from the Sensory Access Michigan pages (`app/(site)`).

- Questions, personas, and products: `data/quizData.ts`
- Scoring and the three-tier picks: `lib/quiz/scoring.ts`
- Affiliate links (`tag`, `ascsubtag`, extra params): `lib/quiz/affiliate.ts`
- Saved result for returning visitors (localStorage `sw.quiz.v1`): `lib/quiz/storage.ts`
- UI: `components/quiz/`

To point a product at a specific listing, set its `asin`. Only fill `rating`
and `reviewCount` with figures copied from the live listing.
Marketing playbook: `docs/marketing/`.
