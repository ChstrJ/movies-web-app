import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function CustomPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="text-white hover:text-gray-400 duration-300 ease-in-out" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="text-white hover:text-gray-400 duration-300 ease-in-out" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
