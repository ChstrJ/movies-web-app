import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { fetchPopularTvShows } from '@/services/movieService';
import { TMDB } from '@/lib/types';
import { usePaginationStore } from '@/stores/usePaginationStore';

const ShowsList = () => {
  const { page } = usePaginationStore();

  const { data: shows, isLoading } = useQuery<TMDB[] | undefined>({
    queryKey: ['shows'],
    queryFn: () => fetchPopularTvShows(page)
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (

    <div className='flex flex-col'>
      <div className="grid grid-cols-3 lg:grid-cols-6">
        {shows?.map((show) => (
          (show.poster_path && show.id) &&
          <Link to={`/show/${show.id}`} key={show.id}>
            <MovieCard img={show.poster_path} title={show.title} />
          </Link>
        ))}
      </div>

    </div>

  )

}

export default ShowsList;
