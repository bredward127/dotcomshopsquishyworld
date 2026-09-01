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
