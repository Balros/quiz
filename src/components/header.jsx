import React from "react";
import Navigation from "./Navigation";
import UserTypeTogglerButton from "../user-type-toggler-button";

const Header = () => {
  return (
    <div>
      <Navigation />
      <UserTypeTogglerButton />
    </div>
  );
};
export default Header;
