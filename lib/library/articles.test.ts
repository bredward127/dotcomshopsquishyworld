import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { libraryArticles, findLibraryArticle, allLibrarySlugs } from './articles.ts';
import { CATEGORY_IDS } from '../ask/taxonomy.ts';

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

describe('library article integrity', () => {
  test('ships all 20 articles from the master plan', () => {
    assert.equal(libraryArticles.length, 20);
  });

  test('every slug is unique and URL-safe', () => {
    const slugs = allLibrarySlugs();
    assert.equal(new Set(slugs).size, slugs.length, 'duplicate slug found');
    for (const slug of slugs) {
      assert.match(slug, SLUG_RE, `"${slug}" is not a clean URL slug`);
    }
  });

  test('every article has a title, dek, category, and at least one FAQ', () => {
    for (const article of libraryArticles) {
      assert.ok(article.title.length > 0, `${article.slug} missing title`);
      assert.ok(article.dek.length > 0, `${article.slug} missing dek`);
      assert.ok(CATEGORY_IDS.includes(article.category), `${article.slug} has an invalid category`);
      assert.ok(article.faqs.length > 0, `${article.slug} has no FAQs`);
    }
  });

  test('no video is filled with guessed data - every slot is null until verified', () => {
    for (const article of libraryArticles) {
      assert.equal(
        article.video,
        null,
        `${article.slug} has a video filled in - this must only happen after a real video is found and view-count verified, never guessed`,
      );
    }
  });

  test('every relatedSlugs entry points to a real article, and never to itself', () => {
    for (const article of libraryArticles) {
      for (const related of article.relatedSlugs) {
        assert.notEqual(related, article.slug, `${article.slug} links to itself`);
        assert.ok(
          findLibraryArticle(related) !== null,
          `${article.slug} links to "${related}", which does not exist`,
        );
      }
    }
  });

  test('findLibraryArticle returns null for an unknown slug', () => {
    assert.equal(findLibraryArticle('does-not-exist'), null);
  });

  test('every article slug has a matching body component registered', () => {
    // bodies.tsx contains JSX and cannot be imported by this plain Node test
    // run, so this checks its source text for each slug as a map key instead
    // of importing it - confirming the map is complete without needing a JSX
    // parser.
    const bodiesPath = fileURLToPath(new URL('./bodies.tsx', import.meta.url));
    const source = readFileSync(bodiesPath, 'utf8');
    for (const slug of allLibrarySlugs()) {
      assert.match(
        source,
        new RegExp(`'${slug}':`),
        `no body component registered for "${slug}" in lib/library/bodies.tsx`,
      );
    }
  });

  test('no fabricated verification or endorsement language in any dek or FAQ answer', () => {
    const forbidden = /verified by a human reviewer|expert.reviewed|clinically proven|guaranteed to (work|help)/i;
    for (const article of libraryArticles) {
      assert.doesNotMatch(article.dek, forbidden, `${article.slug} dek contains a forbidden claim`);
      for (const faq of article.faqs) {
        assert.doesNotMatch(faq.answer, forbidden, `${article.slug} FAQ contains a forbidden claim`);
      }
    }
  });
});
