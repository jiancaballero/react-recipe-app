import React from "react";
import "./Pagination.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  // TODO: PREVIOS AND NEXT BUTTON
  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li>
          <a>
            <FaArrowCircleLeft />
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
        <li>
          <a>
            <FaArrowCircleRight />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
