import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Route, Routes, useParams } from "react-router";
import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
import RecipeDetail from "././recipe/pages/RecipeDetail";
import Favorites from "./recipe/pages/Favorites";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Home from "./recipe/pages/Home";

function App() {
  return (
    <Routes>
      <Route path="*" exact element={<Registration />} />
      <Route path="/" exact element={<Registration />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
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
      <>
        <Route
          path="/:uid/home"
          exact
          element={
            <Home bannerTitle={"Discover"} bannerTitleSpan={"Recipes"} />
          }
        />

        <Route path="/recipe/details/:uid/:id*" element={<RecipeDetail />} />
      </>
    </Routes>
  );
}

export default App;
