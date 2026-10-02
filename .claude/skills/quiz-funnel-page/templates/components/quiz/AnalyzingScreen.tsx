'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

/** Required by the spec: a 1.5 second simulated analysis before results. */
export const ANALYZING_DURATION_MS = 1500;

const STEPS = ['Weighing your texture preference', 'Matching noise and size', 'Ranking squishies for your profile'];

export default function AnalyzingScreen({ onDone }: { onDone: () => void }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const per = ANALYZING_DURATION_MS / (STEPS.length + 1);
    const timers = STEPS.map((_, i) => setTimeout(() => setTick(i + 1), per * (i + 1)));
    const done = setTimeout(onDone, ANALYZING_DURATION_MS);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div className="flex flex-col items-center py-8 text-center sm:py-12" role="status" aria-live="polite">
      <div className="relative h-24 w-24">
        <span className="absolute inset-0 animate-ping rounded-full bg-lavender-200 opacity-60" aria-hidden="true" />
        <span
          className="absolute inset-2 animate-squish rounded-[42%] bg-gradient-to-br from-mint-200 via-lavender-200 to-peach-200 shadow-inner"
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-8 font-display text-2xl font-bold text-plum sm:text-3xl">Analyzing tactile profile…</h2>
      <p className="mt-2 text-[15px] text-plum-muted">Matching your four answers against every squishy we list.</p>

      <div className="mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-cream-300" aria-hidden="true">
        <div
          className="h-full rounded-full bg-gradient-to-r from-mint-400 to-lavender-400 transition-[width] ease-linear"
          style={{ width: `${(tick / STEPS.length) * 100}%`, transitionDuration: `${ANALYZING_DURATION_MS / (STEPS.length + 1)}ms` }}
        />
      </div>

      <ul className="mt-6 space-y-2 text-left text-sm">
        {STEPS.map((label, i) => {
          const done = tick > i;
          return (
            <li key={label} className={`flex items-center gap-2 transition-colors ${done ? 'text-plum' : 'text-plum-muted/70'}`}>
              {done ? (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-mint-600 text-white">
                  <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
                </span>
              ) : (
                <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin text-lavender-400" />
              )}
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
