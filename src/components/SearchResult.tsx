import { Link } from "react-router-dom";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./ui/command";

type SearchResultItem = {
  id: number;
  title?: string;
  name?: string;
};

type SearchResultProps = {
  results: SearchResultItem[];
};


const SearchResult = ({ results }: SearchResultProps) => {
  return (
    <Command className="absolute border mt-1 border-slate-200 bg-gray-200 w-[218px] flex-1">
      <CommandList asChild>
        <CommandGroup>
          {!results.length
            ? <CommandEmpty>No results found.</CommandEmpty>
            : results.map(result => (
              <Link to={`/movies/{result.id}`} key={result.id} >
                <CommandItem className="cursor-pointer hover:opacity-50" >{result.title || result.name}</CommandItem>
              </Link>
            ))
          }
        </CommandGroup>
      </CommandList>
    </Command>

  )
}

export default SearchResult;
