const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ikwmk4d.mongodb.net/test${process.env.DB_NAME}`
  )
  .then(() => console.log("CONNECTED TO MONGO DB SUCCESSFULLY"))
  .catch((err) => console.log(err));

// SCHEMA MODEL
const Recipe = require("../models/recipes.models");
const User = require("../models/users.model");

// GET ALL FAVORITE RECIPES
const getAllRecipes = async (req, res, next) => {
  const userID = req.params.uid;

  let recipes;
  try {
    recipes = await Recipe.find({ uid: userID });
  } catch (error) {
    res.send(error.message);
  }
  res
    .status(200)
    .json(recipes.map((recipe) => recipe.toObject({ getters: true })));
};

//ADDING FAVORITE RECIPE
const addFavoriteRecipe = async (req, res, next) => {
  const { recipe } = req.body;
  const uid = req.params.uid;
  const favoritedRecipe = new Recipe({
    uid,
    recipe,
    isFavorite: true,
  });
  let user;
  try {
    user = await User.findById(uid);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Adding to favorites failed, please try again." });
  }
  if (!user) {
    res.status(500).json({ message: "No user found" });
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await favoritedRecipe.save({ session });
    user.recipe.push(favoritedRecipe);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    res.send(error.message);
  }
  res.status(201).json({
    recipe: favoritedRecipe.toObject({ getters: true }),
    message: "Added to favorites successfully",
  });
};

// REMOVING FAVORITE RECIPE
const removeFavoriteRecipe = async (req, res, next) => {
  const _id = req.params.rid;
  let recipe;
  try {
    recipe = await Recipe.findById({ _id }).populate("uid");
  } catch (error) {
    res.send(error.message);
  }
  if (!recipe) {
    res.status(404).json({ message: "No Recipe Found" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  await recipe.remove({ session });
  recipe.uid.recipe.pull(recipe);
  await recipe.uid.save({ session });
  await session.commitTransaction();
  try {
    recipe.remove();
  } catch (error) {
    res
      .status(200)
      .json({ message: "Could not remove from favorites. Please try again" });
  }
  res.status(200).json({ message: "Removed from favorites successfully" });
};

module.exports = {
  getAllRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
};
