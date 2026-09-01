import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ComingSoon from '@/components/ComingSoon';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'Local service directory',
  description: 'Regional listings for sensory-related services in Metro Detroit and Southeast Michigan.',
  alternates: { canonical: '/find-help' },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Find Local Help" title="Local service directory" intro="Regional listings for sensory-related services in Metro Detroit and Southeast Michigan." />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ComingSoon
          what="The directory"
          detail="No listings are published yet. Providers will appear here only after they have agreed to be listed and their details have been confirmed. No practice will be added from scraped or unverified sources."
        />
        <Disclaimer />
      </div>
    </>
  );
}
