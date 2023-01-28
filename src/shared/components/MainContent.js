import React, { Fragment, useEffect, useRef, useState } from "react";
import RecipeList from "../../recipe/components/RecipeList";
import Header from "./Header";
import "./MainContent.css";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import Pagination from "../../UI/components/Pagination";
import SearchRecipe from "./SearchRecipe";
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../../redux/store/recipes-slice";
const MainContent = (props) => {
  // const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.recipes.isLoading);
  // const recipes = useSelector((state) => state.recipes);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //API CALL
  const fetchRecipesHandler = async (searchResult) => {
    try {
      setIsLoading(true);
      const response = await axios
        .get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${searchResult}%20&app_id=560ff047&app_key=e3fdbdf07a147da690d189b06767d81e`
        )
        .catch((err) => console.log(err));
      console.log(response);
      setRecipes(response.data.hits);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // PAGINATION LOGIC
  // TODO: study this part from: https://www.google.com/search?q=react+pagination&rlz=1C5CHFA_enJP944JP944&sxsrf=AJOqlzX17R5uegVp_V98DWMI9fuwjzEMBQ:1674842038371&source=lnms&tbm=vid&sa=X&ved=2ahUKEwiz4oHmqOj8AhWRMN4KHUZWD84Q_AUoAXoECAEQAw&biw=1440&bih=764&dpr=2#fpstate=ive&vld=cid:37d29cbf,vid:IYCa1F-OWmk
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(5);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe =
    recipes.length > 0 && recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // CONDITIONAL RENDERS
  const banner =
    recipes.length > 0 ? (
      <h1>
        {recipes.length} <span>Recipes Found</span>
      </h1>
    ) : (
      <h1>
        {props.bannerTitle} <span>{props.bannerTitleSpan}</span>
      </h1>
    );
  const content =
    recipes.length > 0 ? (
      <RecipeList recipes={currentRecipe} />
    ) : (
      <h1>No Results Found</h1>
    );
  return (
    <Fragment>
      <Header />
      <div className="banner-container">
        <div className="banner-title">{banner}</div>
        <SearchRecipe
          className="search__container"
          recipeHandler={fetchRecipesHandler}
        />
      </div>
      {isLoading && <Spinner />}
      {!isLoading && <main className="main-content-container">{content}</main>}
      {recipes.length > 0 && (
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
        />
      )}
    </Fragment>
  );
};

export default MainContent;
