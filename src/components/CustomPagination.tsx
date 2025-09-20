import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
// import { useMovieStore } from "@/stores/useMovieStore";
import { usePaginationStore } from "@/stores/usePaginationStore";
// import { useShowStore } from "@/stores/useShowStore";
// import { useLocation } from "react-router-dom";

export function CustomPagination() {
  const { page, setPage } = usePaginationStore();
  // const location = useLocation();

  // const { moviePage, setMoviePage } = useMovieStore();
  // const { showPage, setShowPage } = useShowStore();

  // const { pathname } = location;

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
