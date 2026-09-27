'use client';

import { ArrowUpRight, BadgeCheck, EyeOff, Lock, MailX, RotateCcw, Sparkles } from 'lucide-react';
import { quizQuestions, TRAITS, type Trait } from '@/data/quizData';
import type { QuizAnswers, QuizResult, ResultSlot } from '@/lib/quiz/scoring';
import { hostOf } from '@/lib/analytics/events';
import { track } from '@/lib/analytics/track';
import ProductCard from './ProductCard';
import { QuizGlyph, TONE_CLASSES, ToneTile } from './icons';

const TRAIT_LABELS: Record<Trait, string> = {
  calm: 'Slow-rise calm',
  tactile: 'Texture',
  compression: 'Deep pressure',
  focus: 'Quiet focus',
};

const TRAIT_BARS: Record<Trait, string> = {
  calm: 'bg-lavender-400',
  tactile: 'bg-mint-400',
  compression: 'bg-peach-500',
  focus: 'bg-sky-500',
};

/**
 * Trust row. The spec's suggested badges ("Non-Toxic Materials", "Tested for
 * Sensory Regulation", "10,000+ Happy Squeezers") are claims this site cannot
 * substantiate for third-party products, so these state only what is true of
 * the quiz itself.
 */
const TRUST = [
  { icon: MailX, label: 'No email required' },
  { icon: Lock, label: 'Answers stay on this device' },
  { icon: BadgeCheck, label: 'Affiliate links always labeled' },
  { icon: EyeOff, label: 'Commission never picks your match' },
];

const SLOTS: ResultSlot[] = ['best', 'quiet', 'multipack'];

type Props = {
  result: QuizResult;
  answers: QuizAnswers;
  /** Builds the tracked outbound URL for a product in a results slot. */
  linkFor: (productId: string, slot: string) => string;
  savedAt?: string | null;
  onRetake: () => void;
};

export default function ResultsView({ result, answers, linkFor, savedAt, onRetake }: Props) {
  const { persona, scores, picks, alternatives, profileBadge } = result;
  const tone = TONE_CLASSES[persona.tone];
  const maxScore = quizQuestions.length;

  const chosen = quizQuestions
    .map((q) => q.options.find((o) => o.id === answers[q.id]))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));

  return (
    <div className="animate-rise-in">
      {savedAt ? (
        <p className="mb-4 rounded-full bg-mint-100 px-4 py-2 text-center text-sm font-semibold text-mint-700">
          Welcome back. Here is the match you saved on{' '}
          {new Date(savedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.
        </p>
      ) : null}

      {/* Persona header */}
      <section aria-labelledby="persona-name" className="rounded-3xl border-2 border-cream-300 bg-white p-5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <ToneTile
            icon={persona.icon}
            tone={persona.tone}
            className="h-20 w-20 shrink-0 rounded-2xl sm:h-24 sm:w-24"
            iconClassName="h-10 w-10"
          />
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-lavender-100 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-lavender-700">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
              Your tactile profile
            </p>
            <h2 id="persona-name" className="mt-2 font-display text-3xl font-bold leading-tight text-plum sm:text-4xl">
              {persona.name}
            </h2>
            <p className={`mt-1 font-semibold ${tone.text}`}>{profileBadge}</p>
          </div>
        </div>

        <p className="mt-5 text-[16px] leading-relaxed text-plum-muted">
          <span className="font-semibold text-plum">{persona.tagline}</span> {persona.summary}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-plum-muted">Your sensory mix</h3>
            <ul className="mt-3 space-y-2.5">
              {TRAITS.map((trait) => (
                <li key={trait} className="grid grid-cols-[7.5rem_1fr_1.5rem] items-center gap-3 text-sm">
                  <span className={trait === result.primary ? 'font-bold text-plum' : 'text-plum-muted'}>
                    {TRAIT_LABELS[trait]}
                  </span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-cream-200">
                    <span
                      className={`block h-full rounded-full ${TRAIT_BARS[trait]} transition-[width] duration-700 ease-out`}
                      style={{ width: `${(scores[trait] / maxScore) * 100}%` }}
                    />
                  </span>
                  <span className="text-right tabular-nums text-plum-muted">{scores[trait]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-plum-muted">Based on your answers</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {chosen.map((o) => (
                <li
                  key={o.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-cream-50 px-3 py-1.5 text-sm text-plum"
                >
                  <QuizGlyph name={o.icon} className={`h-4 w-4 ${TONE_CLASSES[o.tone].icon}`} />
                  {o.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Three-tier recommendation grid */}
      <section aria-labelledby="picks-heading" className="mt-10">
        <h2 id="picks-heading" className="text-center font-display text-2xl font-bold text-plum sm:text-3xl">
          Your top 3 matches
        </h2>
        <p className="mt-1 text-center text-[15px] text-plum-muted">
          One best fit, one for quiet rooms, one for stocking up.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3 md:items-start md:pt-3">
          {SLOTS.map((slot) => (
            <ProductCard
              key={slot}
              slot={slot}
              product={picks[slot]}
              persona={result.primary}
              href={linkFor(picks[slot].id, slot)}
            />
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TRUST.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-2 rounded-2xl bg-cream-200/70 px-3 py-4 text-center text-sm font-semibold text-plum"
          >
            <Icon aria-hidden="true" className="h-5 w-5 text-mint-600" />
            {label}
          </li>
        ))}
      </ul>

      {/* Alternative textures */}
      {alternatives.length > 0 ? (
        <section aria-labelledby="alt-heading" className="mt-10">
          <h2 id="alt-heading" className="font-display text-xl font-bold text-plum">
            Want to try a different texture?
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {alternatives.map((p) => {
              const href = linkFor(p.id, 'alt');
              return (
                <li key={p.id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    onClick={() =>
                      track('affiliate_click', {
                        product_id: p.id,
                        slot: 'alt',
                        persona: result.primary,
                        destination_host: hostOf(href) ?? undefined,
                      })
                    }
                    className="group flex items-center gap-4 overflow-hidden rounded-2xl border-2 border-cream-300 bg-white pr-4 transition hover:-translate-y-0.5 hover:border-lavender-400"
                  >
                    <ToneTile icon={p.icon} tone={p.tone} className="h-20 w-20 shrink-0" iconClassName="h-8 w-8" />
                    <span className="flex-1 py-3">
                      <span className="block font-display font-semibold text-plum">{p.name}</span>
                      <span className="block text-sm text-plum-muted">
                        <span className="underline-offset-2 group-hover:underline">See price on Amazon</span>
                      </span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-lavender-600" />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-2 rounded-full border-2 border-plum px-6 py-3 font-extrabold text-plum transition hover:bg-plum hover:text-cream"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Retake quiz
        </button>
        <p className="max-w-md text-xs leading-relaxed text-plum-muted">
          Squishies are comfort and fidget tools, not medical devices or treatment. For ongoing sensory
          concerns, talk with an occupational therapist or your doctor.
        </p>
      </div>
    </div>
  );
}
