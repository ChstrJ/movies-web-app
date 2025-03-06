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

      <header className="flex sticky w-full border border-b justify-between p-4">
        <nav className="items-center flex">
          <h1>Icon</h1>
        </nav>

        <nav className="flex justify-center space-x-12">
          <Link to={'/movies'} className="text-black hover:text-gray-300">Movies</Link>
          <Link to={'/shows'} className="text-black hover:text-gray-300">Shows</Link>
        </nav>
      </header>


      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Footer */}
    </div>
  );
};

export default MainLayout;
