const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  uid: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  recipe: { type: {}, required: true },
  isFavorite: { type: Boolean },
});

module.exports = mongoose.model("Recipe", recipeSchema);
