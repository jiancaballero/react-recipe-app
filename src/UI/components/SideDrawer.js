import React, { useContext } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./SideDrawer.css";
import { MdLogout } from "react-icons/md";
import { FaHeart, FaHome } from "react-icons/fa";

const SideDrawer = () => {
  const { uid } = useParams();
  return (
    <div className="side-drawer">
      <ul>
        <li>
          <NavLink className=".active" to={`/${uid}/home`}>
            <FaHome />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className=".active" to={`/${uid}/favorites`}>
            <FaHeart />
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <MdLogout />
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
