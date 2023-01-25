import React from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/components/Card";
import classes from "./RecipeItem.module.css";
const RecipeItem = (props) => {
  return (
    <Card className={classes.container}>
      <div className={classes.recipe__image}>
        <img src={props.image} alt={props.name} />
      </div>

      <div className={classes.recipe__details}>
        <h1>{props.name}</h1>
        <div className={classes["recipe__calorie-time"]}>
          <div>
            <span>O</span>
            <span>{Math.floor(props.calories)}</span>
          </div>
          <div>
            <span>0</span>
            <span>{props.time} min/s</span>
          </div>
        </div>
        <div className={classes.recipe__tags}>
          {props.cuisineType.length > 0 &&
            props.cuisineType.map((cuisine) => <span>{cuisine}</span>)}
          {props.mealType.length > 0 &&
            props.mealType.map((meal) => <span>{meal}</span>)}
          {props.dishType.length > 0 &&
            props.dishType.map((dish) => <span>{dish}</span>)}
        </div>
        <div className={classes.recipe__cta}>
          <Link>View More</Link>
          <button>Favorites</button>
        </div>
      </div>
    </Card>
  );
};

export default RecipeItem;
