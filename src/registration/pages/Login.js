import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Logo from "../../UI/components/Logo";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";

const Login = () => {
  const auth = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const onLoginHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/users/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.status == 201) {
          alert("Login successful");
          auth.login();
          navigate(`/${res.data.userData.id}/home`);
        }
      })
      .catch((err) => {
        alert("Login not successful. Please enter a correct email or password");
      });
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
          <button>Login</button>
          <Link to="/signup">No account yet? Click here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
