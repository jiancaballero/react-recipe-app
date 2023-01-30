import React, { useContext } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./SideDrawer.css";
import { MdLogout } from "react-icons/md";
import { FaHeart, FaHome } from "react-icons/fa";
import { AuthContext } from "../../context/auth-context";

const SideDrawer = () => {
  const { uid } = useParams();
  const auth = useContext(AuthContext);
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
          <NavLink onClick={() => auth.logout()}>
            <MdLogout />
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
