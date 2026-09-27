import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import { libraryArticles } from '@/lib/library/articles';
import { categoryLabel } from '@/lib/ask/taxonomy';

export const metadata: Metadata = {
  title: 'Sensory Library',
  description:
    'Plain-language articles answering specific questions about sensory processing - proprioception, movement, touch, sound, and internal body awareness.',
  alternates: { canonical: '/library' },
};

export default function LibraryIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sensory Library"
        title="Sensory Library"
        intro="Short, plain-language answers to specific questions about sensory processing. Each one is a starting point, not a substitute for a professional who knows the person involved."
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2">
          {libraryArticles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/library/${article.slug}`}
                className="group flex h-full flex-col rounded-card border border-mist-400 p-5 transition-colors hover:border-teal hover:bg-mist-200"
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

        <Disclaimer />
      </div>
    </>
  );
}
