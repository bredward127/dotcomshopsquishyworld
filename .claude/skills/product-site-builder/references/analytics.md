# Analytics wiring

## Google (gtag) with Consent Mode
- Root layout (templates/app/layout.tsx): inline `gtag('consent','default',{…denied…})`
  *before* the gtag.js `<Script>`; ID from `NEXT_PUBLIC_GOOGLE_TAG_ID`.
- `ConsentBanner` writes `sam.consent.v1` to localStorage, calls
  `gtag('consent','update',…)`, dispatches `sam:consent-granted`, and captures UTMs.
- `track(event, params, { once })` checks the allowlist, consent and sanitizer.
  Debug with `?analytics_qa=1` (logs to the console and `window.__samAnalytics`).

## Events (allowlist in lib/analytics/events.ts)

All archetypes: `cta_click {cta_id}`, `outbound_click {link_id, slot, destination_host}`,
`lead_submit {form_id}`. GA's own page_view covers views.

### Quiz events
| Event | When | Params |
|---|---|---|
| `view_quiz` | /quiz viewed (RouteEvents) | none |
| `quiz_start` | First answer | none |
| `quiz_step` | Every answer | `step` |
| `quiz_complete` | Results shown | `persona` |
| `affiliate_click` | Any product CTA | `product_id`, `slot`, `persona`, `destination_host` |

Funnel ratios to report: views→starts, step1→step4, starts→completes,
completes→clicks by slot. Revenue comes from Associates sub-tag reports.

## Vercel Web Analytics
- `npm i @vercel/analytics`; render `<VercelAnalytics />` (wraps `<Analytics beforeSend>`)
  in the root layout.
- `beforeSend` returns null without consent and scrubs the URL. The user must also click
  **Enable** in the project's Vercel Analytics tab. Data appears after the deploy.
- Custom events need Vercel Pro, so keep funnel events in Google.
- If the user wants Vercel to count everyone (it is cookieless), that changes the
  banner and privacy wording. Ask them first; don't decide for them.
