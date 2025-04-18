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

export function getMovieUrl(id: string | undefined) {
  const basePath = getVideoPath();
  return `${basePath}/movie/${id}`;
}

export function getShowUrl(id: number, season: number, episode: number) {
  const basePath = getVideoPath();
  return `${basePath}/tv/tt${id}/${season}/${episode}`;
}

export const isMoviePage = (pathname: string) => {
  return /^\/movie\/\d+$/.test(pathname);
}

export const isShowPage = (pathname: string) => {
  return /^\/show\/\d+$/.test(pathname);
}
