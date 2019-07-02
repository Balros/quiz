import { UserTypeContext } from "../common/user-type-context";
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
