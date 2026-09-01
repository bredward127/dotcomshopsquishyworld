import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { libraryArticles } from '@/lib/library/articles';
import { categoryLabel } from '@/lib/ask/taxonomy';

export const metadata: Metadata = {
  title: 'Sensory basics',
  description: 'Plain-language background on how sensory processing is commonly described.',
  alternates: { canonical: '/families/sensory-basics' },
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="For Families"
        title="Sensory basics"
        intro="Plain-language background on how sensory processing is commonly described."
      />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <div className="prose-page max-w-prose">
          <p>
            &ldquo;Sensory processing&rdquo; covers how the nervous system takes in and responds to
            input &mdash; movement, touch, sound, and the body&rsquo;s own internal signals. People
            vary widely in how they experience each of these, and none of that variation is, on its
            own, a problem to be fixed.
          </p>
          <p>
            Rather than one long page trying to cover everything at once, this background is
            organized as a set of shorter, focused articles in the Sensory Library &mdash; each one
            answering a specific question you might actually be asking.
          </p>
        </div>

        <h2 className="mt-10 text-xl font-semibold text-navy">Start with these</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {libraryArticles.map((article) => (
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
