import type { QuizAnswers } from './scoring.ts';

/**
 * Last quiz result, kept in localStorage so a returning visitor can reopen it.
 *
 * Only the chosen option ids are stored, on this device. Nothing is sent
 * anywhere. The result is recomputed from the answers on load, so product or
 * copy changes apply to old results too.
 */

export const QUIZ_STORAGE_KEY = 'sw.quiz.v1';

export type SavedQuiz = { answers: QuizAnswers; completedAt: string };

export function parseSavedQuiz(raw: string | null): SavedQuiz | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<SavedQuiz>;
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.completedAt !== 'string') return null;
    const answers = parsed.answers;
    if (!answers || typeof answers !== 'object') return null;
    const clean: QuizAnswers = {};
    for (const [key, value] of Object.entries(answers)) {
      const id = Number(key);
      if (Number.isInteger(id) && typeof value === 'string' && /^[a-z0-9-]{1,40}$/.test(value)) {
        clean[id] = value;
      }
    }
    return { answers: clean, completedAt: parsed.completedAt };
  } catch {
    return null;
  }
}

export function loadSavedQuiz(): SavedQuiz | null {
  if (typeof window === 'undefined') return null;
  try {
    return parseSavedQuiz(window.localStorage.getItem(QUIZ_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function saveQuiz(answers: QuizAnswers, now: Date = new Date()): void {
  if (typeof window === 'undefined') return;
  try {
    const value: SavedQuiz = { answers, completedAt: now.toISOString() };
    window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable: the result still shows for this visit */
  }
}

export function clearSavedQuiz(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(QUIZ_STORAGE_KEY);
  } catch {
    /* nothing to do */
  }
}
