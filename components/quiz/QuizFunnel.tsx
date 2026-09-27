'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { products } from '@/data/quizData';
import { buildResult, isComplete, type QuizAnswers } from '@/lib/quiz/scoring';
import { buildAffiliateUrl } from '@/lib/quiz/affiliate';
import { clearSavedQuiz, loadSavedQuiz, saveQuiz } from '@/lib/quiz/storage';
import { readAttribution } from '@/lib/analytics/attribution';
import { track } from '@/lib/analytics/track';
import QuizModal from './QuizModal';
import AnalyzingScreen from './AnalyzingScreen';
import ResultsView from './ResultsView';

type Phase = 'quiz' | 'analyzing' | 'results';

/**
 * The funnel state machine: quiz -> analyzing (1.5s) -> results.
 * A completed quiz is saved on this device, and a returning visitor lands on
 * their last result instead of question one.
 */
export default function QuizFunnel() {
  const [phase, setPhase] = useState<Phase>('quiz');
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = loadSavedQuiz();
    if (saved && isComplete(saved.answers)) {
      setAnswers(saved.answers);
      setSavedAt(saved.completedAt);
      setPhase('results');
    }
  }, []);

  const result = useMemo(() => (isComplete(answers) ? buildResult(answers) : null), [answers]);

  const scrollToTop = useCallback(
    () => rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    [],
  );

  const handleComplete = useCallback((final: QuizAnswers) => {
    setAnswers(final);
    setSavedAt(null);
    setPhase('analyzing');
    // The analyzing card is shorter than a question; keep it in view.
    requestAnimationFrame(scrollToTop);
  }, [scrollToTop]);

  const handleAnalyzed = useCallback(() => {
    saveQuiz(answers);
    const r = isComplete(answers) ? buildResult(answers) : null;
    if (r) track('quiz_complete', { persona: r.primary });
    setPhase('results');
    requestAnimationFrame(scrollToTop);
  }, [answers, scrollToTop]);

  const handleRetake = () => {
    clearSavedQuiz();
    setAnswers({});
    setSavedAt(null);
    setAttempt((n) => n + 1);
    setPhase('quiz');
    requestAnimationFrame(scrollToTop);
  };

  const linkFor = useCallback(
    (productId: string, slot: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return '#';
      // Campaign tokens are only available once analytics consent was given;
      // readAttribution returns null otherwise.
      const attribution = readAttribution();
      return buildAffiliateUrl(product, {
        tag: process.env.NEXT_PUBLIC_AMAZON_TAG,
        persona: result?.primary,
        slot,
        campaign: [attribution?.utm_source, attribution?.utm_campaign],
      });
    },
    [result],
  );

  return (
    <div ref={rootRef} className="scroll-mt-24">
      {phase === 'results' && result ? (
        <ResultsView result={result} answers={answers} linkFor={linkFor} savedAt={savedAt} onRetake={handleRetake} />
      ) : (
        <div className="mx-auto max-w-2xl rounded-[2rem] border-2 border-cream-300 bg-white p-5 shadow-[0_30px_60px_-35px_rgba(36,27,53,0.45)] sm:p-8">
          {phase === 'analyzing' ? (
            <AnalyzingScreen onDone={handleAnalyzed} />
          ) : (
            <QuizModal key={attempt} onComplete={handleComplete} />
          )}
        </div>
      )}
      {phase === 'quiz' ? (
        <p className="mt-5 text-center text-sm text-plum-muted">
          About sixty seconds. No email required. The squishy does the committing, not you.
        </p>
      ) : null}
    </div>
  );
}
