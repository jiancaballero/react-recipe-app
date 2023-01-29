import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Route, Routes } from "react-router";
import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
import RecipeDetail from "././recipe/pages/RecipeDetail";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { recipeActions } from "./redux/store/recipes-slice";
import AuthCountext from "./context/auth-context";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const login = useCallback(() => {
  //   setIsLoggedIn(true);
  // }, []);
  // const logout = useCallback(() => {
  //   setIsLoggedIn(false);
  // }, []);
  return (
    <AuthCountext.Provider value>
      <Routes>
        <Route path="*" exact element={<p>No page </p>} />
        <Route path="/" exact element={<Registration />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        {
          <Route
            path="/home"
            exact
            element={
              <MainContent
                bannerTitle={"Discover"}
                bannerTitleSpan={"Recipes"}
                favoriteMode={false}
              />
            }
          />
        }
        <Route path="/recipe/details/:id*" element={<RecipeDetail />} />
        <Route
          path="/:id/favorites"
          exact
          element={
            <MainContent
              favoriteMode={true}
              bannerTitle={"Jian's"}
              bannerTitleSpan={"Favorites"}
            />
          }
        />
      </Routes>
    </AuthCountext.Provider>
  );
}

export default App;
