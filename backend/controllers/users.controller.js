const express = require("express");
const User = require("../models/users.model");

// USER SIGN UP
const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  const createdUser = new User({
    firstName,
    lastName,
    email,
    password,
    recipe: [],
  });
  try {
    await createdUser.save();
  } catch (error) {
    res.status(500).send({ message: "Email already exists" });
    return next(error);
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

// USER LOGIN
const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    res.status(500).json({ message: "Login failed! Please try again later" });
  }
  if (!existingUser || existingUser.password !== password) {
    res
      .status(500)
      .json({ message: "Login failed! Please check your email or password" });
  } else {
    res.status(201).json({
      isLoggedIn: true,
      message: "Login successful",
      userData: existingUser.toObject({ getters: true }),
    });
  }
};

module.exports = {
  signup,
  login,
};
