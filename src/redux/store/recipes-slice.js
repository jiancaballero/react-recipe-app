import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    favorites: [],
    searchedRecipes: [],
    isLoading: false,
  },
  reducers: {
    getSearchedRecipes(state, action) {
      console.log(action.payload);
      state.initialState = {
        ...state.initialState,
        searchedRecipes: action.payload,
      };
      console.log(state.initialState);
    },
    // getRecipeDetails(state, action) {
    //   state.initialState = state.initialState.find(
    //     (recipe) => recipe.id === action.payload
    //   );
    // },
  },
});

export const recipeActions = recipeSlice.actions;
export default recipeSlice;
