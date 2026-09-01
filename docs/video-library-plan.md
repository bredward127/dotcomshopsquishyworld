# Sensory Library — plan and status

## The 20-question master list

Organized by sensory channel (Wilbarger model), for building out over several
batches. Each becomes a `/library/[slug]` page: question, original article,
FAQ, one verified video.

### Batch 1 — shipped

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

### Not yet built (batches 2+)

| # | Question | Channel |
|---|---|---|
| 9 | What kinds of tools actually help with sound sensitivity? | Auditory |
| 10 | How can a classroom be made more sound-friendly for sensitive students? | Auditory |
| 11 | Why do fluorescent lights or busy visual environments feel overwhelming? | Visual |
| 12 | What is a "low-stimulation" space, and how do you set one up? | Visual |
| 13 | What is oral sensory seeking, and why does my child chew on everything? | Oral-motor |
| 14 | What are safe chewable/oral sensory tools, and when should you use them? | Oral-motor |
| 15 | How can I help a picky eater who avoids certain food textures? | Tactile / oral-motor |
| 16 | Why does my child spin, rock, or seek constant movement? | Vestibular |
| 17 | What are safe ways to give a sensory-seeking child more movement during the day? | Vestibular |
| 18 | Why do pushing, carrying, or squeezing something feel calming? | Proprioception |
| 19 | Why does my child struggle to notice hunger, thirst, or the need for the bathroom? | Interoception |
| 20 | How can adults build better body-awareness and self-regulation skills? | Interoception / adult |

## Video status — action needed

**None of the 8 shipped articles have a video.** `lib/library/articles.ts` has
`video: null` on every entry, and `components/library/VideoSlot.tsx` renders
an honest "not chosen yet" placeholder instead.

This is not an oversight - it's because this environment's network egress
proxy blocks `youtube.com`, `googleapis.com`, and YouTube's oEmbed endpoint
outright, and no `YOUTUBE_API_KEY` is configured either. There was no way to
find or verify a real video, its title, its channel, or its view count from
here. Filling those fields in without verification would mean guessing a
video ID and inventing a view count - exactly the kind of fabrication this
site has been built from the start to avoid, so the fields were left empty
rather than filled with something that looks real but isn't.

### To close this out, pick one:

1. **Send me 8 video URLs.** One per article above, each with 100k+ views
   confirmed on your end. I'll fill in `video` on each entry in
   `lib/library/articles.ts` and re-embed - about five minutes of work, no
   rebuild of anything else.
2. **Set `YOUTUBE_API_KEY` in Vercel.** Doesn't wire itself in automatically
   for the library (only `/api/videos` on the `/ask` page uses it today), but
   once it's set, a follow-up pass can extend the same search-and-verify
   pattern to these 8 slugs.
3. **Wait until this session (or a future one) has real network access to
   YouTube** and can search and verify directly.

## What's already in place either way

Route structure, internal link mesh, SEO metadata, `Article` JSON-LD,
sitemap entries, and nav are all built and live regardless of the video
question - the articles are complete and published as text-only until a
video is added.
