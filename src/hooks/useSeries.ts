import { findSeriesById } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useSeries = (id: string | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: ['showDetails', id],
    queryFn: () => findSeriesById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };

}
