import { fetchPopularMovies, fetchPopularTvShows, fetchTopRatedMovies, searchMovies } from "@/services/movieService";
import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const MovieList = () => {
    const [state, setState] = useState({
        page: 5
    });

    const { data: movies, error, isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: () => fetchPopularMovies(state.page)
    })

    console.log(movies)
    console.log(error)

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="grid grid-cols-3 lg:grid-cols-6">
            {movies.map((movie) => (
                (movie.poster_path && movie.id) &&
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <MovieCard img={movie.poster_path} title={movie.title} />
                </Link>

            ))}
        </div>
    )

}

export default MovieList;
