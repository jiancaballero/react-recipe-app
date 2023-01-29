import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Route, Routes } from "react-router";
import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
import RecipeDetail from "././recipe/pages/RecipeDetail";
import Favorites from "./recipe/pages/Favorites";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// import AuthCountext from "./context/auth-context";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const login = useCallback(() => {
  //   setIsLoggedIn(true);
  // }, []);
  // const logout = useCallback(() => {
  //   setIsLoggedIn(false);
  // }, []);
  return (
    <Routes>
      <Route path="*" exact element={<p>No page </p>} />
      <Route path="/" exact element={<Registration />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      {
        <Route
          path="/:uid/home"
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
      <Route path="/recipe/details/:uid/:id*" element={<RecipeDetail />} />
      <Route
        path="/:uid/favorites"
        exact
        element={
          <Favorites
            favoriteMode={true}
            bannerTitle={"Jian's"}
            bannerTitleSpan={"Favorites"}
          />
        }
      />
    </Routes>
  );
}

export default App;
