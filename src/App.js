import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewQuestion from "./components/NewQuestion";
import Home from "./components/Home";
import QuestionsOverview from "./components/QuestionsOverview.jsx";
import EditQuestion from "./components/EditQuestion";
import Error from "./components/Error";
import CreateQuestionAssignment from "./components/CreateQuestionAssignment";
import { UserTypeContext, userTypes } from "./user-type-context";
import Header from "./components/header";

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleUserType = () => {
      localStorage.setItem(
        "userType",
        localStorage.getItem("userType") === userTypes.student
          ? userTypes.teacher
          : userTypes.student
      );
      this.setState({
        userType: localStorage.getItem("userType")
      });
    };
    this.state = {
      userType: localStorage.getItem("userType"),
      toggleUserType: this.toggleUserType
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.userType !== prevState.userType) {
      localStorage.setItem("userType", this.state.userType);
    }
  }
  render() {
    return (
      <UserTypeContext.Provider value={this.state}>
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route
                path="/questionGroups"
                render={() => (
                  <QuestionsOverview
                    userType={localStorage.getItem("userType")}
                  />
                )}
              />
              <Route path="/newQuestion" component={NewQuestion} />
              <Route path="/question/:id" component={EditQuestion} />
              <Route
                path="/editQuestionAssignment/:id"
                component={CreateQuestionAssignment}
              />
              <Route
                path="/newQuestionAssignment"
                component={CreateQuestionAssignment}
              />
              <Route component={Error} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </UserTypeContext.Provider>
    );
  }
}

export default App;
