import type { LibraryArticle } from './types';

/**
 * The Sensory Library.
 *
 * Every `video` was found and verified via the real YouTube Data API - each
 * videoId, title, channel, and view count is genuine, checked at selection
 * time (see viewCountAtSelection). None of this was guessed. See
 * docs/video-library-plan.md for how each one was picked.
 */
export const libraryArticles: LibraryArticle[] = [
  {
    slug: 'what-is-a-sensory-diet',
    title: 'What is a sensory diet?',
    dek: 'A plain-language explanation of the term, where it comes from, and why it has nothing to do with food.',
    category: 'routines',
    video: {
      videoId: '9o9NMAyaDUM',
      title: '5-Step Recipe for a Sensory Diet (OT Tips for Parents & Teachers)',
      channel: 'Harkla - Parenting & Child Development Tips',
      viewCountAtSelection: '21,404 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-proprioception', 'what-is-vestibular-processing', 'what-is-interoception', 'how-to-set-up-a-low-stimulation-space'],
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
    video: {
      videoId: 'AHdCj8sWtV0',
      title: '5 Ways to Use Proprioception for Calming and Regulation | Occupational Therapy Tips',
      channel: 'Harkla - Parenting & Child Development Tips',
      viewCountAtSelection: '67,055 (checked 2026-09-01)',
    },
    relatedSlugs: ['heavy-work-activities-at-home', 'what-is-a-sensory-diet', 'what-is-vestibular-processing', 'why-pushing-and-squeezing-feels-calming'],
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
    video: {
      videoId: 'oRJb12ZtWbg',
      title: 'Heavy Work Activities to Regulate Children',
      channel: 'T.E.A.M. 4 Kids Pediatric Therapy',
      viewCountAtSelection: '117,105 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-proprioception', 'what-is-vestibular-processing', 'safe-movement-activities-during-the-day', 'why-kids-spin-rock-and-seek-movement'],
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
    video: {
      videoId: '1AZnFszUroI',
      title: 'The vestibular system, balance, and dizziness | Processing the Environment | MCAT | Khan Academy',
      channel: 'khanacademymedicine',
      viewCountAtSelection: '682,238 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-proprioception', 'heavy-work-activities-at-home', 'what-is-a-sensory-diet', 'why-kids-spin-rock-and-seek-movement', 'safe-movement-activities-during-the-day'],
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
    video: {
      videoId: 'o53pU2RmxV8',
      title: 'Sensory clothes for comfort and regulation! #autistickid #adaptiveclothing #sensoryfriendly',
      channel: 'Sense-ational You',
      viewCountAtSelection: '44,650 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-tactile-defensiveness', 'helping-a-picky-eater-with-food-textures'],
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
    video: {
      videoId: 'baO9vLlHh5s',
      title: 'What is Sensory Processing Disorder? | Kati Morton',
      channel: 'Kati Morton',
      viewCountAtSelection: '319,080 (checked 2026-09-01)',
    },
    relatedSlugs: ['why-kids-refuse-clothing-textures', 'what-is-a-sensory-diet', 'what-is-oral-sensory-seeking'],
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
    video: {
      videoId: '_C2QJPjS2a0',
      title: 'What Does Overstimulation Sound Like To Someone With Autism? (PLEASE WATCH THIS WITH HEADPHONES ON)',
      channel: 'Scott Christian Sava',
      viewCountAtSelection: '433,801 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-a-sensory-diet', 'tools-for-sound-sensitivity', 'sound-friendly-classroom-strategies'],
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
    video: {
      videoId: '0abA8gh3eZ8',
      title: 'What is Interoception? - Science, Simplified',
      channel: 'Scripps Research',
      viewCountAtSelection: '36,147 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-a-sensory-diet', 'why-kids-miss-hunger-thirst-bathroom-signals', 'building-body-awareness-as-an-adult'],
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
  {
    slug: 'tools-for-sound-sensitivity',
    title: 'What kinds of tools actually help with sound sensitivity?',
    dek: 'The categories of noise-reducing and sound-softening tools people use, without recommending specific brands.',
    category: 'sound',
    video: {
      videoId: 'lRneH882ank',
      title: 'Should Autistic Kids Wear Noise Canceling Headphones 24/7?',
      channel: 'Pediatric Constellations ',
      viewCountAtSelection: '44,214 (checked 2026-09-01)',
    },
    relatedSlugs: ['why-loud-noises-are-distressing', 'sound-friendly-classroom-strategies'],
    faqs: [
      {
        question: 'Are noise-cancelling headphones or earplugs better?',
        answer:
          'It depends on the need. Noise-cancelling headphones work well against steady, low-frequency noise; earplugs reduce volume evenly without blocking sound out entirely. Trying both is reasonable.',
      },
      {
        question: 'Do these tools work for everyone?',
        answer:
          'No single tool works for everyone. Comfort and a willingness to actually wear or use the tool usually matters more than its technical specifications.',
      },
    ],
  },
  {
    slug: 'sound-friendly-classroom-strategies',
    title: 'How can a classroom be made more sound-friendly?',
    dek: 'Practical adjustments that reduce noise stress for sensitive students without disrupting the rest of the room.',
    category: 'school',
    video: {
      videoId: 'T9j6rQ4rtQY',
      title: 'The Sensory Room: Helping Students With Autism Focus and Learn',
      channel: 'Edutopia',
      viewCountAtSelection: '1,868,321 (checked 2026-09-01)',
    },
    relatedSlugs: ['why-loud-noises-are-distressing', 'tools-for-sound-sensitivity'],
    faqs: [
      {
        question: 'Do these changes only help sensitive students?',
        answer:
          'No. Reducing echo, warning before loud events, and giving students a way to step out briefly tend to benefit the whole classroom, not just one student.',
      },
      {
        question: 'Should a student just be allowed to wear headphones in class?',
        answer:
          'Often yes, but it is worth checking the school’s accommodation process and involving a teacher rather than assuming, since policies vary by school.',
      },
    ],
  },
  {
    slug: 'why-fluorescent-lights-feel-overwhelming',
    title: 'Why do fluorescent lights or busy visual environments feel overwhelming?',
    dek: 'Flicker, hum, and visual clutter explained, and what tends to make a space easier to be in.',
    category: 'overwhelm',
    video: {
      videoId: 'ikQUUoyyZIY',
      title: 'What causes PHOTOPHOBIA (light sensitivity) and how to fix it',
      channel: 'Doctor Eye Health',
      viewCountAtSelection: '159,308 (checked 2026-09-01)',
    },
    relatedSlugs: ['how-to-set-up-a-low-stimulation-space', 'what-is-a-sensory-diet'],
    faqs: [
      {
        question: 'Is this just about brightness?',
        answer:
          'Not entirely. Flicker, hum, and how much the visual system has to process at once all play a role, alongside brightness.',
      },
      {
        question: 'Do tinted glasses actually help?',
        answer:
          'Some people find they reduce the flicker sensation, though this varies by person and is worth trying rather than assuming it will or won’t work.',
      },
    ],
  },
  {
    slug: 'how-to-set-up-a-low-stimulation-space',
    title: 'What is a low-stimulation space, and how do you set one up?',
    dek: 'A practical guide to building a calmer corner at home or school, and how it is meant to be used.',
    category: 'focus',
    video: {
      videoId: 'DQbuu5ufHyA',
      title: 'Calm Down Centers: Creating a Safe Classroom Environment for Your Students',
      channel: 'SBCUSD',
      viewCountAtSelection: '72,416 (checked 2026-09-01)',
    },
    relatedSlugs: ['why-fluorescent-lights-feel-overwhelming', 'why-loud-noises-are-distressing'],
    faqs: [
      {
        question: 'Does this need to be a whole room?',
        answer:
          'No. A corner with a visual boundary, dimmer lighting, and soft seating is usually enough.',
      },
      {
        question: 'Should it only be used after a meltdown?',
        answer:
          'It tends to work better when it is available anytime, including before things escalate, rather than only as a response once something has already gone wrong.',
      },
    ],
  },
  {
    slug: 'what-is-oral-sensory-seeking',
    title: 'What is oral sensory seeking, and why does my child chew on everything?',
    dek: 'Why chewing on objects is often about sensory input, not habit, and how it connects to proprioception.',
    category: 'touch',
    video: {
      videoId: 'SuwiSf2jbfQ',
      title: 'OCCUPATIONAL THERAPY TIPS TO REDUCE ORAL SENSORY ISSUES | DR. PRIYANKA GUPTA',
      channel: 'Priyanka\'s Occupational Therapy',
      viewCountAtSelection: '33,848 (checked 2026-09-01)',
    },
    relatedSlugs: ['safe-chewable-sensory-tools', 'what-is-tactile-defensiveness'],
    faqs: [
      {
        question: 'Is chewing on objects a bad habit?',
        answer:
          'Not necessarily. For some children it is a form of sensory seeking that provides input the nervous system is looking for, similar to fidgeting.',
      },
      {
        question: 'When is it worth raising with a professional?',
        answer:
          'If chewing causes injury, damages belongings quickly, or is tied to significant difficulty eating a varied diet, it is worth discussing with a pediatrician or occupational therapist.',
      },
    ],
  },
  {
    slug: 'safe-chewable-sensory-tools',
    title: 'What are safe chewable sensory tools, and when should you use them?',
    dek: 'What to look for in a chewable tool, and why one might be offered instead of everyday objects.',
    category: 'touch',
    video: {
      videoId: 'wSIyt9TzpKs',
      title: 'Is your kid chewing on things? It might be their way of meeting sensory needs. Here are some tips!',
      channel: 'Red Door Pediatric Therapy',
      viewCountAtSelection: '15,751 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-oral-sensory-seeking', 'helping-a-picky-eater-with-food-textures'],
    faqs: [
      {
        question: 'What should I look for in a chewable tool?',
        answer:
          'Food-grade, BPA-free material, a resistance level matched to what the person actually seeks, and a size and shape that avoids any choking risk.',
      },
      {
        question: 'Can an occupational therapist help pick the right one?',
        answer:
          'Yes. An OT who specializes in oral-motor needs can assess what kind of input is being sought and recommend something suited to that specific person.',
      },
    ],
  },
  {
    slug: 'helping-a-picky-eater-with-food-textures',
    title: 'How can I help a picky eater who avoids certain food textures?',
    dek: 'Why texture, not taste, is often the real barrier, and practical ways to expand what is tolerated.',
    category: 'touch',
    video: {
      videoId: 'oecQiEkzgm4',
      title: 'Picky Eating Isn\'t About the Food  | Katie Kimball | TEDxHartford',
      channel: 'TEDx Talks',
      viewCountAtSelection: '313,629 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-oral-sensory-seeking', 'why-kids-refuse-clothing-textures'],
    faqs: [
      {
        question: 'Is this the same as ordinary picky eating?',
        answer:
          'Not always. For some children, specific textures are genuinely difficult to tolerate, similar to how certain clothing textures can be for others.',
      },
      {
        question: 'Does pressuring a child to eat help?',
        answer:
          'Usually not. Pressure tends to increase anxiety around eating rather than expand what is tolerated. Progress is typically slow and non-linear.',
      },
    ],
  },
  {
    slug: 'why-kids-spin-rock-and-seek-movement',
    title: 'Why does my child spin, rock, or seek constant movement?',
    dek: 'Vestibular seeking explained, and why it works better to plan for it than to try to stop it.',
    category: 'movement',
    video: {
      videoId: 'VTTExQ-pOEI',
      title: 'Top 5 Alerting Vestibular Activities for Kids | OT Tips for Sensory Seekers',
      channel: 'Harkla - Parenting & Child Development Tips',
      viewCountAtSelection: '26,575 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-vestibular-processing', 'safe-movement-activities-during-the-day'],
    faqs: [
      {
        question: 'Is constant movement-seeking a problem?',
        answer:
          'Not by itself. Some vestibular systems need more input than average to register the same sense of balance and alertness, which leads to seeking it out often.',
      },
      {
        question: 'Should movement-seeking be stopped?',
        answer:
          'Trying to eliminate it outright tends not to work well. Building planned, safe movement into the day usually works better than suppressing it.',
      },
    ],
  },
  {
    slug: 'safe-movement-activities-during-the-day',
    title: 'What are safe ways to give a sensory-seeking child more movement?',
    dek: 'Practical, low-cost ways to build planned movement into a day, at home and at school.',
    category: 'movement',
    video: {
      videoId: 'p0XnWJiXIGc',
      title: 'Sensory Movement Break for Children - Autism, Classroom, Calming & Regulating, Gross Motor Skills.',
      channel: 'OT for Schools',
      viewCountAtSelection: '28,931 (checked 2026-09-01)',
    },
    relatedSlugs: ['why-kids-spin-rock-and-seek-movement', 'heavy-work-activities-at-home'],
    faqs: [
      {
        question: 'When is the best time for movement input?',
        answer:
          'Often before a task that requires sitting still, such as homework or a meal, rather than only after someone is already struggling.',
      },
      {
        question: 'Does this require special equipment?',
        answer:
          'Not necessarily. An obstacle course from furniture, an errand involving carrying something, or a wobble cushion can all work without significant cost.',
      },
    ],
  },
  {
    slug: 'why-pushing-and-squeezing-feels-calming',
    title: 'Why does pushing, carrying, or squeezing something feel calming?',
    dek: 'The organizing effect of firm pressure and effortful movement on the nervous system, explained.',
    category: 'movement',
    video: {
      videoId: 'nb1Cx-15FGo',
      title: 'Calming Deep Pressure Touch',
      channel: 'Center of Development',
      viewCountAtSelection: '91,658 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-proprioception', 'heavy-work-activities-at-home'],
    faqs: [
      {
        question: 'Is this effect specific to sensory processing differences?',
        answer:
          'No. It is part of why stress balls and weighted blankets are broadly popular calming tools, well beyond any specific diagnosis - most people experience some version of it.',
      },
      {
        question: 'How can this be built into a daily routine?',
        answer:
          'The article on heavy work activities at home has a practical list of specific, low-cost ways to bring this kind of input into an ordinary day.',
      },
    ],
  },
  {
    slug: 'why-kids-miss-hunger-thirst-bathroom-signals',
    title: 'Why does my child struggle to notice hunger, thirst, or the bathroom?',
    dek: 'How interoception affects noticing internal signals, and practical ways to build in reminders.',
    category: 'routines',
    video: {
      videoId: 'qOZ3TIlMHTk',
      title: 'Top 5 Activities for Interoception for Parents & Teachers: Understand, Spot, Support',
      channel: 'Harkla - Parenting & Child Development Tips',
      viewCountAtSelection: '23,775 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-interoception', 'building-body-awareness-as-an-adult'],
    faqs: [
      {
        question: 'Is this the child ignoring the signal on purpose?',
        answer:
          'Usually not. For some children, the internal sense that produces these signals is simply less precise, so the first clear sign arrives without earlier warning.',
      },
      {
        question: 'What helps most day to day?',
        answer:
          'Scheduled eating, drinking, and bathroom breaks tend to help more than waiting for the child to ask, since the felt cue may not arrive until it is already urgent.',
      },
    ],
  },
  {
    slug: 'building-body-awareness-as-an-adult',
    title: 'How can adults build better body-awareness and self-regulation skills?',
    dek: 'Practical starting points for strengthening interoceptive awareness later in life.',
    category: 'overwhelm',
    video: {
      videoId: 'PCRAMka6iHk',
      title: 'Autism and Interoception (Developing Body Awareness and Emotional Regulation) | Patrons Choice',
      channel: 'Autism From The Inside',
      viewCountAtSelection: '46,685 (checked 2026-09-01)',
    },
    relatedSlugs: ['what-is-interoception', 'why-kids-miss-hunger-thirst-bathroom-signals'],
    faqs: [
      {
        question: 'Is it too late to build this awareness as an adult?',
        answer:
          'No. It is closer to strengthening an underused skill than fixing something broken, and adults can build it with practice, just as children can.',
      },
      {
        question: 'What is a simple way to start?',
        answer:
          'A few scheduled check-ins through the day asking what the body feels like right now, rather than waiting to notice something is already wrong.',
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
