import { useQuery } from '@tanstack/react-query';
import { usePaginationStore } from '@/stores/usePaginationStore';
import { fetchPopularMovies } from '@/services/movieService';
import BrowseCollection, { CatalogTitle } from './BrowseCollection';

export default function MovieList() {
  const { page } = usePaginationStore();
  const { data, isLoading, isError, refetch } = useQuery<CatalogTitle[]>({ queryKey: ['movies', page], queryFn: () => fetchPopularMovies(page) });
  return <BrowseCollection titles={data} loading={isLoading} error={isError} retry={() => { void refetch(); }} />;
}
