import type { Metadata } from 'next';
import Link from 'next/link';
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
            The Sensory Match quiz at <Link href="/quiz">/quiz</Link> contains affiliate links. As an Amazon
            Associate we earn from qualifying purchases. If you buy through one of those links, we may
            earn a commission at no extra cost to you.
          </p>
          <p>
            Everything else on this site earns nothing: there are no paid listings, no sponsorships,
            and no affiliate links in the directory, the library, or the resources pages.
          </p>

          <h2>How quiz matches are chosen</h2>
          <p>
            Quiz results come from your four answers and a fixed scoring formula in this site&rsquo;s
            source code. Commission rates do not enter into it and no brand pays for a placement.
            Prices shown are typical ranges; the retailer sets the actual price.
          </p>

          <h2>What is planned</h2>
          <p>
            Paid listings for local providers in the directory are being considered. This page will be
            updated before that goes live.
          </p>

          <h2>The commitment</h2>
          <ul>
            <li>Paid placement will be labeled as paid, wherever it appears.</li>
            <li>Affiliate links will be labeled as affiliate links.</li>
            <li>Payment will not buy a recommendation, a rating, or a claim about quality.</li>
            <li>This page will be updated before any new kind of paid placement goes live, not after.</li>
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
