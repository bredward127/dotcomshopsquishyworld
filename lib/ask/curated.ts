import type { CategoryId } from './taxonomy.ts';
import type { AnswerPayload, LearnMoreLink } from './types.ts';

/**
 * Curated educational responses.
 *
 * These are written in advance and returned verbatim. They are the response
 * when no model is configured, and the answer is labeled as curated so no one
 * is led to believe a model was involved.
 */

const SHARED_LINKS: LearnMoreLink[] = [
  { label: 'Sensory basics', href: '/families/sensory-basics', external: false },
  { label: 'Glossary of terms', href: '/resources/glossary', external: false },
  { label: 'What to ask a provider', href: '/find-help/what-to-ask', external: false },
];

type CuratedEntry = {
  generalGuidance: string;
  nextStep: string;
  learnMore: LearnMoreLink[];
};

const CURATED: Record<CategoryId, CuratedEntry> = {
  overwhelm: {
    generalGuidance:
      'Feeling flooded usually builds up rather than arriving all at once. People often describe a stretch of rising tension before things tip over — noise stacking up, a room getting busier, one more request than there was room for. Occupational therapists commonly look at what came before the tipping point rather than the moment itself, because that is where there is room to change something.',
    nextStep:
      'For a few days, note what was happening in the twenty minutes before things got hard — where you were, how noisy it was, what had just changed. Patterns tend to show up faster on paper than in memory.',
    learnMore: SHARED_LINKS,
  },
  movement: {
    generalGuidance:
      'Some people seek out movement — rocking, spinning, climbing, pacing — and some avoid it, finding motion or heights unsettling. Both are common. In occupational therapy these are usually discussed in terms of the vestibular system, which responds to balance and head position, and proprioception, the sense of where the body is through muscles and joints.',
    nextStep:
      'Notice whether movement seems to settle things or stir them up. That one distinction shapes most of what a professional would suggest next.',
    learnMore: SHARED_LINKS,
  },
  touch: {
    generalGuidance:
      'Responses to touch and texture vary widely. Clothing tags, seams, certain fabrics, or messy textures can be genuinely difficult for some people, while others actively seek out firm pressure or particular textures. This is often described as tactile sensitivity or tactile seeking, and neither is a problem in itself unless it is getting in the way of daily life.',
    nextStep:
      'If clothing is the friction point, it is often easier to change the clothing than the response — seamless socks, tagless shirts, or a familiar item kept in rotation.',
    learnMore: SHARED_LINKS,
  },
  sound: {
    generalGuidance:
      'Sound sensitivity can mean noticing sounds others filter out, finding particular sounds painful, or struggling in places where noise layers up — a cafeteria, a store, an assembly. Some people also seek sound out, humming or playing music to steady themselves. Both patterns come up regularly.',
    nextStep:
      'Identify one predictable noisy setting each week and see whether leaving a few minutes early, or having ear defenders available, changes how the rest of the day goes.',
    learnMore: SHARED_LINKS,
  },
  focus: {
    generalGuidance:
      'Settling into a task involves more than willpower. Seating, lighting, background noise, hunger, and how recently someone has moved all play a part. Occupational therapists often look at the environment and the lead-up to a task before looking at the task itself.',
    nextStep:
      'Change one thing in the environment at a time and give it several days. Changing several at once makes it impossible to tell what helped.',
    learnMore: SHARED_LINKS,
  },
  routines: {
    generalGuidance:
      'Transitions — stopping one thing and starting another — are often harder than either activity. Knowing what is coming and roughly when tends to reduce friction, which is why visual schedules and consistent sequences come up so often in this area.',
    nextStep:
      'Pick the single transition that reliably goes badly and add predictability to just that one: a consistent warning, a consistent order, the same words each time.',
    learnMore: SHARED_LINKS,
  },
  school: {
    generalGuidance:
      'School settings involve constraints a home does not — fixed schedules, shared rooms, and set expectations. Support at school is arranged differently depending on the district and on whether a student has a formal plan. Teachers and school-based occupational therapists are usually the people who know what is actually available in that building.',
    nextStep:
      'Ask the school what supports already exist before requesting new ones. Some are available without a formal plan, and knowing which is which saves time.',
    learnMore: [
      { label: 'School and classroom', href: '/families/school-support', external: false },
      ...SHARED_LINKS.slice(0, 2),
    ],
  },
};

const FIND_LOCAL_HELP =
  'The local directory for Metro Detroit and Southeast Michigan is still being built, so there are no listings to show yet. In the meantime, a pediatrician or primary care provider can usually point toward occupational therapy services in the area, and a school-based therapist is a route worth asking about for anything school-related.';

const NO_CATEGORY_GUIDANCE =
  'Without a category selected there is no specific educational material to show. Choosing one of the areas above will bring up general background written for that topic.';

export function curatedAnswer(category: CategoryId | null): Pick<
  AnswerPayload,
  'generalGuidance' | 'nextStep' | 'learnMore' | 'findLocalHelp'
> {
  if (!category) {
    return {
      generalGuidance: NO_CATEGORY_GUIDANCE,
      nextStep: 'Pick the area that most closely matches what you are looking into.',
      learnMore: SHARED_LINKS,
      findLocalHelp: FIND_LOCAL_HELP,
    };
  }

  const entry = CURATED[category];
  return {
    generalGuidance: entry.generalGuidance,
    nextStep: entry.nextStep,
    learnMore: entry.learnMore,
    findLocalHelp: FIND_LOCAL_HELP,
  };
}

export { FIND_LOCAL_HELP };
