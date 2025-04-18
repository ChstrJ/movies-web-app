import { fetchPopularMovies } from '@/services/movieService';
import { useQuery } from '@tanstack/react-query';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import { TMDB } from '@/lib/types';
import { usePaginationStore } from '@/stores/usePaginationStore';
import { useGeneralStore } from '@/stores/useGeneralStore.ts';

const MovieList = () => {
  const { page } = usePaginationStore();
  const { setDocumentTitle } = useGeneralStore();

  const { data: movies, isLoading } = useQuery<TMDB[]>({
    queryKey: ['movies', page],
    queryFn: () => fetchPopularMovies(page),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6">
      {movies?.map(
        movie =>
          movie.poster_path &&
          movie.id && (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              onClick={() => setDocumentTitle(movie.title ?? '')}
            >
              <MovieCard img={movie.poster_path} title={movie.title} />
            </Link>
          )
      )}
    </div>
  );
};

export default MovieList;
