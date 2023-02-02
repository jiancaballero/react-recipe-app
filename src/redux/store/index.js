import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipe-slice";
const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

export default store;
