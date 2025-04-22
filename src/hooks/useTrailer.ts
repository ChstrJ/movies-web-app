import { getVideoTrailer } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useTrailer = (id: string | undefined) => {
    const { data, isLoading } = useQuery({
        queryKey: ['trailer', id],
        queryFn: () => getVideoTrailer(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading };
}