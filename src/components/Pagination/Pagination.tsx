import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PaginationParams = {
  page: number;
  limit?: number;
  total: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  page,
  limit = 3,
  total,
  onPageChange,
}: PaginationParams) => {
  const getVisiblePages = (): number[] => {
    if (total <= limit) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(limit / 2);

    let start = page - half;
    let end = start + limit - 1;

    if (start < 1) {
      start = 1;
      end = limit;
    }

    if (end > total) {
      end = total;
      start = total - limit + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <ShadPagination>
      <PaginationContent className={cn("p-0 mt-5 mb-0 h-10")}>
        {page > 1 && (
          <PaginationItem
            className={cn("list-none m-0 cursor-pointer")}
            onClick={() => onPageChange(page - 1)}
          >
            <PaginationPrevious className={cn("no-underline")} href="#">
              Previous
            </PaginationPrevious>
          </PaginationItem>
        )}

        {visiblePages[0] > 1 && (
          <>
            <PaginationItem
              className={cn("list-none m-0 cursor-pointer")}
              onClick={() => onPageChange(1)}
            >
              <PaginationLink className={cn("no-underline")} href="#">
                1
              </PaginationLink>
            </PaginationItem>

            {visiblePages[0] > 2 && (
              <PaginationItem className={cn("list-none m-0")}>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {visiblePages.map((pageNumber) => (
          <PaginationItem
            key={pageNumber}
            className={cn("list-none m-0 cursor-pointer")}
            onClick={() => onPageChange(pageNumber)}
          >
            <PaginationLink
              className={cn("no-underline")}
              href="#"
              isActive={pageNumber === page}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {visiblePages[visiblePages.length - 1] < total && (
          <>
            {visiblePages[visiblePages.length - 1] < total - 1 && (
              <PaginationItem className={cn("list-none m-0")}>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem
              className={cn("list-none m-0 cursor-pointer")}
              onClick={() => onPageChange(total)}
            >
              <PaginationLink className={cn("no-underline")} href="#">
                {total}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {page < total && (
          <PaginationItem
            className={cn("list-none m-0 cursor-pointer")}
            onClick={() => onPageChange(page + 1)}
          >
            <PaginationNext className={cn("no-underline")} href="#">
              Next
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadPagination>
  );
};
