import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ComingSoon from '@/components/ComingSoon';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'Sensory basics',
  description: 'Plain-language background on how sensory processing is commonly described.',
  alternates: { canonical: '/families/sensory-basics' },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="For Families" title="Sensory basics" intro="Plain-language background on how sensory processing is commonly described." />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ComingSoon
          what="This guide"
          detail="Written material on the sensory channels is being drafted so it can be accurate and properly attributed before it is published."
        />
        <Disclaimer />
      </div>
    </>
  );
}
