import apiClient from "@/api";

export const fetchMovies = async () => {
  const response = await apiClient.get('/movie/popular?language=en');
  console.log(response);
  return response.data.results;
}
