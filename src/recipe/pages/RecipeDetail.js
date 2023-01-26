import React, { Fragment } from "react";
import Header from "../../shared/components/Header";
import {
  FaFireAlt,
  FaRegClock,
  FaRegCheckCircle,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import "./RecipeDetail.css";
const RecipeDetail = () => {
  return (
    <Fragment>
      <Header />
      <div className="recipe__container">
        <div className="recipe-image">
          <div className="recipe-image__container">
            <img
              src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg"
              alt=""
            />
          </div>
        </div>
        <div className="recipe-details">
          <h1>Recipe Name</h1>
          <div className="recipe-tag__calorie-time">
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
          <div className="recipe-tag__groups">
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
          <h3>How to prepare</h3>
          <p>
            View full recipe on <a href="">Link</a>
          </p>
        </div>
        <div className="recipe-ingredients">
          <h3>Ingredients</h3>
          <ul>
            <li>
              <span>
                <FaRegCheckCircle />
              </span>
              Ingredient 1
            </li>
            <li>
              <span>
                <FaRegCheckCircle />
              </span>
              Ingredient 2
            </li>
            <li>
              <span>
                <FaRegCheckCircle /> Ingredient 3
              </span>
            </li>
          </ul>
        </div>
        <div className="recipe-nutritional-facts">
          <h3>Nutrional facts</h3>
          <ul>
            <li>Fact 1</li>
            <li>Fact 2</li>
            <li>Fact 3 </li>
          </ul>
        </div>
        <div className="favorites__button">
          <button>
            <FaRegHeart /> Add to favorites
          </button>
          {/* <button><FaHeart/> Add to favorites</button> */}
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeDetail;
