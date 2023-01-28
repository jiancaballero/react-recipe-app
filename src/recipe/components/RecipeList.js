import React from "react";
import "./RecipeList.css";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ recipes }) => {
 
  return (
    <div className="recipeList__container">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.recipe.uri}
          id={recipe.recipe?.uri}
          image={recipe.recipe?.image}
          name={recipe.recipe?.label}
          calories={recipe.recipe?.calories}
          time={recipe.recipe?.totalTime}
          mealType={recipe.recipe?.mealType}
          dishType={recipe.recipe?.dishType}
          cuisineType={recipe.recipe?.cuisineType}
        />
      ))}
    </div>
  );
};

export default RecipeList;
