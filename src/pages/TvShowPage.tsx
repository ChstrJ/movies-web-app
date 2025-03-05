import { fetchPopularTvShows } from "@/services/movieService";
import { useQuery } from "@tanstack/react-query";


const TvShowPage = () => {

  const { data: shows, error, isLoading } = useQuery({
    queryKey: ['shows'],
    queryFn: () => fetchPopularTvShows()
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
    </div>
  )
}

export default TvShowPage;

