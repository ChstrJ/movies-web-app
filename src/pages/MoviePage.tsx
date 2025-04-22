import { get2embedUrl, getBackdropImage, getImagePath, getMovieUrl } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { findMovieById, getVideoTrailer } from '@/services/movieService';
import CustomTab from '@/components/CustomTab';
import { useGeneralStore } from '@/stores/useGeneralStore';
import { Play } from "lucide-react";
import { useEffect } from 'react';
import Loader from '@/components/Loader';

const MoviePage = () => {
  const { id } = useParams();
  const movieUrl = getMovieUrl(id);
  const twoEmbedUrl = get2embedUrl(id);
  const src = getImagePath();

  const { selectedServer, setSelectedServer, showBackdropImage, setShowBackdropImage } = useGeneralStore();

  useEffect(() => {
    setSelectedServer(movieUrl)
  }, []);

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
    refetchOnWindowFocus: false
  });

  const backdropImage = result ? getBackdropImage(result.backdrop_path) : null;

  const servers = [
    {
      serverName: 'Trailer',
      serverUrl: trailer ?? ''
    },
    {
      serverName: 'Server 1',
      serverUrl: movieUrl,
      default: true
    },
    {
      serverName: 'Server 2',
      serverUrl: twoEmbedUrl,

    }
  ]

  return (
    <div className="min-h-screen p-2 overflow-hidden">
      <div className='flex flex-col'>
        {isLoading && <Loader />}
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
          <div className='flex flex-col p-2'>
            <div className='flex flex-row'>
              <img
                src={`${src}/w154/${result.poster_path}`}
                alt={result.title || result.name}
              />
              <div className='ml-4 flex flex-col'>
                <h1 className='text-2xl font-bold text-white'>{result?.title || result?.name}
                </h1>
                <p className='text-gray-400 mt-2'>{result?.overview}</p>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
