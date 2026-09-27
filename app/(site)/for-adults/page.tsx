import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { libraryArticles } from '@/lib/library/articles';
import { categoryLabel } from '@/lib/ask/taxonomy';

export const metadata: Metadata = {
  title: 'For an adult',
  description:
    'Workplace accommodations, what to expect from an assessment, and daily routines for adults considering their own sensory needs.',
  alternates: { canonical: '/for-adults' },
};

const slugs = [
  'workplace-sensory-accommodations',
  'adult-sensory-assessment-what-to-expect',
  'sensory-friendly-daily-routines-for-adults',
];

const articles = slugs
  .map((slug) => libraryArticles.find((a) => a.slug === slug))
  .filter((a): a is (typeof libraryArticles)[number] => a !== undefined);

export default function ForAdultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="For an adult"
        title="For an adult"
        intro="Most material on sensory processing is written for parents. This section is for adults considering their own needs."
      />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <p>
            Work environments, formal assessment, and daily routines &mdash; three areas that come
            up often for adults thinking about their own sensory needs, and that most sensory
            material written for parents doesn&rsquo;t cover.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/library/${article.slug}`}
                className="group flex h-full flex-col rounded-card border border-mist-400 p-5 hover:border-teal hover:bg-mist-200"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-teal">
                  {categoryLabel(article.category)}
                </span>
                <span className="mt-2 font-semibold text-navy group-hover:underline">
                  {article.title}
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-ink-muted">{article.dek}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-ink-muted">
          <Link href="/library" className="underline underline-offset-4 hover:text-navy">
            See the full Sensory Library
          </Link>
        </p>

        <Disclaimer />
      </div>
    </>
  );
}
