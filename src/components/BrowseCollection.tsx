import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { getImagePath } from '@/lib/utils';
import { useGeneralStore } from '@/stores/useGeneralStore';
import MovieCard from './MovieCard';

export type CatalogTitle = {
  id: number; title?: string; name?: string; poster_path?: string; backdrop_path?: string;
  overview?: string; release_date?: string; first_air_date?: string; vote_average?: number;
};
type Props = { titles?: CatalogTitle[]; loading: boolean; error?: boolean; shows?: boolean; retry: () => void };

export default function BrowseCollection({ titles = [], loading, error, shows = false, retry }: Props) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const { setDocumentTitle, setShowBackdropImage, setSelectedServer } = useGeneralStore();
  const collection = titles.filter(title => title.poster_path && title.id);
  const featured = collection.filter(title => title.backdrop_path).slice(0, 5);
  const currentIndex = featuredIndex % (featured.length || 1);
  const current = featured[currentIndex];
  const name = current?.title || current?.name;
  const type = shows ? 'show' : 'movie';
  const prepare = (title: CatalogTitle) => {
    setDocumentTitle(title.title || title.name || 'BingeHub');
    setShowBackdropImage(true);
    setSelectedServer(null);
  };
  if (loading) return <div className="catalog-loading" role="status" aria-label="Loading titles"><div className="hero-skeleton" /><div className="poster-grid">{Array.from({ length: 6 }, (_, i) => <div key={i} className="poster-skeleton" />)}</div></div>;
  if (error || !collection.length) return <div className="catalog-empty"><span className="eyebrow">THE NEXT GREAT STORY AWAITS</span><h1>{error ? 'A brief intermission.' : 'No titles just yet.'}</h1><p>{error ? 'We couldn’t load the collection. Give it another try.' : 'Check back soon for more to explore.'}</p><button className="button-primary" onClick={retry}>Try again</button></div>;
  return <div className="browse-page">
    {current && <section className="featured-hero" aria-label="Featured titles">
      <img className="hero-art" src={`${getImagePath()}/original/${current.backdrop_path}`} alt="" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content"><span className="eyebrow"><span className="live-dot" />THE SPOTLIGHT</span><h1>{name}</h1>
        <div className="hero-meta"><span>{shows ? 'SERIES' : 'MOVIE'}</span><span>{(current.release_date || current.first_air_date)?.slice(0, 4)}</span>{!!current.vote_average && <span>★ {current.vote_average.toFixed(1)} / 10</span>}</div>
        <p className="hero-description">{current.overview || 'Discover a story worth getting lost in. Your next favorite is waiting.'}</p>
        <div className="hero-actions"><Link className="button-primary" to={`/${type}/${current.id}`} onClick={() => prepare(current)}><Play size={18} fill="currentColor" />Explore {shows ? 'series' : 'movie'}</Link><a className="button-secondary" href="#collection"><ArrowDown size={18} />Browse collection</a></div>
      </div>
      <div className="hero-bottom"><span className="hero-caption">GREAT STORIES. ALL IN ONE PLACE.</span><div className="hero-controls"><div className="hero-dots">{featured.map((title, index) => <button key={title.id} className={index === currentIndex ? 'selected' : ''} onClick={() => setFeaturedIndex(index)} aria-label={`Feature ${title.title || title.name}`} aria-pressed={index === currentIndex} />)}</div><button className="circle-button" onClick={() => setFeaturedIndex((currentIndex - 1 + featured.length) % featured.length)} aria-label="Previous featured title"><ChevronLeft size={18} /></button><button className="circle-button" onClick={() => setFeaturedIndex((currentIndex + 1) % featured.length)} aria-label="Next featured title"><ChevronRight size={18} /></button></div></div>
    </section>}
    <section className="collection-section" id="collection"><div className="section-heading"><div><span className="eyebrow">YOUR NEXT OBSESSION</span><h2>{shows ? 'Shows worth staying in for' : 'A world of movies'}</h2></div><span className="collection-count">{collection.length} titles to explore<ArrowRight size={16} /></span></div>
      <div className="poster-grid">{collection.map(title => <Link to={`/${type}/${title.id}`} key={title.id} onClick={() => prepare(title)}><MovieCard img={title.poster_path} title={title.title || title.name} year={(title.release_date || title.first_air_date)?.slice(0, 4)} rating={title.vote_average} /></Link>)}</div>
    </section>
  </div>;
}
