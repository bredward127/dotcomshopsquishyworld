import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { findProvider, allProviderSlugs, EXAMPLE_BADGE } from '@/lib/directory/data';
import {
  ageGroupLabel,
  canShowReferralStatus,
  referralLabel,
  referralStatusOf,
  safeWebsite,
  serviceLabel,
  telHref,
  type Provider,
} from '@/lib/directory/types';
import { providerContactEmail, providerContactReady, absoluteUrl } from '@/lib/site';

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

/**
 * Structured data is emitted only for a real listing whose details we have
 * actually confirmed. Example records get none, and no medical-specific
 * schema type is used: eligibility for those types has not been established,
 * and ProfessionalService claims nothing clinical.
 */
function structuredData(provider: Provider) {
  if (provider.isExample) return null;
  if (!provider.lastConfirmed) return null;

  const primary = provider.locations[0];
  if (!primary) return null;

  const website = safeWebsite(provider.website);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': absoluteUrl(`/providers/${provider.slug}`),
    name: provider.name,
    description: provider.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: primary.city,
      addressRegion: primary.state,
      postalCode: primary.postalCode,
      addressCountry: 'US',
      ...(primary.streetAddress ? { streetAddress: primary.streetAddress } : {}),
    },
    ...(provider.phone ? { telephone: provider.phone } : {}),
    ...(website ? { url: website } : {}),
  };
}

export default function ProviderProfilePage({ params }: Params) {
  const provider = findProvider(params.slug);
  if (!provider) notFound();

  const website = safeWebsite(provider.website);
  const tel = telHref(provider.phone);
  const confirmed = canShowReferralStatus(provider);
  const example = provider.isExample === true;
  const jsonLd = structuredData(provider);

  const correctionSubject = encodeURIComponent(`Listing correction: ${provider.name}`);
  const claimSubject = encodeURIComponent(`Claim listing: ${provider.name}`);

  return (
    <>
      <PageHeader
        eyebrow={example ? 'Example listing' : 'Local listing'}
        title={provider.name}
        intro={provider.locations[0] ? `${provider.locations[0].city}, ${provider.locations[0].state}` : undefined}
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        {example && (
          <div
            role="note"
            className="mb-8 rounded-card border-2 border-dashed border-gold-600 bg-gold/10 px-6 py-5"
          >
            <p className="font-bold uppercase tracking-wide text-navy">{EXAMPLE_BADGE}</p>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">
              This is a placeholder used to show how a listing is laid out. It is not a real
              practice. The name, phone number, and website are fictional, and no contact details
              are provided.
            </p>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <section className="prose-page max-w-prose">
              <h2>About</h2>
              <p>{provider.description}</p>

              <h2>Services</h2>
              <ul>
                {provider.services.map((service) => (
                  <li key={service}>{serviceLabel(service)}</li>
                ))}
              </ul>

              <h2>Ages served</h2>
              <p>{provider.ageGroups.map(ageGroupLabel).join(', ')}</p>

              <h2>Service area</h2>
              <p>{provider.serviceAreaNote}</p>
              <p>Telehealth: {provider.telehealth ? 'Offered' : 'Not offered'}</p>
            </section>

            <section className="mt-10 max-w-prose rounded-card border border-mist-400 bg-mist-200 px-6 py-5">
              <h2 className="font-semibold text-navy">Disclosure</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                This listing describes what the practice says it offers. It is not a review, a
                rating, or an assessment of clinical quality, and it is not an endorsement. No
                claim is made here about licensing, insurance, or outcomes.
              </p>
              {provider.disclosures && provider.disclosures.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {provider.disclosures.map((d) => (
                    <li key={d} className="text-sm text-ink-muted">
                      · {d}
                    </li>
                  ))}
                </ul>
              )}
              {!provider.disclosures?.length && (
                <p className="mt-3 text-sm text-ink-muted">
                  This listing is not paid for and is not sponsored.
                </p>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-card border border-mist-400 p-5">
              <h2 className="font-semibold text-navy">Contact</h2>
              {example ? (
                <p className="mt-2 text-sm text-ink-muted">
                  Contact details are not shown on example listings.
                </p>
              ) : tel || website ? (
                <div className="mt-3 space-y-2">
                  {tel && (
                    <a
                      href={tel}
                      className="block rounded-md bg-navy px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-navy-900"
                    >
                      Call {provider.phone}
                    </a>
                  )}
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-md border border-navy px-4 py-2.5 text-center text-sm font-semibold text-navy hover:bg-mist"
                    >
                      Visit website
                    </a>
                  )}
                </div>
              ) : (
                <p className="mt-2 text-sm text-ink-muted">
                  No contact details have been confirmed for this listing yet.
                </p>
              )}
            </div>

            <div className="rounded-card border border-mist-400 p-5">
              <h2 className="font-semibold text-navy">Referral status</h2>
              <p className="mt-2 text-sm text-ink-muted">
                {confirmed
                  ? `${referralLabel(referralStatusOf(provider))} — last confirmed ${provider.referral!.lastConfirmed}.`
                  : 'Not confirmed. Contact the practice directly to ask about availability.'}
              </p>
              {confirmed && (
                <p className="mt-2 text-xs text-ink-muted">Source: {provider.referral!.source}</p>
              )}
              {provider.lastConfirmed && (
                <p className="mt-2 text-xs text-ink-muted">
                  Listing details last confirmed {provider.lastConfirmed}.
                </p>
              )}
            </div>

            <div className="rounded-card border border-mist-400 bg-mist px-5 py-5">
              <h2 className="font-semibold text-navy">Something wrong here?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                If you work at this practice, you can claim this listing or ask for a correction or
                removal.
              </p>
              {providerContactReady && !example ? (
                <div className="mt-4 space-y-2">
                  <a
                    href={`mailto:${providerContactEmail}?subject=${claimSubject}`}
                    className="block rounded-md bg-navy px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-navy-900"
                  >
                    Claim this listing
                  </a>
                  <a
                    href={`mailto:${providerContactEmail}?subject=${correctionSubject}`}
                    className="block rounded-md border border-navy px-4 py-2.5 text-center text-sm font-semibold text-navy hover:bg-white"
                  >
                    Request a correction
                  </a>
                </div>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">
                  {example
                    ? 'Not applicable to an example listing.'
                    : 'A contact route will be published here shortly.'}
                </p>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <Link href="/find-help" className="text-sm underline underline-offset-4 hover:text-navy">
            Back to all listings
          </Link>
        </div>

        <Disclaimer />
      </div>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
