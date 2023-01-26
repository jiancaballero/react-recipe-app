import React, { Fragment, useEffect, useRef, useState } from "react";
import RecipeList from "../../recipe/components/RecipeList";
import Header from "./Header";
import classes from "./MainContent.module.css";
import axios from "axios";

const MainContent = (props) => {
  const searchRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const searchRecipeHandler = () => {
    setSearchInput(searchRef.current.value);
    searchRef.current.value = "";
  };
  useEffect(() => {
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=4e36ed6c&app_key=abdc5fe8f5531f5129b133c11dd00ae5`
      )
      .then((res) => {
        if (res.status == 200) {
          setRecipes(res.data.hits);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchInput]);

  return (
    <Fragment>
      <Header />
      <main className={classes.mainContent__container}>
        <div className={classes.searchContainer}>
          <div>
            {recipes.length > 0 && (
              <h1>
                {recipes.length} <span>Recipes Found</span>
              </h1>
            )}
            {recipes.length === 0 && (
              <h1>
                Discover <span>Recipes</span>
              </h1>
            )}
          </div>
          <div className={classes.searchContainer__search}>
            <input ref={searchRef} placeholder="Search for a recipe" />
            <button onClick={searchRecipeHandler}>+</button>
          </div>
        </div>
        <RecipeList recipes={recipes} />
      </main>
    </Fragment>
  );
};

export default MainContent;
