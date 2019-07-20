import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Error from "./components/error";
import Home from "./components/home";
import TopNav from "./components/header/top-nav";
import {
  UserTypeContext,
  userTypes
} from "./components/common/user-type-context";
import NewQuestion from "./components/question/new-question";
import TopicsOverview from "./components/topics/topics-overview";
import EditQuestion from "./components/question/question-overview";
import CreateQuestionAssignment from "./components/topics/new-question-assignment";
import NewTopic from "./components/topics/new-topic";
import { Container, Row, Col } from "reactstrap";
import QuizAssignmentsOverview from "./components/quiz/quiz-assignments-overview";
import NewQuizAssignment from "./components/quiz/new-quiz-assignment";
import QuizTake from "./components/quiz/quiz-take";
import SideNav from "./components/header/side-nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: localStorage.getItem("userType"),
      toggleUserType: this.toggleUserType
    };
  }
  toggleUserType = () => {
    localStorage.setItem(
      "userType",
      localStorage.getItem("userType") === userTypes.student1
        ? userTypes.student2
        : localStorage.getItem("userType") === userTypes.student2
          ? userTypes.teacher
          : userTypes.student1
    );
    this.setState({
      userType: localStorage.getItem("userType")
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.userType !== prevState.userType) {
      localStorage.setItem("userType", this.state.userType);
      window.location.reload();
    }
  }
  render() {
    return (
      <UserTypeContext.Provider value={this.state}>
        <HashRouter>
          <React.Fragment>
            <Container>
              <TopNav />
              <Row>
                <Col xs="12" md="2">
                  <SideNav />
                </Col>
                <Col xs="12" md="10">
                  <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/questionGroups" component={TopicsOverview} />
                    <Route path="/newQuestion/:id" component={NewQuestion} />
                    <Route path="/newQuestion" component={NewQuestion} exact />
                    <Route path="/createTopic" component={NewTopic} />
                    <Route path="/question/:id" component={EditQuestion} />
                    <Route path="/quizTake/:id" component={QuizTake} />
                    <Route
                      path="/editQuestionAssignment/:id"
                      component={CreateQuestionAssignment}
                    />
                    <Route
                      path="/newQuestionAssignment"
                      component={CreateQuestionAssignment}
                    />
                    <Route
                      path="/newQuizAssignment/:id"
                      component={NewQuizAssignment}
                    />
                    <Route
                      path="/newQuizAssignment"
                      component={NewQuizAssignment}
                      exact
                    />
                    <Route
                      path="/quizAssignmentsOverview"
                      component={QuizAssignmentsOverview}
                    />
                    <Route component={Error} />
                  </Switch>
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        </HashRouter>
      </UserTypeContext.Provider>
    );
  }
}

export default App;
