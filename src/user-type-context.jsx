import React from "react";
export const userTypes = {
  teacher: "teacher",
  student: "student"
};
Object.freeze(userTypes);

export const UserTypeContext = React.createContext({
  userType: userTypes.teacher,
  toggleUserType: () => {}
});
