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
      <li>
        <NavLink to="/createTopic">Create topic</NavLink>
      </li>
      <li>
        <NavLink to="/newQuiz">New quiz</NavLink>
      </li>
    </ul>
  );
};
export default Navigation;
