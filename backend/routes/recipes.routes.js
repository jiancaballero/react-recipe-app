const express = require("express");
const router = express.Router();
const controllers = require("../controllers/recipes.controller");
// GET ALL FAVORITE RECIPES
router.get("/", controllers.getAllRecipes);
// ADDING FAVORITE RECIPE
router.post("/:rid", controllers.addFavoriteRecipe);
// REMOVING FAVORITE RECIPE
router.delete("/:rid", controllers.removeFavoriteRecipe);
module.exports = router;
