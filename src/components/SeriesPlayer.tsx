import { useShowStore } from "@/stores/useShowStore";
import { Button } from "./ui/button";
import { useEpisodes } from "@/hooks/useEpisodes";
import Loader from "./Loader";

type Season = {
  season_number: number;
  show_id: number;
}

type SeriesPlayerProps = {
  id: number | string | undefined;
  seasons: Season[];
}


export default function SeriesPlayer({ id, seasons }: SeriesPlayerProps) {

  const { selectedSeason, selectedEpisode, setSelectedSeason, setSelectedEpisode } = useShowStore();
  const { data: episodes, isLoading } = useEpisodes(id, selectedSeason);
  console.log(episodes)

  return (
    <div className="flex flex-col text-white w-full mb-4 mt-4">
      {isLoading && <Loader />}
      <div className="flex gap-4">
        Seasons: {seasons
          .filter((item) => item.season_number != 0)
          .map((item) => (
            <Button
              onClick={() => setSelectedSeason(item.season_number)}
              key={item.season_number}
              className={`${selectedSeason === item.season_number && 'bg-black'} cursor-pointer`}
            >{item.season_number}</Button>
          ))}
      </div>
      <div className="flex gap-4 mt-4">
        Episodes: {episodes.map((item: any) => (
          <Button
            onClick={() => setSelectedEpisode(item.episode_number)}
            className={`${selectedEpisode === item.episode_number && 'bg-black'} cursor-pointer`}
          >
            {item.episode_number}
          </Button>
        ))}
      </div>
    </div>
  )
}
