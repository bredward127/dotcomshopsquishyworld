# Sensory Library — plan and status

All 20 articles are written, cross-linked, and live at `/library/[slug]`,
each with a real, verified video embedded.

| # | Slug | Question |
|---|---|---|
| 1 | `what-is-a-sensory-diet` | What is a sensory diet, and how is it different from an actual diet? |
| 2 | `what-is-proprioception` | What is proprioceptive input, and why do some kids crave "heavy work"? |
| 3 | `heavy-work-activities-at-home` | What are good heavy work activities to do at home? |
| 4 | `what-is-vestibular-processing` | What is vestibular processing, and how does it affect balance and focus? |
| 5 | `why-kids-refuse-clothing-textures` | Why does my child refuse certain clothing textures or tags? |
| 6 | `what-is-tactile-defensiveness` | What is tactile defensiveness, and is it something to worry about? |
| 7 | `why-loud-noises-are-distressing` | Why are loud or unexpected noises so distressing? |
| 8 | `what-is-interoception` | What is interoception, and how does it affect emotional regulation? |
| 9 | `tools-for-sound-sensitivity` | What kinds of tools actually help with sound sensitivity? |
| 10 | `sound-friendly-classroom-strategies` | How can a classroom be made more sound-friendly for sensitive students? |
| 11 | `why-fluorescent-lights-feel-overwhelming` | Why do fluorescent lights or busy visual environments feel overwhelming? |
| 12 | `how-to-set-up-a-low-stimulation-space` | What is a "low-stimulation" space, and how do you set one up? |
| 13 | `what-is-oral-sensory-seeking` | What is oral sensory seeking, and why does my child chew on everything? |
| 14 | `safe-chewable-sensory-tools` | What are safe chewable/oral sensory tools, and when should you use them? |
| 15 | `helping-a-picky-eater-with-food-textures` | How can I help a picky eater who avoids certain food textures? |
| 16 | `why-kids-spin-rock-and-seek-movement` | Why does my child spin, rock, or seek constant movement? |
| 17 | `safe-movement-activities-during-the-day` | What are safe ways to give a sensory-seeking child more movement? |
| 18 | `why-pushing-and-squeezing-feels-calming` | Why does pushing, carrying, or squeezing something feel calming? |
| 19 | `why-kids-miss-hunger-thirst-bathroom-signals` | Why does my child struggle to notice hunger, thirst, or the bathroom? |
| 20 | `building-body-awareness-as-an-adult` | How can adults build better body-awareness and self-regulation skills? |

## Videos

Every video was found via a real search against the YouTube Data API
(`googleapis.com` - reachable from this environment, unlike `youtube.com`
itself) using the `YOUTUBE_API_KEY` supplied directly in chat, never
committed anywhere. For each topic, candidates were pulled with view
counts, then the actual titles and channels were reviewed by hand and the
most topically precise, appropriately-sourced match was picked - not
simply the highest view count. A few times that meant passing over the
top result: a "fluorescent lights" search returned an unrelated decorative
LED-lights video as the top hit, and several searches returned branded
product-demo videos (e.g. a specific earplug or chew-toy brand) that were
skipped in favor of educational content, since the articles themselves
say they don't recommend specific products. No two articles share the
same video.

`videoId`, `title`, `channel`, and `viewCountAtSelection` (with the date
checked) are recorded on every entry in `lib/library/articles.ts`. Videos
render via `youtube-nocookie.com` embeds, with the channel credited and a
line stating the video is independent of this site and its presence isn't
an endorsement.

## What's in place

Route structure, internal link mesh, SEO metadata, `Article` JSON-LD,
sitemap entries (21: the index plus all 20 articles), nav, and now video
embeds - the Sensory Library section is complete end to end.

## Batch 2 — school, provider-questions, and adult sections

Added to close out three nav sections that were still "Coming soon"
placeholders: `/families/school-support`, `/find-help/what-to-ask`, and
`/for-adults`. Each is now a real landing page linking to 2-3 new Sensory
Library articles, keeping the recommendation in place rather than removing
it, per the standing instruction not to walk back a recommended section -
just build the articles behind it.

