import { Film, Search, Tv } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useSearchStore } from '@/stores/useSearchStore';
import CommandPopover from './CommandPopover';

export default function CustomNavbar() {
  const { resultsDropdown, setResultsDropdown } = useSearchStore();
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Link to="/movies" className="wordmark" aria-label="BingeHub home">binge<span>hub</span><i aria-hidden="true" /></Link>
    <nav className="primary-nav" aria-label="Main navigation">
      <NavLink to="/movies" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Film size={17} />Movies</NavLink>
      <NavLink to="/shows" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Tv size={18} />Shows</NavLink>
    </nav>
    <button className="search-trigger" onClick={() => setResultsDropdown(true)} aria-label="Search movies and shows"><Search size={19} /><span>Search movies & shows</span></button>
    <CommandPopover open={resultsDropdown} />
  </header>;
}
