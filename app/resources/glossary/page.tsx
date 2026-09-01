import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ComingSoon from '@/components/ComingSoon';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Terms you may encounter, explained in plain language.',
  alternates: { canonical: '/resources/glossary' },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Resources" title="Glossary" intro="Terms you may encounter, explained in plain language." />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ComingSoon
          what="The glossary"
          detail="Definitions are being written and attributed so they reflect how these terms are actually used by practitioners."
        />
        <Disclaimer />
      </div>
    </>
  );
}
