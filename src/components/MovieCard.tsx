import { getImagePath } from '@/lib/utils';
import { Play } from 'lucide-react';

type MovieCardProps = { img?: string; title?: string; year?: string; rating?: number };
export default function MovieCard({ img, title = 'Untitled', year, rating }: MovieCardProps) {
  return <article className="movie-card"><div className="poster-wrap">
    <img src={`${getImagePath()}/w500/${img}`} alt={title} loading="lazy" />
    {rating != null && rating > 0 && <span className="poster-rating">★ {rating.toFixed(1)}</span>}
    <div className="poster-overlay"><span className="poster-play"><Play size={21} fill="currentColor" /></span><span>Explore title</span></div>
  </div><h3>{title}</h3><p>{year || 'Discover more'}</p></article>;
}
