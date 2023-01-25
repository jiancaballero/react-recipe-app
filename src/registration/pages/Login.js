import React from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Logo from "../../UI/components/Logo";
const Login = () => {
  return (
    <div className={classes.login__container}>
      <Logo />
      <form className={classes["login__form-container"]}>
        <label htmlFor="userName">
          Email:
          <input
            type="email"
            name="userName"
            required
            placeholder="Enter your email"
          ></input>
          <small></small>
        </label>
        <label htmlFor="userName">
          Password:
          <input
            type="password"
            name="userName"
            required
            placeholder="Enter your password"
          ></input>
          <small></small>
        </label>

        <div className={classes.login__cta}>
          <Link>Login</Link>
          <Link to="/sign-up">No account yet? Click here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
