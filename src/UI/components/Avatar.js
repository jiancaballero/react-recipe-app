import React from "react";
import classes from "./Avatar.module.css";

const Avatar = () => {
  return (
    <button className={classes.avatar__container}>
      <div className={classes.avatar__image}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjkgdYCnQi5QBnFmf9C7CPUbaNXBhnORZRQQ&usqp=CAU" />
      </div>
      <h2>User</h2>
    </button>
  );
};

export default Avatar;
