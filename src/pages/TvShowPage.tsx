import { getVideoPath } from "@/lib/utils";
import { findSeriesById } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const TvShowPage = () => {
  const { id } = useParams();
  const basePath = getVideoPath();
  const showUrl = `${basePath}/tv/${id}`;

  const { data: result, isLoading } = useQuery({
    queryKey: ['showDetails', id],
    queryFn: () => findSeriesById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <p className='text-white'>Loading...</p>
  };

  return (
    <div className="h-screen p-2 overflow-hidden">
      <div className='flex flex-col'>
        {/* <div className='flex flex-row'>
          <p>Server</p>
        </div> */}
        <div className='w-full h-[750px] relative overflow-auto'>
          <iframe src={showUrl} width="100%" height="100%" allowFullScreen></iframe>
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

export default TvShowPage;
