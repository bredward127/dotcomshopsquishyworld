const FALLBACK_SITE_URL = 'https://shopsquishyworld.com';

/**
 * Resolve the public site origin.
 *
 * `??` is not enough here: an environment variable that is *defined but empty*
 * — which is what a blank value in a hosting dashboard produces — passes
 * straight through a nullish check as ''. That reaches `new URL('')` in the
 * root layout's metadataBase and fails the production build. So this trims,
 * treats blank as absent, validates, and falls back on anything unusable.
 */
function resolveSiteUrl(raw: string | undefined): string {
  const trimmed = raw?.trim();
  if (!trimmed) return FALLBACK_SITE_URL;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return FALLBACK_SITE_URL;
    return parsed.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

/** Same reasoning: a blank value means "not set", not "set to empty". */
function resolveTagId(raw: string | undefined): string {
  const trimmed = raw?.trim();
  if (trimmed === undefined) return 'AW-10803481355';
  return trimmed; // an explicit empty value still disables analytics on purpose
}

export const site = {
  name: 'Sensory Access Michigan',
  descriptor: 'A Shop Squishy World project',
  shortDescription:
    'A local navigation hub for sensory-support information and services in Metro Detroit and Southeast Michigan.',
  description:
    'Sensory Access Michigan helps families, educators, and adults in Metro Detroit and Southeast Michigan find educational information about sensory processing, reputable external resources, and local professional services. It is an informational hub, not a medical or therapy provider.',
  region: 'Metro Detroit and Southeast Michigan',
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  // Public Google tag (gtag.js) measurement ID. This is a client-side
  // identifier, not a secret - it is visible in the page source by design.
  // Override per environment with NEXT_PUBLIC_GOOGLE_TAG_ID; set it to an
  // empty string to disable analytics entirely.
  googleTagId: resolveTagId(process.env.NEXT_PUBLIC_GOOGLE_TAG_ID),
} as const;

/**
 * Business address for provider enquiries.
 *
 * This is used for mailto links only. It must receive mail before it ships:
 * a mailto pointing at an address nobody reads loses enquiries silently.
 * Set providerContactReady to false to remove every mailto from the site.
 */
export const providerContactEmail = 'ed@shopsquishyworld.com';
export const providerContactReady = true;

export { resolveSiteUrl, resolveTagId, FALLBACK_SITE_URL };

export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).toString();
}
