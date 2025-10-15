import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  total: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function MyPagination({ total, page, setPage }: Props) {
  const element = [];
  for (let index = 1; index < total; index++) {
    element.push(
      <PaginationItem>
        <PaginationLink
          className="hover:cursor-pointer"
          isActive={index !== page}
          onClick={() => setPage(index)}
        >
          {index}
        </PaginationLink>
      </PaginationItem>
    );
  }
  return (
    <div className="flex justify-end">
      <Pagination className="mt-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:cursor-pointer"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              isActive={page > 1}
            />
          </PaginationItem>

          {element}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className="hover:cursor-pointer"
              onClick={() => setPage((prev) => Math.min(prev + 1, total))}
              isActive={page < total}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
