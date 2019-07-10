import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/questionGroups">Topics overview</NavLink>
      </li>
      <li>
        <NavLink to="/quizAssignmentsOverview">
          Quiz assignments overview
        </NavLink>
      </li>
    </ul>
  );
};
export default Navigation;
