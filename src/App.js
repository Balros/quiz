import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error from "./components/error";
import Home from "./components/home";
import Header from "./components/header/header";
import {
  UserTypeContext,
  userTypes
} from "./components/common/user-type-context";
import NewQuestion from "./components/question/new-question";
import QuestionsOverview from "./components/topics/topics-overview";
import EditQuestion from "./components/question/question-overview";
import CreateQuestionAssignment from "./components/topics/new-question-assignment";
import NewTopic from "./components/topics/new-topic";
import { Container, Row, Col } from "reactstrap";
import QuizAssignmentsOverview from "./components/quiz/quiz-assignments-overview";
import NewQuizAssignment from "./components/quiz/new-quiz-assignment";

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleUserType = () => {
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
        <BrowserRouter basename="/~grund">
          <React.Fragment>
            <Header />
            <Container>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <Switch>
                    <Route path="/" component={Home} exact />
                    <Route
                      path="/questionGroups"
                      component={QuestionsOverview}
                    />
                    />
                    <Route path="/newQuestion/:id" component={NewQuestion} />
                    <Route path="/newQuestion" component={NewQuestion} exact />
                    <Route path="/createTopic" component={NewTopic} />
                    <Route path="/question/:id" component={EditQuestion} />
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
        </BrowserRouter>
      </UserTypeContext.Provider>
    );
  }
}

export default App;
