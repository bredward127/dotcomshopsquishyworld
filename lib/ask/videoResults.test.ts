import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { mergeVideoResults } from './videoResults.ts';
import type { VideoResult } from './videoTypes.ts';

function video(id: string): VideoResult {
  return { videoId: id, title: `Title ${id}`, channel: 'Channel', thumbnail: 'x.jpg', url: `https://youtube.com/watch?v=${id}` };
}

describe('mergeVideoResults', () => {
  test('interleaves batches rather than exhausting the first', () => {
    const a = [video('a1'), video('a2'), video('a3')];
    const b = [video('b1'), video('b2'), video('b3')];
    const merged = mergeVideoResults([a, b], 4);
    assert.deepEqual(
      merged.map((v) => v.videoId),
      ['a1', 'b1', 'a2', 'b2'],
    );
  });

  test('deduplicates by videoId across batches', () => {
    const a = [video('shared'), video('a2')];
    const b = [video('shared'), video('b2')];
    const merged = mergeVideoResults([a, b], 10);
    assert.deepEqual(
      merged.map((v) => v.videoId).sort(),
      ['a2', 'b2', 'shared'],
    );
  });

  test('respects the cap even with plenty of input', () => {
    const a = Array.from({ length: 10 }, (_, i) => video(`a${i}`));
    const merged = mergeVideoResults([a], 3);
    assert.equal(merged.length, 3);
  });

  test('handles a single batch', () => {
    const a = [video('a1'), video('a2')];
    assert.deepEqual(mergeVideoResults([a], 10).map((v) => v.videoId), ['a1', 'a2']);
  });

  test('handles an empty batch list', () => {
    assert.deepEqual(mergeVideoResults([], 5), []);
  });

  test('handles batches of uneven length without dropping the longer one', () => {
    const a = [video('a1')];
    const b = [video('b1'), video('b2'), video('b3')];
    const merged = mergeVideoResults([a, b], 10);
    assert.deepEqual(
      merged.map((v) => v.videoId).sort(),
      ['a1', 'b1', 'b2', 'b3'],
    );
  });

  test('zero cap returns nothing', () => {
    assert.deepEqual(mergeVideoResults([[video('a1')]], 0), []);
  });
});
