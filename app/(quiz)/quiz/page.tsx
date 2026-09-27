import type { Metadata } from 'next';
import { ArrowRight, Diamond, ShieldCheck } from 'lucide-react';
import { personas, TRAITS } from '@/data/quizData';
import QuizFunnel from '@/components/quiz/QuizFunnel';
import { ToneTile } from '@/components/quiz/icons';

export const metadata: Metadata = {
  title: { absolute: 'Find Your Sensory Match in 60 Seconds | SquishyWorld' },
  description:
    'A four-question quiz that matches you with squishies and fidgets for focus, calm, and deep pressure. No email required.',
  alternates: { canonical: '/quiz' },
  openGraph: {
    siteName: 'SquishyWorld',
    title: 'Find Your Perfect Sensory Match in 60 Seconds',
    description: 'Four questions. One tactile profile. Three hand-matched squishies.',
    url: '/quiz',
  },
};

const PROOF = ['4 questions · about 60 seconds', 'No email, no sign-up', 'Your result stays on your device'];

const STEPS = [
  {
    n: '01',
    title: 'You answer four questions',
    body: 'Who it is for, the feel they reach for, where it will live, and what it has to survive. No wrong answers.',
  },
  {
    n: '02',
    title: 'We map your tactile profile',
    body: 'Every answer points at one of four profiles: quiet focus, slow-rise calm, deep pressure, or texture.',
  },
  {
    n: '03',
    title: 'You get three matches, not forty',
    body: 'A best match, a quiet alternative for meetings and classrooms, and a multi-pack for stocking up.',
  },
];

function StartButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#quiz"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-7 py-4 text-base font-extrabold text-cream shadow-[0_14px_30px_-12px_rgba(36,27,53,0.6)] transition hover:-translate-y-0.5 hover:bg-plum/90 active:translate-y-0"
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-5 w-5" />
    </a>
  );
}

export default function QuizPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-10 pt-12 text-center sm:px-6 sm:pt-16">
        <span aria-hidden="true" className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-mint-200/60 blur-3xl" />
        <span aria-hidden="true" className="absolute -right-24 top-32 h-64 w-64 rounded-full bg-lavender-200/70 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-lavender-700 shadow-sm">
            The Sensory Match Quiz
          </p>
          <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-plum sm:text-6xl">
            Find Your Perfect <span className="text-lavender-600">Sensory Match</span> in 60 Seconds
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-plum-muted">
            Take our rapid quiz to discover tactile tools picked for stress relief, focus, and calming
            sensory input.
          </p>
          <div className="mt-8">
            <StartButton>Start Sensory Quiz</StartButton>
          </div>
          <ul className="mt-8 flex flex-col items-center gap-3 text-sm font-bold uppercase tracking-wide text-plum-muted sm:flex-row sm:justify-center sm:gap-6">
            {PROOF.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Diamond aria-hidden="true" className="h-3 w-3 fill-mint-600 text-mint-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" aria-label="Sensory Match quiz" className="scroll-mt-4 px-4 pb-6 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <QuizFunnel />
        </div>
      </section>

      {/* Why a quiz */}
      <section className="mt-14 bg-plum px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-tight text-cream sm:text-4xl">
            A shelf is a guess. A quiz is an answer.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/75">
            Search &ldquo;squishy&rdquo; and you get thousands of near-identical results. We ask four questions and
            hand back <span className="font-bold text-mint-400">three picks with the reasons attached</span>, so the
            one you buy is the one that actually gets squeezed.
          </p>
        </div>
      </section>

      {/* Profiles */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-bold text-plum sm:text-4xl">The four tactile profiles</h2>
          <p className="mt-2 text-center text-plum-muted">Same squeeze, four very different reasons for reaching for it.</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {TRAITS.map((trait, i) => {
              const p = personas[trait];
              return (
                <li key={trait} className="flex gap-4 rounded-3xl border-2 border-cream-300 bg-white p-4 sm:p-5">
                  <ToneTile icon={p.icon} tone={p.tone} className="h-20 w-20 shrink-0 rounded-2xl" iconClassName="h-9 w-9" />
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-plum-muted">No. {i + 1}</p>
                    <h3 className="font-display text-xl font-bold text-plum">{p.name}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-plum-muted">{p.tagline}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl font-bold text-plum sm:text-4xl">How the match works</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-3xl border-2 border-cream-300 bg-white p-6">
                <p className="font-display text-4xl font-bold text-lavender-600">{s.n}</p>
                <h3 className="mt-3 text-lg font-extrabold text-plum">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-plum-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Promise */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-plum bg-cream-200 p-6 text-center sm:p-10">
          <ShieldCheck aria-hidden="true" className="mx-auto h-9 w-9 text-mint-600" />
          <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.2em] text-plum-muted">The honest match promise</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-plum sm:text-3xl">Your answers pick the match. Not our commission.</h2>
          <p className="mt-4 leading-relaxed text-plum">
            Our product buttons are affiliate links, and we say so on every one. The match itself is worked out
            from your four answers by a fixed formula. No brand pays for a spot, and no invented reviews are shown.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold text-plum sm:text-4xl">Still reading? The quiz takes 60 seconds.</h2>
        <p className="mx-auto mt-3 max-w-lg text-lg text-plum-muted">
          That is less time than scrolling past the first page of squishy search results.
        </p>
        <div className="mt-8">
          <StartButton>Find my match</StartButton>
        </div>
      </section>
    </>
  );
}
