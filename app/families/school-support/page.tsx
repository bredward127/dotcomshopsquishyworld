import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { libraryArticles } from '@/lib/library/articles';
import { categoryLabel } from '@/lib/ask/taxonomy';

export const metadata: Metadata = {
  title: 'School and classroom',
  description: 'How school-based occupational therapy works, common classroom accommodations, and how to talk with a teacher about sensory needs.',
  alternates: { canonical: '/families/school-support' },
};

const slugs = [
  'how-school-based-ot-works',
  'classroom-sensory-accommodations',
  'talking-to-a-teacher-about-sensory-needs',
];

const articles = slugs
  .map((slug) => libraryArticles.find((a) => a.slug === slug))
  .filter((a): a is (typeof libraryArticles)[number] => a !== undefined);

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="For Families"
        title="School and classroom"
        intro="General information about sensory considerations in school settings."
      />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <p>
            School settings involve rules and constraints a home doesn&rsquo;t have &mdash; fixed
            schedules, shared rooms, and formal processes for getting support in place. What&rsquo;s
            available also varies by district and by whether a student has a formal plan. These
            three articles cover the parts that come up most often.
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
