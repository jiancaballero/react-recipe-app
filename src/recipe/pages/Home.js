import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import MainContent from "../../shared/components/MainContent";

const Home = (props) => {
  let favorites = [];
  const { uid } = useParams();
  const [favoriteRecipes, setFavoriteRecipes] = useState(favorites);
  const [searchedRecipe, setSearchRecipe] = useState([]);
  const [searchInput, setSearchInput] = useState("beef");
  const passSearchInput = (input) => {
    setSearchInput(input);
  };

  //get ALL recipe URI from favorites
  const favoriteRecipesURI = favoriteRecipes.map(
    (recipe) => recipe.recipe.recipe.uri
  );

  // compare searched recipe URI to favorites URI
  // if match: create new property (isfavorite) to that object and include the recipe ID created from DB
  let transformedSearchRecipe = searchedRecipe.map((recipe) => {
    if (favoriteRecipesURI.includes(recipe.recipe.uri)) {
      const favoriteRecipeID = favoriteRecipes.find(
        (favorite) => favorite.recipe.recipe.uri === recipe.recipe.uri
      ).id;
      return { ...recipe, isFavorite: true, recipeID: favoriteRecipeID };
    } else {
      return recipe;
    }
  });

  const getSearchedRecipes = (recipeData) => {
    setSearchRecipe(recipeData.data.hits);
  };

  //API CALL using custom hook
  const { isLoading, hasError, sendRequest: fetchRecipe } = useHttp();

  useEffect(() => {
    fetchRecipe(
      {
        method: "GET",
        endpoint: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}%20&app_id=560ff047&app_key=e3fdbdf07a147da690d189b06767d81e&tandom=true`,
      },
      getSearchedRecipes
    );
  }, [fetchRecipe, searchInput]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${uid}`).then((res) => {
      res.data.forEach((recipe) => {
        favorites.push(recipe);
      });
    });

    setFavoriteRecipes(favorites);
  }, [searchInput]);

  return (
    <MainContent
      recipes={transformedSearchRecipe}
      passSearchInput={passSearchInput}
      isLoading={isLoading}
      bannerTitle={props.bannerTitle}
      bannerTitleSpan={props.bannerTitleSpan}
    />
  );
};

export default Home;
