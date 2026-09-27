import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildAffiliateUrl, buildSubtag, resolveAffiliateTag, subtagToken } from './affiliate.ts';
import { DEFAULT_AFFILIATE_TAG, products } from '../../data/quizData.ts';

describe('affiliate links', () => {
  test('every product link carries the default tag', () => {
    for (const p of products) {
      const url = new URL(buildAffiliateUrl(p));
      assert.equal(url.hostname, 'www.amazon.com');
      assert.equal(url.searchParams.get('tag'), DEFAULT_AFFILIATE_TAG);
    }
  });

  test('uses a product page when an ASIN is set', () => {
    const url = new URL(buildAffiliateUrl({ asin: 'B0ABCDEF12', amazonQuery: 'x' }));
    assert.equal(url.pathname, '/dp/B0ABCDEF12');
    assert.equal(url.searchParams.get('k'), null);
  });

  test('falls back to a search for a malformed ASIN', () => {
    const url = new URL(buildAffiliateUrl({ asin: 'not-an-asin', amazonQuery: 'slow rise' }));
    assert.equal(url.pathname, '/s');
    assert.equal(url.searchParams.get('k'), 'slow rise');
  });

  test('a custom tag is used when well-formed, the default otherwise', () => {
    assert.equal(resolveAffiliateTag('mysite-21'), 'mysite-21');
    assert.equal(resolveAffiliateTag('  '), DEFAULT_AFFILIATE_TAG);
    assert.equal(resolveAffiliateTag('bad tag&x=1'), DEFAULT_AFFILIATE_TAG);
    assert.equal(resolveAffiliateTag(undefined), DEFAULT_AFFILIATE_TAG);
  });

  test('sub-tag encodes persona, slot, and campaign as plain tokens', () => {
    const url = new URL(
      buildAffiliateUrl(products[0], { persona: 'compression', slot: 'best', campaign: ['Meta', 'spring-launch'] }),
    );
    assert.equal(url.searchParams.get('ascsubtag'), 'sw_compression_best_meta_springlaunch');
  });

  test('sub-tag strips anything that is not a plain token and stays short', () => {
    assert.equal(subtagToken('a@b.com'), 'abcom');
    assert.equal(buildSubtag([undefined, '', 'x']), 'sw_x');
    assert.ok(buildSubtag(['a'.repeat(50), 'b'.repeat(50), 'c'.repeat(50)]).length <= 64);
  });

  test('extra parameters are appended and cannot be empty', () => {
    const url = new URL(buildAffiliateUrl(products[0], { extra: { linkCode: 'll2', empty: '' } }));
    assert.equal(url.searchParams.get('linkCode'), 'll2');
    assert.equal(url.searchParams.has('empty'), false);
  });
});
