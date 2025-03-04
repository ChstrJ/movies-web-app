import { fetchPopularMovies, fetchTopRatedMovies, searchMovies } from "@/services/movieService";
import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const MovieList = () => {
    const [page, setPage] = useState(1);

    const { data: movies, error, isLoading } = useQuery({
        queryKey: ['movies'],
        queryFn: () => searchMovies('sonic', page)
    })

    console.log(movies)
    console.log(error)

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="grid grid-cols-6">
            {movies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <MovieCard img={movie.poster_path} title={movie.title} />
                </Link>
            ))}
        </div>
    )

}

export default MovieList;