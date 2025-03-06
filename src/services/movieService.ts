import apiClient from "@/api";

export const fetchPopularMovies = async (totalPages: number = 5) => {
  let request = [];

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


  for (let page = 1; page <= totalPages; page++) {
    console.log(`/discover/tv?language=en-US&page=${page}`);
    request.push(apiClient.get(`/discover/tv?language=en-US&page=${page}`));
  }

  const requests = await Promise.all(request);
  const data = requests.flatMap((response) => response.data.results);

  return data.slice(0, -2);
}

export const fetchSeriesById = async (id: number) => {
  const response = await apiClient.get(`/tv/${id}`);
  return response.data.results;
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
