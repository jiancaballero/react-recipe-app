import React from "react";
import "./IconButton.css";
const IconButton = (props) => {
  return (
    <button className={`${"icon-button"} ${props.className}`}>
      {props.children}
    </button>
  );
};
export default IconButton;
