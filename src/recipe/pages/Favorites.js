import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
} from "react";
import RecipeList from "../../recipe/components/RecipeList";
import Header from "../../shared/components/Header";
import "../../shared/components/MainContent.css";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import Pagination from "../../UI/components/Pagination";
import SearchRecipe from "../../shared/components/SearchRecipe";
import { useDispatch, useSelector } from "react-redux";
// import { recipeActions } from "../../redux/store/recipes-slice";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router";
import FavoriteList from "../components/FavoriteList";

let initialLoad = true;
const Favorites = (props) => {
  const [recipes, setRecipes] = useState([]);
  const { uid } = useParams();
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const getSearchInput = (input) => {
    setSearchInput(input);
  };

  //API CALL using custom hook

  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${uid}`).then((res) => {
      setIsloading(true);
      res.data.forEach((recipes) => {
        setRecipes((prevState) => [
          ...prevState,
          { id: recipes.id, recipe: recipes.recipe },
        ]);
      });
      setIsloading(false);
    });
  }, [searchInput]);

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
        {recipes.length} <span>Favorite Recipes</span>
      </h1>
    ) : (
      <h1>
        {props.bannerTitle} <span>{props.bannerTitleSpan}</span>
      </h1>
    );
  const content =
    recipes.length > 0 ? (
      <FavoriteList recipes={currentRecipe} />
    ) : (
      <h1>No Recipes Found</h1>
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

export default Favorites;
