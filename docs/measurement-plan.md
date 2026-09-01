# Measurement plan

What this site measures, why, and what it deliberately does not.

## Principles

1. **Nothing is measured until someone consents.** Google Consent Mode defaults
   are set to denied in the document *before* `gtag.js` loads. Declining is the
   state the page starts in, not something applied afterwards.
2. **Events are an allowlist.** `lib/analytics/events.ts` declares every
   permitted event and every permitted parameter. `sanitizeParams` drops
   anything else — an unlisted parameter is discarded, not sent.
3. **Free text never leaves the site.** Questions typed on `/ask`, the city or
   ZIP typed into the directory filter, and anything resembling an email
   address, phone number, or SSN are rejected by the sanitizer regardless of
   which parameter they appear in.
4. **No health information reaches an advertising platform.** No event carries
   a condition, a symptom, a diagnosis, or anything a person typed about
   themselves or a child.

## Configuration

| Setting | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_TAG_ID` | `AW-10803481355` | Loaded once in the root layout via `next/script`, `afterInteractive` |
| `NEXT_PUBLIC_ANALYTICS_QA` | unset | Set to `1` in development for the QA mode below |

## Events

Every event below fires client-side to Google Analytics / Google Ads via
`gtag`, and **all of them require analytics consent**. There is no event that
fires without it.

| Event | Trigger | Parameters | Business question |
|---|---|---|---|
| `view_home` | Home page viewed | *(none)* | Is the entry page reaching people at all? |
| `start_ask_flow` | `/ask` form submitted | `audience`, `topic` (enums) | Which audiences and topics do people actually come for? |
| `view_resource` | `/resources` viewed | `resource_id` | Is the resource section worth expanding? |
| `outbound_resource_click` | An external resource link clicked | `resource_id`, `destination_host` | Are the outside links useful enough to click? |
| `directory_search` | Directory filters changed (debounced 600ms) | `has_location` (bool), `service`, `age_group`, `referral_status`, `result_count` | Which services and areas are in demand, and how often do we return nothing? |
| `view_provider` | A provider profile viewed | `provider_slug` | Which listings get attention? |
| `click_provider_phone` | Call button clicked | `provider_slug` | Do listings produce real contact? |
| `click_provider_website` | Website button clicked | `provider_slug`, `destination_host` | As above, for web referrals |
| `start_lead_request` | Lead form opened | `provider_slug` | **Not implemented** — no lead form exists yet |
| `submit_lead_request` | Lead form submitted | `provider_slug` | **Not implemented** — no lead form exists yet |
| `view_for_providers` | `/for-providers` viewed | *(none)* | Is the provider pitch getting seen? |
| `provider_interest_submit` | Provider contact link used | `method` (`mailto`) | Are providers actually reaching out? |

### Deliberately not sent

| Data | Why |
|---|---|
| The question typed on `/ask` | Free text, may contain health information about a child |
| The city/ZIP typed into the directory | Quasi-identifying; `has_location` answers the question instead |
| Any email address or phone number | Directly identifying |
| Provider phone numbers | Not needed; `provider_slug` identifies the listing |
| Full outbound URLs | Hostname only, so query strings cannot carry anything along |

## Consent and disclosure

- **Default:** `ad_storage`, `ad_user_data`, `ad_personalization`, and
  `analytics_storage` all start `denied`, with `wait_for_update: 500`.
- **Banner:** a choice between Allow and Decline. There is no pre-ticked box
  and no "reject" hidden behind a second screen. Declining costs the visitor
  nothing on this site.
- **Storage:** the choice is kept in `localStorage` under `sam.consent.v1`. If
  storage is unavailable the choice applies to that page view only, and the
  default stays denied.
- **Disclosure:** `/privacy` describes what loads, what it collects, and how to
  decline.

## Attribution (UTM and gclid)

- Captured **only after** analytics consent is granted.
- Held in `sessionStorage` (`sam.attribution.v1`), so it is gone when the tab
  closes, and additionally expires after **30 days**
  (`ATTRIBUTION_MAX_AGE_DAYS`).
- Values must match a plain campaign-token pattern; anything else is discarded.
- Read **only** when a lead request is submitted. It is never attached to page
  views and never sent to an ad platform on its own.
- **No lead request endpoint exists yet**, so nothing is currently persisted
  server-side. When one is built, attribution is stored on the
  `lead_requests` row and deleted with it — see `docs/data-model.md`, which
  requires a retention period and scheduled deletion before that table is
  created.

## QA mode

Set `NEXT_PUBLIC_ANALYTICS_QA=1`, append `?analytics_qa=1` to any URL, or set
`sessionStorage['sam.analytics.qa'] = '1'`.

Every call to `track()` then logs its decision to the console and appends to
`window.__samAnalytics`, including calls that were **blocked** and why
(`unknown_event`, `no_consent`, `no_gtag`, `duplicate`). This makes it possible
to confirm what did *not* fire, which is usually the more important question.

```js
// In the browser console:
window.__samAnalytics.filter((e) => e.result.sent);
window.__samAnalytics.filter((e) => !e.result.sent);
```

## Duplicate suppression

Page-scoped view events pass `{ once: true }`. Dedupe state is keyed to the
current pathname and cleared when the path changes, so:

- a re-render, a React Strict Mode double-effect, or a shallow URL change
  cannot produce a second event;
- navigating away and genuinely returning later does fire again, because that
  is a real second view.

Covered by tests in `lib/analytics/track.test.ts`.

---

## Placeholders — not configured, not code

Nothing below exists in the codebase. These are the values that will be needed,
recorded here so no one invents one. **Do not fabricate any of these IDs.**

### Google Ads conversion actions

| Conversion action | Conversion ID | Conversion label | Status |
|---|---|---|---|
| Provider interest submitted | `AW-10803481355` | *(not created)* | Needs creating in Google Ads |
| Lead request submitted | `AW-10803481355` | *(not created)* | Blocked — no lead form exists |
| Provider phone click | `AW-10803481355` | *(not created)* | Optional |

A conversion action needs **both** the account ID and a per-action label
(`AW-XXXXXXXXXX/AbC-D_efGh`). The account ID alone fires nothing. No label has
been created, so no `conversion` call exists anywhere in the code.

### Meta

| Item | Value | Status |
|---|---|---|
| Meta Pixel ID | *(not provided)* | No pixel code in the repository |
| Conversions API access token | *(not provided)* | Server-side only if added; never `NEXT_PUBLIC_` |
| Conversions API test event code | *(not provided)* | |
| Dataset ID | *(not provided)* | |

Note: Meta's terms restrict sending health-related data. Given this site's
subject matter, a pixel on `/ask` or a provider profile would need a careful
look before it is added — that is a decision to make deliberately, not by
dropping in a snippet.

### Cookie consent configuration

| Item | Current | Future |
|---|---|---|
| Consent storage key | `sam.consent.v1` | Bump the version to re-prompt |
| Categories | analytics, ads | Split if a third-party CMP is adopted |
| Re-prompt interval | none | Decide a period (commonly 6–12 months) |
| CMP vendor | none — first-party banner | Only needed if a certified CMP becomes a requirement |
| Region gating | none — banner shown to everyone | Could be narrowed if geolocation is added |

### Not doing

No campaign has been created, activated, or funded. No budget, bid, audience,
or ad exists. Nothing in this repository can spend money.
