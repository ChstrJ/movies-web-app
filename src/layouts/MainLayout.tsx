import { MainLayoutProps } from "@/lib/types";
import { Link, useLocation, Navigate } from "react-router-dom";

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  if (location.pathname === '/') {
    return <Navigate to={'/movies'} />
  }

  return (
    <div className="h-screen flex flex-col antialiased">
      {/* Header */}
      <header className="flex justify-around border border-red-500">
        <nav className="sticky top-0 z-50 space-x-12 m-2">
          <Link to={'/movies'} className="text-white hover:text-gray-300">Movies</Link>
          <Link to={'/shows'} className="text-white hover:text-gray-300">Shows</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-white overflow-auto">
        {children}
      </main>

      {/* Footer */}
    </div>
  );
};

export default MainLayout;
