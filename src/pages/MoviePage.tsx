import { getBackdropImage, getMovieUrl } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { findMovieById, getVideoTrailer } from '@/services/movieService';
import CustomTab from '@/components/CustomTab';
import { useGeneralStore } from '@/stores/useGeneralStore';
import { Play } from "lucide-react";

const MoviePage = () => {
  const { id } = useParams();
  const movieUrl = getMovieUrl(id);

  const { selectedServer, showBackdropImage, setShowBackdropImage } = useGeneralStore();

  const { data: result, isLoading } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => findMovieById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const { data: trailer } = useQuery({
    queryKey: ['trailer', id],
    queryFn: () => getVideoTrailer(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const backdropImage = result ? getBackdropImage(result.backdrop_path) : null;

  const servers = [
    {
      serverName: 'Trailer',
      serverUrl: trailer ?? ''
    },
    {
      serverName: 'Server 1',
      serverUrl: movieUrl
    },
    {
      serverName: 'Server 2',
      serverUrl: 'movie/123'
    }

  ]

  if (isLoading) {
    return <p className='text-white'>Loading...</p>
  };

  return (
    <div className="h-screen p-2 overflow-hidden">
      <div className='flex flex-col'>
        <div className='w-full h-[750px] relative overflow-auto'>
          {showBackdropImage && backdropImage ? (
            <div
              className='relative w-full h-full group cursor-pointer'
              onClick={() => setShowBackdropImage(false)}
            >
              <img
                className='w-full h-full object-cover'
                src={backdropImage}
                alt='Backdrop'
              />
              <div className='absolute inset-0 bg-black/50 flex items-center justify-center duration-300'>
                <Play className='text-white text-6xl' />
              </div>
            </div>
          ) : (
            <iframe src={selectedServer ?? movieUrl} width="100%" height="100%" allowFullScreen></iframe>
          )}
        </div>
        <div className='pt-2'>
          <CustomTab data={servers} />
        </div>
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
