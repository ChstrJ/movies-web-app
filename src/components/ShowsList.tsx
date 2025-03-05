import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { fetchPopularTvShows } from '@/services/movieService';
import { TMDB } from '@/lib/types';

const ShowsList = () => {
  const [state] = useState({
    page: 5
  });

  const { data: shows, isLoading } = useQuery<TMDB[]>({
    queryKey: ['shows'],
    queryFn: () => fetchPopularTvShows(state.page)
  })

  console.log(shows);


  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6">
      {shows.map((show) => (
        (show.poster_path && show.id) &&
        <Link to={`/shows/${show.id}`} key={show.id}>
          <MovieCard img={show.poster_path} title={show.title} />
        </Link>
      ))}
    </div>
  )

}

export default ShowsList;
