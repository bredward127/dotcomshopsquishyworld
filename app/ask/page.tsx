import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'Ask a question',
  description:
    'Where to find answers on this site today, and what a question feature will and will not cover.',
  alternates: { canonical: '/ask' },
};

const routes = [
  {
    href: '/families',
    label: 'Questions about a child',
    blurb: 'Background for parents, caregivers, and educators.',
  },
  {
    href: '/for-adults',
    label: 'Questions about yourself',
    blurb: 'Information for adults considering their own sensory needs.',
  },
  {
    href: '/find-help',
    label: 'Questions about local services',
    blurb: 'What is available regionally, and what to ask a provider.',
  },
  {
    href: '/resources/glossary',
    label: 'Questions about a term',
    blurb: 'Plain-language definitions of words you may encounter.',
  },
];

export default function AskPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ask a question"
        title="Ask a question"
        intro="Direct questions are not open yet. Here is where the answers live in the meantime."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="rounded-card border border-mist-400 bg-mist-200 px-6 py-6">
          <h2 className="font-semibold text-navy">Why there is no form here</h2>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-muted">
            A question box is only worth having if someone reads it and replies. There is no
            monitored inbox behind this site yet, so rather than collect messages that would go
            unanswered, this page routes you to the material that already exists. A real contact
            path will appear here once there is someone to receive it.
          </p>
        </div>

        <h2 className="mt-12 text-xl font-semibold text-navy">Start with your situation</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="group flex h-full flex-col rounded-card border border-mist-400 p-5 transition-colors hover:border-teal hover:bg-mist-200"
              >
                <span className="font-semibold text-navy group-hover:underline">{route.label}</span>
                <span className="mt-1.5 text-sm leading-relaxed text-ink-muted">{route.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-prose rounded-card border border-mist-600 px-6 py-5">
          <h2 className="font-semibold text-navy">What this site will never answer</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
            Questions about a specific person — whether someone has a condition, what their plan
            should be, or whether a particular approach will work for them — need a qualified
            professional who has met them. That will not change when a contact path opens.
          </p>
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
