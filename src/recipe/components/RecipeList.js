import React from "react";
import classes from "./RecipeList.module.css";
import RecipeItem from "./RecipeItem";

const RecipeList = (props) => {
  return (
    <div className={classes.recipeList}>
      {props.recipes.map((recipe) => (
        <RecipeItem
          name={recipe.recipe?.label}
          image={recipe.recipe?.image}
          calories={recipe.recipe?.calories}
          time={recipe?.time}
          cuisineType={recipe.recipe?.cuisineType}
          mealType={recipe.recipe?.mealType}
          dishType={recipe.recipe?.dishType}
        />
      ))}
    </div>
  );
};

export default RecipeList;
