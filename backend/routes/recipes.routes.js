const express = require("express");
const router = express.Router();
const controllers = require("../controllers/recipes.controller");
// GET ALL FAVORITE RECIPES
router.get("/", controllers.getAllRecipes);
// ADDING FAVORITE RECIPE
router.post("/", controllers.addFavoriteRecipe);
// REMOVING FAVORITE RECIPE
router.delete("/", controllers.removeFavoriteRecipe);
module.exports = router;
