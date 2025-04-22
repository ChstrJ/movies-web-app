import { fetchPopularMovies } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useMovieList = (page: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['movies', page],
        queryFn: () => fetchPopularMovies(page),
    });

    return { data, isLoading };
}