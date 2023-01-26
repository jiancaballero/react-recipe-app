import "./App.css";
import Registration from "./registration/pages/Registration.js";

import { Route, Routes } from "react-router";

import Login from "./registration/pages/Login";
import SignUp from "./registration/pages/SignUp";
import MainContent from "./shared/components/MainContent";
function App() {
  return (
    <Routes>
      <Route path="*" exact element={<p>No page </p>} />
      <Route path="/home" exact element={<MainContent />} />
      <Route path="/" exact element={<Registration />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/sign-up" exact element={<SignUp />} />
    </Routes>
  );
}

export default App;
