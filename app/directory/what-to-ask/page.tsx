import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ComingSoon from '@/components/ComingSoon';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'What to ask a provider',
  description: 'Questions worth bringing to a first conversation with a local provider.',
  alternates: { canonical: '/directory/what-to-ask' },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Find Local Help" title="What to ask a provider" intro="Questions worth bringing to a first conversation with a local provider." />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ComingSoon
          what="This list"
          detail="A set of practical questions is being prepared, covering areas like scheduling, cost, insurance, and how a provider communicates with families."
        />
        <Disclaimer />
      </div>
    </>
  );
}
