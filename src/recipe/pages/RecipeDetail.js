import React, { Fragment, useState, useEffect } from "react";
import Header from "../../shared/components/Header";
import {
  FaFireAlt,
  FaRegClock,
  FaRegCheckCircle,
  FaHeart,
  FaArrowLeft,
  FaRegHeart,
} from "react-icons/fa";
import classes from "./RecipeDetail.module.css";
import { Link } from "react-router-dom";
import book from "../../assets/images/book.png";
import ingredientImage from "../../assets/images/ingredients.png";
import nutritionImage from "../../assets/images/nutirtion.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
const RecipeDetail = (props) => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const recipeID = location.state.recipeID;
  const favorited = location.state.favorited;
  const updateIsFavoriteHandler = () => {
    if (favorited) {
      location.state.updateIsFavorite(false);
    } else {
      location.state.updateIsFavorite(true);
    }
  };
  const calorie = isNaN(Math.floor(recipes.calories))
    ? "No calories"
    : Math.floor(recipes.calories) + " calories";
  const time =
    recipes.time > 0 ? recipes.time + "minute/s" : "less than a minute";
  const cuisineType =
    recipes.cuisineType &&
    recipes.cuisineType.map((cuisine) => {
      return <span>{cuisine}</span>;
    });
  const dishType =
    recipes.cuisineType &&
    recipes.dishType.map((dish) => {
      return <span>{dish}</span>;
    });
  const mealType =
    recipes.cuisineType &&
    recipes.mealType.map((meal) => {
      return <span>{meal}</span>;
    });
  const ingredients =
    recipes.ingredientLines &&
    recipes.ingredientLines.map((ingredient) => {
      return (
        <li>
          <span>
            <FaRegCheckCircle />
            {ingredient}
          </span>
        </li>
      );
    });

  const nutrients =
    recipes.totalNutrients &&
    Object.entries(recipes.totalNutrients).map(([keys, value]) => {
      return (
        <li>
          {value.label} - {Math.floor(value.quantity)}
          {value.unit}
        </li>
      );
    });

  useEffect(() => {
    const getRecipeDetail = async () => {
      try {
        const response = await axios
          .get(recipeID)
          .catch((err) => console.log(err));
        console.log(response);
        setRecipes(response.data.recipe);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipeDetail();
  }, [recipeID]);

  return (
    <Fragment>
      <Header />
      <div className={classes.recipe__container}>
        <div className={classes["recipe-image"]}>
          <div className={classes["recipe-image__container"]}>
            <img src={recipes.image} alt="" />
          </div>
        </div>
        <div className={classes["recipe-details"]}>
          <h1>{recipes.label}</h1>
          <div className={classes["recipe-tag__calorie-time"]}>
            <div>
              <span>
                <FaFireAlt />
              </span>
              <span>{calorie}</span>
            </div>
            <div>
              <span>
                <FaRegClock />
              </span>
              <span>{time}</span>
            </div>
          </div>
          <div className={classes["recipe-tag-group"]}>
            {cuisineType}
            {dishType}
            {mealType}
          </div>
        </div>

        <div className={classes["recipe__preparation"]}>
          <div>
            <img src={book} />
          </div>
          <h3>How to prepare?</h3>
          <p>
            View recipe on <a href={recipes.url}>{recipes.source}</a>
          </p>
        </div>
        <div className={classes["recipe-ingredients"]}>
          <div>
            <img src={ingredientImage} />
          </div>
          <h3>Ingredients</h3>
          <ul>{ingredients}</ul>
        </div>
        <div className={classes["recipe-nutritional-facts"]}>
          <div>
            <img src={nutritionImage} />
          </div>
          <h3>Nutrional facts</h3>
          <ul>{nutrients}</ul>
        </div>

        <div className={classes["favorites-button-group"]}>
          {!favorited && (
            <button
              onClick={updateIsFavoriteHandler}
              style={{
                color: "var(--primary)",
                background: "#fff",
                border: "1px solid var(--primary)",
              }}
            >
              <div>
                <FaRegHeart />
                Add to favorites
              </div>
            </button>
          )}
          {favorited && (
            <button
              onClick={updateIsFavoriteHandler}
              style={{
                background: "var(--primary)",
                color: "var(--primary-opacity",
              }}
            >
              <FaHeart /> REMOVE FROM FAVORITES
            </button>
          )}
          <Link to="/home">
            <span>
              <FaArrowLeft /> Back to Search Recipes
            </span>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeDetail;
