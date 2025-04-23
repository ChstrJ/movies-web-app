import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath() {
  return import.meta.env.VITE_TMDB_IMAGE_URL;
}

export function getVideoPath() {
  return import.meta.env.VITE_VIDSRC_BASE_URL;
}

export function getTMDBPath() {
  return import.meta.env.VITE_TMDB_BASE_URL;
}

export function get2embedUrl(id: string | undefined) {
  return `https://www.2embed.cc/embed/${id}`;
}

export function getMultiEmbedUrl(id: string | undefined) {
  return `https://multiembed.to/tmdb/movie/${id}`;
}

export function getGoDriveUrl(id: string | undefined) {
  return `https://godriveplayer.com/player.php?imdb=${id}`;
}

export function getGomoUrl(id: string | undefined) {
  return `https://gomo.to/movie/${id}`;
}


export function getVembedUrl(id: string | undefined) {
  return `https://vembed.net/movie/${id}`;
}

export function getMovieUrl(id: string | undefined) {
  const basePath = getVideoPath();
  return `${basePath}/movie/${id}`;
}

export function getBackdropImage(backdropPath: string, size: string = 'w1280') {
  const imagePath = getImagePath();
  return `${imagePath}/t/p/${size}/${backdropPath}`
}

export function getShowUrl(id: number | string | undefined, season: number, episode: number) {
  const basePath = getVideoPath();
  return `${basePath}/tv/${id}/${season}/${episode}`;
}

export function getVideoTrailer(id: string | undefined) {
  const basePath = getTMDBPath();
  return `${basePath}/movie/${id}/videos?language=en-US`
}

export const isMoviePage = (pathname: string) => {
  return /^\/movie\/\d+$/.test(pathname);
}

export const isShowPage = (pathname: string) => {
  return /^\/show\/\d+$/.test(pathname);
}
