import { useState } from "react";
const Pagination = ({
  totalProducts,
  setCurrentPage,
  currentPage,
  productsPerPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Go To Next Page
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  // Go To Previous Page
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (totalPages === 1) return null;
  return (
    <ul className="list-none mt-12 pt-4  flex justify-center gap-5 items-center">
      <li
        onClick={paginatePrev}
        className={`${
          currentPage === 1 ? `hidden` : ""
        } text-lg border min-w-fit  bg-pblack text-white  px-1 cursor-pointer`}
      >
        &lt;
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              className={
                currentPage === number
                  ? "bg-primary w-5 h-5 flex justify-center items-center rounded-full text-white"
                  : null
              }
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          );
        } else {
          return null;
        }
      })}

      <li
        className={`${
          currentPage === pageNumbers[pageNumbers.length - 1] ? `hidden` : ""
        } text-lg border min-w-fit  bg-pblack text-white  px-1 cursor-pointer`}
        onClick={paginateNext}
      >
        &gt;
      </li>
      <p>
        <b className="text-red">{`page ${currentPage}`}</b>
        <span> of </span>
        <b className="text-red">{totalPages}</b>
      </p>
    </ul>
  );
};

export default Pagination;
