import { getMovieUrl } from '@/lib/utils';
import { useSearchStore } from '@/stores/useSearchStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGeneralStore } from '@/stores/useGeneralStore.ts';

const MoviePage = () => {
  const { setResultsDropdown } = useSearchStore();
  const { documentTitle } = useGeneralStore();
  const { id } = useParams();
  const movieUrl = getMovieUrl(id);

  useEffect(() => {
    setResultsDropdown(false);

    document.title = `BingeHub - ${documentTitle}`;
  }, []);

  return (
    <div className="h-screen">
      <iframe src={movieUrl} width="100%" height="100%" allowFullScreen></iframe>
    </div>
  );
};

export default MoviePage;
