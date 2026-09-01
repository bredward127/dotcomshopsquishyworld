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

  test('every article has a verified video with a well-formed, real-looking ID', () => {
    // A real YouTube video ID is exactly 11 URL-safe characters. This can't
    // prove a video is real on its own, but it catches an obviously-invented
    // placeholder ("VIDEO_ID_HERE", "xxxxxxxxxxx", empty string) immediately.
    const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;
    for (const article of libraryArticles) {
      assert.ok(article.video, `${article.slug} has no video`);
      const v = article.video!;
      assert.match(v.videoId, YOUTUBE_ID_RE, `${article.slug} video ID "${v.videoId}" is not a well-formed YouTube ID`);
      assert.ok(v.title.length > 0, `${article.slug} video has no title`);
      assert.ok(v.channel.length > 0, `${article.slug} video has no channel`);
      assert.ok(v.viewCountAtSelection.length > 0, `${article.slug} video has no recorded view count`);
      assert.match(
        v.viewCountAtSelection,
        /\d{4}-\d{2}-\d{2}/,
        `${article.slug} viewCountAtSelection has no verification date`,
      );
    }
  });

  test('no two articles share the same video', () => {
    const ids = libraryArticles.map((a) => a.video?.videoId);
    assert.equal(new Set(ids).size, ids.length, 'a video ID is reused across two articles');
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
