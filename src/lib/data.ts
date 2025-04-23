import { useTrailer } from "@/hooks/useTrailer";
import { get2embedUrl, getGoDriveUrl, getGomoUrl, getMovieUrl } from "./utils";

export const getServers = (tmdbId: string | undefined, imdbId: string | undefined) => {
  const movieUrl = getMovieUrl(tmdbId);
  const goDriveUrl = getGoDriveUrl(imdbId);
  const gomoUrl = getGomoUrl(imdbId);
  const twoEmbedUrl = get2embedUrl(tmdbId);

  if (movieUrl && goDriveUrl && gomoUrl && twoEmbedUrl) {
    return [
      {
        serverName: 'Server 1',
        serverUrl: movieUrl,
        default: true
      },
      {
        serverName: 'Server 2',
        serverUrl: twoEmbedUrl,
      },
      {
        serverName: 'Server 3',
        serverUrl: goDriveUrl,
      },
      {
        serverName: 'Server 4',
        serverUrl: gomoUrl,
      }
    ]

  }

  return null;
}

export const getTrailerVideo = (tmdbId: string | undefined) => {

  const { data: trailer } = useTrailer(tmdbId);

  if (trailer) {
    return [
      {
        serverName: 'Trailer 1',
        serverUrl: trailer ?? ''
      }
    ]
  }

  return null;
}
