import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Navigate, Route, Routes, useParams } from "react-router";
import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
import RecipeDetail from "././recipe/pages/RecipeDetail";
import Favorites from "./recipe/pages/Favorites";
import axios from "axios";
import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Home from "./recipe/pages/Home";
import { authActions } from "./redux/store/auth-slice";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  // SAVING DATA OF LOGGED IN USER
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      dispatch(
        authActions.login({
          uid: storedData.uid,
          token: storedData.token,
          firstName: storedData.firstName,
        })
      );
    }
  }, []);
  return (
    <Routes>
      <>
        {!token && (
          <Route
            path="*"
            exact
            element={<h1>Unauthorized Access. Please login your account</h1>}
          />
        )}
        <Route path="*" exact element={<h1>404 No Page Found.</h1>} />
        <Route path="/" exact element={<Registration />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />{" "}
      </>

      {token && (
        <>
          <Route path="/favorites" exact element={<Favorites />} />
          <Route
            path="/home"
            exact
            element={
              <Home bannerTitle={"Discover"} bannerTitleSpan={"Recipes"} />
            }
          />
          <Route path="/recipe/details/:id*" element={<RecipeDetail />} />
        </>
      )}
    </Routes>
  );
}

export default App;
