import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ALL_SQUISHIES_QUERY } from '@/data/quizData';
import { buildSearchUrl } from '@/lib/quiz/affiliate';

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="h-8 w-8 rounded-[42%] bg-gradient-to-br from-mint-200 via-lavender-200 to-peach-200 shadow-inner ring-2 ring-white"
      />
      <span className="font-display text-xl font-bold tracking-tight text-plum">
        Squishy<span className="text-lavender-600">World</span>
      </span>
    </span>
  );
}

export default function FunnelHeader() {
  const allHref = buildSearchUrl(ALL_SQUISHIES_QUERY, { tag: process.env.NEXT_PUBLIC_AMAZON_TAG, slot: 'header' });

  return (
    <header>
      <p className="bg-plum px-4 py-2 text-center text-xs font-semibold tracking-wide text-cream/90">
        As an Amazon Associate we earn from qualifying purchases.{' '}
        <Link href="/disclosure" className="underline underline-offset-2 hover:text-white">
          How that works
        </Link>
      </p>
      <div className="border-b border-cream-300 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/quiz" className="flex items-center gap-2 rounded-lg" aria-label="SquishyWorld Sensory Finder">
            <Logo />
            <span className="hidden rounded-full bg-mint-200 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-mint-700 min-[400px]:inline">
              Sensory Finder 2.0
            </span>
          </Link>
          <a
            href={allHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold text-plum transition hover:bg-cream-200"
          >
            <span className="hidden sm:inline">View All Squishies</span>
            <span className="sm:hidden">Shop all</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
