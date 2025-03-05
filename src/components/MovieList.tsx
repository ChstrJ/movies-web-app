import { fetchPopularMovies, searchMovies } from "@/services/movieService";
import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { Input } from "./ui/input";
import { debounce } from 'lodash';
import { Search } from 'lucide-react';
import { TMDB } from "@/lib/types";

const MovieList = () => {
    const [state, setState] = useState({
        page: 5,
        search: '',
        searchInput: '',
    });

    const { data: movies, isLoading } = useQuery<TMDB[] | undefined>({
        queryKey: ['movies', state.search, state.page],
        queryFn: state.search
            ? () => searchMovies(state.search, state.page)
            : () => fetchPopularMovies(state.page)
    })

    const searchDebounce = useCallback(
        debounce((value) => setState((prevState) => ({ ...prevState, search: value })), 1000),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        searchDebounce(value);
        setState({ ...state, searchInput: value });
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex flex-col">
            <div className="relative flex items-center">
                <Search className="absolute ml-4" color="grey" />
                <Input
                    className="pl-10 m-2"
                    type="text"
                    placeholder="Search for movies..."
                    value={state.searchInput}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-6">
                {movies?.map((movie) => (
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
