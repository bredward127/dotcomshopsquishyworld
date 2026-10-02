# Monetization mechanics

## Affiliate (Amazon or any network)
- `lib/links.ts → buildLink(target, options)` is the only way to make outbound URLs.
  - Amazon: `{ kind: 'amazon', asin? , query? }` + `amazonTag` + `sub` → `tag=` and `ascsubtag=`.
  - Others: `{ kind: 'url', url }` + `params` (e.g. `{ ref: 'id' }`) + `sub` & `subParam` (e.g. `subid`).
- Sub-tag convention: `site_<page-or-persona>_<slot>[_<utm_source>_<utm_campaign>]`. Add campaign tokens only
  when analytics consent exists (`readAttribution()` returns null otherwise).
- Mark links `sponsored: true` (rel="sponsored", new tab, "Affiliate link" note).
- Amazon specifics (no prices, no rehosted images, disclosure wording) are in compliance.md.
- The quiz archetype has its own `lib/quiz/affiliate.ts` with the same rules.

## Own checkout
- Shopify: Buy Button / checkout permalink (`https://<store>/cart/<variantId>:1`) as a `kind: 'url'` link.
- Stripe: Payment Links (`https://buy.stripe.com/...`). No server code needed.
- Prices may be shown when they are the seller's own prices; keep them in one data field.

## Lead-gen
- `LeadForm` → `app/api/lead/route.ts` → `LEAD_WEBHOOK_URL` (Zapier/Make/CRM/Slack).
  No storage, no logging of personal data. It returns an honest 503 until configured.
- Analytics get `lead_submit {form_id}` only.
- Update the privacy page with what is collected, why, and where it goes.

## Subscription / waitlist
- Waitlist = LeadForm with an email field and `id="waitlist"`. Promise only what you will send.
