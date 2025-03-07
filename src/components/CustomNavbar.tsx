import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Link } from "react-router-dom";
import MovieIcon from "./MovieIcon";

export default function CustomNavbar() {
  return (
    <Navbar className="backdrop-filter backdrop-blur-lg bg-opacity-30 p-2 border border-b-gray-700 rounded-b-lg">
      <NavbarBrand>
        <MovieIcon className="w-6 mr-2" />
        <p className="font-bold text-xl text-white">Netpleks & Chill</p>
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
        {/* <NavbarItem className="hidden sm:flex">
          <Input
            className="lg:w-2/12 w-full pl-10 lg:pl-4 lg:pr-10"
            type="search"
            placeholder="Search for movies..."
            value={''}
          />
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
