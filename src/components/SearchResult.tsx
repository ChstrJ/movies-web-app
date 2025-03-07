import { Link } from "react-router-dom";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

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
                <CommandItem className="cursor-pointer hover:text-slate-400 p-2">{result.title || result.name}
                  {result.name
                    ? <Badge variant={"outline"}>Series</Badge>
                    : <Badge variant={"outline"}>Movie</Badge>}
                </CommandItem>
              </Link>
            ))
          }
        </CommandGroup>
      </CommandList>
    </Command>

  )
}

export default SearchResult;
