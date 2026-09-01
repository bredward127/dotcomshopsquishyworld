import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { navGroups, standaloneLinks, footerLinks } from '@/lib/nav';
import { libraryArticles } from '@/lib/library/articles';
import { providers } from '@/lib/directory/data';

export const metadata: Metadata = {
  title: 'Site map',
  description: 'Every page on Sensory Access Michigan, organized by section.',
  alternates: { canonical: '/sitemap' },
};

const librarySection = {
  label: 'Sensory Library',
  links: [
    { href: '/library', label: 'All articles' },
    ...libraryArticles.map((a) => ({ href: `/library/${a.slug}`, label: a.title })),
  ],
};

const providerSection =
  providers.filter((p) => !p.isExample).length > 0
    ? {
        label: 'Local listings',
        links: providers
          .filter((p) => !p.isExample)
          .map((p) => ({ href: `/providers/${p.slug}`, label: p.name })),
      }
    : null;

const otherSection = {
  label: 'Other pages',
  links: [...standaloneLinks, ...footerLinks].map((l) => ({ href: l.href, label: l.label })),
};

const sections = [
  ...navGroups
    .filter((g) => g.label !== 'Sensory Library') // library is built dynamically above, with every article
    .map((g) => ({ label: g.label, links: g.links.map((l) => ({ href: l.href, label: l.label })) })),
  librarySection,
  ...(providerSection ? [providerSection] : []),
  otherSection,
];

export default function SiteMapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Site map"
        title="Site map"
        intro="Every page on this site, in one place."
      />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <nav key={section.label} aria-label={section.label}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">
                {section.label}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted underline-offset-4 hover:text-navy hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink-muted">
          Looking for the machine-readable version?{' '}
          <a href="/sitemap.xml" className="underline underline-offset-4 hover:text-navy">
            sitemap.xml
          </a>
        </p>
      </div>
    </>
  );
}
