import React, { useEffect, useState } from "react";
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
import Spinner from "../../UI/components/Spinner";

const RecipeItem = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { uid } = useParams();
  const { id } = props;
  const [recipeData, setRecipeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
            setIsFavorite(res.data.isFavorite);
          } else {
            alert(res.error);
          }
        });
    }
  }, [recipeData]);
  const addToFavoriteHandler = () => {
    axios.get(props.id).then((res) => {
      if (res.status == 200) {
        setRecipeData(res.data);
      }
    });
  };
  // TODO: get the id from
  const removeFromFavoriteHandler = () => {
    axios
      .delete(`http://localhost:8080/api/recipes/${props.recipeID}`)
      .then((res) => {
        if (res.status == 200) {
          alert(res.data.message);
        } else {
          alert(res.error);
        }
      });
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
            to={`/recipe/details/${uid}/${props.id}`}
            state={{ recipeID: id, favorited: isFavorite }}
          >
            <div>View Details</div>
          </Link>
          <button onClick={addToFavoriteHandler}>
            <FaHeart /> ADD FROM FAVORITES
          </button>
          <button
            onClick={removeFromFavoriteHandler}
            style={{
              background: "var(--primary)",
              color: "var(--primary-opacity",
            }}
          >
            <FaHeart /> REMOVE FROM FAVORITES
          </button>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(RecipeItem);
