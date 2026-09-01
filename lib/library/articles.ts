import type { LibraryArticle } from './types';

/**
 * The Sensory Library.
 *
 * Each entry's `video` is null until a real video has actually been found and
 * checked - see docs/video-library-plan.md for the pending step and why it
 * could not be completed automatically. Never fill this with a guessed video
 * ID, title, channel, or view count.
 */
export const libraryArticles: LibraryArticle[] = [
  {
    slug: 'what-is-a-sensory-diet',
    title: 'What is a sensory diet?',
    dek: 'A plain-language explanation of the term, where it comes from, and why it has nothing to do with food.',
    category: 'routines',
    video: null,
    relatedSlugs: ['what-is-proprioception', 'what-is-vestibular-processing', 'what-is-interoception'],
    faqs: [
      {
        question: 'Is a sensory diet an actual eating plan?',
        answer:
          'No. The name is a deliberate analogy to nutrition, but a sensory diet is a schedule of physical activities and environmental adjustments, not food.',
      },
      {
        question: 'Can I put a sensory diet together myself?',
        answer:
          'General activities can be tried at home, but a sensory diet built for a specific person is normally created with an occupational therapist, who can observe what actually helps that individual rather than guessing from a generic list.',
      },
      {
        question: 'Is a sensory diet only for children?',
        answer:
          'No. Adults use versions of the same idea, often without the formal label - taking a walk before a demanding meeting, or using noise-reducing headphones through a loud commute are everyday examples of the same principle.',
      },
    ],
  },
  {
    slug: 'what-is-proprioception',
    title: 'What is proprioception, and why do kids crave "heavy work"?',
    dek: 'The sense of body position and force, and why pushing, pulling, and carrying often has a calming effect.',
    category: 'movement',
    video: null,
    relatedSlugs: ['heavy-work-activities-at-home', 'what-is-a-sensory-diet', 'what-is-vestibular-processing'],
    faqs: [
      {
        question: 'What does "heavy work" actually mean?',
        answer:
          'It is an informal occupational-therapy term for activities that push, pull, or compress the muscles and joints - carrying, pushing, climbing - which often provide strong proprioceptive input.',
      },
      {
        question: 'Why does squeezing or pushing something feel calming?',
        answer:
          'Strong proprioceptive input appears to have a broadly organizing effect on the nervous system for many people, not just a muscular one, which is why it shows up so often as a regulation strategy.',
      },
    ],
  },
  {
    slug: 'heavy-work-activities-at-home',
    title: 'Heavy work activities to try at home',
    dek: 'Practical, no-equipment ways to build proprioceptive input into an ordinary day.',
    category: 'movement',
    video: null,
    relatedSlugs: ['what-is-proprioception', 'what-is-vestibular-processing'],
    faqs: [
      {
        question: 'When is the best time of day for heavy work?',
        answer:
          'Often before a demanding moment - before homework, a car ride, or a loud event - rather than only after things have already become difficult, though this varies by person.',
      },
      {
        question: 'What if an activity seems to make things worse instead of better?',
        answer:
          'That is useful information rather than a failure. It usually means a different type or amount of input is worth trying, and an occupational therapist can help work out what fits a specific person.',
      },
    ],
  },
  {
    slug: 'what-is-vestibular-processing',
    title: 'What is vestibular processing?',
    dek: 'How the inner ear’s balance system affects movement, posture, and alertness - not just dizziness.',
    category: 'movement',
    video: null,
    relatedSlugs: ['what-is-proprioception', 'heavy-work-activities-at-home', 'what-is-a-sensory-diet'],
    faqs: [
      {
        question: 'Is seeking a lot of movement a problem?',
        answer:
          'Not by itself. Many people find movement organizing and seek it often. It is worth discussing with a professional only if it is intense enough to interfere with daily life.',
      },
      {
        question: 'Why does movement affect focus?',
        answer:
          'The vestibular system is closely tied to alertness and eye tracking, which is part of why brief movement breaks are commonly suggested to support attention.',
      },
    ],
  },
  {
    slug: 'why-kids-refuse-clothing-textures',
    title: 'Why does my child refuse certain clothing textures?',
    dek: 'Why a tag or a seam can trigger real distress, and practical adjustments that usually help more than persuasion.',
    category: 'touch',
    video: null,
    relatedSlugs: ['what-is-tactile-defensiveness'],
    faqs: [
      {
        question: 'Is refusing certain clothes just being difficult?',
        answer:
          'Usually not. For a tactile-sensitive nervous system, certain textures can register as genuinely uncomfortable or painful, not merely disliked.',
      },
      {
        question: 'What actually helps most?',
        answer:
          'In practice, changing the clothing - tagless items, seamless socks, a small trusted rotation - tends to work far better than trying to persuade the sensation away.',
      },
    ],
  },
  {
    slug: 'what-is-tactile-defensiveness',
    title: 'What is tactile defensiveness?',
    dek: 'A strong reaction to ordinary touch, and when it is - and is not - worth raising with a professional.',
    category: 'touch',
    video: null,
    relatedSlugs: ['why-kids-refuse-clothing-textures', 'what-is-a-sensory-diet'],
    faqs: [
      {
        question: 'Is tactile defensiveness a diagnosis?',
        answer:
          'No. It is a descriptive term for a pattern of touch sensitivity, not a stand-alone diagnosis. It is worth raising with a professional when it meaningfully interferes with daily life.',
      },
      {
        question: 'Why does firm pressure feel better than light touch?',
        answer:
          'Sustained, firm pressure is commonly tolerated better than light or unpredictable touch by people with tactile sensitivity, which is why deep-pressure tools are often suggested alongside other strategies.',
      },
    ],
  },
  {
    slug: 'why-loud-noises-are-distressing',
    title: 'Why are loud or unexpected noises so distressing?',
    dek: 'Auditory sensitivity explained, and why the same person can also seek sound out in other moments.',
    category: 'sound',
    video: null,
    relatedSlugs: ['what-is-a-sensory-diet'],
    faqs: [
      {
        question: 'Is this the same as just disliking loud noise?',
        answer:
          'It can be more intense than ordinary dislike - closer to genuine overwhelm or pain for some people - though sensitivity exists on a wide spectrum.',
      },
      {
        question: 'Can the same person both avoid and seek sound?',
        answer:
          'Yes. Avoiding overwhelming noise while also seeking out music, humming, or background sound in other moments is a common, non-contradictory pattern.',
      },
    ],
  },
  {
    slug: 'what-is-interoception',
    title: 'What is interoception?',
    dek: 'The internal body sense behind hunger, thirst, and noticing an emotion before it peaks.',
    category: 'overwhelm',
    video: null,
    relatedSlugs: ['what-is-a-sensory-diet'],
    faqs: [
      {
        question: 'How is interoception related to meltdowns?',
        answer:
          'Noticing an emotion building relies on interoception. When that awareness is less precise, the first clear sign can be the meltdown itself, without an earlier stage anyone could intervene on.',
      },
      {
        question: 'Can interoceptive awareness be built up over time?',
        answer:
          'Many approaches work on strengthening the link between body signals and their meaning, such as scheduled check-ins rather than waiting for a clear signal, though this is usually most effective guided by a professional.',
      },
    ],
  },
];

export function findLibraryArticle(slug: string): LibraryArticle | null {
  return libraryArticles.find((a) => a.slug === slug) ?? null;
}

export function allLibrarySlugs(): string[] {
  return libraryArticles.map((a) => a.slug);
}
