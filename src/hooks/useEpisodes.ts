import { fetchEpisodes } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";

export const useEpisodes = (id: number | string | undefined, season: number | string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['episodes', season],
    queryFn: () => fetchEpisodes(id, season),
    enabled: !!season,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };
}
