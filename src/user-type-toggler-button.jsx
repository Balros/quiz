import { UserTypeContext } from "./user-type-context.jsx";
import React from "react";

function UserTypeTogglerButton() {
  // The UserType Toggler Button receives not only the theme
  // but also a toggleUserType function from the context
  return (
    <UserTypeContext.Consumer>
      {({ userType, toggleUserType }) => (
        <button onClick={toggleUserType}>Toggle User - {userType}</button>
      )}
    </UserTypeContext.Consumer>
  );
}

export default UserTypeTogglerButton;
