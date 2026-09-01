import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Disclosure',
  description: `How ${site.name} is funded and how that could affect what you see.`,
  alternates: { canonical: '/disclosure' },
};

export default function DisclosurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Disclosure"
        title="Disclosure"
        intro="How this site is funded, stated plainly."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <h2>Current status</h2>
          <p>
            This site does not currently earn money. There are no paid listings, no affiliate links,
            no sponsorships, and nothing for sale.
          </p>

          <h2>What is planned</h2>
          <p>
            Two things are being considered: paid listings for local providers in the directory, and
            affiliate links to sensory equipment, where a purchase made through a link could earn a
            commission at no extra cost to you.
          </p>

          <h2>The commitment</h2>
          <ul>
            <li>Paid placement will be labeled as paid, wherever it appears.</li>
            <li>Affiliate links will be labeled as affiliate links.</li>
            <li>Payment will not buy a recommendation, a rating, or a claim about quality.</li>
            <li>This page will be updated before any of it goes live, not after.</li>
          </ul>

          <h2>Not endorsements</h2>
          <p>
            A listing or a link means a service exists and can be reached. It is not a judgment that
            it is right for you. {site.name} does not evaluate providers clinically and does not
            verify treatment outcomes.
          </p>
        </div>
      </div>
    </>
  );
}
