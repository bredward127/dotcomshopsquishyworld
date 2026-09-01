import type { LibraryArticle } from '@/lib/library/types';

/**
 * Renders a confirmed video, or an honest placeholder.
 *
 * There is deliberately no fallback that invents a video, a channel, or a
 * view count. A missing video shows a plain "not chosen yet" state rather
 * than a plausible-looking fake, because a fabricated citation is worse than
 * an admitted gap.
 */
export default function VideoSlot({ video }: { video: LibraryArticle['video'] }) {
  if (!video) {
    return (
      <div
        className="flex aspect-video items-center justify-center rounded-card border-2 border-dashed border-mist-600 bg-mist-200 px-6 text-center"
        role="status"
      >
        <p className="text-sm leading-relaxed text-ink-muted">
          A video for this topic has not been chosen and verified yet. Nothing is embedded here
          rather than showing a placeholder that looks like a real result.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-video overflow-hidden rounded-card border border-mist-400">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        <span className="font-medium text-navy">{video.title}</span> &middot; {video.channel}
      </p>
      <p className="mt-1 text-xs text-ink-muted">
        Hosted on YouTube. This video is independent of Sensory Access Michigan; linking to it is
        not an endorsement of the channel&rsquo;s other content.
      </p>
    </div>
  );
}
