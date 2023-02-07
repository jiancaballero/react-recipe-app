import React, { useCallback, useEffect, useState, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../../redux/store/recipe-slice";

const RecipeItem = (props) => {
  const { id } = props;
  const uid = useSelector((state) => state.auth.uid);
  const token = useSelector((state) => state.auth.token);

  const [recipeData, setRecipeData] = useState({});
  const [isFavorite, setIsFavorite] = useState(!!props.isFavorite);

  const dispatch = useDispatch();
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
      axios({
        method: "POST",
        url: `http://localhost:8080/api/recipes/${uid}`,
        data: { recipe: recipeData },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.status == 201) {
            alert(res.data.message);
            setIsFavorite(!isFavorite);
            dispatch(recipeActions.addToFavorites(res.data.recipe));
          } else {
            alert(res.error.message);
          }
        })
        .catch((err) => alert(err.message));
    }
  }, [recipeData]);

  // GET ALL RECIPES FROM THIRD PARTY API
  const addToFavoriteHandler = () => {
    axios.get(props.id).then((res) => {
      if (res.status == 200) {
        setRecipeData(res.data);
      }
    });
  };

  // REMOVING RECIPES TO DATABASE
  const removeFromFavoriteHandler = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:8080/api/recipes/${props.recipeID}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          alert(res.data.message);
          dispatch(recipeActions.removeFromFavorites(props.recipeID));
        } else {
          alert(res.error);
        }
      })
      .catch((err) => alert(err.message));
    setIsFavorite(!isFavorite);
  };

  // SHOWING BUTTON DEPENDING ON THE ISFAVORITE STATE
  const favoriteButton = isFavorite ? (
    <button
      onClick={removeFromFavoriteHandler}
      style={{
        background: "var(--primary)",
        color: "var(--primary-opacity",
      }}
    >
      <FaHeart /> REMOVE FROM FAVORITES
    </button>
  ) : (
    <button onClick={addToFavoriteHandler}>
      <FaHeart /> ADD TO FAVORITES
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
            to={`/recipe/details/${props.id}`}
            state={{
              recipeID: id,
              favorited: isFavorite,
              id: props.id,
              favoriteID: props.recipeID,
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
