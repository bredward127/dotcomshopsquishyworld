import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { filterProviders, hasActiveFilters, EMPTY_FILTERS } from './filters.ts';
import {
  canShowReferralStatus,
  referralStatusOf,
  safeWebsite,
  telHref,
  type Provider,
} from './types.ts';
import { providers, exampleProviders } from './data.ts';

const base: Provider = {
  id: 't1',
  slug: 'test-practice',
  name: 'Test Practice',
  description: 'Test.',
  locations: [{ city: 'Royal Oak', state: 'MI', postalCode: '48067' }],
  serviceAreaNote: 'Test area.',
  services: ['pediatric-ot'],
  ageGroups: ['school-age'],
  telehealth: false,
};

describe('production data', () => {
  test('ships with no production listings', () => {
    assert.equal(providers.length, 0);
  });

  test('every example record is flagged as an example', () => {
    for (const p of exampleProviders) {
      assert.equal(p.isExample, true, `${p.slug} is not flagged`);
    }
  });

  test('example records never use a real-looking phone or website', () => {
    for (const p of exampleProviders) {
      if (p.phone) {
        assert.match(p.phone, /\(555\) 010-01\d\d/, `${p.slug} phone is not a reserved number`);
      }
      if (p.website) {
        assert.match(p.website, /^https:\/\/example\.com\//, `${p.slug} website is not example.com`);
      }
      assert.match(p.name, /^Example /, `${p.slug} name does not announce itself`);
    }
  });
});

describe('referral claims require a source and a date', () => {
  test('no referral field means the status cannot be shown', () => {
    assert.equal(canShowReferralStatus(base), false);
    assert.equal(referralStatusOf(base), 'unknown');
  });

  test('a claim without a source is not displayable', () => {
    const p: Provider = {
      ...base,
      referral: { value: 'accepting', source: '', lastConfirmed: '2026-08-01' },
    };
    assert.equal(canShowReferralStatus(p), false);
    assert.equal(referralStatusOf(p), 'unknown');
  });

  test('a claim without a valid date is not displayable', () => {
    for (const lastConfirmed of ['', 'recently', '08/01/2026', '2026-8-1']) {
      const p: Provider = {
        ...base,
        referral: { value: 'accepting', source: 'Called the practice', lastConfirmed },
      };
      assert.equal(canShowReferralStatus(p), false, `"${lastConfirmed}" should be rejected`);
    }
  });

  test('a fully sourced and dated claim is displayable', () => {
    const p: Provider = {
      ...base,
      referral: { value: 'accepting', source: 'Called the practice', lastConfirmed: '2026-08-01' },
    };
    assert.equal(canShowReferralStatus(p), true);
    assert.equal(referralStatusOf(p), 'accepting');
  });
});

describe('filterProviders', () => {
  const accepting: Provider = {
    ...base,
    id: 'a',
    slug: 'a',
    referral: { value: 'accepting', source: 'Called', lastConfirmed: '2026-08-01' },
  };
  const unconfirmed: Provider = {
    ...base,
    id: 'b',
    slug: 'b',
    locations: [{ city: 'Dearborn', state: 'MI', postalCode: '48124' }],
    services: ['speech'],
    ageGroups: ['adult'],
    telehealth: true,
  };
  const set = [accepting, unconfirmed];

  test('no filters returns everything', () => {
    assert.equal(filterProviders(set, EMPTY_FILTERS).length, 2);
  });

  test('city match is case-insensitive and partial', () => {
    assert.deepEqual(
      filterProviders(set, { ...EMPTY_FILTERS, location: 'royal' }).map((p) => p.id),
      ['a'],
    );
    assert.deepEqual(
      filterProviders(set, { ...EMPTY_FILTERS, location: 'DEARBORN' }).map((p) => p.id),
      ['b'],
    );
  });

  test('ZIP match works on a prefix', () => {
    assert.deepEqual(
      filterProviders(set, { ...EMPTY_FILTERS, location: '480' }).map((p) => p.id),
      ['a'],
    );
  });

  test('unmatched location returns nothing rather than everything', () => {
    assert.equal(filterProviders(set, { ...EMPTY_FILTERS, location: 'Chicago' }).length, 0);
  });

  test('service filter matches the service list', () => {
    assert.deepEqual(
      filterProviders(set, { ...EMPTY_FILTERS, service: 'pediatric-ot' }).map((p) => p.id),
      ['a'],
    );
  });

  test('telehealth filters on the flag, not the service list', () => {
    assert.deepEqual(
      filterProviders(set, { ...EMPTY_FILTERS, service: 'telehealth' }).map((p) => p.id),
      ['b'],
    );
  });

  test('age group filter works', () => {
    assert.deepEqual(
      filterProviders(set, { ...EMPTY_FILTERS, ageGroup: 'adult' }).map((p) => p.id),
      ['b'],
    );
  });

  test('filtering for "accepting" never returns an unconfirmed provider', () => {
    const result = filterProviders(set, { ...EMPTY_FILTERS, referral: 'accepting' });
    assert.deepEqual(result.map((p) => p.id), ['a']);
    assert.ok(result.every(canShowReferralStatus));
  });

  test('filtering for "unknown" returns exactly the unconfirmed providers', () => {
    assert.deepEqual(
      filterProviders(set, { ...EMPTY_FILTERS, referral: 'unknown' }).map((p) => p.id),
      ['b'],
    );
  });

  test('filters combine as AND, not OR', () => {
    assert.equal(
      filterProviders(set, { ...EMPTY_FILTERS, location: 'Royal Oak', service: 'speech' }).length,
      0,
    );
  });

  test('an empty source stays empty', () => {
    assert.equal(filterProviders([], { ...EMPTY_FILTERS, service: 'pediatric-ot' }).length, 0);
  });
});

describe('hasActiveFilters', () => {
  test('detects each filter and ignores whitespace', () => {
    assert.equal(hasActiveFilters(EMPTY_FILTERS), false);
    assert.equal(hasActiveFilters({ ...EMPTY_FILTERS, location: '   ' }), false);
    assert.equal(hasActiveFilters({ ...EMPTY_FILTERS, location: 'Troy' }), true);
    assert.equal(hasActiveFilters({ ...EMPTY_FILTERS, service: 'speech' }), true);
    assert.equal(hasActiveFilters({ ...EMPTY_FILTERS, ageGroup: 'teen' }), true);
    assert.equal(hasActiveFilters({ ...EMPTY_FILTERS, referral: 'unknown' }), true);
  });
});

describe('contact link safety', () => {
  test('only https websites are rendered', () => {
    assert.equal(safeWebsite('https://example.com/a'), 'https://example.com/a');
    assert.equal(safeWebsite('http://example.com'), null);
    assert.equal(safeWebsite('javascript:alert(1)'), null);
    assert.equal(safeWebsite('not a url'), null);
    assert.equal(safeWebsite(undefined), null);
  });

  test('tel: links are built from dialable numbers only', () => {
    assert.equal(telHref('(555) 010-0142'), 'tel:5550100142');
    assert.equal(telHref('555-010-0142'), 'tel:5550100142');
    assert.equal(telHref('123'), null);
    assert.equal(telHref('call us'), null);
    assert.equal(telHref(undefined), null);
  });
});
