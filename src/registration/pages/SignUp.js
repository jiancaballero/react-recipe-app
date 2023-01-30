import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../UI/components/Logo";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState({
    firstNameIsValid: true,
    lastNameIsValid: true,
    emailIsValid: true,
    passwordIsValid: true,
  });

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const {
    firstName: firstNameState,
    lastName: lastNameState,
    email: emailState,
    password: passwordState,
  } = inputs;
  const {
    firstNameIsValid: firstNameIsValidState,
    lastNameIsValid: lastNameIsValidState,
    emailIsValid: emailIsValidState,
    passwordIsValid: passwordIsValidState,
  } = isValid;

  const inputChangeHandler = (e) => {
    switch (e.target.name) {
      case "firstName":
        setIsValid((prevState) => {
          return { ...prevState, firstNameIsValid: true };
        });
        setInputs((prevState) => {
          return { ...prevState, firstName: e.target.value };
        });
        break;
      case "lastName":
        setIsValid((prevState) => {
          return { ...prevState, lastNameIsValid: true };
        });
        setInputs((prevState) => {
          return { ...prevState, lastName: e.target.value };
        });
        break;
      case "email":
        setIsValid((prevState) => {
          return { ...prevState, emailIsValid: true };
        });
        setInputs((prevState) => {
          return { ...prevState, email: e.target.value };
        });
        break;
      case "password":
        setIsValid((prevState) => {
          return { ...prevState, passwordIsValid: true };
        });
        setInputs((prevState) => {
          return { ...prevState, password: e.target.value };
        });
        break;
    }
  };

  useEffect(() => {}, []);

  const submitInputHandler = (e) => {
    e.preventDefault();
    if (
      firstNameIsValidState &&
      lastNameIsValidState &&
      emailIsValidState &&
      passwordIsValidState
    ) {
      axios
        .post("http://localhost:8080/api/users/signup", {
          firstName: firstNameState,
          lastName: lastNameState,
          email: emailState,
          password: passwordState,
        })
        .then((res) => {
          if (res.status === 201) {
        
            alert("Created account successfully");
            navigate(`/login`);
          } else {
            return alert("Account has already been taken. Please try again.");
          }
        });
    }
    if (firstNameState.trim() === "") {
      setIsValid((prevState) => {
        return { ...prevState, firstNameIsValid: false };
      });
    } else if (firstNameState.trim() !== "") {
      setIsValid((prevState) => {
        return { ...prevState, firstNameIsValid: true };
      });
    }
    if (lastNameState.trim() === "") {
      setIsValid((prevState) => {
        return { ...prevState, lastNameIsValid: false };
      });
    } else if (lastNameState.trim() !== "") {
      setIsValid((prevState) => {
        return { ...prevState, lastNameIsValid: true };
      });
    }
    if (emailState.trim() === "") {
      setIsValid((prevState) => {
        return { ...prevState, emailIsValid: false };
      });
    } else if (emailState.trim() !== "") {
      setIsValid((prevState) => {
        return { ...prevState, emailIsValid: true };
      });
    }

    if (passwordState.trim() === "") {
      setIsValid((prevState) => {
        return { ...prevState, passwordIsValid: false };
      });
    } else if (passwordState.trim() === "") {
      setIsValid((prevState) => {
        return { ...prevState, passwordIsValid: true };
      });
    }
  };

  return (
    <div className={classes.signup__container}>
      <Logo />
      <form
        onSubmit={submitInputHandler}
        className={classes["signup__form-container"]}
      >
        <div
          className={
            firstNameIsValidState
              ? classes["signup__form-controls"]
              : classes.signup__invalid
          }
        >
          <label htmlFor="firstName">
            First Name<span>*</span>
            <input
              type="text"
              value={firstNameState}
              name="firstName"
              placeholder="Input your first name"
              onChange={inputChangeHandler}
            ></input>
            {!firstNameIsValidState && (
              <p className={classes.invalid__message}>
                Please enter your first name.
              </p>
            )}
          </label>
        </div>

        <div
          className={
            lastNameIsValidState
              ? classes["signup__form-controls"]
              : classes.signup__invalid
          }
        >
          <label htmlFor="lastName">
            Last Name<span>*</span>
            <input
              type="text"
              name="lastName"
              value={lastNameState}
              placeholder="Input your last name"
              onChange={inputChangeHandler}
            ></input>
            {!lastNameIsValidState && (
              <p className={classes.invalid__message}>
                Please enter your last name
              </p>
            )}
          </label>
        </div>
        <div
          className={
            emailIsValidState
              ? classes["signup__form-controls"]
              : classes.signup__invalid
          }
        >
          <label htmlFor="email">
            Email<span>*</span>
            <input
              type="email"
              value={emailState}
              name="email"
              placeholder="Input your email"
              onChange={inputChangeHandler}
            ></input>
            {!emailIsValidState && (
              <p className={classes.invalid__message}>
                Please enter your last name
              </p>
            )}
          </label>
        </div>
        <div
          className={
            passwordIsValidState
              ? classes["signup__form-controls"]
              : classes.signup__invalid
          }
        >
          <label htmlFor="password">
            Password<span>*</span>
            <input
              type="password"
              value={passwordState}
              name="password"
              placeholder="Enter at least 6 characters"
              onChange={inputChangeHandler}
            ></input>
            {!passwordIsValidState && (
              <p className={classes.invalid__message}>
                Please enter your password
              </p>
            )}
          </label>
        </div>
        <div className={classes.signup__cta}>
          <button>Sign Up</button>
          <Link to="/login">Already have an account? Click here</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
