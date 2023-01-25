import React from "react";
import Avatar from "../../UI/components/Avatar";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <div className={classes.header__container}>
      <h1>Logo</h1>
      <Avatar />
    </div>
  );
};

export default Header;
