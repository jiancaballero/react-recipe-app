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

import MainContent from "../../shared/components/MainContent";

let initialLoad = true;
const Favorites = (props) => {
  const [recipes, setRecipes] = useState([]);
  const { uid } = useParams();
  const [isLoading, setIsloading] = useState(false);
  const passSearchInput = (input) => {};

  // TRANSFORM DATA FROM DB
  let transformedRecipeData = [];
  const transformData = (data) => {
    transformedRecipeData.push({
      recipeID: data.id,
      recipe: data.recipe.recipe,
      _links: data.recipe._links,
      uid: data.uid,
      isFavorite: data.isFavorite,
    });
    setRecipes(transformedRecipeData);
  };

  //API CALL TO GET ALL FAVORITE RECIPES
  useEffect(() => {
    setIsloading(true);
    axios.get(`http://localhost:8080/api/recipes/${uid}`).then((res) => {
      res.data.forEach((recipe) => {
        transformData(recipe);
      });
      setIsloading(false);
    });
  }, []);

  return (
    <MainContent
      isLoading={isLoading}
      passSearchInput={passSearchInput}
      recipes={recipes}
    />
  );
};

export default Favorites;
