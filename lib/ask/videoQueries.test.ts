import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { resolveQuery, isAllowedQuery, ALLOWED_QUERIES, queriesForCategory } from './videoQueries.ts';
import { CATEGORIES } from './taxonomy.ts';

describe('resolveQuery', () => {
  test('every category resolves to an approved query', () => {
    for (const category of CATEGORIES) {
      const query = resolveQuery(category.id);
      assert.ok(query, `expected a query for ${category.id}`);
      assert.ok(isAllowedQuery(query), `${category.id} produced an off-allowlist query`);
    }
  });

  test('unknown categories resolve to null rather than a search', () => {
    for (const value of ['', 'unknown', 'OVERWHELM', null, undefined, 42, {}, ['overwhelm']]) {
      assert.equal(resolveQuery(value), null, `expected null for ${JSON.stringify(value)}`);
    }
  });

  test('free text never becomes a query', () => {
    const attempts = [
      'my son has autism what do I do',
      'overwhelm; site:example.com',
      'overwhelm OR anything',
      '  overwhelm  ',
    ];
    for (const attempt of attempts) {
      assert.equal(resolveQuery(attempt), null, `"${attempt}" must not resolve`);
    }
  });
});

describe('isAllowedQuery', () => {
  test('accepts only exact allowlist entries', () => {
    for (const query of ALLOWED_QUERIES) {
      assert.equal(isAllowedQuery(query), true);
    }
  });

  test('rejects modified, extended, or arbitrary queries', () => {
    const first = ALLOWED_QUERIES[0];
    assert.equal(isAllowedQuery(`${first} extra terms`), false);
    assert.equal(isAllowedQuery(first.toUpperCase()), false);
    assert.equal(isAllowedQuery(first.slice(0, -1)), false);
    assert.equal(isAllowedQuery(''), false);
    assert.equal(isAllowedQuery('anything else'), false);
  });
});

describe('allowlist integrity', () => {
  test('each category has at least one query', () => {
    for (const category of CATEGORIES) {
      assert.ok(queriesForCategory(category.id).length > 0, `${category.id} has no queries`);
    }
  });

  test('no query contains a placeholder or interpolation marker', () => {
    for (const query of ALLOWED_QUERIES) {
      assert.doesNotMatch(query, /[${}<>]/, `"${query}" looks templated`);
    }
  });
});
