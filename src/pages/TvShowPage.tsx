import CustomChip from "@/components/CustomBadge";
import Loader from "@/components/Loader";
import SeriesPlayer from "@/components/SeriesPlayer";
import { useSeries } from "@/hooks/useSeries";
import { getBackdropImage, getImagePath, getShowUrl } from "@/lib/utils";
import { useGeneralStore } from "@/stores/useGeneralStore";
import { useShowStore } from "@/stores/useShowStore";
import { Play } from "lucide-react";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const TvShowPage = () => {
  const { id } = useParams();
  //const basePath = getVideoPath();
  const src = getImagePath();

  const { showBackdropImage, setShowBackdropImage } = useGeneralStore();
  const { selectedSeason, selectedEpisode } = useShowStore();
  const { data: series, isLoading } = useSeries(id);

  useEffect(() => { setShowBackdropImage(true); }, [id, setShowBackdropImage]);

  const showUrl = getShowUrl(id, selectedSeason, selectedEpisode)

  const backdropImage = series ? getBackdropImage(series.backdrop_path) : null;

  if (isLoading) return <Loader />;

  return (
    <div className="detail-page">
      <div className='flex flex-col'>
        {isLoading && <Loader />}
        <div className='playback-frame'>
          {showBackdropImage && backdropImage ? (
            <button
              className='backdrop-button'
              aria-label='Start playback'
              onClick={() => setShowBackdropImage(false)}
            >
              <img
                className='w-full h-full object-cover'
                src={backdropImage}
                alt='Backdrop'
              />
              <div className='playback-overlay'>
                <Play fill='currentColor' /><span>Start watching</span>
              </div>
            </button>
          ) : (
            <iframe title="Video player" src={showUrl} width="100%" height="100%" allowFullScreen></iframe>
          )}
        </div>
        {series && (
          <div className='flex flex-col p-2'>
            <SeriesPlayer id={id} seasons={series.seasons} />
            <div className='title-details'>
              <img
                src={`${src}/w154/${series.poster_path}`}
                alt={series.title || series.name}
              />
              <div className='ml-4 flex flex-col text-white'>
                <h1 className='text-2xl font-bold text-white'>{series?.title || series?.name}</h1>
                <p className='text-white text-xs mb-2 mt-2'>
                  Rating: <CustomChip data={`${parseInt(series?.vote_average)} / 10`
                  } />
                </p>
                <p className='text-xs'>
                  Genres: <CustomChip data={series.genres} />
                </p>

                <p className='text-gray-400 mt-2'>{series?.overview}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TvShowPage;
