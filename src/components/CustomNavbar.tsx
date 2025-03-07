import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Link } from "react-router-dom";
import MovieIcon from "./MovieIcon";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useSearchStore } from "@/stores/useSearchStore";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMulti } from "@/services/movieService";
import SearchResult from "./SearchResult";
import { Search } from "@/lib/types";
import { debounce } from "lodash";


export default function CustomNavbar() {
  const { searchInput, userInput, setSearchInput, setUserInput } = useSearchStore();

  const { data: results, isLoading } = useQuery<Search[]>({
    queryKey: ['all', searchInput],
    queryFn: () => searchMulti(searchInput)
  })

  if (isLoading) {
    <p>Loading...</p>
  }

  const searchDebounce = useCallback(
    debounce((value) => setSearchInput(value), 1000),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    searchDebounce(e.target.value);
    setUserInput(e.target.value);
  }

  return (
    <Navbar className="backdrop-filter backdrop-blur-lg bg-opacity-30 p-2 border border-b-gray-700 rounded-b-lg">
      <NavbarBrand>
        <MovieIcon className="w-6 mr-2" />
        <p className="font-bold text-lg text-white">Netpleks & Chill</p>
      </NavbarBrand>
      <NavbarContent className="gap-4" justify="center">
        <NavbarItem className="hidden sm:flex">
          <Link
            to={"/movies"}
            className="text-sm p-2 text-white hover:text-gray-400 duration-300 ease-in-out"
          >
            Movies
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link
            to={"/shows"}
            className="text-sm p-2 text-white rounded-md hover:text-gray-400 duration-200 ease-in-out"
          >
            Shows
          </Link>
        </NavbarItem>
        <NavbarItem>
          <div className="flex items-center justify-end rounded-lg w-full">
            <SearchIcon color="white" size="18" className="absolute mr-3" />
            <Input
              className="w-full text-white bg-gray-500 focus:outline-none focus:ring-1 ring-slate-300"
              type="search"
              placeholder="Search for anything..."
              value={userInput}
              onChange={handleChange}
            />
          </div>
          {(searchInput.length > 0 && results?.length) &&
            <SearchResult results={results} />
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
