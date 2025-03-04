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

export function getMovieUrl(id) {
  const basePath = getVideoPath();
  console.log(basePath);
  return `${basePath}/movie/${id}`;
}
