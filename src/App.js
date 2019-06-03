import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import NewQuestion from "./components/new-question.jsx";
import Home from "./components/home.jsx";
import QuestionsOverview from "./components/question-overview.jsx";
import EditQuestion from "./components/edit-question.jsx";
import Error from "./components/error.jsx";
import CreateQuestionAssignment from "./components/create-question-assignment.jsx";
import { UserTypeContext, userTypes } from "./user-type-context";
import Header from "./components/header.jsx";
import { Container, Row, Col } from "reactstrap";
import CreateTopic from "./components/create-topic.jsx";
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
            <Container>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
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
                    <Route path="/createTopic" component={CreateTopic} />
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
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        </BrowserRouter>
      </UserTypeContext.Provider>
    );
  }
}

export default App;
