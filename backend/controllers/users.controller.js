const express = require("express");
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// USER SIGN UP
const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    recipe: [],
  });
  try {
    await createdUser.save();
  } catch (error) {
    res.status(500).send({ message: "Email already exists" });
    return next(error);
  }
  // GENERATE SIGNUP TOKEN
  let token;
  try {
    token = jwt.sign(
      {
        uid: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        password: createdUser.email,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: "1hr" }
    );
  } catch (error) {
    res.status(500).json({ message: "Sign up failed. Please try again" });
  }

  res.status(201).json({
    uid: createdUser.id,
    firstName: createdUser.firstName,
    lastName: createdUser,
    email: createdUser.email,
    token,
  });
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
  if (!existingUser) {
    res
      .status(500)
      .json({ message: "Login failed! Please check your email or password" });
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Login failed! Invalid email or password." });
  }

  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid email or password" });
  }
  let token;
  try {
    token = jwt.sign(
      {
        uid: existingUser.id,
        email: existingUser.email,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: "1hr" }
    );
  } catch (error) {
    res.status(500).json({ message: "Login failed. Please try again" });
  }
  res.status(201).json({
    message: "Login successful",
    uid: existingUser.id,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
    token,
  });
};

module.exports = {
  signup,
  login,
};
