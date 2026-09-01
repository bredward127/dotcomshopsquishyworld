import Link from 'next/link';
import ContactLinks from './ContactLinks';
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
import { EXAMPLE_BADGE } from '@/lib/directory/data';

function StatusPill({ provider }: { provider: Provider }) {
  const confirmed = canShowReferralStatus(provider);
  const status = referralStatusOf(provider);

  // Without a source and a date we say so, rather than asserting availability.
  if (!confirmed) {
    return (
      <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink-muted">
        Referral status not confirmed
      </span>
    );
  }

  const tone =
    status === 'accepting'
      ? 'bg-teal/10 text-teal-700'
      : status === 'waitlist'
        ? 'bg-gold/20 text-navy'
        : 'bg-mist text-ink-muted';

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${tone}`}>
      {referralLabel(status)}
      <span className="font-normal"> · confirmed {provider.referral!.lastConfirmed}</span>
    </span>
  );
}

export default function ProviderCard({ provider }: { provider: Provider }) {
  const website = safeWebsite(provider.website);
  const tel = telHref(provider.phone);
  const primary = provider.locations[0];
  const example = provider.isExample === true;

  return (
    <article
      className={`rounded-card border p-5 ${
        example ? 'border-2 border-dashed border-gold-600 bg-gold/5' : 'border-mist-400 bg-white'
      }`}
    >
      {example && (
        <p className="mb-3 inline-block rounded bg-gold-600 px-2 py-1 text-xs font-bold uppercase tracking-wide text-navy">
          {EXAMPLE_BADGE}
        </p>
      )}

      <h3 className="text-lg font-semibold text-navy">
        <Link href={`/providers/${provider.slug}`} className="hover:underline">
          {provider.name}
        </Link>
      </h3>

      {primary && (
        <p className="mt-1 text-sm text-ink-muted">
          {primary.city}, {primary.state} {primary.postalCode}
        </p>
      )}

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {provider.services.map((service) => (
          <li
            key={service}
            className="rounded bg-mist px-2 py-1 text-xs font-medium text-navy"
          >
            {serviceLabel(service)}
          </li>
        ))}
      </ul>

      <dl className="mt-3 space-y-1 text-sm text-ink-muted">
        <div className="flex gap-2">
          <dt className="font-medium text-navy">Ages:</dt>
          <dd>{provider.ageGroups.map(ageGroupLabel).join(', ')}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium text-navy">Telehealth:</dt>
          <dd>{provider.telehealth ? 'Yes' : 'No'}</dd>
        </div>
        {provider.lastConfirmed && (
          <div className="flex gap-2">
            <dt className="font-medium text-navy">Details last confirmed:</dt>
            <dd>{provider.lastConfirmed}</dd>
          </div>
        )}
      </dl>

      <div className="mt-3">
        <StatusPill provider={provider} />
      </div>

      {provider.disclosures && provider.disclosures.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {provider.disclosures.map((disclosure) => (
            <li
              key={disclosure}
              className="rounded border border-mist-600 px-2 py-1 text-xs text-ink-muted"
            >
              {disclosure}
            </li>
          ))}
        </ul>
      )}

      {/* Contact controls appear only when there is something real behind them,
          and never on an example record. */}
      {!example && (
        <div className="mt-4">
          <ContactLinks slug={provider.slug} phone={provider.phone} tel={tel} website={website} />
        </div>
      )}

      {example && (
        <p className="mt-4 text-xs italic text-ink-muted">
          Contact buttons are disabled on example listings.
        </p>
      )}
    </article>
  );
}
