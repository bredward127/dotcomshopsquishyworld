import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findLibraryArticle, allLibrarySlugs } from '@/lib/library/articles';
import { absoluteUrl } from '@/lib/site';
import ArticlePage from '@/components/library/ArticlePage';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return allLibrarySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const article = findLibraryArticle(params.slug);
  if (!article) return { title: 'Article not found' };
  return {
    title: article.title,
    description: article.dek,
    alternates: { canonical: `/library/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.dek,
      type: 'article',
      url: absoluteUrl(`/library/${article.slug}`),
    },
  };
}

/**
 * Generic Article schema only - no medical or clinical schema type, since
 * this is educational content, not a diagnosed or treated condition.
 */
function structuredData(article: NonNullable<ReturnType<typeof findLibraryArticle>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': absoluteUrl(`/library/${article.slug}#article`),
    headline: article.title,
    description: article.dek,
    url: absoluteUrl(`/library/${article.slug}`),
    isPartOf: { '@id': absoluteUrl('/library#collection') },
    publisher: { '@id': absoluteUrl('/#organization') },
  };
}

export default function LibraryArticlePage({ params }: Params) {
  const article = findLibraryArticle(params.slug);
  if (!article) notFound();

  return (
    <>
      <ArticlePage article={article} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(article)) }}
      />
    </>
  );
}
