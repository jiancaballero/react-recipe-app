import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Logo from "../../UI/components/Logo";
import AuthCountext from "../../context/auth-context";
const Login = () => {
  const auth = useState(AuthCountext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [logInCredentials, setLogInCredentials] = useState({});
  const onLoginHandler = (e) => {
    e.preventDefault();
    setLogInCredentials({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    auth.logIn();
  };
  return (
    <div className={classes.login__container}>
      <Logo />
      <form
        onSubmit={onLoginHandler}
        className={classes["login__form-container"]}
      >
        <label htmlFor="userName">
          Email:
          <input
            ref={emailRef}
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
            ref={passwordRef}
            type="password"
            name="userName"
            required
            placeholder="Enter your password"
          ></input>
          <small></small>
        </label>

        <div className={classes.login__cta}>
          <Link to="/home">Login</Link>
          <Link to="/signup">No account yet? Click here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
