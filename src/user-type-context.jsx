import React from "react";
export const userTypes = {
  teacher: "http://www.semanticweb.org/semanticweb#Teacher",
  student1: "http://www.semanticweb.org/semanticweb#Adam",
  student2: "http://www.semanticweb.org/semanticweb#Course_student_2"
};
Object.freeze(userTypes);

export const UserTypeContext = React.createContext({
  userType: userTypes.teacher,
  toggleUserType: () => {}
});
