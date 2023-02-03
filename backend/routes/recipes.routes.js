const express = require("express");
const router = express.Router();
const controllers = require("../controllers/recipes.controller");
const checkAuth = require("../middleware/check-auth");
// GET ALL FAVORITE RECIPES
router.get("/:uid", controllers.getAllRecipes);

// MIDDLEWARE TO CHECK FOR AUTHENTICATED USERS
router.use(checkAuth);
// ADDING FAVORITE RECIPE
router.post("/:uid", controllers.addFavoriteRecipe);
// REMOVING FAVORITE RECIPE
router.delete("/:rid", controllers.removeFavoriteRecipe);
module.exports = router;
