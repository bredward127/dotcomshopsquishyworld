import { Clock, Hand, Leaf, RotateCcw, Sparkles, Truck, VolumeX, Zap } from 'lucide-react';
import { buildLink } from '@/lib/links';
import { site } from '@/data/site';

/**
 * Single-product landing page. Replace every string; keep claims you can back up.
 * `buyHref` can be your own checkout (Shopify/Stripe link) or an affiliate link.
 */
const buyHref = buildLink({ kind: 'amazon', query: 'replace with product search or set asin' }, { amazonTag: site.amazonTag, sub: ['landing'] });

export const landing = {
  hero: {
    eyebrow: 'New · Product category',
    title: 'The one-line promise that names the outcome',
    accent: 'names the outcome',
    subtitle: 'One sentence on who it is for and what changes for them. No superlatives you cannot prove.',
    cta: { label: 'Check price', href: buyHref, id: 'hero-buy', sponsored: true },
    secondary: { label: 'See how it works', href: '#how', id: 'hero-how' },
    bullets: ['Free returns (if true)', 'Ships in 24h (if true)'],
  },
  proof: [
    { icon: Truck, label: 'Fast shipping' },
    { icon: RotateCcw, label: '30-day returns' },
    { icon: Leaf, label: 'Material fact' },
    { icon: Sparkles, label: 'Another true fact' },
  ],
  problem: {
    title: 'Sound familiar?',
    problems: [
      { icon: Clock, title: 'Pain point one', body: 'Describe it the way the customer would.' },
      { icon: VolumeX, title: 'Pain point two', body: 'Concrete, specific, a little relatable.' },
      { icon: Hand, title: 'Pain point three', body: 'The one that makes them nod.' },
    ],
    solution: { title: 'How the product answers it', body: 'Mechanism in plain words. What it does, not what it cures.' },
  },
  features: [
    { icon: Zap, title: 'Feature → benefit', body: 'What it is and why it matters to them.' },
    { icon: Leaf, title: 'Feature → benefit', body: 'Keep each to two lines.' },
    { icon: Sparkles, title: 'Feature → benefit', body: 'Demo-able features first.' },
  ],
  steps: [
    { title: 'Order', body: 'What happens when they click.' },
    { title: 'Use', body: 'The first five minutes with the product.' },
    { title: 'Enjoy', body: 'The outcome, stated modestly.' },
  ],
  faq: [
    { q: 'What if it does not work for me?', a: 'State the real return policy.' },
    { q: 'How long does shipping take?', a: 'Real numbers from the fulfilment partner.' },
  ],
  promise: { eyebrow: 'Our promise', title: 'A guarantee you will honor', body: 'Spell out the terms in one short paragraph.' },
  final: { title: 'Still deciding?', body: 'Restate the outcome in one line.', cta: { label: 'Check price', href: buyHref, id: 'final-buy', sponsored: true } },
};
