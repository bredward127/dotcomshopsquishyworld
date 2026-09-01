import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  detectSafetyLevel,
  validateQuestion,
  validateLocation,
  MAX_QUESTION_LENGTH,
} from './safety.ts';

describe('detectSafetyLevel — emergency routing', () => {
  const emergencies = [
    'I think about killing myself',
    'my son said he wants to die',
    'she is talking about suicide',
    'he has been self-harming',
    'my daughter is cutting herself',
    'the baby is not breathing',
    'my child is unresponsive right now',
    'he had a seizure this morning',
    'I think she is choking',
    'this is an emergency',
    'my child is in immediate danger',
    'I am worried he will hurt someone',
  ];

  for (const text of emergencies) {
    test(`routes to emergency: "${text}"`, () => {
      assert.equal(detectSafetyLevel(text), 'emergency');
    });
  }
});

describe('detectSafetyLevel — urgent routing', () => {
  const urgent = [
    'my son has started head banging',
    'he bangs his head on the wall',
    'she bites herself when upset',
    'he hits himself when overwhelmed',
    'my child stopped eating',
    'she refuses all food',
  ];

  for (const text of urgent) {
    test(`routes to urgent: "${text}"`, () => {
      assert.equal(detectSafetyLevel(text), 'urgent');
    });
  }
});

describe('detectSafetyLevel — ordinary questions are not escalated', () => {
  const ordinary = [
    'my son covers his ears in the cafeteria',
    'what is a sensory diet',
    'she hates the seams in her socks',
    'he seeks out spinning and swinging',
    'transitions between activities are hard',
    'I get overwhelmed in open plan offices',
    'what should I ask an occupational therapist',
    'he is a picky eater and avoids some textures',
    'my daughter is very sensitive to loud noises',
  ];

  for (const text of ordinary) {
    test(`stays none: "${text}"`, () => {
      assert.equal(detectSafetyLevel(text), 'none');
    });
  }

  test('empty and missing input are safe', () => {
    assert.equal(detectSafetyLevel(''), 'none');
    assert.equal(detectSafetyLevel(null), 'none');
    assert.equal(detectSafetyLevel(undefined), 'none');
  });
});

describe('detectSafetyLevel — emergency outranks urgent', () => {
  test('a message containing both returns emergency', () => {
    assert.equal(
      detectSafetyLevel('he has been head banging and talking about suicide'),
      'emergency',
    );
  });
});

describe('validateQuestion', () => {
  test('accepts empty input as an optional field', () => {
    assert.deepEqual(validateQuestion(''), { ok: true, value: '' });
    assert.deepEqual(validateQuestion(undefined), { ok: true, value: '' });
    assert.deepEqual(validateQuestion(null), { ok: true, value: '' });
  });

  test('collapses whitespace', () => {
    const result = validateQuestion('  what   is\n\na sensory   diet  ');
    assert.equal(result.ok, true);
    assert.equal(result.ok && result.value, 'what is a sensory diet');
  });

  test('treats whitespace-only input as empty', () => {
    assert.deepEqual(validateQuestion('     '), { ok: true, value: '' });
  });

  test('rejects non-string input', () => {
    assert.equal(validateQuestion(42).ok, false);
    assert.equal(validateQuestion({}).ok, false);
    assert.equal(validateQuestion(['a']).ok, false);
  });

  test('rejects input below the minimum length', () => {
    assert.equal(validateQuestion('ab').ok, false);
  });

  test('rejects input above the maximum length', () => {
    assert.equal(validateQuestion('a'.repeat(MAX_QUESTION_LENGTH + 1)).ok, false);
  });

  test('accepts input exactly at the maximum length', () => {
    assert.equal(validateQuestion('a'.repeat(MAX_QUESTION_LENGTH)).ok, true);
  });

  test('length limit cannot be bypassed with padding', () => {
    const padded = `${'a'.repeat(MAX_QUESTION_LENGTH)}${' '.repeat(50)}`;
    const result = validateQuestion(padded);
    assert.equal(result.ok, true, 'trailing whitespace is trimmed, not counted');
    const overLong = `${'a '.repeat(MAX_QUESTION_LENGTH)}`;
    assert.equal(validateQuestion(overLong).ok, false);
  });
});

describe('validateLocation', () => {
  test('accepts city names and ZIP codes', () => {
    for (const value of ['Detroit', 'Ann Arbor', '48226', 'St. Clair Shores', "O'Fallon"]) {
      assert.equal(validateLocation(value).ok, true, `expected "${value}" to be accepted`);
    }
  });

  test('accepts empty input', () => {
    assert.deepEqual(validateLocation(''), { ok: true, value: '' });
    assert.deepEqual(validateLocation(undefined), { ok: true, value: '' });
  });

  test('rejects characters that do not belong in a place name', () => {
    for (const value of ['<script>', 'Detroit; DROP', 'a@b.com', 'http://x.com']) {
      assert.equal(validateLocation(value).ok, false, `expected "${value}" to be rejected`);
    }
  });

  test('rejects overly long input', () => {
    assert.equal(validateLocation('a'.repeat(61)).ok, false);
  });

  test('rejects non-string input', () => {
    assert.equal(validateLocation(99).ok, false);
  });
});
