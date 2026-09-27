import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { libraryArticles } from '@/lib/library/articles';
import { categoryLabel } from '@/lib/ask/taxonomy';

export const metadata: Metadata = {
  title: 'What to ask a provider',
  description: 'Practical questions about cost, insurance, scheduling, and a therapist’s approach, worth asking before your first appointment.',
  alternates: { canonical: '/find-help/what-to-ask' },
};

const slugs = ['questions-about-cost-insurance-and-scheduling', 'questions-about-approach-and-experience'];

const articles = slugs
  .map((slug) => libraryArticles.find((a) => a.slug === slug))
  .filter((a): a is (typeof libraryArticles)[number] => a !== undefined);

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Find Local Help"
        title="What to ask a provider"
        intro="Questions worth bringing to a first conversation with a local provider."
      />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <p>
            A good first conversation with a provider covers two different things: whether the
            logistics work for your family, and whether the clinical approach fits what you&rsquo;re
            looking for. These two articles split that out.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
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
