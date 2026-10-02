# Section library (`templates/sections/components/sections/`)

All are server components except LeadForm. They take plain data, use only `brand-*`
tokens, and track clicks through `TrackedLink` (cta_click internal, outbound_click external).

| Section | Props (essentials) | Notes |
|---|---|---|
| `AnnouncementBar` | text, link? | Affiliate disclosure or a true offer |
| `SiteHeader` | brand, badge?, cta? | Logo blob uses accent → accent2 gradient |
| `Hero` | eyebrow?, title, accent?, subtitle, cta, secondary?, bullets?, imageUrl? | `accent` must be a substring of `title` |
| `ProofBar` | items[{icon,label}] | 4 true statements; no invented counts |
| `ProblemSolution` | title, problems[{icon,title,body}], solution{title,body} | Pain points in customer words |
| `FeatureGrid` | title, items[{icon,title,body}] | 3 or 6 items look best |
| `HowItWorks` | steps[{title,body}] | Auto-numbered 01/02/03 |
| `DarkBand` | title, body, highlight? | Mid-page contrast |
| `ProductGrid` | products[ProductItem], slot | `featured` inverts; rating only if rating+reviewCount set |
| `ComparisonTable` | columns, rows[{label, values}], highlight? | boolean → check/dash; stacked on mobile |
| `Faq` | items[{q,a}] | Native details/summary |
| `PromiseBox` | eyebrow?, title, body | Only promises the business honors |
| `FinalCta` | title, body?, cta | Repeat the hero promise |
| `SiteFooter` | brand, disclosures[{title,body}], links | Disclosures before links |
| `LeadForm` (client) | id, fields, consentLabel, submitLabel, action? | Posts to /api/lead; requires consent checkbox |
| `Button` | cta, slot, variant | solid / outline / inverse |

Icons: pass Lucide components directly in data files (`icon: Truck`); fine because
pages and sections are server components.

Adding a section: keep it data-driven, use only `brand-*` tokens, mobile-first, with
no client JS unless needed, then add it to this table.
