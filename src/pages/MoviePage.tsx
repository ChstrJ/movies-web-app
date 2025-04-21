import { getMovieUrl } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { findMovieById } from '@/services/movieService';
import CustomTab from '@/components/CustomTab';

const MoviePage = () => {
  const { id } = useParams();
  const movieUrl = getMovieUrl(id);

  const { data: result, isLoading } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => findMovieById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <p className='text-white'>Loading...</p>
  };

  return (
    <div className="h-screen p-2 overflow-hidden">
      <div className='flex flex-col'>
        <div className='w-full h-[750px] relative overflow-auto'>
          <iframe src={movieUrl} width="100%" height="100%" allowFullScreen></iframe>
        </div>
        <CustomTab />
        {result && (
          <div className='pt-2'>
            <h1 className='text-2xl font-bold text-white'>{result?.title || result?.name}
            </h1>
            <p className='text-gray-400'>{result?.overview}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
