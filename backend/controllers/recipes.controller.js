const express = require("express");
// GET ALL FAVORITE RECIPES
const getAllRecipes = (req, res, next) => {
  res.send("GETTING ALL RECIPES WORKING");
  return;
};

//ADDING FAVORITE RECIPE
const addFavoriteRecipe = (req, res, next) => {
  const recipeID = req.params.rid;
  res.send(`ADDING FAVORITE ${recipeID}`);
  return;
};

// REMOVING FAVORITE RECIPE
const removeFavoriteRecipe = (req, res, next) => {
  const recipeID = req.params.rid;
  res.send(`REMOVING FAVORITE ${recipeID}`);
  return;
};

module.exports = {
  getAllRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
};
