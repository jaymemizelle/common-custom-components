import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationArrows({ array, setArrayToRender, itemsPerPage }) {
  const [pages, setPages] = useState("");
  const [fullArray, setFullArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [slice1, setSlice1] = useState(0);
  const [slice2, setSlice2] = useState(itemsPerPage);

  useEffect(() => {
    console.log(array);
    console.log(itemsPerPage);
    setFullArray(array);
    if (parseInt(array.length) <= itemsPerPage) {
      setArrayToRender(array);
    }
    setArrayToRender(array.slice(slice1, slice2));
    setPages(array.length / itemsPerPage);
  }, [array]);

  if (array.length <= itemsPerPage) {
    return null;
  } else {
    return (
      <Pagination>
        <Pagination.First
          onClick={() => {
            setCurrentPage(1);
            setSlice1(0);
            setSlice2(itemsPerPage);
            setArrayToRender(fullArray.slice(0, itemsPerPage));
          }}
        />
        {currentPage !== 1 ? (
          <Pagination.Prev
            onClick={() => {
              let page = currentPage - 1;
              if (page == 1) {
                setArrayToRender(fullArray.slice(0, itemsPerPage));
                setCurrentPage(page);
                setSlice1(slice1 - itemsPerPage);
                setSlice2(slice2 - itemsPerPage);
                return;
              }
              setCurrentPage(page);
              setArrayToRender(
                fullArray.slice(slice1 - itemsPerPage, slice2 - itemsPerPage)
              );
              setSlice1(slice1 - itemsPerPage);
              setSlice2(slice2 - itemsPerPage);
            }}
          />
        ) : null}
        {currentPage !== Math.ceil(pages) ? (
          <Pagination.Next
            onClick={() => {
              let page = currentPage + 1;
              if (page == Math.ceil(pages)) {
                setCurrentPage(Math.ceil(pages));
                let num = fullArray.length;
                setArrayToRender(
                  fullArray.slice(num - (num % itemsPerPage), fullArray.length)
                );
                setSlice1(num - itemsPerPage);
                setSlice2(num);
                return;
              }
              setCurrentPage(page);
              setArrayToRender(
                fullArray.slice(slice1 + itemsPerPage, slice2 + itemsPerPage)
              );
              setSlice1(slice1 + itemsPerPage);
              setSlice2(slice2 + itemsPerPage);
            }}
          />
        ) : null}
        <Pagination.Last
          onClick={() => {
            setCurrentPage(Math.ceil(pages));
            let num = fullArray.length;
            setArrayToRender(
              fullArray.slice(num - (num % itemsPerPage), fullArray.length)
            );
            setSlice1(num - itemsPerPage);
            setSlice2(num);
          }}
        />
      </Pagination>
    );
  }
}

export default PaginationArrows;