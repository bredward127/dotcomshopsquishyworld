/**
 * The complete set of events this site is allowed to send, and the exact
 * parameters each one may carry.
 *
 * This is an allowlist, not a suggestion. `sanitizeParams` drops anything not
 * declared here, so adding a parameter to a call site without adding it below
 * means it is silently discarded rather than leaked to an ad platform.
 */

export const EVENT_NAMES = [
  'view_home',
  'start_ask_flow',
  'view_resource',
  'outbound_resource_click',
  'directory_search',
  'view_provider',
  'click_provider_phone',
  'click_provider_website',
  'start_lead_request',
  'submit_lead_request',
  'view_for_providers',
  'provider_interest_submit',
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/**
 * Parameter value kinds we are willing to transmit.
 * - `enum`: one of a fixed, non-identifying vocabulary
 * - `slug`: a short public identifier (a provider slug, a resource id)
 * - `host`: an external hostname, never a full URL with a query string
 * - `bool`: a flag, used instead of sending the value itself
 * - `count`: a small non-negative integer
 */
type ParamKind = 'enum' | 'slug' | 'host' | 'bool' | 'count';

export const EVENT_PARAMS: Record<EventName, Record<string, ParamKind>> = {
  view_home: {},
  start_ask_flow: { audience: 'enum', topic: 'enum' },
  view_resource: { resource_id: 'slug' },
  outbound_resource_click: { resource_id: 'slug', destination_host: 'host' },
  // Note: the typed city/ZIP is never sent - only whether one was used.
  directory_search: {
    has_location: 'bool',
    service: 'enum',
    age_group: 'enum',
    referral_status: 'enum',
    result_count: 'count',
  },
  view_provider: { provider_slug: 'slug' },
  click_provider_phone: { provider_slug: 'slug' },
  click_provider_website: { provider_slug: 'slug', destination_host: 'host' },
  start_lead_request: { provider_slug: 'slug' },
  submit_lead_request: { provider_slug: 'slug' },
  view_for_providers: {},
  provider_interest_submit: { method: 'enum' },
};

export function isEventName(value: unknown): value is EventName {
  return typeof value === 'string' && (EVENT_NAMES as readonly string[]).includes(value);
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
const ENUM_RE = /^[a-z0-9][a-z0-9_-]{0,39}$/;
const HOST_RE = /^[a-z0-9.-]{1,100}$/;

/**
 * Patterns that must never reach an analytics destination, checked regardless
 * of which parameter they appear in.
 */
const PII_PATTERNS: readonly RegExp[] = [
  /[^\s@]+@[^\s@]+\.[^\s@]+/, // email address
  /(?:\d[\s().+-]*){10,}/, // phone-like digit run, separators of any width
  /\b\d{3}-\d{2}-\d{4}\b/, // SSN shape
];

export function looksLikePii(value: string): boolean {
  return PII_PATTERNS.some((pattern) => pattern.test(value));
}

function validValue(kind: ParamKind, value: unknown): boolean {
  switch (kind) {
    case 'bool':
      return typeof value === 'boolean';
    case 'count':
      return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 10000;
    case 'slug':
      return typeof value === 'string' && SLUG_RE.test(value) && !looksLikePii(value);
    case 'enum':
      return typeof value === 'string' && ENUM_RE.test(value) && !looksLikePii(value);
    case 'host':
      return typeof value === 'string' && HOST_RE.test(value) && !looksLikePii(value);
    default:
      return false;
  }
}

/**
 * Reduce an arbitrary object to only the declared, well-formed parameters for
 * this event. Unknown keys and malformed values are dropped rather than
 * coerced, so a mistake at a call site loses data instead of leaking it.
 */
export function sanitizeParams(
  event: EventName,
  params: Record<string, unknown> | undefined,
): Record<string, string | number | boolean> {
  const allowed = EVENT_PARAMS[event];
  const out: Record<string, string | number | boolean> = {};
  if (!params) return out;

  for (const [key, value] of Object.entries(params)) {
    const kind = allowed[key];
    if (!kind) continue;
    if (value === undefined || value === null || value === '') continue;
    if (!validValue(kind, value)) continue;
    out[key] = value as string | number | boolean;
  }
  return out;
}

/** Extract a bare hostname from a URL, or null. Never returns a query string. */
export function hostOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return HOST_RE.test(host) ? host : null;
  } catch {
    return null;
  }
}
