import { NextResponse } from 'next/server';
import { isCategoryId } from '@/lib/ask/taxonomy';
import { resolveQuery, isAllowedQuery } from '@/lib/ask/videoQueries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export type VideoResult = {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  url: string;
};

export type VideosResponse =
  | { status: 'ok'; query: string; videos: VideoResult[] }
  | { status: 'unavailable'; reason: string };

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get('category');

  if (!isCategoryId(category)) {
    return NextResponse.json(
      { status: 'unavailable', reason: 'No topic selected.' } satisfies VideosResponse,
      { status: 400 },
    );
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      status: 'unavailable',
      reason: 'Video search is not configured, so there are no videos to show.',
    } satisfies VideosResponse);
  }

  // The query comes from the fixed allowlist keyed by category. Visitor text
  // is never used here. The second check is belt and braces: if a query ever
  // reaches this point without being on the list, no request is made.
  const query = resolveQuery(category);
  if (!query || !isAllowedQuery(query)) {
    return NextResponse.json({
      status: 'unavailable',
      reason: 'No approved search is available for that topic.',
    } satisfies VideosResponse);
  }

  const endpoint = new URL('https://www.googleapis.com/youtube/v3/search');
  endpoint.searchParams.set('key', apiKey);
  endpoint.searchParams.set('q', query);
  endpoint.searchParams.set('part', 'snippet');
  endpoint.searchParams.set('type', 'video');
  endpoint.searchParams.set('maxResults', '4');
  endpoint.searchParams.set('safeSearch', 'strict');
  endpoint.searchParams.set('relevanceLanguage', 'en');
  endpoint.searchParams.set('videoEmbeddable', 'true');

  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json({
        status: 'unavailable',
        reason: 'Video search did not respond. Nothing to show right now.',
      } satisfies VideosResponse);
    }

    const data = (await res.json()) as {
      items?: Array<{
        id?: { videoId?: string };
        snippet?: {
          title?: string;
          channelTitle?: string;
          thumbnails?: { medium?: { url?: string }; default?: { url?: string } };
        };
      }>;
    };

    const videos: VideoResult[] = (data.items ?? [])
      .map((item) => {
        const videoId = item.id?.videoId;
        const title = item.snippet?.title;
        const channel = item.snippet?.channelTitle;
        const thumbnail =
          item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url;
        if (!videoId || !title || !channel || !thumbnail) return null;
        return {
          videoId,
          title,
          channel,
          thumbnail,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      })
      .filter((video): video is VideoResult => video !== null);

    if (videos.length === 0) {
      return NextResponse.json({
        status: 'unavailable',
        reason: 'No videos came back for this topic.',
      } satisfies VideosResponse);
    }

    return NextResponse.json({ status: 'ok', query, videos } satisfies VideosResponse);
  } catch {
    return NextResponse.json({
      status: 'unavailable',
      reason: 'Video search could not be reached. Nothing to show right now.',
    } satisfies VideosResponse);
  }
}
