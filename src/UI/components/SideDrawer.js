import React, { useContext } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./SideDrawer.css";
import { MdLogout } from "react-icons/md";
import { FaHeart, FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store/auth-slice";

const SideDrawer = () => {
  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();
  return (
    <div className="side-drawer">
      <ul>
        <li>
          <NavLink className=".active" to={`/home`}>
            <FaHome />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className=".active" to={`/favorites`}>
            <FaHeart />
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={() => dispatch(authActions.logout())}>
            <MdLogout />
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
