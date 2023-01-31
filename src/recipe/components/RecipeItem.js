import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import axios from "axios";

const RecipeItem = (props) => {
  const { uid } = useParams();
  const { id } = props;
  const [recipeData, setRecipeData] = useState({});
  const [isFavorite, setIsFavorite] = useState(!props.isFavorite);
  const calorie = isNaN(Math.floor(props.calories))
    ? "No calories"
    : Math.floor(props.calories) + " calories";
  const time = props.time > 0 ? props.time + "minute/s" : "less than a minute";
  const cuisineType =
    props.cuisineType &&
    props.cuisineType.map((cuisine) => {
      return <span>{cuisine}</span>;
    });
  const dishType =
    props.dishType &&
    props.dishType.map((dish) => {
      return <span>{dish}</span>;
    });
  const mealType =
    props.mealType &&
    props.mealType.map((meal) => {
      return <span>{meal}</span>;
    });

  // ADDING RECIPE TO DATABASE
  useEffect(() => {
    if (Object.keys(recipeData).length !== 0) {
      axios
        .post(`http://localhost:8080/api/recipes/${uid}`, {
          recipe: recipeData,
        })
        .then((res) => {
          if (res.status == 201) {
            console.log(res);
            alert(res.data.message);
          } else {
            alert(res.error);
          }
        });
    }
  }, [recipeData]);

  // GET ALL FAVORITES FROM DATABASE
  const addToFavoriteHandler = useCallback(() => {
    axios.get(props.id).then((res) => {
      if (res.status == 200) {
        setRecipeData(res.data);
        setIsFavorite(!isFavorite);
      }
    });
  }, [props.id]);

  // REMOVING RECIPES TO DATABASE
  const removeFromFavoriteHandler = useCallback(() => {
    axios
      .delete(`http://localhost:8080/api/recipes/${props.recipeID}`)
      .then((res) => {
        if (res.status == 200) {
          alert(res.data.message);
          setIsFavorite(!isFavorite);
        } else {
          alert(res.error);
        }
      });
  }, [props.recipeID]);

  // SHOWING BUTTON DEPENDING ON THE ISFAVORITE STATE
  const favoriteButton = !!isFavorite ? (
    <button onClick={addToFavoriteHandler}>
      <FaHeart /> ADD TO FAVORITES
    </button>
  ) : (
    <button
      onClick={removeFromFavoriteHandler}
      style={{
        background: "var(--primary)",
        color: "var(--primary-opacity",
      }}
    >
      <FaHeart /> REMOVE FROM FAVORITES
    </button>
  );
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
            to={`/recipe/details/${uid}/${props.id}`}
            state={{
              recipeID: id,
              favorited: isFavorite,
              recipeData: recipeData,
              id: props.id,
            }}
          >
            <div>View Details</div>
          </Link>
          {favoriteButton}
        </div>
      </div>
    </Card>
  );
};

export default React.memo(RecipeItem);
