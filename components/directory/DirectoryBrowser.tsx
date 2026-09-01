'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  SERVICE_TYPES,
  AGE_GROUPS,
  REFERRAL_STATUSES,
  type AgeGroupId,
  type Provider,
  type ReferralStatusId,
  type ServiceTypeId,
} from '@/lib/directory/types';
import { filterProviders, hasActiveFilters, EMPTY_FILTERS } from '@/lib/directory/filters';
import ProviderCard from './ProviderCard';
import { track } from '@/lib/analytics/track';

type Props = {
  providers: Provider[];
  examples: Provider[];
};

export default function DirectoryBrowser({ providers, examples }: Props) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showExamples, setShowExamples] = useState(false);

  const hasRealData = providers.length > 0;

  const results = useMemo(() => {
    const active = hasRealData ? providers : showExamples ? examples : [];
    return filterProviders(active, filters);
  }, [hasRealData, providers, showExamples, examples, filters]);
  const filtersActive = hasActiveFilters(filters);

  // Report which filter dimensions were used, never the typed city or ZIP.
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!filtersActive) return;
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      track('directory_search', {
        has_location: filters.location.trim().length > 0,
        service: filters.service || undefined,
        age_group: filters.ageGroup || undefined,
        referral_status: filters.referral || undefined,
        result_count: results.length,
      });
    }, 600);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [filters, filtersActive, results.length]);

  // Filter controls are hidden entirely when there is nothing to filter.
  const showControls = hasRealData || showExamples;

  return (
    <div>
      {!hasRealData && (
        <section className="rounded-card border border-mist-400 bg-mist px-6 py-8">
          <h2 className="text-xl font-semibold text-navy">No listings are published yet</h2>
          <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">
            The directory for Metro Detroit and Southeast Michigan is being built. A practice
            appears here only after it has agreed to be listed and its details have been confirmed
            — nothing is copied in from other directories or added without asking.
          </p>
          <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">
            In the meantime, a pediatrician or primary care provider can usually point toward
            occupational therapy services in the area, and for anything school-related it is worth
            asking about a school-based therapist.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/for-providers"
              className="rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-900"
            >
              I run a local practice
            </Link>
            <Link
              href="/find-help/what-to-ask"
              className="rounded-md border border-navy px-5 py-2.5 text-sm font-semibold text-navy hover:bg-mist"
            >
              What to ask a provider
            </Link>
          </div>
        </section>
      )}

      {!hasRealData && examples.length > 0 && (
        <div className="mt-8 rounded-card border-2 border-dashed border-gold-600 bg-gold/5 px-6 py-5">
          <h2 className="font-semibold text-navy">Preview the layout</h2>
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-muted">
            You can display {examples.length} example records to see how listings and filters will
            look. They are placeholders, not real practices — the names, numbers, and websites are
            all fictional, and contact buttons are disabled on them.
          </p>
          <button
            type="button"
            onClick={() => setShowExamples((v) => !v)}
            aria-expanded={showExamples}
            className="mt-4 rounded-md border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-white"
          >
            {showExamples ? 'Hide example listings' : 'Show example listings'}
          </button>
        </div>
      )}

      {showControls && (
        <>
          <form
            className="mt-8 grid gap-4 rounded-card border border-mist-400 p-5 sm:grid-cols-2 lg:grid-cols-4"
            onSubmit={(event) => event.preventDefault()}
            aria-label="Filter listings"
          >
            <div>
              <label htmlFor="f-location" className="block text-sm font-medium text-navy">
                City or ZIP
              </label>
              <input
                id="f-location"
                type="search"
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                placeholder="Troy, or 48083"
                autoComplete="off"
                className="mt-1.5 w-full rounded-md border border-mist-600 px-3 py-2 text-sm focus:border-teal focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="f-service" className="block text-sm font-medium text-navy">
                Service type
              </label>
              <select
                id="f-service"
                value={filters.service}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, service: e.target.value as ServiceTypeId | '' }))
                }
                className="mt-1.5 w-full rounded-md border border-mist-600 bg-white px-3 py-2 text-sm focus:border-teal focus:outline-none"
              >
                <option value="">Any service</option>
                {SERVICE_TYPES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="f-age" className="block text-sm font-medium text-navy">
                Age group
              </label>
              <select
                id="f-age"
                value={filters.ageGroup}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, ageGroup: e.target.value as AgeGroupId | '' }))
                }
                className="mt-1.5 w-full rounded-md border border-mist-600 bg-white px-3 py-2 text-sm focus:border-teal focus:outline-none"
              >
                <option value="">Any age</option>
                {AGE_GROUPS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="f-referral" className="block text-sm font-medium text-navy">
                Referral status
              </label>
              <select
                id="f-referral"
                value={filters.referral}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, referral: e.target.value as ReferralStatusId | '' }))
                }
                className="mt-1.5 w-full rounded-md border border-mist-600 bg-white px-3 py-2 text-sm focus:border-teal focus:outline-none"
              >
                <option value="">Any status</option>
                {REFERRAL_STATUSES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {filtersActive && (
              <div className="sm:col-span-2 lg:col-span-4">
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="text-sm underline underline-offset-4 hover:text-navy"
                >
                  Clear filters
                </button>
              </div>
            )}
          </form>

          <p className="mt-4 text-sm text-ink-muted" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? 'listing' : 'listings'}
            {filtersActive ? ' match your filters' : ''}
            {!hasRealData ? ' (examples only)' : ''}
          </p>

          {results.length > 0 ? (
            <ul className="mt-4 grid gap-4 lg:grid-cols-2">
              {results.map((provider) => (
                <li key={provider.id}>
                  <ProviderCard provider={provider} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-card border border-mist-400 px-5 py-6 text-sm text-ink-muted">
              Nothing matches those filters. Try clearing one of them.
            </p>
          )}
        </>
      )}
    </div>
  );
}
