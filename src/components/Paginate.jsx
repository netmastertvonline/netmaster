import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const Paginate = ({
  itemsToPaginate,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  firstIndex
}) => {
  const npage = Math.ceil(itemsToPaginate.length / itemsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);

  const limite = 5;
  const [max, setMax] = useState(5);
  const [min, setMin] = useState(0);

  function prePage() {
    if (currentPage !== firstIndex) {
      changeCurrentPage(currentPage - 1);

      if ((currentPage - 1) % limite == 0) {
        setMax(max - limite);
        setMin(min - limite);
      }
    }
  }

  function changeCurrentPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== firstIndex) {
      changeCurrentPage(currentPage + 1);

      if (currentPage + 1 > max) {
        setMax(max + limite);
        setMin(min + limite);
      }
    }
  }

  let morepages = null;

  if (numbers.length > limite) {
    morepages = (
      <PaginationItem>
        <PaginationNext href="#">...</PaginationNext>
      </PaginationItem>
    );
  }

  const paginate = numbers.map((n, i) => {
    if (n < max + 1 && n > min) {
      return (
        <PaginationItem
          key={i}
          onClick={() => changeCurrentPage(n)}
          className={`${currentPage === n ? "border rounded-sm" : " "}`}
        >
          <PaginationLink href="#">{n}</PaginationLink>
        </PaginationItem>
      );
    } else {
      return null;
    }
  });
    
  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem onClick={prePage}>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}

        {paginate}

        {npage !== currentPage && (
          <>
            {morepages}

            <PaginationItem onClick={nextPage}>
              <PaginationNext href="#" />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;