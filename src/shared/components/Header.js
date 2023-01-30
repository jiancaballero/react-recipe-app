import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../UI/components/Avatar";
import Logo from "../../UI/components/Logo";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <div className={classes.header__container}>
      <Logo />
     
      <Avatar />
    </div>
  );
};

export default Header;
