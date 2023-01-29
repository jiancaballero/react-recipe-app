import React from "react";
import "./RecipeList.css";
import Favorite from "./RecipeItem";
import RecipeItem from "./RecipeItem";

const FavoriteList = ({ recipes }) => {
  recipes.map((recipe) => console.log(recipe.id));
  return (
    <div className="recipeList__container">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.recipe.id}
          recipeID={recipe.id}
          id={recipe.recipe._links.self.href}
          image={recipe.recipe.recipe?.image}
          name={recipe.recipe.recipe?.label}
          calories={recipe.recipe.recipe?.calories}
          time={recipe.recipe.recipe?.totalTime}
          mealType={recipe.recipe?.mealType}
          dishType={recipe.recipe.recipe?.dishType}
          cuisineType={recipe.recipe.recipe?.cuisineType}
        />
      ))}
    </div>
  );
};

export default FavoriteList;
