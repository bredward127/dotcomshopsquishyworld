import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parseSavedQuiz } from './storage.ts';

describe('saved quiz parsing', () => {
  test('round-trips a valid value', () => {
    const raw = JSON.stringify({ answers: { 1: 'desk-focus', 2: 'jelly' }, completedAt: '2026-09-27T00:00:00.000Z' });
    assert.deepEqual(parseSavedQuiz(raw), {
      answers: { 1: 'desk-focus', 2: 'jelly' },
      completedAt: '2026-09-27T00:00:00.000Z',
    });
  });

  test('rejects corrupt or incomplete values', () => {
    assert.equal(parseSavedQuiz(null), null);
    assert.equal(parseSavedQuiz('{not json'), null);
    assert.equal(parseSavedQuiz(JSON.stringify({ answers: {} })), null);
  });

  test('drops malformed answers', () => {
    const raw = JSON.stringify({ answers: { 1: 'ok', x: 'bad-key', 2: '<script>' }, completedAt: 'now' });
    assert.deepEqual(parseSavedQuiz(raw)?.answers, { 1: 'ok' });
  });
});
