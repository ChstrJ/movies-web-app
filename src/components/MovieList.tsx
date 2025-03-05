import { fetchPopularMovies, fetchPopularTvShows, fetchTopRatedMovies, searchMovies } from "@/services/movieService";
import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { Input } from "./ui/input";

const MovieList = () => {
    const [state, setState] = useState({
        page: 5,
        search: '',
        submittedSearch: '',
    });

    const { data: movies, error, isLoading } = useQuery({
        queryKey: ['movies', state.submittedSearch, state.page],
        queryFn: state.submittedSearch
            ? () => searchMovies(state.submittedSearch, state.page)
            : () => fetchPopularMovies(state.page)
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setState((prevState) => ({ ...prevState, submittedSearch: prevState.search }))
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-col">
            <div className="border border-red-500 items-center flex justify-end">
                <form onSubmit={handleSubmit}>
                    <Input
                        className="m-2 w-42"
                        type="text"
                        placeholder="Search for movies..."
                        value={state.search}
                        onChange={(e) => setState({ ...state, search: e.target.value })}
                    />
                </form>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-6">
                {movies.map((movie) => (
                    (movie.poster_path && movie.id) &&
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <MovieCard img={movie.poster_path} title={movie.title} />
                    </Link>

                ))}
            </div>

            <div className="flex justify-center items-center border border-red-500">
                <h1>Pagination</h1>
            </div>

        </div>
    )

}

export default MovieList;
