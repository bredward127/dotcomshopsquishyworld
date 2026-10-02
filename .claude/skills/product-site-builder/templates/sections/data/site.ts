/**
 * Brand settings shared by every section-built page (landing, comparison,
 * lead-gen, advertorial...). Pick `theme` from references/design-presets.md
 * and switch the font pair in app/fonts.ts to match.
 */
export type Theme = 'pastel' | 'bold' | 'clinical' | 'natural' | 'dark';

export const site = {
  brand: 'Brand Name',
  badge: undefined as string | undefined,
  theme: 'pastel' as Theme,
  /** Affiliate statement shown in the top strip and footer. Empty string hides it. */
  disclosure: 'As an Amazon Associate we earn from qualifying purchases.',
  amazonTag: process.env.NEXT_PUBLIC_AMAZON_TAG?.trim() || '',
  footerLinks: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Disclosure', href: '/disclosure' },
  ],
};
