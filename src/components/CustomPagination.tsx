import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePaginationStore } from "@/stores/usePaginationStore"

export function CustomPagination() {
  const { page, setPage } = usePaginationStore();

  console.log(page)

  return (
    <Pagination>
      <PaginationContent>
        {page > 5 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(page - 5)}
              className="text-white hover:text-gray-400 duration-300 ease-in-out" href="#" />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(page + 5)}
            className="text-white hover:text-gray-400 duration-300 ease-in-out" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
