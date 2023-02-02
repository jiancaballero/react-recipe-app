import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  favorites: [],
  searchInput: "beef",
};
const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    getSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    searchRecipeData(state, action) {
      const searchedRecipe = action.payload.searchedRecipes;
      const favoriteRecipes = current(state.favorites);
      console.log(favoriteRecipes);
      // get ALL recipe URI from favorites
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
      // save the transformed recipe and favorite recipes to state
      state.recipes = transformedSearchRecipe;
    },
    addToFavorites(state, action) {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFromFavorites(state, action) {
      const recipeID = action.payload;
      const filteredFavorites = state.favorites.filter(
        (favorite) => favorite.id !== recipeID
      );
      state.favorites = filteredFavorites;
    },
  },
});
export const recipeActions = recipeSlice.actions;
export default recipeSlice.reducer;
