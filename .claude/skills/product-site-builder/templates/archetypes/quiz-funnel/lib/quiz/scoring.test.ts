import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildResult, isComplete, rankTraits, scoreAnswers } from './scoring.ts';
import { TRAITS, products, quizQuestions } from '../../data/quizData.ts';

/** Answer every question with the option for `trait`, falling back to the first option. */
function allOf(trait: string): Record<number, string> {
  return Object.fromEntries(
    quizQuestions.map((q) => [q.id, (q.options.find((o) => o.trait === trait) ?? q.options[0]).id]),
  );
}

describe('quiz data', () => {
  test('matches the spec: four questions with 4, 4, 3, 3 options', () => {
    assert.deepEqual(quizQuestions.map((q) => q.options.length), [4, 4, 3, 3]);
  });

  test('option ids are unique within each question', () => {
    for (const q of quizQuestions) {
      assert.equal(new Set(q.options.map((o) => o.id)).size, q.options.length);
    }
  });

  test('product ids are unique slugs', () => {
    assert.equal(new Set(products.map((p) => p.id)).size, products.length);
    for (const p of products) assert.match(p.id, /^[a-z0-9-]+$/);
  });

  test('no product ships an invented rating or review count', () => {
    for (const p of products) {
      assert.equal(p.rating, undefined, `${p.id} has a rating`);
      assert.equal(p.reviewCount, undefined, `${p.id} has a review count`);
    }
  });
});

describe('scoring', () => {
  test('counts one point per answered trait', () => {
    assert.deepEqual(scoreAnswers(allOf('compression')), { calm: 0, tactile: 0, compression: 4, focus: 0 });
  });

  test('ignores unknown option ids', () => {
    assert.deepEqual(scoreAnswers({ 1: 'nope' }), { calm: 0, tactile: 0, compression: 0, focus: 0 });
    assert.equal(isComplete({ 1: 'nope' }), false);
  });

  test('isComplete requires every question', () => {
    assert.equal(isComplete(allOf('calm')), true);
    const partial = allOf('calm');
    delete partial[4];
    assert.equal(isComplete(partial), false);
  });

  test('a tie goes to the preferred-feel answer', () => {
    // focus, compression, focus, compression -> 2-2 tie; question 2 chose compression.
    const answers = { 1: 'desk-focus', 2: 'heavy-squeeze', 3: 'silent', 4: 'tough' };
    assert.equal(rankTraits(answers)[0], 'compression');
    assert.equal(rankTraits(answers)[1], 'focus');
  });
});

describe('results', () => {
  for (const trait of TRAITS) {
    test(`an all-${trait} quiz yields the ${trait} persona and three distinct picks`, () => {
      const result = buildResult(allOf(trait));
      assert.equal(result.primary, trait);
      assert.equal(result.persona.trait, trait);
      const ids = [result.picks.best.id, result.picks.quiet.id, result.picks.multipack.id];
      assert.equal(new Set(ids).size, 3);
      assert.equal(result.picks.quiet.quiet, true);
      assert.ok(result.picks.multipack.slots.includes('multipack'));
    });
  }

  test('the spec example profile badge is produced', () => {
    const result = buildResult({ 1: 'desk-focus', 2: 'heavy-squeeze', 3: 'silent', 4: 'tough' });
    assert.equal(result.persona.name, 'Deep Compression Seeker');
    assert.equal(result.profileBadge, 'Deep Pressure & Quiet Focus Seeker');
  });

  test('best match leads with the primary trait', () => {
    for (const trait of TRAITS) {
      assert.equal(buildResult(allOf(trait)).picks.best.traits[0], trait);
    }
  });

  test('alternatives exclude the three picks and the primary trait', () => {
    const result = buildResult(allOf('calm'));
    const chosen = new Set(Object.values(result.picks).map((p) => p.id));
    assert.ok(result.alternatives.length > 0);
    for (const p of result.alternatives) {
      assert.ok(!chosen.has(p.id));
      assert.notEqual(p.traits[0], 'calm');
    }
  });

  test('every possible answer combination produces a full result', () => {
    const [a, b, c, d] = quizQuestions;
    let count = 0;
    for (const o1 of a.options)
      for (const o2 of b.options)
        for (const o3 of c.options)
          for (const o4 of d.options) {
            const r = buildResult({ 1: o1.id, 2: o2.id, 3: o3.id, 4: o4.id });
            assert.ok(r.picks.best && r.picks.quiet && r.picks.multipack);
            count++;
          }
    assert.equal(count, 4 * 4 * 3 * 3);
  });
});
