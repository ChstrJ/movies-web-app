import apiClient from "@/api";

export const fetchPopularMovies = async (page: number = 1) => {

  let data = [];

  for (let i = page; i <= 5; i++) { 
    const response = await apiClient.get(`/movie/popular?language=en-US&page=${i.toString()}`);
    data = [...data, ...response.data.results];
  }

  return data;
}

export const fetchPopularTvShows = async (page: number = 1) => {
  const response = await apiClient.get(`/tv/popular?language=en-US&page=${page.toString()}`);
  return response.data.results;
}

export const fetchTopRatedMovies = async (page: number = 1) => {
  const response = await apiClient.get(`/movie/top_rated?language=en-US&page=${page.toString()}`);
  return response.data.results;
}

export const searchMovies = async (keyword:string, page: number = 1) => {
  const response = await apiClient.get(`/search/movie?query=${keyword}&page=${page.toString()}`);
  return response.data.results;
}
