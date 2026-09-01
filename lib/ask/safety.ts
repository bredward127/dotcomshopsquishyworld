/**
 * Safety screening for the question router.
 *
 * This runs on the server before any other handling, including before any
 * model call. It is a routing aid, not a clinical assessment: it decides which
 * standing message to show, and never attempts to judge severity itself.
 */

export type SafetyLevel = 'emergency' | 'urgent' | 'none';

/**
 * Immediate-safety patterns. Deliberately specific: these route the visitor
 * straight to emergency services, so a false positive is alarming and unhelpful.
 */
const EMERGENCY_PATTERNS: readonly RegExp[] = [
  // Suicidal ideation and self-harm intent
  /\bkill(ing)?\s+(my|him|her|them)self\b/i,
  /\bsuicid(e|al)\b/i,
  /\bend(ing)?\s+(my|his|her|their)\s+life\b/i,
  /\bwants?\s+to\s+die\b/i,
  /\bwant\s+to\s+die\b/i,
  /\bself[-\s]?harm(ing)?\b/i,
  /\bcutting\s+(my|him|her|them)self\b/i,
  // Harm toward others
  /\bkill(ing)?\s+(someone|somebody|them|him|her|my\s+\w+)\b/i,
  /\bhurt(ing)?\s+(someone|somebody|another\s+\w+)\b/i,
  // Abuse
  /\b(being\s+)?abus(ed|ing|e)\b/i,
  /\bhit(ting|s)?\s+(my|the)\s+(child|kid|son|daughter)\b/i,
  // Medical crisis
  /\bnot\s+breathing\b/i,
  /\bcan'?t\s+breathe\b/i,
  /\bunconscious\b/i,
  /\bunresponsive\b/i,
  /\bseizure\b/i,
  /\boverdos(e|ed|ing)\b/i,
  /\bchoking\b/i,
  /\bbleeding\s+(a\s+lot|badly|heavily)\b/i,
  /\bemergency\b/i,
  /\bin\s+immediate\s+danger\b/i,
];

/**
 * Situations that warrant prompt professional contact but are not emergencies.
 * Kept narrow on purpose: head-banging and similar behaviors come up routinely
 * in sensory questions, and answering every one with "call 911" would be both
 * wrong and frightening.
 */
const URGENT_PATTERNS: readonly RegExp[] = [
  /\bhead[-\s]?bang(ing|s)?\b/i,
  /\bbang(ing|s)?\s+(his|her|their|my)?\s*head\b/i,
  /\bbit(ing|es)\s+(him|her|them|my)self\b/i,
  /\bhits?\s+(him|her|them)self\b/i,
  /\bhitting\s+(him|her|them)self\b/i,
  /\bscratch(ing|es)\s+(him|her|them)self\b/i,
  /\bnot\s+(eating|drinking)\s+(at\s+all|anything)\b/i,
  /\bstopped\s+(eating|drinking)\b/i,
  /\brefus(es|ing)\s+(all|any)\s+(food|liquids?|fluids?)\b/i,
];

export function detectSafetyLevel(text: string | null | undefined): SafetyLevel {
  if (!text) return 'none';
  if (EMERGENCY_PATTERNS.some((pattern) => pattern.test(text))) return 'emergency';
  if (URGENT_PATTERNS.some((pattern) => pattern.test(text))) return 'urgent';
  return 'none';
}

export const MAX_QUESTION_LENGTH = 500;
export const MIN_QUESTION_LENGTH = 3;

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

export function validateQuestion(input: unknown): ValidationResult<string> {
  if (input === undefined || input === null || input === '') {
    return { ok: true, value: '' };
  }
  if (typeof input !== 'string') {
    return { ok: false, error: 'Question must be text.' };
  }

  // Collapse whitespace so length limits cannot be bypassed with padding.
  const trimmed = input.replace(/\s+/g, ' ').trim();

  if (trimmed.length === 0) return { ok: true, value: '' };
  if (trimmed.length < MIN_QUESTION_LENGTH) {
    return { ok: false, error: 'That question is too short to route.' };
  }
  if (trimmed.length > MAX_QUESTION_LENGTH) {
    return { ok: false, error: `Please keep questions under ${MAX_QUESTION_LENGTH} characters.` };
  }
  return { ok: true, value: trimmed };
}

/**
 * City or ZIP is optional and is used only to show local options. It is never
 * combined with the free-text question when anything leaves this server.
 */
export function validateLocation(input: unknown): ValidationResult<string> {
  if (input === undefined || input === null || input === '') {
    return { ok: true, value: '' };
  }
  if (typeof input !== 'string') {
    return { ok: false, error: 'Location must be text.' };
  }
  const trimmed = input.replace(/\s+/g, ' ').trim();
  if (trimmed.length === 0) return { ok: true, value: '' };
  if (trimmed.length > 60) {
    return { ok: false, error: 'Please enter a city name or ZIP code.' };
  }
  if (!/^[A-Za-z0-9 .,'-]+$/.test(trimmed)) {
    return { ok: false, error: 'Please enter a city name or ZIP code.' };
  }
  return { ok: true, value: trimmed };
}
