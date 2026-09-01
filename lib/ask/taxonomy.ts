export const AUDIENCES = [
  { id: 'parent', label: 'Parent or caregiver' },
  { id: 'adult', label: 'Adult asking for myself' },
  { id: 'educator', label: 'Educator or school staff' },
] as const;

export type AudienceId = (typeof AUDIENCES)[number]['id'];

export const CATEGORIES = [
  { id: 'overwhelm', label: 'Overwhelm', hint: 'Feeling flooded or shutting down' },
  { id: 'movement', label: 'Movement needs', hint: 'Seeking motion, or avoiding it' },
  { id: 'touch', label: 'Touch and texture', hint: 'Clothing, textures, messy play' },
  { id: 'sound', label: 'Sound', hint: 'Noise sensitivity or seeking sound' },
  { id: 'focus', label: 'Focus', hint: 'Settling and staying with a task' },
  { id: 'routines', label: 'Routines', hint: 'Transitions and daily structure' },
  { id: 'school', label: 'School support', hint: 'Classroom and school settings' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export const AUDIENCE_IDS: readonly string[] = AUDIENCES.map((a) => a.id);
export const CATEGORY_IDS: readonly string[] = CATEGORIES.map((c) => c.id);

export function isAudienceId(value: unknown): value is AudienceId {
  return typeof value === 'string' && AUDIENCE_IDS.includes(value);
}

export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === 'string' && CATEGORY_IDS.includes(value);
}

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
