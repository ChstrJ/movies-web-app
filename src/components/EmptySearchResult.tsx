import { useSearchStore } from '@/stores/useSearchStore'
import { Command, CommandEmpty } from './ui/command'

const EmptySearchResult = () => {
    const { resultsDropdown, searchInput } = useSearchStore();

    return (
        <div>
            {resultsDropdown && searchInput && (
                <Command className='absolute border mt-1 border-slate-200 bg-gray-200 w-[224px] h-[65px] flex-1'>
                    <CommandEmpty>No results found.</CommandEmpty>
                </Command>
            )}
        </div>
    )
}

export default EmptySearchResult
