import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `What ${site.name} is, what it covers, and its current stage.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About this site"
        intro={`${site.name} is an independent information hub for ${site.region}.`}
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <h2>Purpose</h2>
          <p>
            The aim is narrow and practical: help people in Southeast Michigan find clear
            information about sensory processing, point them to organizations that publish
            trustworthy material, and over time help them locate local services.
          </p>

          <h2>Current stage</h2>
          <p>
            The site is early. The structure is in place, and sections are being filled in as
            material can be written and checked. Pages that are not ready say so plainly instead of
            showing placeholder content.
          </p>

          <h2>Scope and limits</h2>
          <p>
            This is not an occupational therapy practice, a medical provider, a diagnostic tool, or
            a crisis service. No one here evaluates individuals or delivers care. Links and, later,
            listings are provided for convenience and are not endorsements or recommendations.
          </p>

          <h2>Corrections</h2>
          <p>
            Accuracy matters more than volume. If something here is wrong or out of date, it should
            be fixed. A contact route will be published once there is a monitored inbox to receive
            messages.
          </p>

          <h2>Who publishes it</h2>
          <p>{site.descriptor}.</p>
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
