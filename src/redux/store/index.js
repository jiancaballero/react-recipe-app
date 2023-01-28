import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./recipes-slice";
const store = configureStore({
  reducer: { recipes: recipeSlice.reducer }
});
export default store;
