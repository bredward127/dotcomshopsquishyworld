import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ComingSoon from '@/components/ComingSoon';
import Disclaimer from '@/components/Disclaimer';

export const metadata: Metadata = {
  title: 'School and classroom',
  description: 'General information about sensory considerations in school settings.',
  alternates: { canonical: '/families/school-support' },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="For Families" title="School and classroom" intro="General information about sensory considerations in school settings." />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ComingSoon
          what="This section"
          detail="Guidance about school settings varies by district and by a student's individual plan, so this section is being written carefully rather than quickly."
        />
        <Disclaimer />
      </div>
    </>
  );
}
