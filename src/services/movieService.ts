import apiClient from "@/api";
import { TMDBVideo } from "@/lib/types";

export const fetchPopularMovies = async (totalPages: number = 5) => {
  let request = [];

  if (totalPages < 5) {
    totalPages = 5;
  }

  for (let page = 1; page <= totalPages; page++) {
    const response = apiClient.get(`/movie/popular?language=en-US&page=${page}`);
    request.push(response);
  }

  const responses = await Promise.all(request);
  const data = responses.flatMap((response) => response.data.results);

  return data.slice(0, -4);
}

export const fetchPopularTvShows = async (totalPages: number = 5) => {
  let request = [];

  if (totalPages < 5) {
    totalPages = 5;
  }

  for (let page = 1; page <= totalPages; page++) {
    request.push(apiClient.get(`/discover/tv?language=en-US&page=${page}&sort_by=vote_average.desc&vote_count.gte=200`));
  }

  const requests = await Promise.all(request);
  const data = requests.flatMap((response) => response.data.results);

  return data.slice(0, -3);
}

export const findSeriesById = async (id: string | undefined) => {
  const response = await apiClient.get(`/tv/${id}`);
  return response.data;
}

export const fetchTopRatedMovies = async (page: number = 1) => {
  const response = await apiClient.get(`/movie/top_rated?language=en-US&page=${page.toString()}`);
  return response.data.results;
}

export const searchMovies = async (keyword: string, totalPages: number = 5) => {
  let request = [];

  for (let page = 1; page <= totalPages; page++) {
    request.push(apiClient.get(`/search/movie?query=${encodeURI(keyword)}&page=${page}`));
  }

  const responses = await Promise.all(request);
  const data = responses.flatMap((response) => response.data.results)

  return data.slice(0, -4);
}

export const searchTvShows = async (keyword: string, page: number = 1) => {
  const response = await apiClient.get(`/search/tv?query=${keyword}&page=${page.toString()}`);
  return response.data.results;
}

export const getVideoTrailer = async (id: string | undefined) => {
  const response = await apiClient.get(`/movie/${id}/videos?language=en-US`);

  const data: TMDBVideo[] = response.data.results;

  const videoTrailer = data.find(item => item.site === 'YouTube' && item.type === 'Trailer');

  const key = videoTrailer?.key ?? null;

  return `https://www.youtube.com/embed/${key}`;
}

export const searchMulti = async (keyword: string, page: number = 1) => {
  const response = await apiClient.get(`/ search / multi ? include_adult = false & query=${encodeURI(keyword)}& page=${page} `);
  const results = response.data.results;

  const sorted = results.sort((a: any, b: any) => {
    return b.popularity - a.popularity;
  });

  return sorted;
}

export const movieGenre = async () => {
  const response = await apiClient.get(`genre / movie / list ? language = en`);
  return response.data.results;
}

export const findMovieById = async (id: string | undefined) => {
  const response = await apiClient.get(`movie / ${id}?language = en - US`);
  return response.data;
}

export const showsDetails = async (id: number) => {
  const response = await apiClient.get(`/ tv / ${id} `);
  return response.data.results;
}

