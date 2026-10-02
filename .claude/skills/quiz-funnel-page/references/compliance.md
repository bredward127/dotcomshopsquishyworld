# Compliance and honesty rules (non-negotiable)

These kept the original build publishable. Apply them even when a spec asks otherwise,
and tell the user what you substituted and why.

## Never invent social proof or facts
- No made-up ratings, review counts, testimonials, customer counts ("10,000+ happy
  customers"), match counters, or "as seen in". `rating`/`reviewCount` stay unset
  until the user copies real figures from a live listing; the UI hides them when unset.
- No unverifiable product claims ("Non-Toxic", "Tested for X", "Doctor recommended")
  for third-party products. Replace them with true statements about the page itself:
  "No email required", "Answers stay on this device", "Affiliate links always labeled",
  "Commission never picks your match".
- No fake urgency or fake discounts.
- Never fabricate ASINs or product URLs. Use tagged searches (`amazonQuery`) until the
  user picks real listings, then swap in their ASINs.

## Amazon Associates
- Show "As an Amazon Associate we earn from qualifying purchases." in the top strip
  and the footer, and label every CTA as an affiliate link.
- **Do not show prices.** Amazon restricts showing prices not from its Product
  Advertising API. CTAs read "See price on Amazon".
- Do not hotlink or rehost Amazon product photos. Use the user's own photos, licensed images,
  or the pastel icon tiles.
- Paid ads go to the funnel page, never straight to Amazon. No bidding on Amazon trademarks.
  No affiliate links in emails, PDFs or offline material.
- Remind the user not to buy through their own tag.

## Health-adjacent products (sensory, wellness, supplements, skincare)
- Products are "comfort tools" or similar. Never claim they treat, cure or manage a condition
  (anxiety, ADHD, autism, SPD, eczema...). Add a not-medical-advice line to the
  results and footer.
- Ad copy must not assert personal attributes ("Do you have anxiety?").
  Meta and Google restrict health-based targeting.

## Privacy and consent
- Analytics (Google and Vercel) send nothing until the visitor clicks Allow. Consent Mode
  defaults are set to denied *before* gtag.js loads.
- Events are an allowlist (`lib/analytics/events.ts`). Never send individual quiz
  answers when a question touches health. Send the step number and the profile only.
- URLs sent to Vercel are scrubbed to path + plain `utm_*` (`lib/analytics/vercel.ts`).
- The saved result lives in localStorage on the device, and Retake deletes it. Say so on the
  privacy page.
- If the site already has a disclosure or privacy page that says "no affiliate links",
  update it in the same change.
