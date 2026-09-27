import {
  TRAITS,
  personas,
  products as inventory,
  quizQuestions,
  type Persona,
  type ProductRecommendation,
  type QuizQuestion,
  type Trait,
} from '../../data/quizData.ts';

/** Question id -> chosen option id. */
export type QuizAnswers = Record<number, string>;

export type TraitScores = Record<Trait, number>;

export type ResultSlot = 'best' | 'quiet' | 'multipack';

export interface QuizResult {
  primary: Trait;
  secondary: Trait | null;
  scores: TraitScores;
  persona: Persona;
  /** e.g. "Deep Pressure & Quiet Focus Seeker" */
  profileBadge: string;
  picks: Record<ResultSlot, ProductRecommendation>;
  /** Bonus "Alternative Textures" row: products led by other traits. */
  alternatives: ProductRecommendation[];
}

function emptyScores(): TraitScores {
  return { calm: 0, tactile: 0, compression: 0, focus: 0 };
}

function traitFor(question: QuizQuestion, optionId: string | undefined): Trait | null {
  return question.options.find((o) => o.id === optionId)?.trait ?? null;
}

export function isComplete(answers: QuizAnswers, questions: QuizQuestion[] = quizQuestions): boolean {
  return questions.every((q) => traitFor(q, answers[q.id]) !== null);
}

export function scoreAnswers(answers: QuizAnswers, questions: QuizQuestion[] = quizQuestions): TraitScores {
  const scores = emptyScores();
  for (const q of questions) {
    const trait = traitFor(q, answers[q.id]);
    if (trait) scores[trait] += 1;
  }
  return scores;
}

/**
 * Tie-break order. Four questions spread over four traits tie often (2-2,
 * 1-1-1-1), so ties go to the preferred feel (question 2), then who it is for
 * (question 1), then the remaining questions in order, then TRAITS order.
 */
function tieBreakOrder(answers: QuizAnswers, questions: QuizQuestion[]): Trait[] {
  const byQuestion = [2, 1, 3, 4]
    .map((id) => questions.find((q) => q.id === id))
    .filter((q): q is QuizQuestion => Boolean(q))
    .map((q) => traitFor(q, answers[q.id]))
    .filter((t): t is Trait => t !== null);
  return Array.from(new Set([...byQuestion, ...TRAITS]));
}

export function rankTraits(answers: QuizAnswers, questions: QuizQuestion[] = quizQuestions): Trait[] {
  const scores = scoreAnswers(answers, questions);
  const order = tieBreakOrder(answers, questions);
  return [...order].sort((a, b) => scores[b] - scores[a] || order.indexOf(a) - order.indexOf(b));
}

/** Weighted fit of a product to a score profile. Higher is better. */
export function productFit(product: ProductRecommendation, scores: TraitScores, primary: Trait, wantsSilent: boolean): number {
  let fit = 0;
  product.traits.forEach((trait, i) => {
    fit += scores[trait] * (i === 0 ? 2 : 1);
  });
  if (product.traits[0] === primary) fit += 3;
  if (wantsSilent && product.quiet) fit += 1;
  return fit;
}

function best(
  candidates: ProductRecommendation[],
  scores: TraitScores,
  primary: Trait,
  wantsSilent: boolean,
): ProductRecommendation | undefined {
  // Stable: on equal fit the earlier inventory entry wins.
  let top: ProductRecommendation | undefined;
  let topFit = -Infinity;
  for (const p of candidates) {
    const fit = productFit(p, scores, primary, wantsSilent);
    if (fit > topFit) {
      top = p;
      topFit = fit;
    }
  }
  return top;
}

export function buildResult(
  answers: QuizAnswers,
  questions: QuizQuestion[] = quizQuestions,
  products: ProductRecommendation[] = inventory,
): QuizResult {
  const scores = scoreAnswers(answers, questions);
  const ranked = rankTraits(answers, questions);
  const primary = ranked[0];
  const second = ranked[1];
  const secondary = second && scores[second] > 0 ? second : null;
  const persona = personas[primary];

  const q3 = questions.find((q) => q.id === 3);
  const wantsSilent = q3 ? answers[q3.id] === 'silent' : false;

  const bestPick = best(products.filter((p) => p.slots.includes('best')), scores, primary, wantsSilent);
  const quietPick = best(
    products.filter((p) => p.slots.includes('quiet') && p.quiet && p.id !== bestPick?.id),
    scores,
    primary,
    true,
  );
  const multiPick = best(products.filter((p) => p.slots.includes('multipack')), scores, primary, wantsSilent);

  if (!bestPick || !quietPick || !multiPick) {
    throw new Error('Product inventory is missing a best, quiet, or multipack candidate.');
  }

  const chosen = new Set([bestPick.id, quietPick.id, multiPick.id]);
  const alternatives = products
    .filter((p) => p.slots.includes('best') && !chosen.has(p.id) && p.traits[0] !== primary)
    .map((p, i) => ({ p, i, fit: (p.traits[0] === secondary ? 10 : 0) + scores[p.traits[0]] }))
    .sort((a, b) => b.fit - a.fit || a.i - b.i)
    .slice(0, 2)
    .map(({ p }) => p);

  const profileBadge = secondary
    ? `${persona.badgeWord} & ${personas[secondary].badgeWord} Seeker`
    : `${persona.badgeWord} Seeker`;

  return {
    primary,
    secondary,
    scores,
    persona,
    profileBadge,
    picks: { best: bestPick, quiet: quietPick, multipack: multiPick },
    alternatives,
  };
}
