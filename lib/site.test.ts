import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { resolveSiteUrl, resolveTagId, FALLBACK_SITE_URL } from './site.ts';

describe('resolveSiteUrl', () => {
  test('a defined-but-empty env var falls back instead of producing an invalid URL', () => {
    // This is the exact shape that failed the production build: a hosting
    // dashboard variable saved with a blank value arrives as '', which `??`
    // passes straight through.
    assert.equal(resolveSiteUrl(''), FALLBACK_SITE_URL);
    assert.equal(resolveSiteUrl('   '), FALLBACK_SITE_URL);
  });

  test('an unset variable falls back', () => {
    assert.equal(resolveSiteUrl(undefined), FALLBACK_SITE_URL);
  });

  test('a valid origin is used as given', () => {
    assert.equal(resolveSiteUrl('https://shopsquishyworld.com'), 'https://shopsquishyworld.com');
    assert.equal(resolveSiteUrl('https://preview.vercel.app'), 'https://preview.vercel.app');
  });

  test('surrounding whitespace is tolerated', () => {
    assert.equal(resolveSiteUrl('  https://example.com  '), 'https://example.com');
  });

  test('a trailing path is reduced to the origin', () => {
    assert.equal(resolveSiteUrl('https://example.com/some/path'), 'https://example.com');
  });

  test('malformed or non-http values fall back rather than throwing', () => {
    for (const bad of ['shopsquishyworld.com', 'not a url', 'javascript:alert(1)', 'ftp://x.com', '//x.com']) {
      assert.equal(resolveSiteUrl(bad), FALLBACK_SITE_URL, `"${bad}" should fall back`);
    }
  });

  test('every result is a constructible URL', () => {
    for (const input of ['', '   ', undefined, 'nonsense', 'https://ok.com']) {
      assert.doesNotThrow(() => new URL(resolveSiteUrl(input)));
      assert.doesNotThrow(() => new URL('/privacy', resolveSiteUrl(input)));
    }
  });
});

describe('resolveTagId', () => {
  test('unset uses the supplied tag', () => {
    assert.equal(resolveTagId(undefined), 'AW-10803481355');
  });

  test('an explicit empty value still disables analytics on purpose', () => {
    assert.equal(resolveTagId(''), '');
    assert.equal(resolveTagId('   '), '');
  });

  test('an override is used as given', () => {
    assert.equal(resolveTagId(' G-ABC123 '), 'G-ABC123');
  });
});
