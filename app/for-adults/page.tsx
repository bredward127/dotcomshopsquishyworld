import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ComingSoon from '@/components/ComingSoon';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'For an adult',
  description:
    'Information for adults looking into their own sensory needs at home, at work, and in daily life.',
  alternates: { canonical: '/for-adults' },
};

export default function ForAdultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="For an adult"
        title="For an adult"
        intro="Most material on sensory processing is written for parents. This section is for adults considering their own needs."
      />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ComingSoon
          what="This section"
          detail="Written material for adults — covering work environments, daily routines, and what to expect from an assessment — is being drafted so it can be accurate and properly sourced before it is published."
        />
        <Disclaimer />
      </div>
    </>
  );
}
