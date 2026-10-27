import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Command, CommandInput, CommandItem, CommandList } from './ui/command';
import { useSearchStore } from '@/stores/useSearchStore';
import { useQuery } from '@tanstack/react-query';
import { searchMulti } from '@/services/movieService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImagePath } from '@/lib/utils';
import { useGeneralStore } from '@/stores/useGeneralStore';
import { SearchResult } from '@/lib/types';

export default function CommandPopover({ open }: { open: boolean }) {
  const { setResultsDropdown } = useSearchStore();
  const { setDocumentTitle, setShowBackdropImage, setSelectedServer } = useGeneralStore();
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => { const timer = window.setTimeout(() => setQuery(input.trim()), 300); return () => window.clearTimeout(timer); }, [input]);
  const { data, isFetching, isError } = useQuery<SearchResult[]>({ queryKey: ['search', query], queryFn: () => searchMulti(query), enabled: open && query.length > 0 });
  const results = data?.filter(result => result.poster_path && (result.media_type === 'movie' || result.media_type === 'tv'));
  const select = (result: SearchResult) => {
    setResultsDropdown(false); setDocumentTitle(result.title || result.name || 'BingeHub');
    setShowBackdropImage(true); setSelectedServer(null); setInput(''); setQuery('');
    navigate(`/${result.media_type === 'tv' ? 'show' : 'movie'}/${result.id}`);
  };
  return <Dialog open={open} onOpenChange={setResultsDropdown}><DialogContent className="search-dialog">
    <DialogTitle>Find your next favorite</DialogTitle><DialogDescription>Search the world of movies and shows.</DialogDescription>
    <Command shouldFilter={false} className="bg-transparent"><CommandInput value={input} onValueChange={setInput} placeholder="Search movies & shows…" aria-label="Search movies and shows" />
      <CommandList className="max-h-[min(55svh,480px)]">
        {!query && <p className="search-message">Every great story starts somewhere. Search for a title.</p>}
        {isFetching && <p className="search-message" role="status">Finding stories…</p>}
        {isError && <p className="search-message" role="alert">Search is unavailable right now. Please try again.</p>}
        {query && !isFetching && !isError && results?.length === 0 && <p className="search-message">No titles found. Try another search.</p>}
        {!isFetching && query && results?.map(result => <CommandItem key={`${result.media_type}-${result.id}`} value={`${result.media_type}-${result.id}`} onSelect={() => select(result)} className="search-result"><img src={`${getImagePath()}/w92/${result.poster_path}`} alt="" /><div><span>{result.title || result.name}</span><small>{result.media_type === 'tv' ? 'Series' : 'Movie'} · {(result.release_date || result.first_air_date)?.slice(0, 4) || 'Release date unavailable'}</small></div></CommandItem>)}
      </CommandList>
    </Command>
  </DialogContent></Dialog>;
}
