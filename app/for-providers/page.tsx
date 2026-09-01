import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'For providers',
  description:
    'How directory listings will work for local practices and organizations in Southeast Michigan.',
  alternates: { canonical: '/for-providers' },
};

export default function ForProvidersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Providers"
        title="For providers"
        intro="Information for local practices and organizations, ahead of the directory opening."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <h2>Current status</h2>
          <p>
            The directory is not open for listings yet, and no providers are published. Nothing is
            being sold, and there is no waiting list to join.
          </p>

          <h2>How listings will work</h2>
          <ul>
            <li>A practice appears only after it has agreed to be listed.</li>
            <li>Details are confirmed with the practice before publication.</li>
            <li>
              A listing describes what a practice says it offers. It is not a review, a rating, or
              an assessment of clinical quality.
            </li>
            <li>Any paid placement is labeled as paid, wherever it appears.</li>
            <li>A practice can ask to be corrected or removed at any time.</li>
          </ul>

          <h2>What will not happen</h2>
          <p>
            No practice will be added from scraped listings or third-party data without asking
            first. No testimonials, review counts, or endorsement claims will be published unless
            they are real and attributable.
          </p>

          <h2>Getting in touch</h2>
          <p>
            There is no monitored inbox yet, so there is deliberately no contact form on this page —
            a form that discards what you type would waste your time. Details for reaching us will
            be published here once that is in place.
          </p>
        </div>

        <div className="mt-10 rounded-card border border-mist-400 bg-mist-200 px-6 py-5">
          <p className="text-[15px] leading-relaxed text-ink-muted">
            Funding and paid-placement policy is set out on the{' '}
            <Link href="/disclosure" className="underline underline-offset-4 hover:text-navy">
              disclosure page
            </Link>
            .
          </p>
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
