import { Popover, PopoverContent } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useSearchStore } from '@/stores/useSearchStore';
import { useQuery } from '@tanstack/react-query';
import { searchMulti } from '@/services/movieService';
import { useCallback } from 'react';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { cn, getImagePath } from '@/lib/utils';
import { useGeneralStore } from "@/stores/useGeneralStore";
import { SearchResult } from "@/lib/types";

type CommandPopoverProps = {
    open: boolean;
};

export default function CommandPopover({ open }: CommandPopoverProps) {
    const { searchInput, setSearchInput, setResultsDropdown, setUserInput, userInput } = useSearchStore();
    const { setDocumentTitle, setSelectedResult } = useGeneralStore();
    const navigate = useNavigate();
    const src = getImagePath();

    const { data: results, isFetching } = useQuery<SearchResult[]>({
        queryKey: ['all', searchInput],
        queryFn: () => searchMulti(searchInput),
        refetchOnWindowFocus: false,
    });

    const searchDebounce = useCallback(
        debounce((value: string) => setSearchInput(value), 1000),
        []
    );

    const handleChange = (value: string) => {
        searchDebounce(value)
        setUserInput(value);
    };

    const handleSelect = (result: any) => {
        setResultsDropdown(false);
        setDocumentTitle(result.title || result.name || '');
        setSelectedResult(result);
        setUserInput('');
        setSearchInput('');
        const path = result.media_type === 'tv' ? `/show/${result.id}` : `/movie/${result.id}`;
        navigate(path);
    };

    return (
        <Popover open={open} onOpenChange={setResultsDropdown}>
            <PopoverContent
                onInteractOutside={() => setResultsDropdown(false)}
                className="mt-[6rem] w-screen h-[700px] fixed flex items-center justify-center border-none shadow-none">
                <Command
                    className="max-w-2xl w-full mx-auto text-white border border-[#252528] bg-[#09090b]">
                    <CommandInput
                        value={userInput}
                        onValueChange={handleChange}
                        placeholder="Search for anything..."
                    />
                    <CommandList
                        className={cn('max-h-[700px]')}
                    >
                        {isFetching && (
                            <CommandEmpty className="text-center text-gray-500">
                                Searching...
                            </CommandEmpty>)}
                        {searchInput.length > 0 && results?.length === 0 && (
                            <CommandEmpty className="text-center text-gray-500">
                                No results found.
                            </CommandEmpty>
                        )}
                        {results?.map((result) => (
                            result.poster_path &&
                            (result.release_date || result.first_air_date) &&
                            (
                                <CommandItem
                                    key={result.id}
                                    value={result.title || result.name}
                                    className="cursor-pointer hover:text-slate-400 p-2 items-center hover:bg-[#252528]"
                                    onSelect={() => handleSelect(result)}
                                >
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row gap-2 w-full items-center">
                                            <img
                                                src={`${src}/w45/${result.poster_path}`}
                                                alt={result.title || result.name}
                                            />
                                            <p className="inline-block">{result.title || result.name}</p>
                                            <span className="text-slate-400 rounded-md ml-2 bg-slate-900 p-1">
                                                {result.media_type === 'movie' ? (result.release_date?.split('-')[0] ?? 'Unknown') : (result.first_air_date?.split('-')[0] ?? 'Unknown')}
                                                {" - "}
                                                {result.media_type === 'movie' ? 'Movie' : 'TV Show'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 mt-1">{result.overview}</p>
                                        </div>
                                    </div>
                                </CommandItem>
                            )
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
