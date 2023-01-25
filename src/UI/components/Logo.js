import React from "react";
import { FaUtensils, FaBook } from "react-icons/fa";
import "./Logo.css";
const Logo = (props) => {
  return (
    <div>
      <h1 className="logo-title">
        <FaUtensils className={`logo-primary ${props.className}`} />
        Recipe <span>App</span>{" "}
        <FaBook className={`logo-secondary ${props.className}`} />
      </h1>
    </div>
  );
};

export default Logo;
