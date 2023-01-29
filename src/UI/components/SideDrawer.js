import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";
import { MdLogout } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
const SideDrawer = () => {
   
  return (
    <div className="side-drawer">
      <ul>
        <li>
          <Link to="/:id/favorites">
            {" "}
            <FaHeart />
            Favorites
          </Link>
        </li>
        <li>
          <Link to="/">
            {" "}
            <MdLogout />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
