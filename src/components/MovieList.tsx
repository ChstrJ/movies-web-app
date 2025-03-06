import { fetchPopularMovies, searchMovies } from "@/services/movieService";
import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { debounce } from 'lodash';
import { SearchIcon } from 'lucide-react';
import { TMDB } from "@/lib/types";
import { Input } from "./ui/input";

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
            <div className="relative flex items-center justify-end backdrop-blur-sm bg-background/30 rounded-md m-2">
                <SearchIcon color="white" className="absolute left-4 h-4 w-4 lg:left-auto lg:right-4" />
                <Input
                    className="lg:w-2/12 w-full pl-10 lg:pl-4 lg:pr-10 text-white"
                    type="search"
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

           
        </div>
    )

}

export default MovieList;
