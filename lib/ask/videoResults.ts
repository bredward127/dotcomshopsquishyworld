import type { VideoResult } from './videoTypes.ts';

/**
 * Merge results from multiple searches into one deduplicated, capped list.
 *
 * Pulled out as a pure function so the merge/cap/dedupe logic is testable
 * without a network call - the API route just wires this to fetch results.
 */
export function mergeVideoResults(
  batches: readonly (readonly VideoResult[])[],
  maxTotal: number,
): VideoResult[] {
  const seen = new Set<string>();
  const merged: VideoResult[] = [];

  // Round-robin across batches rather than exhausting one query before the
  // next, so a two-query category shows variety instead of one query's
  // results padded by a second only when the first comes up short.
  const cursors = batches.map(() => 0);
  let remaining = batches.reduce((sum, b) => sum + b.length, 0);

  while (merged.length < maxTotal && remaining > 0) {
    let advanced = false;
    for (let i = 0; i < batches.length; i++) {
      if (merged.length >= maxTotal) break;
      const batch = batches[i];
      while (cursors[i] < batch.length) {
        const candidate = batch[cursors[i]];
        cursors[i]++;
        remaining--;
        advanced = true;
        if (!seen.has(candidate.videoId)) {
          seen.add(candidate.videoId);
          merged.push(candidate);
          break;
        }
      }
    }
    if (!advanced) break;
  }

  return merged;
}
