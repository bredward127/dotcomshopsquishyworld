import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { ExternalResourceCard } from '@/components/seo/SourceAttribution';

export const metadata: Metadata = {
  title: 'External Resources & Educational Links',
  description:
    'Human-verified external resources, occupational therapy platforms, and public developmental guides. All links open in new tabs with clear attribution.',
  alternates: { canonical: '/resources' },
};

const verifiedResources = [
  {
    category: 'Pediatric OT & Home Activities',
    title: 'Free Pediatric OT Resources, Activities & Educational Articles',
    org: 'The OT Toolbox',
    description:
      'A leading curated educational repository created by licensed occupational therapy professionals, offering practical sensory-motor activities, fine motor developmental ideas, and sensory diet concepts for parents, caregivers, and educators. We link to this library as an external educational reference; original worksheets, printables, and proprietary articles remain on their site and are never reproduced here.',
    url: 'https://www.theottoolbox.com/free-resources/',
  },
  {
    category: 'Professional Association',
    title: 'Consumer Resources & Practice Guidelines',
    org: 'American Occupational Therapy Association (AOTA)',
    description:
      'The primary national professional association representing occupational therapists in the United States. Offers authoritative, evidence-informed guidance on sensory integration, pediatric development, and school accommodations.',
    url: 'https://www.aota.org',
  },
  {
    category: 'Workplace Accommodations',
    title: 'Sensory Processing Disorder & Neurodiversity Accommodations',
    org: 'Job Accommodation Network (JAN)',
    description:
      'A free service of the U.S. Department of Labor providing comprehensive workplace accommodation ideas, legal rights under the ADA, and ergonomic solutions for adults with sensory sensitivities.',
    url: 'https://askjan.org',
  },
  {
    category: 'Michigan Early Intervention',
    title: 'Early On Michigan (Infants & Toddlers)',
    org: 'Michigan Department of Education',
    description:
      'Michigan’s state-sponsored early intervention system under Part C of the Individuals with Disabilities Education Act (IDEA), offering developmental screenings and occupational therapy evaluations for children from birth to age 3.',
    url: 'https://www.1800earlyon.org',
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'External resources' },
        ]}
      />

      <PageHeader
        eyebrow="Resources"
        title="External resources"
        intro="Reputable organizations, educational libraries, and public information about sensory processing. Each resource has been verified by a human reviewer."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="max-w-prose">
          <p className="text-sm leading-relaxed text-ink-muted">
            We link to outside organizations that publish trustworthy, evidence-informed material.
            In keeping with our{' '}
            <Link href="/editorial-policy" className="underline hover:text-navy">
              Editorial Policy
            </Link>
            , we cite external publishers only after confirming their relevance. All external links
            open in a new browser tab with clear attribution. We never copy, scrape, or reproduce
            copyrighted worksheets, proprietary tests, or third-party articles.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {verifiedResources.map((res, index) => (
            <ExternalResourceCard
              key={index}
              category={res.category}
              title={res.title}
              org={res.org}
              description={res.description}
              url={res.url}
            />
          ))}
        </div>

        <div className="mt-12 rounded-card border border-mist-400 bg-mist p-6">
          <h2 className="font-semibold text-navy">Educational guides on this site</h2>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            Looking for structured overviews created specifically for Southeast Michigan families and adults?
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
            <li>
              <Link
                href="/topics/what-is-a-sensory-diet"
                className="font-medium text-navy hover:text-teal hover:underline"
              >
                &rarr; What is a sensory diet?
              </Link>
            </li>
            <li>
              <Link
                href="/topics/find-pediatric-occupational-therapy-metro-detroit"
                className="font-medium text-navy hover:text-teal hover:underline"
              >
                &rarr; Finding pediatric OT in Metro Detroit
              </Link>
            </li>
            <li>
              <Link
                href="/topics/sensory-friendly-support-adults-southeast-michigan"
                className="font-medium text-navy hover:text-teal hover:underline"
              >
                &rarr; Adult sensory support in Southeast Michigan
              </Link>
            </li>
            <li>
              <Link
                href="/topics/questions-to-ask-occupational-therapist"
                className="font-medium text-navy hover:text-teal hover:underline"
              >
                &rarr; Questions to ask before choosing an OT
              </Link>
            </li>
          </ul>
        </div>

        <Disclaimer />
      </div>
    </>
  );
}
