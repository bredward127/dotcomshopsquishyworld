import { isCategoryId, type CategoryId } from './taxonomy.ts';

/**
 * Fixed search phrases, one set per category.
 *
 * Visitor text is never forwarded to YouTube. The category the visitor picked
 * selects a phrase from this allowlist, and only that phrase is sent. This
 * keeps free-text — which may contain health details — off a third-party
 * service, and keeps results inside topics we intend to surface.
 */
const QUERY_TEMPLATES: Record<CategoryId, readonly string[]> = {
  overwhelm: [
    'sensory overwhelm calming strategies occupational therapy',
    'what is sensory overload explained',
  ],
  movement: [
    'vestibular and proprioceptive activities occupational therapy',
    'heavy work activities for kids occupational therapy',
  ],
  touch: [
    'tactile sensitivity occupational therapy strategies',
    'messy play tactile activities occupational therapy',
  ],
  sound: [
    'auditory sensitivity strategies occupational therapy',
    'noise sensitivity coping strategies explained',
  ],
  focus: [
    'sensory strategies for attention and focus occupational therapy',
    'movement breaks for focus classroom',
  ],
  routines: [
    'visual schedules and transitions occupational therapy',
    'daily routine strategies sensory processing',
  ],
  school: [
    'classroom sensory strategies for teachers',
    'sensory breaks in the classroom occupational therapy',
  ],
};

export const ALLOWED_QUERIES: readonly string[] = Object.values(QUERY_TEMPLATES).flat();

/**
 * Resolve a category to an approved query. Returns null for anything not on
 * the allowlist, so an unexpected value results in no search rather than an
 * unfiltered one.
 */
export function resolveQuery(category: unknown): string | null {
  if (!isCategoryId(category)) return null;
  return QUERY_TEMPLATES[category][0] ?? null;
}

export function isAllowedQuery(query: string): boolean {
  return ALLOWED_QUERIES.includes(query);
}

export function queriesForCategory(category: CategoryId): readonly string[] {
  return QUERY_TEMPLATES[category];
}
