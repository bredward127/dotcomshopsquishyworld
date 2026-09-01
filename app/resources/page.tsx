import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ComingSoon from '@/components/ComingSoon';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'External resources',
  description: 'Reputable organizations and public information about sensory processing.',
  alternates: { canonical: '/resources' },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Resources" title="External resources" intro="Reputable organizations and public information about sensory processing." />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ComingSoon
          what="The resource list"
          detail="Each entry is being checked against a live source before publication, so the list starts empty rather than padded with links that may not resolve."
        />
        <Disclaimer />
      </div>
    </>
  );
}
