import type { AudienceId, CategoryId } from './taxonomy.ts';

export type AnswerSource = 'curated' | 'ai';

export type LearnMoreLink = {
  label: string;
  href: string;
  external: boolean;
};

export type AnswerPayload = {
  /** Which path produced this answer. Shown to the visitor verbatim. */
  source: AnswerSource;
  safety: 'emergency' | 'urgent' | 'none';
  category: CategoryId | null;
  audience: AudienceId | null;
  generalGuidance: string;
  nextStep: string;
  learnMore: LearnMoreLink[];
  findLocalHelp: string;
  /** Present only when a safety pattern matched. */
  safetyNotice?: string;
};

export const EMERGENCY_NOTICE =
  'If someone is in immediate danger, or this is a medical emergency, call 911 now. ' +
  'For thoughts of suicide or self-harm, call or text 988 to reach the Suicide and Crisis ' +
  'Lifeline in the United States, available 24 hours a day. This site cannot help in an ' +
  'emergency and no one here is monitoring what you type.';

export const URGENT_NOTICE =
  'What you have described is worth raising promptly with a qualified professional — a ' +
  'pediatrician, primary care provider, or licensed occupational therapist — rather than ' +
  'working from general information. If the situation is or becomes an emergency, call 911.';
