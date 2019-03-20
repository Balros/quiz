import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/newQuestion">NewQuestion</NavLink>
      </li>
      <li>
        <NavLink to="/questionGroups">Question groups</NavLink>
      </li>
    </ul>
  );
};
export default Navigation;
