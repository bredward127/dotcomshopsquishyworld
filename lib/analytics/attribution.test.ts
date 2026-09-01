import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parseAttribution, isExpired, ATTRIBUTION_MAX_AGE_DAYS } from './attribution.ts';

const NOW = new Date('2026-09-01T00:00:00.000Z');

describe('parseAttribution', () => {
  test('captures utm parameters and gclid', () => {
    const a = parseAttribution(
      '?utm_source=google&utm_medium=cpc&utm_campaign=fall_2026&gclid=abc123',
      NOW,
    );
    assert.equal(a?.utm_source, 'google');
    assert.equal(a?.utm_medium, 'cpc');
    assert.equal(a?.utm_campaign, 'fall_2026');
    assert.equal(a?.gclid, 'abc123');
    assert.equal(a?.capturedAt, NOW.toISOString());
  });

  test('returns null when there is nothing to capture', () => {
    assert.equal(parseAttribution('', NOW), null);
    assert.equal(parseAttribution('?q=hello', NOW), null);
  });

  test('rejects values that are not plain campaign tokens', () => {
    assert.equal(parseAttribution('?utm_source=<script>', NOW), null);
    assert.equal(parseAttribution('?utm_source=a b c', NOW), null);
    assert.equal(parseAttribution(`?gclid=${'x'.repeat(200)}`, NOW), null);
  });

  test('captures only the declared keys', () => {
    const a = parseAttribution('?utm_source=google&email=a%40b.com&utm_evil=x', NOW);
    assert.deepEqual(Object.keys(a ?? {}).sort(), ['capturedAt', 'utm_source']);
  });
});

describe('attribution expiry', () => {
  test('fresh attribution is kept', () => {
    assert.equal(isExpired({ capturedAt: NOW.toISOString() }, NOW), false);
  });

  test('attribution past the retention window is expired', () => {
    const old = new Date(NOW.getTime() - (ATTRIBUTION_MAX_AGE_DAYS + 1) * 86_400_000);
    assert.equal(isExpired({ capturedAt: old.toISOString() }, NOW), true);
  });

  test('an unparseable timestamp is treated as expired', () => {
    assert.equal(isExpired({ capturedAt: 'whenever' }, NOW), true);
  });
});
