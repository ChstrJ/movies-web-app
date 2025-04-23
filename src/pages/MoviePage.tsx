import { get2embedUrl, getBackdropImage, getGoDriveUrl, getGomoUrl, getImagePath, getMovieUrl } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useGeneralStore } from '@/stores/useGeneralStore';
import { Play } from "lucide-react";
import { useEffect } from 'react';
import Loader from '@/components/Loader';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { useTrailer } from '@/hooks/useTrailer';
import CustomChip from '@/components/CustomBadge';
import ServerPlayer from '@/components/ServerPlayer';

const MoviePage = () => {
  const { id } = useParams();

  const { selectedServer, setSelectedServer, showBackdropImage, setShowBackdropImage } = useGeneralStore();

  useEffect(() => {
    setSelectedServer(movieUrl)
  }, []);

  const { data: movie, isLoading } = useMovieDetails(id);
  const { data: trailer } = useTrailer(id);

  const goDriveUrl = getGoDriveUrl(movie?.imdb_id);
  const gomoUrl = getGomoUrl(movie?.imdb_id);
  const movieUrl = getMovieUrl(id);
  const twoEmbedUrl = get2embedUrl(id);
  const src = getImagePath();
  const backdropImage = movie ? getBackdropImage(movie.backdrop_path) : null;

  const trailers = [
    {
      serverName: 'Trailer',
      serverUrl: trailer ?? ''
    }
  ]

  const servers = [
    {
      serverName: 'Server 1',
      serverUrl: movieUrl,
      default: true
    },
    {
      serverName: 'Server 2',
      serverUrl: twoEmbedUrl,
    },
    {
      serverName: 'Server 3',
      serverUrl: goDriveUrl,
    },
    {
      serverName: 'Server 4',
      serverUrl: gomoUrl,
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
          <ServerPlayer name='Trailers: ' data={trailers} />
        </div>
        <div className='pt-2'>
          <ServerPlayer name='Servers: ' data={servers} />
        </div>

        {movie && (
          <div className='flex flex-col p-2'>
            <div className='flex flex-row'>
              <img
                src={`${src}/w154/${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
              <div className='ml-4 flex flex-col text-white'>
                <h1 className='text-2xl font-bold text-white'>{movie?.title || movie?.name}</h1>
                <p className='text-white text-xs mb-2 mt-2'>
                  Rating: <CustomChip data={`${parseInt(movie?.vote_average)} / 10`
                  } />
                </p>
                <p className='text-xs'>
                  Genres: <CustomChip data={movie.genres} />
                </p>
                <p className='text-gray-400 mt-2'>{movie?.overview}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
