import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/components/Card";
import {
  FaFireAlt,
  FaRegClock,
  FaRegCheckCircle,
  FaHeart,
  FaArrowLeft,
  FaRegHeart,
} from "react-icons/fa";
import "./RecipeItem.css";

const RecipeItem = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const recipeID = props.id;
  const calorie = isNaN(Math.floor(props.calories))
    ? "No calories"
    : Math.floor(props.calories) + " calories";
  const time = props.time > 0 ? props.time + "minute/s" : "less than a minute";
  const cuisineType = props.cuisineType&&props.cuisineType.map((cuisine) => {
    return <span>{cuisine}</span>;
  });
  const dishType = props.dishType&&props.dishType.map((dish) => {
    return <span>{dish}</span>;
  });
  const mealType = props.mealType&&props.mealType.map((meal) => {
    return <span>{meal}</span>;
  });

  const updateIsFavoriteHandler = (favorite) => {
    setIsFavorite(favorite);
  };
  return (
    <Card className="recipe-item-container">
      <div className="recipe-card-header">
        <div>
          <img src={props.image} alt="not available" />
        </div>
      </div>
      <div className="recipe-card-body">
        <div className="recipe-title">
          <h1>{props.name}</h1>
        </div>
        <div className="recipe-details">
          <div className="recipe-tag__calorie-time">
            <span>
              <FaFireAlt />
              {calorie}
            </span>
            <span>
              <FaRegClock />
              {time}
            </span>
          </div>
        </div>
        <div className="recipe-tag-group">
          {cuisineType}
          {dishType}
          {mealType}
        </div>
      </div>
      <div className="recipe-card-action">
        <div className="favorites-button-group">
          <Link
            to={`/recipe/details/${props.id}`}
            state={{recipeID:recipeID,favorite:isFavorite}}
          >
          
            <div>View Details</div>
          </Link>
          {!isFavorite && (
            <button
              onClick={() => setIsFavorite(true)}
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
          {isFavorite && (
            <button
              onClick={() => setIsFavorite(false)}
              style={{
                background: "var(--primary)",
                color: "var(--primary-opacity",
              }}
            >
              <FaHeart /> REMOVE FROM FAVORITES
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RecipeItem;
