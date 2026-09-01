'use client';

import { useEffect, useState } from 'react';
import { ExternalIcon } from '@/components/Icons';
import type { CategoryId } from '@/lib/ask/taxonomy';
import { track } from '@/lib/analytics/track';
import type { VideoResult } from '@/lib/ask/videoTypes';

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok'; videos: VideoResult[]; query: string }
  | { kind: 'unavailable'; reason: string };

/**
 * Click tracking reuses the existing outbound_resource_click event rather
 * than introducing a new one: a YouTube click is an outbound resource click,
 * and resource_id here is the fixed category, not the video ID - a raw
 * YouTube video ID would not pass the analytics sanitizer's slug pattern
 * anyway (it can contain letters, digits, hyphens, and underscores in mixed
 * case), and identifying which specific video someone watched is not
 * something this event is meant to capture.
 */
function trackVideoClick(category: CategoryId) {
  track('outbound_resource_click', {
    resource_id: `youtube-${category}`,
    destination_host: 'www.youtube.com',
  });
}

export default function VideoList({ category }: { category: CategoryId | null }) {
  const [state, setState] = useState<State>({ kind: 'idle' });

  useEffect(() => {
    if (!category) {
      setState({ kind: 'idle' });
      return;
    }

    let cancelled = false;
    setState({ kind: 'loading' });

    fetch(`/api/videos?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.status === 'ok' && Array.isArray(data.videos)) {
          setState({ kind: 'ok', videos: data.videos, query: data.query ?? '' });
        } else {
          setState({ kind: 'unavailable', reason: data?.reason ?? 'No videos to show.' });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ kind: 'unavailable', reason: 'Video search could not be reached.' });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  if (state.kind === 'idle') return null;

  return (
    <section aria-labelledby="videos-heading">
      <h3 id="videos-heading" className="text-lg font-semibold text-navy">
        Related videos
      </h3>

      {state.kind === 'loading' && (
        <p className="mt-2 text-sm text-ink-muted" role="status">
          Looking for videos…
        </p>
      )}

      {state.kind === 'unavailable' && (
        <div className="mt-3 rounded-card border border-mist-400 bg-mist-200 px-5 py-4">
          <p className="text-sm leading-relaxed text-ink-muted">{state.reason}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            The resources listed on the{' '}
            <a href="/resources" className="underline underline-offset-4 hover:text-navy">
              resources page
            </a>{' '}
            cover the same ground.
          </p>
        </div>
      )}

      {state.kind === 'ok' && (
        <>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            These come from YouTube search and are published by people unconnected to this site.
            They are not medical advice, are not endorsements, and have not been reviewed by a
            clinician.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {state.videos.map((video) => (
              <li key={video.videoId}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => category && trackVideoClick(category)}
                  className="group flex h-full gap-3 rounded-card border border-mist-400 p-3 transition-colors hover:border-teal hover:bg-mist-200"
                >
                  {/* Remote YouTube thumbnail: plain img avoids configuring a
                      remote image host for a single third-party domain. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt=""
                    width={120}
                    height={90}
                    loading="lazy"
                    className="h-[68px] w-[90px] shrink-0 rounded object-cover"
                  />
                  <span className="min-w-0">
                    <span className="flex items-start gap-1.5">
                      <span className="line-clamp-2 text-sm font-medium text-navy group-hover:underline">
                        {video.title}
                      </span>
                      <span className="mt-0.5 shrink-0 text-teal">
                        <ExternalIcon className="h-3.5 w-3.5" />
                      </span>
                    </span>
                    <span className="mt-1 block truncate text-xs text-ink-muted">
                      {video.channel}
                    </span>
                    <span className="mt-1 block text-xs text-teal">Opens on YouTube</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {state.query && (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(state.query)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => category && trackVideoClick(category)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-teal underline underline-offset-4 hover:text-navy"
            >
              See more on YouTube
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </>
      )}
    </section>
  );
}
