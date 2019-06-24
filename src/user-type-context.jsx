import React from "react";
export const userTypes = {
  teacher: "http://www.semanticweb.org/semanticweb#Teacher",
  student: "http://www.semanticweb.org/semanticweb#Adam"
};
Object.freeze(userTypes);

export const UserTypeContext = React.createContext({
  userType: userTypes.teacher,
  toggleUserType: () => {}
});
