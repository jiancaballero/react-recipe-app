import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Route, Routes } from "react-router";

import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
import RecipeDetail from '././recipe/pages/RecipeDetail';
function App() {
  return (
    <Routes>
      <Route path="*" exact element={<p>No page </p>} />
      <Route path="/home" exact element={<MainContent />} />
      <Route path="/" exact element={<Registration />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/:id/recipe/details/" exact element={<RecipeDetail />} />
    </Routes>
  );
}

export default App;
