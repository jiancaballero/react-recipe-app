import React from "react";
import classes from './SearchContainer.module.css'
const SearchContainer = (props) => {
  return (
    <div className={classes.searchContainer}>
      <h1>Discover <span>Recipes</span>
      </h1>

      <div className={classes.searchContainer__search}>
        <input placeholder="Search for a recipe" />
        <button>+</button>
      </div>
    </div>
  );
};

export default SearchContainer;
