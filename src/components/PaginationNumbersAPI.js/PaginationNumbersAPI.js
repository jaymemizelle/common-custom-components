import React, { useState } from "react";

function PaginationNumbersAPI({
  pageCount,
  pageArray,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  leftArrowOnClick,
  rightArrowOnClick,
  onNumberClick,
}) {
  let activeStyles = {
    borderRadius: "10%",
    backgroundColor: "#eef8f6",
  };

  return (
    <div
      style={{
        display: "flex",
        color: "#2f3a7c",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="pageArrow"
        onClick={leftArrowOnClick}
        style={{ marginRight: "10px" }}
      >
        <i className="fa fa-angle-left"></i>
      </div>

      <div
        className="pageNumber"
      >
        {currentPage}
      </div>
      {/* {pageArray.map((item, index) => {
        let count = index + 1;
        // if (pageCount <= 5) {
          return (
            <div
              key={count}
              className="pageNumber"
              onClick={() => {
                setCurrentPage(count);
                onNumberClick(itemsPerPage, count);
              }}
              style={count == currentPage ? activeStyles : null}
            >
              {count}
            </div>
          );
        }
        if (pageCount > 5) {
          return (
            <div key={count}>
              {count <= 5 ? (
                <div
                  className="pageNumber"
                  onClick={() => {
                    setCurrentPage(count);
                    onNumberClick();
                  }}
                  style={count == currentPage ? activeStyles : null}
                >
                  {count}
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>...</div>
                  <div
                    className="pageNumber"
                    onClick={() => {
                      setCurrentPage(count);
                      onNumberClick();
                    }}
                    style={count == currentPage ? activeStyles : null}
                  >
                    {pageCount}
                  </div>
                </div>
              )}
            </div>
          );
        }
      })} */}
      <div
        className="pageArrow"
        onClick={rightArrowOnClick}
        style={{ marginLeft: "10px" }}
      >
        <i className="fa fa-angle-right"></i>
      </div>
    </div>
  );
}

export default PaginationNumbersAPI;