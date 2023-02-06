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

const Favorites = (props) => {
  const recipes = useSelector((state) => state.recipes.favorites);
  // // TRANSFORM DATA FROM FAVORITES REDUX STORE
  const transformedRecipeData = recipes.map((recipe) => {
    return {
      recipeID: recipe.id,
      recipe: recipe.recipe.recipe,
      _links: recipe.recipe._links,
      uid: recipe.uid,
      isFavorite: recipe.isFavorite,
    };
  });

  return (
    <MainContent
      recipes={transformedRecipeData}
      bannerTitle={"All"}
      bannerTitleSpan={"Favorites"}
    />
  );
};

export default React.memo(Favorites);
