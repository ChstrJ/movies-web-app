import { fetchPopularMovies } from '@/services/movieService';
import { useQuery } from '@tanstack/react-query';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import { usePaginationStore } from '@/stores/usePaginationStore';
import { useGeneralStore } from '@/stores/useGeneralStore.ts';
import { SearchResult } from '@/lib/types';
import { useSearchStore } from '@/stores/useSearchStore';
import { cn } from '@/lib/utils';

const MovieList = () => {
  const { page } = usePaginationStore();
  const { resultsDropdown } = useSearchStore();
  const { setDocumentTitle, setSelectedResult } = useGeneralStore();

  const { data: movies, isLoading } = useQuery<SearchResult[]>({
    queryKey: ['movies', page],
    queryFn: () => fetchPopularMovies(page),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={cn(
      'grid grid-cols-3 lg:grid-cols-6 transition-all duration-300',
      resultsDropdown && 'blur-md bg-black/40 pointer-events-none cursor-not-allowed'
    )}>
      {movies?.map(
        movie =>
          movie.poster_path &&
          movie.id && (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              onClick={() => {
                setDocumentTitle(movie.title ?? '')
                setSelectedResult(movie)
              }}
            >
              <MovieCard img={movie.poster_path} title={movie.title} />
            </Link>
          )
      )}
    </div>
  );
};

export default MovieList;
