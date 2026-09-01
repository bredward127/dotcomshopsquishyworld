import {
  canShowReferralStatus,
  referralStatusOf,
  type AgeGroupId,
  type Provider,
  type ReferralStatusId,
  type ServiceTypeId,
} from './types.ts';

export type DirectoryFilters = {
  /** Free text matched against city and postal code only. */
  location: string;
  service: ServiceTypeId | '';
  ageGroup: AgeGroupId | '';
  referral: ReferralStatusId | '';
};

export const EMPTY_FILTERS: DirectoryFilters = {
  location: '',
  service: '',
  ageGroup: '',
  referral: '',
};

function matchesLocation(provider: Provider, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return provider.locations.some(
    (loc) =>
      loc.city.toLowerCase().includes(needle) ||
      loc.postalCode.toLowerCase().startsWith(needle),
  );
}

function matchesService(provider: Provider, service: ServiceTypeId | ''): boolean {
  if (!service) return true;
  // Telehealth is offered as a service type in the UI but stored as a flag.
  if (service === 'telehealth') return provider.telehealth === true;
  return provider.services.includes(service);
}

function matchesAgeGroup(provider: Provider, ageGroup: AgeGroupId | ''): boolean {
  if (!ageGroup) return true;
  return provider.ageGroups.includes(ageGroup);
}

function matchesReferral(provider: Provider, referral: ReferralStatusId | ''): boolean {
  if (!referral) return true;
  // A provider without a sourced, dated claim is only ever "unknown". Filtering
  // for "accepting" must never surface a provider we have not confirmed.
  if (referral === 'unknown') return !canShowReferralStatus(provider);
  return canShowReferralStatus(provider) && referralStatusOf(provider) === referral;
}

export function filterProviders(
  source: readonly Provider[],
  filters: DirectoryFilters,
): Provider[] {
  return source.filter(
    (provider) =>
      matchesLocation(provider, filters.location) &&
      matchesService(provider, filters.service) &&
      matchesAgeGroup(provider, filters.ageGroup) &&
      matchesReferral(provider, filters.referral),
  );
}

export function hasActiveFilters(filters: DirectoryFilters): boolean {
  return Boolean(filters.location.trim() || filters.service || filters.ageGroup || filters.referral);
}
