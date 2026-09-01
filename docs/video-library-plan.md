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
