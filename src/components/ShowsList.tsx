import { fetchPopularMovies, fetchPopularTvShows, fetchTopRatedMovies, searchMovies } from "@/services/movieService";
import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const ShowsList = () => {
  const [state, setState] = useState({
    page: 5
  });

  const { data: shows, error, isLoading } = useQuery({
    queryKey: ['shows'],
    queryFn: () => fetchPopularTvShows(state.page)
  })


  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6">
      {shows.map((show) => (
        <Link to={`/shows/${show.id}`} key={show.id}>
          <MovieCard img={show.poster_path} title={show.title} />
        </Link>
      ))}
    </div>
  )

}

export default ShowsList;
