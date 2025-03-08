import { MainLayoutProps } from "@/lib/types";
import CustomNavbar from "@/components/CustomNavbar";
import { Navigate, useLocation } from "react-router-dom";
import { CustomPagination } from "@/components/CustomPagination";
import { useEffect } from "react";
import { useSearchStore } from "@/stores/useSearchStore";

const MainLayout = ({ children }: MainLayoutProps) => {
  const { setResultsDropdown, setSearchInput } = useSearchStore();

  const location = useLocation();
  const { pathname } = location;

  if (pathname === '/') {
    return <Navigate to={'/movies'} />
  }

  useEffect(() => {
    setSearchInput('');
    setResultsDropdown(true);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col antialiased bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="sticky top-0 z-50">
        <CustomNavbar />
      </div>
      <main className="flex-1">
        {children}
      </main>

      {['/movies', '/shows'].includes(location.pathname) &&
        <div className="flex justify-center items-center m-1">
          <CustomPagination />
        </div>
      }
    </div>
  );
};

export default MainLayout;
