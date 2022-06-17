import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationArrowsAPI({
  pageNumber,
  itemsPerPage,
  recordCount,
  pageCount,
  firstOnClick,
  prevOnClick,
  nextOnClick,
  lastOnClick,
}) {
  if (recordCount <= itemsPerPage) {
    return null;
  } else {
    return (
      <>
        <Pagination>
          <Pagination.First onClick={firstOnClick} />
          {pageNumber !== 1 ? <Pagination.Prev onClick={prevOnClick} /> : null}

          {pageNumber !== pageCount ? (
            <Pagination.Next onClick={nextOnClick} />
          ) : null}

          <Pagination.Last onClick={lastOnClick} />
        </Pagination>
      </>
    );
  }
}

export default PaginationArrowsAPI;