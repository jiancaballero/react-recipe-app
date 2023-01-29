const express = require("express");

// USER SIGN UP
const signup = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
};
// USER LOGIN
const login = (req, res, next) => {
  const { email, login } = req.body;
};

module.exports = {
  signup,
  login,
};
