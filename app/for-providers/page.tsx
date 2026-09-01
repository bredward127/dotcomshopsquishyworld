import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { providerContactEmail, providerContactReady } from '@/lib/site';

export const metadata: Metadata = {
  title: 'For providers',
  description:
    'How directory listings work for local practices and organizations in Metro Detroit and Southeast Michigan.',
  alternates: { canonical: '/for-providers' },
};

const INTEREST_SUBJECT = encodeURIComponent('Directory listing interest');
const INTEREST_BODY = encodeURIComponent(
  [
    'Practice or organization name:',
    'City:',
    'Services offered:',
    'Ages served:',
    'Telehealth offered (yes/no):',
    'Website:',
    'Best phone number:',
    'Your name and role:',
    '',
    'Anything else we should know:',
  ].join('\n'),
);

export default function ForProvidersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For Providers"
        title="For providers"
        intro="Information for local practices and organizations about how listings work."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="prose-page max-w-prose">
            <h2>Current status</h2>
            <p>
              The directory is open for interest but has no published listings yet. Nothing is being
              charged, and there is no paid placement available at this stage.
            </p>

            <h2>How listings work</h2>
            <ul>
              <li>A practice appears only after it has agreed to be listed.</li>
              <li>Details are confirmed with the practice before publication.</li>
              <li>
                A listing describes what a practice says it offers. It is not a review, a rating, or
                an assessment of clinical quality.
              </li>
              <li>
                Availability is shown only when we can name a source and the date it was last
                checked. Otherwise it reads as not confirmed.
              </li>
              <li>
                No claim about licensing, insurance, or outcomes is published on a practice&rsquo;s
                behalf.
              </li>
              <li>Any paid placement will be labeled as paid, wherever it appears.</li>
              <li>A practice can ask to be corrected or removed at any time.</li>
            </ul>

            <h2>What will not happen</h2>
            <p>
              No practice is added from scraped listings or third-party data without asking first.
              No testimonials, review counts, or endorsement claims are published unless they are
              real and attributable to a named source.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="rounded-card border border-mist-400 bg-mist px-6 py-6">
              <h2 className="font-semibold text-navy">Register interest</h2>
              {providerContactReady ? (
                <>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    There is no submission form here yet. Email is the working route — the link
                    below opens your mail app with the details we need already laid out.
                  </p>
                  <a
                    href={`mailto:${providerContactEmail}?subject=${INTEREST_SUBJECT}&body=${INTEREST_BODY}`}
                    className="mt-4 block rounded-md bg-navy px-5 py-3 text-center text-sm font-semibold text-white hover:bg-navy-900"
                  >
                    Email us about a listing
                  </a>
                  <p className="mt-3 break-all text-xs text-ink-muted">{providerContactEmail}</p>
                </>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  There is no contact route published yet. Rather than put up a form that discards
                  what you type, this page will be updated as soon as there is a monitored inbox to
                  receive it.
                </p>
              )}
            </div>

            <div className="rounded-card border border-mist-400 px-6 py-5">
              <h2 className="font-semibold text-navy">Funding</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                How this site is funded, and how that could affect what appears, is set out on the{' '}
                <Link href="/disclosure" className="underline underline-offset-4 hover:text-navy">
                  disclosure page
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
