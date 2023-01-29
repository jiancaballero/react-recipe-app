import { createContext } from "react";
const AuthCountext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
export default AuthCountext;
