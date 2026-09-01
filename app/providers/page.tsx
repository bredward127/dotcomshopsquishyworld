import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ComingSoon from '@/components/ComingSoon';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'For providers',
  description: 'Information for local practices and organizations about future directory listings.',
  alternates: { canonical: '/providers' },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="For Providers" title="For providers" intro="Information for local practices and organizations about future directory listings." />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ComingSoon
          what="The provider interest list"
          detail="The directory is not open for listings yet. When it opens, this page will explain how listings work, what they cost, and how a practice can request one."
        />
        <Disclaimer />
      </div>
    </>
  );
}
