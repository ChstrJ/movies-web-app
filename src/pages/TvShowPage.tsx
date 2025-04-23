import Loader from "@/components/Loader";
import SeriesPlayer from "@/components/SeriesPlayer";
import { Button } from "@/components/ui/button";
import { useSeries } from "@/hooks/useSeries";
import { getBackdropImage, getImagePath, getVideoPath } from "@/lib/utils";
import { useGeneralStore } from "@/stores/useGeneralStore";
import { useShowStore } from "@/stores/useShowStore";
import { Play } from "lucide-react";
import { useParams } from "react-router-dom";

const TvShowPage = () => {
  const { id } = useParams();
  const basePath = getVideoPath();
  const showUrl = `${basePath}/tv/${id}`;
  const src = getImagePath();

  const { showBackdropImage, setShowBackdropImage } = useGeneralStore();
  const { selectedSeason, selectedEpisode } = useShowStore();

  const { data: series, isLoading } = useSeries(id);

  const backdropImage = series ? getBackdropImage(series.backdrop_path) : null;

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
            <iframe src={showUrl} width="100%" height="100%" allowFullScreen></iframe>
          )}
        </div>
        {series && (
          <div className='flex flex-col p-2'>
            <SeriesPlayer id={id} seasons={series.seasons} />
            <div className='flex flex-row'>
              <img
                src={`${src}/w154/${series.poster_path}`}
                alt={series.title || series.name}
              />
              <div className='ml-4 flex flex-col text-white'>
                <h1 className='text-2xl font-bold text-white'>{series?.title || series?.name}</h1>
                <p className='text-white text-xs mb-2 mt-2'>
                  Rating:
                </p>
                <p className='text-xs'>
                  Genre:
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
