import React from "react";
export const userTypes = {
  "http://www.semanticweb.org/semanticweb#Teacher": "teacher",
  "http://www.semanticweb.org/semanticweb#Adam": "student1",
  "http://www.semanticweb.org/semanticweb#Course_student_2": "student2"
};
Object.freeze(userTypes);

export const UserTypeContext = React.createContext({
  userType: userTypes.teacher,
  toggleUserType: () => {}
});
