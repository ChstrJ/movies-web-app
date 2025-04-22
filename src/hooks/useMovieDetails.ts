import { findMovieById } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useMovieDetails = (id: string | undefined) => {
    const { data, isLoading } = useQuery({
        queryKey: ['movieDetail', id],
        queryFn: () => findMovieById(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading };
}