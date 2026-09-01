import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProviderProfileTemplate, {
  generateProviderStructuredData,
} from '@/components/templates/ProviderProfileTemplate';
import { findProvider, allProviderSlugs } from '@/lib/directory/data';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return allProviderSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const provider = findProvider(params.slug);
  if (!provider) return { title: 'Listing not found' };
  return {
    title: provider.isExample ? `${provider.name} (example listing)` : provider.name,
    description: provider.description,
    alternates: { canonical: `/providers/${provider.slug}` },
    // Example records must never be indexed as if they were real practices.
    robots: provider.isExample ? { index: false, follow: false } : undefined,
  };
}

export default function ProviderProfilePage({ params }: Params) {
  const provider = findProvider(params.slug);
  if (!provider) notFound();

  return (
    <ProviderProfileTemplate
      provider={provider}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Find local support', href: '/find-help' },
        { label: provider.name },
      ]}
    />
  );
}
