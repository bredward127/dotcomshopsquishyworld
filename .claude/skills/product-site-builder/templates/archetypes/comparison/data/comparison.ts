import { Award, BadgeCheck, CircleDollarSign, Feather } from 'lucide-react';
import { buildLink } from '@/lib/links';
import { site } from '@/data/site';
import type { ProductItem } from '@/components/sections/types';

/**
 * "Best X for Y" comparison / review page for affiliate search traffic.
 * Only compare facts you have checked on the listing or spec sheet.
 */
const amazon = (id: string, query: string, asin?: string) =>
  buildLink({ kind: 'amazon', asin, query }, { amazonTag: site.amazonTag, sub: ['best', id] });

export const picks: ProductItem[] = [
  {
    id: 'pick-overall',
    label: 'Best overall',
    name: 'Product A',
    badge: 'Our top pick',
    description: 'Why it wins, in one or two sentences.',
    highlights: ['Verified fact', 'Verified fact', 'Verified fact'],
    icon: Award,
    featured: true,
    cta: { label: 'See price on Amazon', href: amazon('pick-overall', 'product a'), id: 'pick-overall', sponsored: true },
    ctaNote: 'Affiliate link · opens Amazon',
  },
  {
    id: 'pick-budget',
    label: 'Best budget',
    name: 'Product B',
    description: 'Who should pick this instead.',
    highlights: ['Verified fact', 'Verified fact'],
    icon: CircleDollarSign,
    cta: { label: 'See price on Amazon', href: amazon('pick-budget', 'product b'), id: 'pick-budget', sponsored: true },
    ctaNote: 'Affiliate link · opens Amazon',
  },
  {
    id: 'pick-premium',
    label: 'Best premium',
    name: 'Product C',
    description: 'Who should pay more, and for what.',
    highlights: ['Verified fact', 'Verified fact'],
    icon: Feather,
    cta: { label: 'See price on Amazon', href: amazon('pick-premium', 'product c'), id: 'pick-premium', sponsored: true },
    ctaNote: 'Affiliate link · opens Amazon',
  },
];

export const table = {
  title: 'Side by side',
  columns: ['Product A', 'Product B', 'Product C'],
  highlight: 0,
  rows: [
    { label: 'Key spec', values: ['Value', 'Value', 'Value'] },
    { label: 'Feature', values: [true, false, true] },
    { label: 'Best for', values: ['Most people', 'Tight budgets', 'Enthusiasts'] },
  ],
};

export const method = [
  { icon: BadgeCheck, title: 'How we chose', body: 'State the real method: specs compared, owner reviews read, hands-on testing only if it happened.' },
];
