import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { recipeActions } from "../../redux/store/recipe-slice";
import MainContent from "../../shared/components/MainContent";

const Home = (props) => {
  const favoriteRecipes = useSelector((state) => state.recipes.favorites);
  const { uid } = useParams();
  const dispatch = useDispatch();

  // recipes state from redux store
  const transformedSearchRecipe = useSelector((state) => state.recipes.recipes);
  // search state from reduce store
  const searchInput = useSelector((state) => state.recipes.searchInput);

  // CALLING REDUCER FUNCTION SEARCH RECIPE DATA
  const getSearchedRecipes = (recipeData) => {
    dispatch(
      recipeActions.searchRecipeData({
        searchedRecipes: recipeData.data.hits,
        favoriteRecipes,
      })
    );
  };

  //API CALL using custom hook
  const { isLoading, hasError, sendRequest: fetchRecipe } = useHttp();

  // GET ALL RECIPE FROM THIRD PARTY API
  useEffect(() => {
    console.log("re-render");
    fetchRecipe(
      {
        method: "GET",
        endpoint: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}%20&app_id=560ff047&app_key=e3fdbdf07a147da690d189b06767d81e&tandom=true`,
      },
      getSearchedRecipes
    );
  }, [fetchRecipe, searchInput, favoriteRecipes]);

  // GET ALL FAVORITE RECIPE FROM DATABASE
  useEffect(() => {
    console.log("nagrender din");
    axios.get(`http://localhost:8080/api/recipes/${uid}`).then((res) => {
      res.data.forEach((recipe) => {
        dispatch(recipeActions.addToFavorites(recipe));
      });
    });
  }, []);

  return (
    <MainContent
      recipes={transformedSearchRecipe}
      isLoading={isLoading}
      bannerTitle={props.bannerTitle}
      bannerTitleSpan={props.bannerTitleSpan}
    />
  );
};

export default Home;
