import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Route, Routes } from "react-router";
import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
import RecipeDetail from "././recipe/pages/RecipeDetail";
import Favorites from "./recipe/pages/Favorites";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AuthContext } from "./context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Routes>
        <Route path="*" exact element={<Registration />} />
        <Route path="/" exact element={<Registration />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        {isLoggedIn && (
          <>
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

            <Route
              path="/recipe/details/:uid/:id*"
              element={<RecipeDetail />}
            />
            <Route
              path="/:uid/favorites"
              exact
              element={
                <Favorites
                  favoriteMode={true}
                  bannerTitle={"All"}
                  bannerTitleSpan={"Favorites"}
                />
              }
            />
          </>
        )}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
