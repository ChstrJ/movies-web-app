import Loader from "@/components/Loader";
import { useSeries } from "@/hooks/useSeries";
import { getBackdropImage, getVideoPath } from "@/lib/utils";
import { useGeneralStore } from "@/stores/useGeneralStore";
import { Play } from "lucide-react";
import { useParams } from "react-router-dom";

const TvShowPage = () => {
  const { id } = useParams();
  const basePath = getVideoPath();
  const showUrl = `${basePath}/tv/${id}`;

  const { showBackdropImage, setShowBackdropImage } = useGeneralStore();
  const { data: series, isLoading } = useSeries(id);
  console.log(series)

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
          <div className='pt-2'>
            <h1 className='text-2xl font-bold text-white'>{series?.title || series?.name}
            </h1>
            <p className='text-gray-400'>{series?.overview}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TvShowPage;
