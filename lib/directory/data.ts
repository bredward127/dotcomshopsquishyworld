import type { Provider } from './types.ts';

/**
 * Production listings.
 *
 * Empty by design. A practice appears here only after it has agreed to be
 * listed and its details have been confirmed. Nothing is added from scraped
 * directories, third-party data, or guesswork.
 */
export const providers: Provider[] = [];

/**
 * Example listings.
 *
 * These exist so the filters and cards can be seen working before real
 * listings exist. They are not real practices and must never be presented as
 * such:
 *   - names are obviously placeholder,
 *   - phone numbers use the 555-01xx range reserved for fiction,
 *   - websites use example.com, reserved by IANA for documentation.
 * They are kept out of production results and rendered in a separate,
 * visually distinct section that is hidden unless explicitly requested.
 */
export const exampleProviders: Provider[] = [
  {
    id: 'example-1',
    slug: 'example-riverbend-pediatric-therapy',
    name: 'Example Riverbend Pediatric Therapy',
    description:
      'A placeholder record used to demonstrate how a pediatric therapy listing is laid out. It does not describe a real practice.',
    locations: [{ city: 'Royal Oak', state: 'MI', postalCode: '48067' }],
    serviceAreaNote: 'Example service area covering nearby Oakland County communities.',
    services: ['pediatric-ot', 'speech'],
    ageGroups: ['early', 'preschool', 'school-age'],
    telehealth: false,
    website: 'https://example.com/riverbend',
    phone: '(555) 010-0142',
    referral: {
      value: 'accepting',
      source: 'Example source field — not a real confirmation',
      lastConfirmed: '2026-08-01',
    },
    lastConfirmed: '2026-08-01',
    isExample: true,
  },
  {
    id: 'example-2',
    slug: 'example-lakeshore-sensory-collective',
    name: 'Example Lakeshore Sensory Collective',
    description:
      'A placeholder record showing how a sensory-friendly activity listing is laid out. It does not describe a real organization.',
    locations: [{ city: 'Dearborn', state: 'MI', postalCode: '48124' }],
    serviceAreaNote: 'Example service area covering nearby Wayne County communities.',
    services: ['sensory-friendly', 'telehealth'],
    ageGroups: ['school-age', 'teen', 'adult'],
    telehealth: true,
    website: 'https://example.com/lakeshore',
    phone: '(555) 010-0187',
    // Deliberately has no referral claim: demonstrates the unconfirmed state.
    lastConfirmed: '2026-07-15',
    isExample: true,
  },
  {
    id: 'example-3',
    slug: 'example-north-oakland-therapy-partners',
    name: 'Example North Oakland Therapy Partners',
    description:
      'A placeholder record showing a multi-discipline listing. It does not describe a real practice.',
    locations: [{ city: 'Troy', state: 'MI', postalCode: '48083' }],
    serviceAreaNote: 'Example service area covering northern Oakland County.',
    services: ['pediatric-ot', 'physical', 'telehealth'],
    ageGroups: ['preschool', 'school-age', 'teen'],
    telehealth: true,
    phone: '(555) 010-0163',
    referral: {
      value: 'waitlist',
      source: 'Example source field — not a real confirmation',
      lastConfirmed: '2026-08-12',
    },
    disclosures: ['Example disclosure badge'],
    lastConfirmed: '2026-08-12',
    isExample: true,
  },
];

export const EXAMPLE_BADGE = 'Example listing — do not contact';

export function findProvider(slug: string): Provider | null {
  return (
    providers.find((p) => p.slug === slug) ??
    exampleProviders.find((p) => p.slug === slug) ??
    null
  );
}

export function allProviderSlugs(): string[] {
  return [...providers, ...exampleProviders].map((p) => p.slug);
}
