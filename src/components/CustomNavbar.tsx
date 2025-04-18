import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MovieIcon from './MovieIcon';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { useSearchStore } from '@/stores/useSearchStore';
import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMulti } from '@/services/movieService';
import SearchResult from './SearchResult';
import { Search } from '@/lib/types';
import { debounce } from 'lodash';
import EmptySearchResult from './EmptySearchResult';

export default function CustomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const { searchInput, userInput, setSearchInput, setUserInput, setResultsDropdown } =
    useSearchStore();

  const { data: results, isLoading } = useQuery<Search[]>({
    queryKey: ['all', searchInput],
    queryFn: () => searchMulti(searchInput),
  });

  if (isLoading) {
    <p>Loading...</p>;
  }

  const searchDebounce = useCallback(
    debounce(value => setSearchInput(value), 1000),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    searchDebounce(value);
    setUserInput(value);
  };

  const handleNavbarClick = () => {
    setResultsDropdown(false);
    document.title = 'BingeHub';
    navigate('/movies');
  };

  const isMoviePage = /^\/movie\/\d+$/.test(pathname);
  const isShowPage = /^\/show\/\d+$/.test(pathname);

  return (
    <Navbar
      className={`
      ${
        isMoviePage || isShowPage
          ? `bg-gradient-to-b from-gray-900 to-gray-800`
          : `backdrop-filter backdrop-blur-lg bg-opacity-30`
      }
       p-2 border border-b-gray-500 rounded-b-sm`}
    >
      <NavbarBrand>
        <MovieIcon className="w-6 mr-2" />
        <p onClick={handleNavbarClick} className="font-bold text-lg text-white cursor-pointer">
          BingeHub
        </p>
      </NavbarBrand>
      <div className="flex justify-end flex-1">
        <NavbarContent className="gap-4">
          <NavbarItem className="hidden sm:flex">
            <Link
              to={'/movies'}
              className={
                pathname === '/movies'
                  ? `border-b-2 border-white text-white text-sm p-2 `
                  : `text-sm p-2 text-white hover:text-gray-400`
              }
            >
              Movies
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Link
              to={'/shows'}
              className={
                pathname === '/shows'
                  ? `border-b-2 border-white text-white text-sm p-2`
                  : `text-sm p-2 text-white hover:text-gray-400`
              }
            >
              Shows
            </Link>
          </NavbarItem>
          <NavbarItem>
            <div className="flex items-center justify-end rounded-lg w-full">
              <SearchIcon color="white" size="18" className="absolute mr-3" />
              <Input
                className="w-full text-gray-300 bg-gray-500 focus:outline-none focus:ring-1 ring-slate-300"
                type="input"
                placeholder="Search for anything..."
                value={userInput}
                onChange={handleChange}
              />
            </div>
            {userInput.length > 0 && results?.length ? (
              <SearchResult results={results} />
            ) : (
              <EmptySearchResult />
            )}
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
