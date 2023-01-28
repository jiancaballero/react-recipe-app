import React, { Fragment } from "react";
import Header from "../../shared/components/Header";
import {
  FaFireAlt,
  FaRegClock,
  FaRegCheckCircle,
  FaHeart,
  FaArrowLeft,
  FaRegHeart
} from "react-icons/fa";
import classes from "./RecipeDetail.module.css";
import { Link } from "react-router-dom";
import book from "../../assets/images/book.png";
import ingredient from "../../assets/images/ingredients.png";
import nutrition from "../../assets/images/nutirtion.png";
const RecipeDetail = () => {
  return (
    <Fragment>
      <Header />
      <div className={classes.recipe__container}>
        <div className={classes["recipe-image"]}>
          <div className={classes["recipe-image__container"]}>
            <img
              src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg"
              alt=""
            />
          </div>
        </div>
        <div className={classes["recipe-details"]}>
          <h1>Recipe Name</h1>
          <div className={classes["recipe-tag__calorie-time"]}>
            <div>
              <span>
                <FaFireAlt />
              </span>
              <span>calories</span>
            </div>
            <div>
              <span>
                <FaRegClock />
              </span>
              <span>minute/s</span>
            </div>
          </div>
          <div className={classes["recipe-tag-group"]}>
            <span>
              <p>Tags 123456</p>
            </span>
            <span>
              <p>Tags1234</p>
            </span>
            <span>
              <p>Tags1223</p>
            </span>
          </div>
        </div>

        <div className={classes["recipe__preparation"]}>
          <div>
            <img src={book} />
          </div>
          <h3>How to prepare?</h3>
          <p>
            View recipe on <a href="">here</a>
          </p>
        </div>
        <div className={classes["recipe-ingredients"]}>
          <div>
            <img src={ingredient} />
          </div>
          <h3>Ingredients</h3>
          <ul>
            <li>
              <span>
                <FaRegCheckCircle />
                Ingredient 323kki
              </span>
            </li>
            <li>
              <span>
                <FaRegCheckCircle />
                Ingredient 323kki
              </span>
            </li>
            <li>
              <span>
                <FaRegCheckCircle />
                Ingredient 23
              </span>
            </li>
          </ul>
        </div>
        <div className={classes["recipe-nutritional-facts"]}>
          <div>
            <img src={nutrition} />
          </div>
          <h3>Nutrional facts</h3>
          <ul>
            <li>Fact 1</li>
            <li>Fact frefee2</li>
            <li>Fact 3 </li>
            <li>Fact 1</li>
            <li>Fact frefee2</li>
            <li>Fact 3 </li>
            <li>Fact 1</li>
            <li>Fact frefee2</li>
            <li>Fact 3 </li>
          </ul>
        </div>

        <div className={classes["favorites-button-group"]}>
          <button>
            <span>
              <FaRegHeart />
              Add to favorites
            </span>
          </button>
          <Link to="/home">
            <span>
              <FaArrowLeft /> Back to Search Recipes
            </span>
          </Link>
          {/* <button><FaHeart/> Add to favorites</button> */}
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeDetail;
