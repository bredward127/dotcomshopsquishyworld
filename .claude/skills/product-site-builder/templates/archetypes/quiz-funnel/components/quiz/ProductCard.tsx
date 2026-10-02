'use client';

import { ArrowUpRight, Check, Star } from 'lucide-react';
import type { ProductRecommendation } from '@/data/quizData';
import type { ResultSlot } from '@/lib/quiz/scoring';
import { hostOf } from '@/lib/analytics/events';
import { track } from '@/lib/analytics/track';
import { ToneTile } from './icons';

export const SLOT_LABELS: Record<ResultSlot, string> = {
  best: 'Best Match',
  quiet: 'Quiet Alternative',
  multipack: 'Multi-Pack Value',
};

const SLOT_STYLES: Record<
  ResultSlot,
  { card: string; pill: string; name: string; body: string; cta: string; muted: string; check: string }
> = {
  best: {
    card: 'bg-plum text-cream ring-4 ring-mint-400/60 md:-translate-y-3 shadow-[0_24px_50px_-20px_rgba(36,27,53,0.7)]',
    pill: 'bg-mint-400 text-plum',
    name: 'text-cream',
    body: 'text-cream/80',
    cta: 'bg-mint-400 text-plum hover:bg-mint-200',
    muted: 'text-cream/60',
    check: 'bg-mint-400 text-plum',
  },
  quiet: {
    card: 'bg-white border-2 border-lavender-200',
    pill: 'bg-lavender-200 text-lavender-700',
    name: 'text-plum',
    body: 'text-plum-muted',
    cta: 'bg-lavender-600 text-white hover:bg-lavender-700',
    muted: 'text-plum-muted',
    check: 'bg-lavender-200 text-lavender-700',
  },
  multipack: {
    card: 'bg-cream-50 border-2 border-peach-200',
    pill: 'bg-peach-200 text-plum',
    name: 'text-plum',
    body: 'text-plum-muted',
    cta: 'bg-plum text-cream hover:bg-plum/90',
    muted: 'text-plum-muted',
    check: 'bg-peach-200 text-plum',
  },
};

type Props = {
  product: ProductRecommendation;
  slot: ResultSlot;
  href: string;
  persona: string;
};

export default function ProductCard({ product, slot, href, persona }: Props) {
  const s = SLOT_STYLES[slot];

  return (
    <article className={`flex flex-col overflow-hidden rounded-3xl transition duration-300 ${s.card}`}>
      <div className="relative">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt="" className="aspect-[16/9] w-full object-cover md:aspect-[4/3]" loading="lazy" />
        ) : (
          <ToneTile icon={product.icon} tone={product.tone} className="aspect-[16/9] w-full md:aspect-[4/3]" iconClassName="h-16 w-16" />
        )}
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${s.pill}`}>
          {SLOT_LABELS[slot]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className={`text-xs font-bold uppercase tracking-[0.14em] ${s.muted}`}>{product.badge}</p>
        <h3 className={`mt-1 font-display text-xl font-bold leading-snug ${s.name}`}>{product.name}</h3>

        {product.rating !== undefined && product.reviewCount !== undefined ? (
          <p className={`mt-1 flex items-center gap-1 text-sm ${s.muted}`}>
            <Star aria-hidden="true" className="h-4 w-4 fill-current text-peach-500" />
            {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString('en-US')} reviews)
          </p>
        ) : null}

        <p className={`mt-3 text-[15px] leading-relaxed ${s.body}`}>{product.description}</p>

        <ul className="mt-4 space-y-2">
          {product.highlights.map((h) => (
            <li key={h} className={`flex items-center gap-2 text-sm ${s.body}`}>
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${s.check}`}>
                <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <a
            href={href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() =>
              track('affiliate_click', {
                product_id: product.id,
                slot,
                persona,
                destination_host: hostOf(href) ?? undefined,
              })
            }
            className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-extrabold transition active:scale-[0.98] ${s.cta}`}
          >
            See price on Amazon
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <p className={`mt-2 text-center text-xs ${s.muted}`}>Affiliate link · opens Amazon in a new tab</p>
        </div>
      </div>
    </article>
  );
}