| # | Slug | Question | Landing page |
|---|---|---|---|
| 21 | `how-school-based-ot-works` | How does school-based occupational therapy work? | `/families/school-support` |
| 22 | `classroom-sensory-accommodations` | What sensory accommodations are common in classrooms? | `/families/school-support` |
| 23 | `talking-to-a-teacher-about-sensory-needs` | How to talk to a teacher about your child's sensory needs | `/families/school-support` |
| 24 | `questions-about-cost-insurance-and-scheduling` | What to ask about cost, insurance, and scheduling | `/find-help/what-to-ask` |
| 25 | `questions-about-approach-and-experience` | What to ask about a therapist's approach and experience | `/find-help/what-to-ask` |
| 26 | `workplace-sensory-accommodations` | What sensory accommodations are available in the workplace? | `/for-adults` |
| 27 | `adult-sensory-assessment-what-to-expect` | Getting a sensory assessment as an adult: what to expect | `/for-adults` |
| 28 | `sensory-friendly-daily-routines-for-adults` | Sensory-friendly daily routines for adults | `/for-adults` |

**One article has no video.** `questions-about-approach-and-experience`
searched genuinely (see the query in the search script this batch was
built with) but every real result was either an OT-school career/interview
video aimed at students choosing a college major, or unrelated - nothing
addressed a family or patient choosing a provider. Rather than attach an
irrelevant video to hit a quota, `video` stays `null` and the page shows
the same honest placeholder as everything else on this site does when a
real match doesn't exist. All 7 other videos in this batch are real,
verified, and distinct from every video used in batch 1 - checked
programmatically before the commit that added them.

Also added: a visible `/sitemap` page (distinct from the machine-readable
`/sitemap.xml`), linked from the footer next to About/Privacy/Disclosure.

## Batch 3 — sleep and travel

Two more articles, inspired by search-query themes from an external
keyword-research tool the user reviewed (sleep and travel came up as
distinct, non-redundant, non-product topics worth covering) - not tied to
any new nav section, cross-linked into the existing mesh instead.

| # | Slug | Question | Category |
|---|---|---|---|
| 29 | `sensory-friendly-sleep-routines` | How can bedtime be made more sensory-friendly? | `routines` |
| 30 | `sensory-friendly-travel-tips` | How can travel be made easier for sensory sensitivities? | `overwhelm` |

Both videos were found the same way as every other article: real search
against the YouTube Data API, candidates reviewed by hand for genuine
topical fit rather than picking the top result. The sleep video
(`gRy6BlrBgpQ`, Harkla) and travel video (`RnnxEw0sb3w`, Kaelynn Partlow)
are both distinct from every other video ID used across the library -
checked programmatically before this batch's commit.

## Batch 4 — grounding techniques and smell sensitivity

Two more, from a second batch of external keyword-research topics the
user reviewed. Most of that list was redundant with content already
built (sleep, travel, vestibular health, low-stimulation spaces, noise
sensitivity) or too wellness-trend/product-flavored to fit the site
("Somatosensory Yoga: Healing Through Movement," "Olfactory Healing:
Essential Oils for Nervous System Balance," "The Nervous System Reset
Nutrition Guide," "The Sensory Parenting Emergency Manual"). Two topics
were genuinely new and safely scoped once reframed away from that
framing:

| # | Slug | Question | Category |
|---|---|---|---|
| 31 | `hand-based-grounding-techniques` | What are hand-based grounding techniques, and why do they work? | `overwhelm` |
| 32 | `why-certain-smells-feel-overwhelming` | Why do certain smells feel so overwhelming? | `overwhelm` |

`hand-based-grounding-techniques` reframes "Tactile Therapy: Hand-Based
Grounding Techniques" away from a "therapy" claim into a plain
description of a real, common self-regulation strategy. `why-certain-
smells-feel-overwhelming` reframes "Olfactory Healing: Essential Oils
for Nervous System Balance" away from essential-oils wellness framing
entirely into a smell-sensitivity article - the same kind of piece as
the existing sound and light articles, for a sensory channel the
library hadn't covered yet.

Videos: `30VMIEmA114` (The Partnership In Education, the well-known
5-4-3-2-1 grounding method) and `TJtoYAqqDSw` (Nancy "Sensory Smart
Parent" Peske, a smell-sensitivity intervention video aimed at
parents) - both found via real YouTube Data API search, reviewed by
hand, and confirmed distinct from every other video ID in the library.
