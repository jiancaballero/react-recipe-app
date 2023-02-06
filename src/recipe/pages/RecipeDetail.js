import React, { Fragment, useState, useEffect, useCallback } from "react";
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
import { Link, useParams } from "react-router-dom";
import book from "../../assets/images/book.png";
import ingredientImage from "../../assets/images/ingredients.png";
import nutritionImage from "../../assets/images/nutirtion.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useHttp from "../../hooks/use-http";
import Spinner from "../../UI/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../../redux/store/recipe-slice";
const RecipeDetail = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [recipeData, setRecipeData] = useState({});
  const token = useSelector((state) => state.auth.token);
  const uid = useSelector((state) => state.auth.uid);
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.state.id;
  const recipeID = location.state.recipeID;
  const favoriteID = location.state.favoriteID;
  const [favorited, setIsFavorited] = useState(location.state.favorited);
  // API CALL using custom hook
  const { isLoading, hasError, sendRequest: fetchRecipeDetail } = useHttp();
  const getRecipeDetail = (recipeDetails) => {
    setRecipes(recipeDetails.data.recipe);
  };
  useEffect(() => {
    fetchRecipeDetail(
      {
        method: "GET",
        endpoint: recipeID,
      },
      getRecipeDetail
    );
  }, [fetchRecipeDetail, recipeID]);

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
      }).then((res) => {
        if (res.status == 201) {
          alert(res.data.message);
          dispatch(recipeActions.addToFavorites(res.data.recipe));
        } else {
          alert(res.error.message);
        }
      });
      setIsFavorited(!favorited);
    }
  }, [recipeData]);

  // GET ALL FAVORITES FROM DATABASE
  const addToFavoriteHandler = useCallback(() => {
    axios.get(id).then((res) => {
      if (res.status == 200) {
        setRecipeData(res.data);
      }
    });
  }, [id]);
  const removeFromFavoriteHandler = useCallback(() => {
    axios
      .delete(`http://localhost:8080/api/recipes/${favoriteID}`)
      .then((res) => {
        if (res.status == 200) {
          alert(res.data.message);
          setIsFavorited(!favorited);
          dispatch(recipeActions.removeFromFavorites(favoriteID));
        } else {
          alert(res.error.message);
        }
      });
  }, [favoriteID]);

  // SHOWING BUTTON DEPENDING ON THE ISFAVORITE STATE
  const favoriteButton = !!favorited ? (
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
    <Fragment>
      <Header />
      {isLoading && <Spinner />}
      {!isLoading && (
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
            {favoriteButton}
            <Link to={`/home`}>
              <span>
                <FaArrowLeft /> Back to Search Recipes
              </span>
            </Link>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RecipeDetail;
