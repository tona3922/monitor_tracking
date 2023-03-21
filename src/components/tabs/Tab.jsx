import React from "react";
import { NavLink } from "react-router-dom";
import "./tab.scss";

const Tab = () => {
  return (
    <div className="tab">
      <nav>
        <div className="navdiv">
          <NavLink to="/">nav1</NavLink>
        </div>
        <div className="navdiv">
          <NavLink to="/nav2">nav2</NavLink>
        </div>
        <div className="navdiv">
          <NavLink to="/nav3">nav3</NavLink>
        </div>
        <div className="navdiv">
          <NavLink to="/nav4">nav4</NavLink>
        </div>
      </nav>
      <button>
        <div className="Add-btn">Add device</div>
      </button>
    </div>
  );
};
export default Tab;
