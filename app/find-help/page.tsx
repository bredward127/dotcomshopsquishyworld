import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import DirectoryBrowser from '@/components/directory/DirectoryBrowser';
import { providers, exampleProviders } from '@/lib/directory/data';

export const metadata: Metadata = {
  title: 'Find local support',
  description:
    'A directory of sensory-related services in Metro Detroit and Southeast Michigan. Listings appear only with the provider’s agreement and confirmed details.',
  alternates: { canonical: '/find-help' },
};

export default function FindHelpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Find Local Help"
        title="Find local support"
        intro="Services in Metro Detroit and Southeast Michigan. This directory is new, and it is being built one confirmed listing at a time."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <DirectoryBrowser providers={providers} examples={exampleProviders} />

        <div className="mt-10 rounded-card border border-mist-400 bg-mist-200 px-6 py-5">
          <h2 className="font-semibold text-navy">How to read a listing</h2>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">
            A listing means a practice exists and agreed to appear here. It is not a review, a
            rating, or a judgement about clinical quality, and it does not mean the practice has
            been vetted beyond confirming its basic details. Referral status is shown only when we
            can say where the information came from and when it was last checked — otherwise it
            reads as not confirmed, because availability changes faster than any directory.
          </p>
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
