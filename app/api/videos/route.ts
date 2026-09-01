import { NextResponse } from 'next/server';
import { isCategoryId } from '@/lib/ask/taxonomy';
import { queriesForCategory, isAllowedQuery } from '@/lib/ask/videoQueries';
import { mergeVideoResults } from '@/lib/ask/videoResults';
import type { VideoResult, VideosResponse } from '@/lib/ask/videoTypes';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export type { VideoResult, VideosResponse };

const RESULTS_PER_QUERY = 4;
const MAX_TOTAL_RESULTS = 6;

function buildSearchEndpoint(apiKey: string, query: string): URL {
  const endpoint = new URL('https://www.googleapis.com/youtube/v3/search');
  endpoint.searchParams.set('key', apiKey);
  endpoint.searchParams.set('q', query);
  endpoint.searchParams.set('part', 'snippet');
  endpoint.searchParams.set('type', 'video');
  endpoint.searchParams.set('maxResults', String(RESULTS_PER_QUERY));
  endpoint.searchParams.set('safeSearch', 'strict');
  endpoint.searchParams.set('relevanceLanguage', 'en');
  endpoint.searchParams.set('videoEmbeddable', 'true');
  return endpoint;
}

type FetchOutcome = { ok: true; videos: VideoResult[] } | { ok: false; status: number };

async function fetchOneQuery(apiKey: string, query: string): Promise<FetchOutcome> {
  const res = await fetch(buildSearchEndpoint(apiKey, query), { next: { revalidate: 3600 } });
  if (!res.ok) return { ok: false, status: res.status };

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
      return { videoId, title, channel, thumbnail, url: `https://www.youtube.com/watch?v=${videoId}` };
    })
    .filter((video): video is VideoResult => video !== null);

  return { ok: true, videos };
}

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

  // Every query for this category comes from the fixed allowlist. Visitor
  // text is never used here. The isAllowedQuery check is belt and braces: if
  // a query ever reaches this point without being on the list, it is
  // skipped rather than sent.
  const queries = queriesForCategory(category).filter(isAllowedQuery);
  if (queries.length === 0) {
    return NextResponse.json({
      status: 'unavailable',
      reason: 'No approved search is available for that topic.',
    } satisfies VideosResponse);
  }

  try {
    const outcomes = await Promise.all(queries.map((q) => fetchOneQuery(apiKey, q)));

    const quotaOrAuthFailure = outcomes.some((o) => !o.ok && (o.status === 403 || o.status === 401));
    if (quotaOrAuthFailure) {
      // Logged server-side only - never surfaced to the visitor, and the key
      // itself is never included in the log line.
      console.error('[api/videos] YouTube API rejected the request (401/403).');
    }

    const successfulBatches = outcomes.filter((o): o is { ok: true; videos: VideoResult[] } => o.ok);
    if (successfulBatches.length === 0) {
      return NextResponse.json({
        status: 'unavailable',
        reason: 'Video search did not respond. Nothing to show right now.',
      } satisfies VideosResponse);
    }

    const videos = mergeVideoResults(
      successfulBatches.map((b) => b.videos),
      MAX_TOTAL_RESULTS,
    );

    if (videos.length === 0) {
      return NextResponse.json({
        status: 'unavailable',
        reason: 'No videos came back for this topic.',
      } satisfies VideosResponse);
    }

    return NextResponse.json({
      status: 'ok',
      query: queries[0],
      videos,
    } satisfies VideosResponse);
  } catch {
    return NextResponse.json({
      status: 'unavailable',
      reason: 'Video search could not be reached. Nothing to show right now.',
    } satisfies VideosResponse);
  }
}
