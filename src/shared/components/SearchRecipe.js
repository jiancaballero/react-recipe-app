import React, { useRef, useState } from "react";
import "./SearchRecipe.css";
import { BiSearch } from "react-icons/bi";


const SearchRecipe = (props) => {
  const searchInputRef = useRef();
  const submitSearch = (e) => {
    e.preventDefault();
    const { passSearchInput } = props;
    passSearchInput(searchInputRef.current.value);
    searchInputRef.current.value = "";
  };
  return (
    <div className={`search__form-control ${props.className}`}>
      <form onSubmit={submitSearch}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a recipe"
        />
        <div>
          <button type="submit">
            <BiSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchRecipe;
