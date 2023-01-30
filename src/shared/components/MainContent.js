import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
} from "react";
import RecipeList from "../../recipe/components/RecipeList";
import Header from "./Header";
import "./MainContent.css";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import Pagination from "../../UI/components/Pagination";
import SearchRecipe from "./SearchRecipe";
import { useDispatch, useSelector } from "react-redux";
// import { recipeActions } from "../../redux/store/recipes-slice";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router";

let initialLoad = true;
const MainContent = (props) => {
  let favorites = [];
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState({});
  const { uid } = useParams();
  const [searchInput, setSearchInput] = useState("beef");

  const getSearchInput = (input) => {
    setSearchInput(input);
  };

  const displayRecipes = (recipeData) => {
    setRecipes(recipeData.data.hits);
    setRecipeData(recipeData.data);
  };

  //API CALL using custom hook
  const { isLoading, hasError, sendRequest: fetchRecipe } = useHttp();

  useEffect(() => {
    fetchRecipe(
      {
        method: "GET",
        endpoint: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}%20&app_id=560ff047&app_key=e3fdbdf07a147da690d189b06767d81e&tandom=true`,
      },
      displayRecipes
    );
  }, [fetchRecipe, searchInput]);

  // PAGINATION LOGIC

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(4);
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
      <RecipeList recipes={currentRecipe} recipeData={recipeData} />
    ) : (
      <h1>No Results Found</h1>
    );
  return (
    <Fragment>
      <Header />
      <div className="banner-container" id="recipes">
        <div className="banner-title">{banner}</div>
        <SearchRecipe
          className="search__container"
          passSearchInput={getSearchInput}
        />
      </div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <main id="main-content" className="main-content-container">
          {content}
        </main>
      )}
      {recipes.length > 0 && !isLoading && (
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
