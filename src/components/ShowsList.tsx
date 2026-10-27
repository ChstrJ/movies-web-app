import { useQuery } from '@tanstack/react-query';
import { fetchPopularTvShows } from '@/services/movieService';
import { usePaginationStore } from '@/stores/usePaginationStore';
import BrowseCollection, { CatalogTitle } from './BrowseCollection';

export default function ShowsList() {
  const { page } = usePaginationStore();
  const { data, isLoading, isError, refetch } = useQuery<CatalogTitle[]>({ queryKey: ['shows', page], queryFn: () => fetchPopularTvShows(page) });
  return <BrowseCollection titles={data} loading={isLoading} error={isError} shows retry={() => { void refetch(); }} />;
}
