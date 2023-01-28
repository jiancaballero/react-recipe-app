import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Route, Routes } from "react-router";
import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
import RecipeDetail from "././recipe/pages/RecipeDetail";
import axios from "axios";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { recipeActions } from "./redux/store/recipes-slice";
let initialLoad = true;
function App() {
  const [recipeID,setRecipeID] = useState(null);
  const getRecipeDetail = (id) => {
    setRecipeID(id);
  };
  // const searchInput = useSelector((state) => state.recipes.searchInput);
  // const dispatch = useDispatch();
  // console.log("searchInput"+searchInput);
  // useEffect(() => {
  //   console.log("working");
  //   const fetchRecipesHandler = async () => {
  //     try {
  //       // setIsLoading(true);
  //       const response = await axios
  //         .get(
  //           `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}%20&app_id=560ff047&app_key=e3fdbdf07a147da690d189b06767d81e`
  //         )
  //         .catch((err) => console.log(err));

  //         console.log(response)
  //       dispatch(
  //         recipeActions.getSearchedRecipes({
  //           recipes: response.data.hits,
  //           isLoading: false,
  //         })
  //       );
  //       // setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchRecipesHandler();
  // }, [searchInput]);

  return (
    <Routes>
      <Route path="*" exact element={<p>No page </p>} />
      <Route path="/" exact element={<Registration />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route
        path="/home"
        exact
        element={
          <MainContent bannerTitle={"Discover"} bannerTitleSpan={"Recipes"} />
        }
      />
      <Route path="/recipe/details/:id*" element={<RecipeDetail recipeID={recipeID} />} />
      <Route
        path="/:id/favorites"
        exact
        element={
          <MainContent bannerTitle={"Jian's"} bannerTitleSpan={"Favorites"} />
        }
      />
    </Routes>
  );
}

export default App;
