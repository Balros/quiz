import { UserTypeContext } from "./user-type-context.jsx";
import React from "react";

function UserTypeTogglerButton() {
  return (
    <UserTypeContext.Consumer>
      {({ userType, toggleUserType }) => (
        <button onClick={toggleUserType}>Toggle User - {userType}</button>
      )}
    </UserTypeContext.Consumer>
  );
}

export default UserTypeTogglerButton;
