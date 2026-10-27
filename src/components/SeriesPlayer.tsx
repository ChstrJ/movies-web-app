import { useShowStore } from "@/stores/useShowStore";
import { Button } from "./ui/button";
import { useEpisodes } from "@/hooks/useEpisodes";
import Loader from "./Loader";
import { cn } from "@/lib/utils";

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

  return (
    <div className="flex flex-col text-white w-full mb-4 mt-4">
      {/* Seasons Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        <p className="col-span-full font-semibold">Seasons:</p>
        {seasons
          .filter((item) => item.season_number !== 0)
          .map((item) => (
            <Button
              key={item.season_number}
              aria-label={`Season ${item.season_number}`}
              aria-pressed={item.season_number === selectedSeason}
              onClick={() => { setSelectedSeason(item.season_number); setSelectedEpisode(1); }}
              className={cn(`player-option ${item.season_number === selectedSeason && 'bg-sky-950'}`)}
            >
              {item.season_number}
            </Button>
          ))}
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-4">
        <p className="col-span-full font-semibold">Episodes:</p>
        {isLoading && <Loader size="small" />}
        {episodes?.map((item: { episode_number: number }) => (
          <Button
            key={item.episode_number}
            aria-label={`Episode ${item.episode_number}`}
            aria-pressed={item.episode_number === selectedEpisode}
            onClick={() => setSelectedEpisode(item.episode_number)}
            className={cn(`player-option ${item.episode_number === selectedEpisode && 'bg-sky-950'}`)}
          >
            {item.episode_number}
          </Button>
        ))}
      </div>
    </div>
  );

}
