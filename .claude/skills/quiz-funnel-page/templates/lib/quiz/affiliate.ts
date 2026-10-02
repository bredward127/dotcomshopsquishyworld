import { DEFAULT_AFFILIATE_TAG, type ProductRecommendation } from '../../data/quizData.ts';

/**
 * Outbound affiliate link building.
 *
 * Every product CTA goes through `buildAffiliateUrl`, so the Associates tag
 * and the sub-tracking value are applied in exactly one place.
 *
 * - `tag` is the Amazon Associates tracking ID.
 * - `ascsubtag` is Amazon's sub-tracking field. It shows up in Associates
 *   reports and lets one tag be split by persona, results tier, and campaign.
 *   It carries only fixed vocabulary and campaign tokens, never quiz answers
 *   or anything a visitor typed.
 * - `extra` adds any other query parameters a network needs.
 */

const TAG_RE = /^[A-Za-z0-9-]{1,64}$/;
const TOKEN_RE = /[^a-z0-9]+/g;
const SUBTAG_MAX = 64;

export type AffiliateContext = {
  /** Associates tag. Falls back to the default when missing or malformed. */
  tag?: string;
  persona?: string;
  slot?: string;
  /** Campaign tokens, typically utm_source and utm_campaign. */
  campaign?: Array<string | undefined>;
  /** Additional query parameters, applied last. */
  extra?: Record<string, string | undefined>;
};

export function resolveAffiliateTag(raw: string | undefined): string {
  const trimmed = raw?.trim();
  return trimmed && TAG_RE.test(trimmed) ? trimmed : DEFAULT_AFFILIATE_TAG;
}

/** Lowercase, alphanumeric-only token, or '' when nothing usable is left. */
export function subtagToken(value: string | undefined): string {
  return (value ?? '').toLowerCase().replace(TOKEN_RE, '').slice(0, 24);
}

/** e.g. "sw_compression_best_meta_spring". Empty parts are skipped. */
export function buildSubtag(parts: Array<string | undefined>): string {
  return ['sw', ...parts.map(subtagToken)].filter(Boolean).join('_').slice(0, SUBTAG_MAX);
}

export function productBaseUrl(product: Pick<ProductRecommendation, 'asin' | 'amazonQuery'>): URL {
  if (product.asin && /^[A-Z0-9]{10}$/.test(product.asin)) {
    return new URL(`https://www.amazon.com/dp/${product.asin}`);
  }
  const url = new URL('https://www.amazon.com/s');
  url.searchParams.set('k', product.amazonQuery ?? 'sensory squishy toys');
  return url;
}

export function buildAffiliateUrl(
  product: Pick<ProductRecommendation, 'asin' | 'amazonQuery'>,
  context: AffiliateContext = {},
): string {
  const url = productBaseUrl(product);
  url.searchParams.set('tag', resolveAffiliateTag(context.tag));
  url.searchParams.set('ascsubtag', buildSubtag([context.persona, context.slot, ...(context.campaign ?? [])]));
  for (const [key, value] of Object.entries(context.extra ?? {})) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

/** A tagged Amazon search, used for the "View All Squishies" header link. */
export function buildSearchUrl(query: string, context: AffiliateContext = {}): string {
  return buildAffiliateUrl({ amazonQuery: query }, context);
}
