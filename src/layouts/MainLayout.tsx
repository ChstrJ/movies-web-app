import CustomNavbar from '@/components/CustomNavbar';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { CustomPagination } from '@/components/CustomPagination';

export default function MainLayout() {
  const { pathname } = useLocation();
  if (pathname === '/') return <Navigate to="/movies" replace />;
  return <div className="app-shell"><CustomNavbar /><main id="main-content"><Outlet /></main>
    {['/movies', '/shows'].includes(pathname) && <CustomPagination />}
    <footer className="site-footer"><span className="footer-brand">binge<span>hub</span></span><span>Made with ❤️ by Chester</span></footer>
  </div>;
}
