import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Disclaimer from '@/components/Disclaimer';
import VideoSlot from './VideoSlot';
import { libraryArticles, findLibraryArticle } from '@/lib/library/articles';
import { libraryBodies } from '@/lib/library/bodies';
import { categoryLabel } from '@/lib/ask/taxonomy';
import type { LibraryArticle } from '@/lib/library/types';

export default function ArticlePage({ article }: { article: LibraryArticle }) {
  const Body = libraryBodies[article.slug];
  const related = article.relatedSlugs
    .map((slug) => findLibraryArticle(slug))
    .filter((a): a is LibraryArticle => a !== null);

  return (
    <>
      <PageHeader
        eyebrow={`Sensory Library — ${categoryLabel(article.category)}`}
        title={article.title}
        intro={article.dek}
      />

      <div className="mx-auto max-w-content px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-muted">
          <Link href="/library" className="underline underline-offset-4 hover:text-navy">
            Sensory Library
          </Link>
          <span className="mx-1.5">/</span>
          <span>{article.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="prose-page max-w-prose">
              <Body />
            </div>

            {article.faqs.length > 0 && (
              <section aria-labelledby="faq-heading" className="mt-12 max-w-prose">
                <h2 id="faq-heading" className="text-xl font-semibold text-navy">
                  Common questions
                </h2>
                <div className="mt-4 divide-y divide-mist-400 border-y border-mist-400">
                  {article.faqs.map((faq) => (
                    <details key={faq.question} className="group py-4">
                      <summary className="cursor-pointer list-none font-semibold text-navy">
                        {faq.question}
                      </summary>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <Disclaimer />
          </div>

          <aside className="space-y-6">
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">
                Watch
              </h2>
              <VideoSlot video={article.video} />
            </div>

            {related.length > 0 && (
              <div className="rounded-card border border-mist-400 p-5">
                <h2 className="font-semibold text-navy">Related in the library</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/library/${item.slug}`}
                        className="text-sm underline underline-offset-4 hover:text-navy"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-card border border-mist-400 bg-mist-200 p-5">
              <h2 className="font-semibold text-navy">Keep going</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/families/sensory-basics" className="underline underline-offset-4 hover:text-navy">
                    Sensory basics overview
                  </Link>
                </li>
                <li>
                  <Link href="/ask" className="underline underline-offset-4 hover:text-navy">
                    Ask about your specific situation
                  </Link>
                </li>
                <li>
                  <Link href="/find-help" className="underline underline-offset-4 hover:text-navy">
                    Find local support
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-12 border-t border-mist-400 pt-6">
          <h2 className="text-lg font-semibold text-navy">More in the Sensory Library</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {libraryArticles
              .filter((a) => a.slug !== article.slug)
              .slice(0, 4)
              .map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/library/${item.slug}`}
                    className="block rounded-card border border-mist-400 p-4 text-sm hover:border-teal hover:bg-mist-200"
                  >
                    <span className="font-medium text-navy">{item.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
