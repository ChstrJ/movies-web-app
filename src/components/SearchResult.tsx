import { Link } from "react-router-dom";
import { Command, CommandGroup, CommandEmpty, CommandItem, CommandList } from "./ui/command";
import { useSearchStore } from "@/stores/useSearchStore";
import { cn, getImagePath } from "@/lib/utils";

type SearchResultItem = {
  id?: number;
  title?: string;
  name?: string;
  poster_path?: string;
  first_air_date?: string;
  media_type?: string;
};

type SearchResultProps = {
  results: SearchResultItem[];
};

const SearchResult = ({ results }: SearchResultProps) => {
  const { resultsDropdown, setResultsDropdown } = useSearchStore();
  const src = getImagePath();

  return (
    <div>
      {resultsDropdown && results.length > 0 && (
        <Command className="absolute border mt-1 border-slate-200 bg-gray-200 w-[278px] md:w-[219px] h-[300px] flex-1">
          <CommandList asChild>
            <CommandGroup>
              {Array.isArray(results) && results.length === 0 ? (
                <CommandEmpty className={cn("w-[278px] md:w-[219px]")}>
                  No results found.
                </CommandEmpty>
              ) : (
                results.map((result) => (
                  <Link
                    onClick={() => setResultsDropdown(false)}
                    to={
                      result.id
                        ? result.media_type === "tv"
                          ? `/show/${result.id}`
                          : `/movie/${result.id}`
                        : "/"
                    }
                    key={result.id}
                  >
                    {result.poster_path && (
                      <CommandItem className="cursor-pointer hover:text-slate-400 p-2 items-center">
                        <img
                          src={`${src}/w45/${result.poster_path}`}
                          alt={result.title || result.name}
                        />
                        <p className="">{result.title || result.name}</p>
                      </CommandItem>
                    )}
                  </Link>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
};

export default SearchResult;
