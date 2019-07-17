import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as NV } from "react-router-dom";

const Navigation = () => {
  return (
    <Nav vertical>
      <NavItem>
        <NavLink tag={NV} to="/questionGroups">
          Questions
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={NV} to="/quizAssignmentsOverview">
          Quiz
        </NavLink>
      </NavItem>
    </Nav>
  );
};
export default Navigation;
