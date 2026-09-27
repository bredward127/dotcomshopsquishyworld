'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { quizQuestions } from '@/data/quizData';
import type { QuizAnswers } from '@/lib/quiz/scoring';
import { track } from '@/lib/analytics/track';
import { ToneTile } from './icons';

/** Long enough to see the selection land, short enough to feel instant. */
const ADVANCE_DELAY_MS = 380;

type Props = {
  onComplete: (answers: QuizAnswers) => void;
};

/**
 * The four-step question card: progress bar, option cards, back navigation.
 * Selecting an option records it and advances automatically; the last
 * answer hands the full set to `onComplete`.
 */
export default function QuizModal({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [locked, setLocked] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const total = quizQuestions.length;
  const question = quizQuestions[step];
  const selected = answers[question.id];
  const answeredCount = quizQuestions.filter((q) => answers[q.id]).length;

  useEffect(() => () => clearTimeout(timer.current), []);

  // Move focus to the new question for keyboard and screen-reader users, but
  // never on first load: that would scroll the page away from the hero.
  useEffect(() => {
    const heading = headingRef.current;
    if (!interacted.current || !heading) return;
    heading.focus({ preventScroll: true });
    // On phones the options run past the fold; bring the new question back up.
    if (heading.getBoundingClientRect().top < 80) {
      heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [step]);

  function choose(optionId: string) {
    if (locked) return;
    if (!interacted.current) {
      interacted.current = true;
      track('quiz_start', {}, { once: true });
    }

    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);
    setLocked(true);
    track('quiz_step', { step: question.id });

    timer.current = setTimeout(() => {
      setLocked(false);
      if (step + 1 < total) setStep(step + 1);
      else onComplete(next);
    }, ADVANCE_DELAY_MS);
  }

  function back() {
    if (locked || step === 0) return;
    interacted.current = true;
    setStep(step - 1);
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-plum-muted">
        <button
          type="button"
          onClick={back}
          disabled={step === 0 || locked}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 -ml-2 transition hover:bg-cream-200 hover:text-plum disabled:invisible"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Back
        </button>
        <span aria-live="polite">
          Step {step + 1} of {total}
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answeredCount}
        className="mt-3 grid grid-cols-4 gap-1.5"
      >
        {quizQuestions.map((q, i) => {
          const done = Boolean(answers[q.id]) && (i < step || (i === step && locked));
          const current = i === step && !done;
          return (
            <div key={q.id} className="h-2 overflow-hidden rounded-full bg-cream-300">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-mint-400 to-lavender-400 transition-[width] duration-500 ease-out ${
                  done ? 'w-full' : current ? 'w-1/3' : 'w-0'
                }`}
              />
            </div>
          );
        })}
      </div>
      <ol className="mt-2 hidden grid-cols-4 gap-1.5 text-center text-[11px] font-semibold text-plum-muted sm:grid">
        {quizQuestions.map((q, i) => (
          <li key={q.id} className={i === step ? 'text-lavender-700' : undefined}>
            {q.step}
          </li>
        ))}
      </ol>

      {/* Question */}
      <div key={question.id} className="animate-rise-in">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-6 text-center font-display text-2xl font-bold leading-tight text-plum outline-none sm:text-3xl"
        >
          {question.title}
        </h2>
        <p className="mt-2 text-center text-[15px] text-plum-muted">{question.subtitle}</p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2" aria-label={question.title}>
          {question.options.map((option) => {
            const isSelected = selected === option.id;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => choose(option.id)}
                  aria-pressed={isSelected}
                  className={`group relative flex h-full w-full items-stretch overflow-hidden rounded-2xl border-2 bg-white text-left transition duration-200 ease-out active:scale-[0.98] ${
                    isSelected
                      ? 'border-lavender-600 shadow-[0_10px_30px_-12px_rgba(119,87,214,0.55)] ring-4 ring-lavender-200'
                      : 'border-cream-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:shadow-[0_10px_24px_-14px_rgba(36,27,53,0.35)]'
                  }`}
                >
                  <ToneTile
                    icon={option.icon}
                    tone={option.tone}
                    className="w-24 shrink-0 transition-transform duration-300 group-hover:scale-[1.03] sm:w-28"
                  />
                  <span className="flex flex-1 flex-col justify-center gap-1 px-4 py-4 pr-10">
                    <span className="font-display text-lg font-semibold leading-snug text-lavender-700">
                      {option.label}
                    </span>
                    <span className="text-sm leading-snug text-plum-muted">{option.description}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full border-2 transition ${
                      isSelected
                        ? 'scale-100 border-lavender-600 bg-lavender-600 text-white'
                        : 'scale-90 border-cream-300 bg-white text-transparent group-hover:border-lavender-400'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
