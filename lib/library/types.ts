import type { CategoryId } from '@/lib/ask/taxonomy';

export type LibraryFaq = {
  question: string;
  answer: string;
};

export type LibraryArticle = {
  slug: string;
  /** Page <title> and H1. Written as the question itself for search intent. */
  title: string;
  /** One-sentence summary shown on the index page and as the meta description. */
  dek: string;
  category: CategoryId;
  /**
   * A real, verified, view-count-checked YouTube video for this article.
   * Left null until one has actually been confirmed - never filled with a
   * guessed or unverified video ID, title, channel, or view count.
   */
  video: {
    videoId: string;
    title: string;
    channel: string;
    viewCountAtSelection: string;
  } | null;
  faqs: LibraryFaq[];
  /** Slugs of other library articles to cross-link, for internal linking. */
  relatedSlugs: string[];
};
