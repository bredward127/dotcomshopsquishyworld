'use client';

import { useEffect, useState } from 'react';
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
 * than introducing a new one. Selecting a video no longer navigates away -
 * it plays inline - but it is still the same underlying action (choosing to
 * engage with a specific piece of YouTube content), so the same event and
 * the same care around what it may carry still applies: resource_id here is
 * the fixed category, never a raw video ID, and no free text is involved.
 */
function trackVideoSelect(category: CategoryId) {
  track('outbound_resource_click', {
    resource_id: `youtube-${category}`,
    destination_host: 'www.youtube.com',
  });
}

export default function VideoList({ category }: { category: CategoryId | null }) {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [activeVideo, setActiveVideo] = useState<VideoResult | null>(null);

  useEffect(() => {
    setActiveVideo(null);

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

  function selectVideo(video: VideoResult) {
    setActiveVideo(video);
    if (category) trackVideoSelect(category);
  }

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
            clinician. Pick one below to watch it here.
          </p>

          {activeVideo && (
            <div className="mt-4">
              <div className="aspect-video overflow-hidden rounded-card border border-mist-400">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}`}
                  title={activeVideo.title}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-2 text-sm text-ink-muted">
                <span className="font-medium text-navy">{activeVideo.title}</span> &middot;{' '}
                {activeVideo.channel}
              </p>
            </div>
          )}

          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {state.videos.map((video) => {
              const isActive = activeVideo?.videoId === video.videoId;
              return (
                <li key={video.videoId}>
                  <button
                    type="button"
                    onClick={() => selectVideo(video)}
                    aria-pressed={isActive}
                    className={`flex h-full w-full gap-3 rounded-card border p-3 text-left transition-colors ${
                      isActive
                        ? 'border-teal bg-mist-200'
                        : 'border-mist-400 hover:border-teal hover:bg-mist-200'
                    }`}
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
                      <span className="line-clamp-2 text-sm font-medium text-navy">
                        {video.title}
                      </span>
                      <span className="mt-1 block truncate text-xs text-ink-muted">
                        {video.channel}
                      </span>
                      <span className="mt-1 block text-xs text-teal">
                        {isActive ? 'Now playing' : 'Play here'}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {state.query && (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(state.query)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => category && trackVideoSelect(category)}
              className="mt-3 inline-block text-sm text-teal underline underline-offset-4 hover:text-navy"
            >
              See more on YouTube (opens in a new tab)
            </a>
          )}
        </>
      )}
    </section>
  );
}
