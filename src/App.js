import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Route, Routes } from "react-router";
import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
import RecipeDetail from "././recipe/pages/RecipeDetail";
import axios from "axios";
import { useEffect } from "react";
function App() {
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
      <Route path="/:id/recipe/details/" exact element={<RecipeDetail />} />
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
