import { Link } from "react-router-dom";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { useSearchStore } from "@/stores/useSearchStore";
import { getImagePath } from "@/lib/utils";

type SearchResultItem = {
  id?: number;
  title?: string;
  name?: string;
  poster_path?: string;
  first_air_date?: string;
};

type SearchResultProps = {
  results: SearchResultItem[];
};

const SearchResult = ({ results }: SearchResultProps) => {
  const { resultsDropdown, setResultsDropdown } = useSearchStore();
  const src = getImagePath();

  console.log(resultsDropdown);

  return (
    <div>
      {resultsDropdown && results.length > 0 && (
        <Command className="absolute border mt-1 border-slate-200 bg-gray-200 w-[228px] h-[300px] flex-1">
          <CommandList asChild>
            <CommandGroup>
              {Array.isArray(results) && results.length === 0 ? (
                <CommandItem className="p-2 text-center text-gray-500">No results found.</CommandItem>
              ) : (
                results.map(result => (
                  <Link
                    onClick={() => setResultsDropdown(false)}
                    to={result.id ? `/movie/${result.id}` : '/'} key={result.id}>
                    {result.poster_path && (
                      <CommandItem
                        className="cursor-pointer hover:text-slate-400 p-2 items-center">
                        <img src={`${src}/w45/${result.poster_path}`}
                          alt={result.title || result.name} />
                        <p className="">
                          {(result.title || result.name) + ' ' + (result?.first_air_date?.split('-')[0] || '')}
                        </p>
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

  )
}

export default SearchResult;
