import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeParams,
  isEventName,
  looksLikePii,
  hostOf,
  EVENT_NAMES,
  EVENT_PARAMS,
} from './events.ts';

describe('event allowlist', () => {
  test('exactly the twelve approved events are defined', () => {
    assert.equal(EVENT_NAMES.length, 12);
    assert.deepEqual([...EVENT_NAMES].sort(), [
      'click_provider_phone',
      'click_provider_website',
      'directory_search',
      'outbound_resource_click',
      'provider_interest_submit',
      'start_ask_flow',
      'start_lead_request',
      'submit_lead_request',
      'view_for_providers',
      'view_home',
      'view_provider',
      'view_resource',
    ]);
  });

  test('every event has a parameter schema', () => {
    for (const name of EVENT_NAMES) {
      assert.ok(EVENT_PARAMS[name], `${name} has no schema`);
    }
  });

  test('unapproved event names are rejected', () => {
    for (const bad of ['purchase', 'page_view', 'view_Home', '', 'ask_question', null, 42]) {
      assert.equal(isEventName(bad), false, `${String(bad)} should be rejected`);
    }
  });
});

describe('PII never reaches analytics', () => {
  test('detects emails, phone numbers, and SSN shapes', () => {
    assert.equal(looksLikePii('someone@example.com'), true);
    assert.equal(looksLikePii('call 313-555-0142 now'), true);
    assert.equal(looksLikePii('+1 (313) 555 0142'), true);
    assert.equal(looksLikePii('123-45-6789'), true);
    assert.equal(looksLikePii('pediatric-ot'), false);
    assert.equal(looksLikePii('royal-oak'), false);
  });

  test('an email in a slug parameter is dropped', () => {
    const out = sanitizeParams('view_provider', { provider_slug: 'a@b.com' });
    assert.deepEqual(out, {});
  });

  test('a phone number in any parameter is dropped', () => {
    const out = sanitizeParams('click_provider_phone', { provider_slug: '313-555-0142' });
    assert.deepEqual(out, {});
  });
});

describe('sanitizeParams', () => {
  test('keeps declared parameters', () => {
    assert.deepEqual(sanitizeParams('view_provider', { provider_slug: 'riverbend-therapy' }), {
      provider_slug: 'riverbend-therapy',
    });
  });

  test('drops undeclared parameters entirely', () => {
    const out = sanitizeParams('view_provider', {
      provider_slug: 'riverbend-therapy',
      question: 'my son has trouble with noise',
      email: 'a@b.com',
      diagnosis: 'autism',
    });
    assert.deepEqual(out, { provider_slug: 'riverbend-therapy' });
  });

  test('free-text search terms cannot be sent on directory_search', () => {
    const out = sanitizeParams('directory_search', {
      has_location: true,
      location: 'Royal Oak 48067',
      query: 'my child needs help',
      service: 'pediatric-ot',
      result_count: 3,
    });
    assert.deepEqual(out, { has_location: true, service: 'pediatric-ot', result_count: 3 });
    assert.ok(!('location' in out));
    assert.ok(!('query' in out));
  });

  test('events with no parameters accept none', () => {
    assert.deepEqual(sanitizeParams('view_home', { anything: 'at all' }), {});
    assert.deepEqual(sanitizeParams('view_for_providers', undefined), {});
  });

  test('malformed values are dropped rather than coerced', () => {
    assert.deepEqual(sanitizeParams('directory_search', { has_location: 'true' }), {});
    assert.deepEqual(sanitizeParams('directory_search', { result_count: -1 }), {});
    assert.deepEqual(sanitizeParams('directory_search', { result_count: 1.5 }), {});
    assert.deepEqual(sanitizeParams('view_provider', { provider_slug: 'Has Spaces' }), {});
    assert.deepEqual(sanitizeParams('view_provider', { provider_slug: 'a'.repeat(100) }), {});
  });

  test('empty and null values are omitted', () => {
    assert.deepEqual(sanitizeParams('view_provider', { provider_slug: '' }), {});
    assert.deepEqual(sanitizeParams('view_provider', { provider_slug: null }), {});
  });
});

describe('hostOf', () => {
  test('returns a bare hostname and never a query string', () => {
    assert.equal(hostOf('https://www.theottoolbox.com/category/free-resources/?a=1'),
      'www.theottoolbox.com');
    assert.equal(hostOf('https://EXAMPLE.com/x'), 'example.com');
  });

  test('returns null for unusable input', () => {
    assert.equal(hostOf('not a url'), null);
    assert.equal(hostOf(undefined), null);
  });
});
