export const site = {
  name: 'Sensory Access Michigan',
  descriptor: 'A Shop Squishy World project',
  shortDescription:
    'A local navigation hub for sensory-support information and services in Metro Detroit and Southeast Michigan.',
  description:
    'Sensory Access Michigan helps families, educators, and adults in Metro Detroit and Southeast Michigan find educational information about sensory processing, reputable external resources, and local professional services. It is an informational hub, not a medical or therapy provider.',
  region: 'Metro Detroit and Southeast Michigan',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shopsquishyworld.com',
  // Public Google tag (gtag.js) measurement ID. This is a client-side
  // identifier, not a secret - it is visible in the page source by design.
  // Override per environment with NEXT_PUBLIC_GOOGLE_TAG_ID; set it to an
  // empty string to disable analytics entirely.
  googleTagId: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? 'AW-10803481355',
} as const;

export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).toString();
}
