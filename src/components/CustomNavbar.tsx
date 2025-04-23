import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MovieIcon from './MovieIcon';
import { SearchIcon } from 'lucide-react';
import { useSearchStore } from '@/stores/useSearchStore';
import CommandPopover from './CommandPopover';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useGeneralStore } from '@/stores/useGeneralStore';
import CustomDrawer from './CustomDrawer';

export default function CustomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const { setResultsDropdown, resultsDropdown } = useSearchStore();
  const { showDrawer, setShowDrawer } = useGeneralStore();

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
      ${isMoviePage || isShowPage
          ? `bg-gradient-to-b from-gray-900 to-gray-800`
          : `backdrop-filter backdrop-blur-lg bg-opacity-30`
        }
       p-2 border border-b-gray-500 rounded-b-sm`}
    >
      <Menu
        className='fixed text-white cursor-pointer sm:hidden w-6 h-6'
        onClick={() => setShowDrawer(true)}
      />

      {showDrawer && (
        <CustomDrawer open={showDrawer} />
      )}
      <NavbarBrand
        className='cursor-pointer'
        onClick={handleNavbarClick}>
        <MovieIcon className="w-6 mr-2 hidden sm:flex" />
        <p className="font-bold text-sm md:text-lg text-white ml-8 md:ml-0">
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
              <Button
                onClick={() => setResultsDropdown(true)}
                className="w-full text-gray-300 bg-gray-500 focus:outline-none focus:ring-1 ring-slate-300 cursor-pointer pr-10"
              >
                Search for anything...
              </Button>
              <CommandPopover
                open={resultsDropdown}
              />
            </div>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
