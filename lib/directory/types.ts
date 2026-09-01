/**
 * Directory types.
 *
 * These mirror the relational model documented in docs/data-model.md so the
 * local data source can be swapped for a database later without reshaping the
 * UI. Field names match the planned column names.
 */

export const SERVICE_TYPES = [
  { id: 'pediatric-ot', label: 'Pediatric occupational therapy' },
  { id: 'speech', label: 'Speech therapy' },
  { id: 'physical', label: 'Physical therapy' },
  { id: 'sensory-friendly', label: 'Sensory-friendly activity or support' },
  { id: 'telehealth', label: 'Telehealth' },
] as const;

export type ServiceTypeId = (typeof SERVICE_TYPES)[number]['id'];

export const AGE_GROUPS = [
  { id: 'early', label: 'Early intervention (0-3)' },
  { id: 'preschool', label: 'Preschool (3-5)' },
  { id: 'school-age', label: 'School age (6-12)' },
  { id: 'teen', label: 'Teen (13-17)' },
  { id: 'adult', label: 'Adult (18+)' },
] as const;

export type AgeGroupId = (typeof AGE_GROUPS)[number]['id'];

export const REFERRAL_STATUSES = [
  { id: 'accepting', label: 'Accepting referrals' },
  { id: 'waitlist', label: 'Waitlist' },
  { id: 'not-accepting', label: 'Not accepting referrals' },
  { id: 'unknown', label: 'Not confirmed' },
] as const;

export type ReferralStatusId = (typeof REFERRAL_STATUSES)[number]['id'];

/**
 * A claim about a provider that we are only willing to display if we can say
 * where it came from and when it was last checked. Anything without both is
 * shown as unconfirmed rather than asserted.
 */
export type SourcedClaim<T> = {
  value: T;
  /** Where this came from, e.g. "Confirmed by phone with practice manager". */
  source: string;
  /** ISO date (YYYY-MM-DD) this was last confirmed. */
  lastConfirmed: string;
};

export type ProviderLocation = {
  city: string;
  state: string;
  postalCode: string;
  /** Street address is optional; many practices prefer not to publish one. */
  streetAddress?: string;
};

export type Provider = {
  id: string;
  slug: string;
  name: string;
  /** Original description of what the practice says it offers. */
  description: string;
  locations: ProviderLocation[];
  serviceAreaNote: string;
  services: ServiceTypeId[];
  ageGroups: AgeGroupId[];
  telehealth: boolean;
  website?: string;
  phone?: string;
  /** Referral status, only displayable when sourced and dated. */
  referral?: SourcedClaim<ReferralStatusId>;
  /** Optional disclosures, e.g. a paid placement. Never inferred. */
  disclosures?: string[];
  /** ISO date the record as a whole was last confirmed with the provider. */
  lastConfirmed?: string;
  /**
   * Example records exist to demonstrate the interface before real listings
   * are published. They are never mixed with production results.
   */
  isExample?: boolean;
};

/**
 * A referral status may only be shown as a definite claim when we can name a
 * source and a date. Everything else displays as unconfirmed.
 */
export function canShowReferralStatus(provider: Provider): boolean {
  const referral = provider.referral;
  if (!referral) return false;
  if (!referral.source || referral.source.trim().length === 0) return false;
  if (!referral.lastConfirmed || !/^\d{4}-\d{2}-\d{2}$/.test(referral.lastConfirmed)) return false;
  return true;
}

export function referralStatusOf(provider: Provider): ReferralStatusId {
  return canShowReferralStatus(provider) ? provider.referral!.value : 'unknown';
}

/**
 * Only https URLs are rendered as website buttons. Anything else is dropped
 * rather than displayed as a link that may not be what it claims.
 */
export function safeWebsite(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' ? parsed.toString() : null;
  } catch {
    return null;
  }
}

/** Digits only, for a tel: URL. Returns null if there is nothing dialable. */
export function telHref(phone: string | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.replace(/\D/g, '').length < 10) return null;
  return `tel:${digits}`;
}

export function serviceLabel(id: ServiceTypeId): string {
  return SERVICE_TYPES.find((s) => s.id === id)?.label ?? id;
}

export function ageGroupLabel(id: AgeGroupId): string {
  return AGE_GROUPS.find((a) => a.id === id)?.label ?? id;
}

export function referralLabel(id: ReferralStatusId): string {
  return REFERRAL_STATUSES.find((r) => r.id === id)?.label ?? id;
}
