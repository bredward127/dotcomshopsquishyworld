import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { track, resetDedupeForPath, __resetDedupe } from './track.ts';

/**
 * Minimal browser doubles. The point of these tests is the gating and dedupe
 * logic, so gtag is a spy and storage is a Map.
 */
type Sent = { event: string; params: Record<string, unknown> };

function installWindow(consent: 'granted' | 'denied' | null): Sent[] {
  const sent: Sent[] = [];
  const store = new Map<string, string>();
  if (consent) {
    store.set(
      'sam.consent.v1',
      JSON.stringify({ analytics: consent, ads: consent, decidedAt: '2026-09-01T00:00:00Z' }),
    );
  }
  (globalThis as Record<string, unknown>).window = {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    },
    sessionStorage: { getItem: () => null },
    location: { search: '' },
    gtag: (kind: string, event: string, params: Record<string, unknown>) => {
      if (kind === 'event') sent.push({ event, params });
    },
  };
  return sent;
}

function teardown() {
  delete (globalThis as Record<string, unknown>).window;
}

describe('consent gating', () => {
  beforeEach(() => __resetDedupe());

  test('nothing is sent without consent', () => {
    const sent = installWindow('denied');
    const result = track('view_home');
    assert.equal(result.sent, false);
    assert.equal(result.sent === false && result.reason, 'no_consent');
    assert.equal(sent.length, 0);
    teardown();
  });

  test('nothing is sent before a choice is made', () => {
    const sent = installWindow(null);
    assert.equal(track('view_home').sent, false);
    assert.equal(sent.length, 0);
    teardown();
  });

  test('events are sent once consent is granted', () => {
    const sent = installWindow('granted');
    assert.equal(track('view_home').sent, true);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].event, 'view_home');
    teardown();
  });
});

describe('unknown events are refused', () => {
  beforeEach(() => __resetDedupe());

  test('an event outside the allowlist never reaches gtag', () => {
    const sent = installWindow('granted');
    const result = track('purchase', { value: 100 });
    assert.equal(result.sent, false);
    assert.equal(result.sent === false && result.reason, 'unknown_event');
    assert.equal(sent.length, 0);
    teardown();
  });
});

describe('parameters are sanitized at the boundary', () => {
  beforeEach(() => __resetDedupe());

  test('free text and PII are stripped before sending', () => {
    const sent = installWindow('granted');
    track('directory_search', {
      has_location: true,
      location: 'Royal Oak',
      email: 'a@b.com',
      question: 'my child struggles with noise',
      service: 'pediatric-ot',
    });
    assert.deepEqual(sent[0].params, { has_location: true, service: 'pediatric-ot' });
    teardown();
  });
});

describe('no duplicate events on route changes', () => {
  beforeEach(() => __resetDedupe());

  test('a repeated effect on the same path fires once', () => {
    const sent = installWindow('granted');
    resetDedupeForPath('/');
    track('view_home', {}, { once: true });
    // React Strict Mode runs effects twice in development.
    track('view_home', {}, { once: true });
    track('view_home', {}, { once: true });
    assert.equal(sent.length, 1, 'view_home should fire exactly once per path');
    teardown();
  });

  test('navigating to a different path fires that path\'s event', () => {
    const sent = installWindow('granted');
    resetDedupeForPath('/');
    track('view_home', {}, { once: true });

    resetDedupeForPath('/providers/a-practice');
    track('view_provider', { provider_slug: 'a-practice' }, { once: true });
    track('view_provider', { provider_slug: 'a-practice' }, { once: true });

    assert.equal(sent.length, 2);
    assert.deepEqual(sent.map((s) => s.event), ['view_home', 'view_provider']);
    teardown();
  });

  test('returning to a path later fires again, because it is a real second view', () => {
    const sent = installWindow('granted');
    resetDedupeForPath('/');
    track('view_home', {}, { once: true });

    resetDedupeForPath('/for-providers');
    track('view_for_providers', {}, { once: true });

    resetDedupeForPath('/');
    track('view_home', {}, { once: true });

    assert.deepEqual(sent.map((s) => s.event), ['view_home', 'view_for_providers', 'view_home']);
    teardown();
  });

  test('resetDedupeForPath with the same path does not clear state', () => {
    const sent = installWindow('granted');
    resetDedupeForPath('/');
    track('view_home', {}, { once: true });
    resetDedupeForPath('/');
    track('view_home', {}, { once: true });
    assert.equal(sent.length, 1);
    teardown();
  });

  test('events without `once` are not deduped', () => {
    const sent = installWindow('granted');
    resetDedupeForPath('/find-help');
    track('directory_search', { has_location: true });
    track('directory_search', { has_location: false });
    assert.equal(sent.length, 2, 'searches are genuinely repeatable');
    teardown();
  });
});
