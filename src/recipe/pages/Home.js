import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { authActions } from "../../redux/store/auth-slice";
import { recipeActions } from "../../redux/store/recipe-slice";
import MainContent from "../../shared/components/MainContent";

const Home = (props) => {
  const favoriteRecipes = useSelector((state) => state.recipes.favorites);
  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();
  // recipes state from redux store
  const transformedSearchRecipe = useSelector((state) => state.recipes.recipes);
  // search state from reduce store
  const searchInput = useSelector((state) => state.recipes.searchInput);

  // CALLING REDUCER FUNCTION SEARCH RECIPE DATA TO TRANSFORM DATA
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
    fetchRecipe(
      {
        method: "GET",
        endpoint: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}%20&app_id=560ff047&app_key=e3fdbdf07a147da690d189b06767d81e&tandom=true`,
      },
      getSearchedRecipes
    );
  }, [fetchRecipe, searchInput, favoriteRecipes]);

  const favoritesData = [];
  // GET ALL FAVORITE RECIPE FROM DATABASE
  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${uid}`).then((res) => {
      if (res.data) {
        res.data.forEach((recipe) => {
          favoritesData.push(recipe);
        });
        dispatch(recipeActions.resetFavoriteRecipes(favoritesData));
      }
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
