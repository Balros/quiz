import React from "react";
import Navigation from "./navigation";
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
