# Intake: profile the product before choosing anything

Fill this in from the user's message, attachments, and repo. Ask only for the
fields that change the archetype or compliance and that you cannot infer. One short
question round at most; otherwise state your assumptions and proceed.

```yaml
product:
  what: ""              # e.g. "slow-rise squishy toys", "cold brew concentrate", "roof repair"
  vertical: ""          # one of the rows in verticals.md
  catalog: single | few (2-5) | many-similar (6+) | services
  price_point: impulse (<$30) | considered ($30-$200) | high ($200+) | quote-based
  differentiation: obvious | needs-explaining | personal-fit   # personal-fit → quiz
monetization: affiliate | own-checkout | lead-gen | subscription | waitlist
audience:
  who: ""
  awareness: problem-unaware | problem-aware | solution-aware | product-aware
traffic: paid-social | search | organic-social | email | mixed
regulated: none | health-adjacent | supplements | kids | finance | alcohol-cbd | other
assets:
  photos: none | some | full
  reviews: none | real-and-verifiable          # never invent; see compliance.md
  brand: existing-guidelines | example-site | none
deliverables: [page, marketing-guide, ads-angles]
```

## Signals → decisions
- **many-similar + personal-fit** → quiz funnel. Choice paralysis is the problem.
- **single or few + needs-explaining + paid-social** → landing page (or an advertorial in front of it).
- **affiliate + search + multiple brands** → comparison / best-of.
- **services or quote-based** → lead-gen.
- **existing catalog + repeat purchase** → collection page (sections: hero, product grid, FAQ).
- **pre-launch** → waitlist (hero + lead form with `formId: 'waitlist'`).
- **problem-unaware cold traffic** → advertorial story first, then route to the landing or quiz.
- **No photos** → icon/gradient tiles (both the quiz and the section kit support them). Never use stock imagery
  that pretends to be the product.
