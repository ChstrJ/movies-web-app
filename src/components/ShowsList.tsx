import { useQuery } from '@tanstack/react-query';
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { fetchPopularTvShows } from '@/services/movieService';
import { TMDB } from '@/lib/types';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Command, CommandItem, CommandList } from './ui/command';

const ShowsList = () => {
  const [state, setState] = useState({
    page: 5,
    searchInput: ''
  });

  const { data: shows, isLoading } = useQuery<TMDB[] | undefined>({
    queryKey: ['shows'],
    queryFn: () => fetchPopularTvShows(state.page)
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchInput: e.target.value })
  }

  return (

    <div className='flex flex-col'>
      <div className="flex items-center justify-end backdrop-blur-sm bg-background/30 rounded-md m-2">
        <SearchIcon color="white" className="absolute left-4 h-4 w-4 lg:left-auto lg:right-4" />
        <Input
          className="lg:w-2/12 w-full pl-10 lg:pl-4 lg:pr-10 text-white bg-gray-500 focus:outline-none focus:ring-1 ring-slate-300"
          type="search"
          placeholder="Search for shows..."
          value={state.searchInput}
          onChange={handleChange}
        />

        {state.searchInput &&
          <div>
            <Command className='rounded-lg border shadow-md'>
              <CommandList>
                <CommandItem>
                  <span>Test</span>
                </CommandItem>
              </CommandList>
            </Command>
          </div>
        }
      </div>


      <div className="grid grid-cols-3 lg:grid-cols-6">
        {shows?.map((show) => (
          (show.poster_path && show.id) &&
          <Link to={`/shows/${show.id}`} key={show.id}>
            <MovieCard img={show.poster_path} title={show.title} />
          </Link>
        ))}
      </div>

    </div>

  )

}

export default ShowsList;
