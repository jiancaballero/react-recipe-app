import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import classes from "./Avatar.module.css";
import SideDrawer from "./SideDrawer";

const Avatar = () => {
  const { uid } = useParams();
  const firstName = useSelector((state) => state.auth.firstName);
  const [showPanel, setShowPanel] = useState(false);
  const showPanelToggler = () => {
    !showPanel ? setShowPanel(true) : setShowPanel(false);
  };
  return (
    <>
      {showPanel && <SideDrawer />}
      <button onClick={showPanelToggler} className={classes.avatar__container}>
        <div className={classes.avatar__image}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjkgdYCnQi5QBnFmf9C7CPUbaNXBhnORZRQQ&usqp=CAU" />
        </div>
        <h2>Welcome, {firstName}</h2>
      </button>
    </>
  );
};

export default Avatar;
