# Sensory Library — plan and status

## The 20-question master list

All 20 are now written and live at `/library/[slug]`, organized by sensory
channel (Wilbarger model).

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

## Video status — action needed

**None of the 20 articles have a video yet.** Every `video` field in
`lib/library/articles.ts` is `null`, and `VideoSlot` renders an honest
"not chosen yet" placeholder on every page instead.

Per the latest instruction, videos no longer need a 100k+ view threshold -
any real, relevant video is fine. What still isn't negotiable: no guessed
video ID, title, channel, or fabricated data. Confirmed this session:
`googleapis.com` (the actual YouTube Data API) is reachable from this
environment - it returned a genuine "API key not valid" response rather
than a network block - so a real key unlocks real search and verification
directly from here. `youtube.com` itself (browsing, oEmbed) stays blocked.

### To close this out

Paste the `YOUTUBE_API_KEY` value in chat (already set in Vercel, but that
copy isn't visible to this session). Once supplied, each of the 20 articles
gets a real search against the YouTube Data API, a genuine video ID, title,
and channel name filled in, and the placeholder replaced with a real
embed - no guessing, no invented data.

## What's already in place either way

Route structure, internal link mesh (each article cross-links 2-4 related
articles plus relevant non-library pages), SEO metadata, `Article` JSON-LD,
sitemap entries (21: the index plus all 20 articles), and nav are all built
and live regardless of the video question - all 20 articles are complete
and published as text-only until videos are added.
