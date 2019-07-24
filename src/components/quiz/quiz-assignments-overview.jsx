import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardSubtitle,
  CardBody,
  CardLink,
  CardText,
  Collapse,
  Button,
  Row,
  Col
} from "reactstrap";
import { UserTypeContext } from "../common/user-type-context";
import { fetchQuizAssignments, fetchGenerateQuizTake } from "../../api-adapter";
import QuizTakeTable from "./quiz-take-table";

class AssignmentPreview extends React.Component {
  generateQuizTake = quizAssignmentId => {
    fetch(fetchGenerateQuizTake() + encodeURIComponent(quizAssignmentId), {
      method: "GET",
      headers: {
        token: this.context.userType
      }
    }).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.props.history.push("/quizTake/" + encodeURIComponent(data));
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  render() {
    let quizTakenReviewed = [];
    let quizTakenNotReviewed = [];
    if (this.props.quizTakes) {
      this.props.quizTakes.forEach(quiz => {
        quiz.isReviewed
          ? quizTakenReviewed.push(quiz)
          : quizTakenNotReviewed.push(quiz);
      });
    }
    return (
      <React.Fragment>
        <CardBody>
          <h2 className={"h3"}>{this.props.title}</h2>
          <CardLink href="#" onClick={this.props.toggle}>
            expand
          </CardLink>
        </CardBody>
        <Collapse isOpen={this.props.collapse}>
          <CardBody className="pt-0">
            <CardSubtitle tag={"h3"} className={"h4"}>
              Assignment
            </CardSubtitle>
            <CardText>{this.props.description}</CardText>
            <CardText>
              Start date:
              {" " + new Date(this.props.startTime).toLocaleDateString()}
            </CardText>
            <CardText>
              End date:
              {" " + new Date(this.props.endTime).toLocaleDateString()}
            </CardText>
            {this.props.isTeacher ? (
              <Button
                color="primary"
                tag={Link}
                to={"/newQuizAssignment/" + encodeURIComponent(this.props.id)}
              >
                Edit assignment
              </Button>
            ) : null}
          </CardBody>
          <CardBody>
            <CardSubtitle tag={"h3"} className={"h4"}>
              Quiz takes
            </CardSubtitle>
            <Row>
              {quizTakenNotReviewed ? (
                <Col xs="12" md="6">
                  <QuizTakeTable
                    headerText={"Submitted"}
                    authorHeader={"Author"}
                    questions={quizTakenNotReviewed}
                    link={"/quizTake/"}
                  />
                </Col>
              ) : null}
              {quizTakenReviewed ? (
                <Col xs="12" md="6">
                  <QuizTakeTable
                    headerText={"Scored"}
                    authorHeader={"Author"}
                    scoreHeader={"Score"}
                    questions={quizTakenReviewed}
                    link={"/quizTake/"}
                  />
                </Col>
              ) : null}
            </Row>
            {(new Date(this.props.startTime) < new Date() &&
              new Date(this.props.endTime) > new Date()) ||
            this.props.isTeacher ? (
              <Button
                color="primary"
                onClick={() => this.generateQuizTake(this.props.id)}
              >
                Take Quiz
              </Button>
            ) : null}
          </CardBody>
        </Collapse>
      </React.Fragment>
    );
  }
}

class QuizAssignmentsOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      assignmentCollapse: []
    };
  }
  toggle = index => e => {
    e.preventDefault();
    let updatedAssignmentCollapse = this.state.assignmentCollapse;
    updatedAssignmentCollapse[index] = !updatedAssignmentCollapse[index];
    this.setState({ assignmentCollapse: updatedAssignmentCollapse });
  };
  getAssignments = () => {
    fetch(fetchQuizAssignments(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: this.context.userType
      })
    }).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.setState({
              assignments: data,
              assignmentCollapse: new Array(data.length).fill(false)
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  componentDidMount() {
    this.getAssignments();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Quizzes</h1>
        <div>
          {this.state.assignments.map((assignment, index) => {
            return (
              <Card tag={"article"} key={assignment.id}>
                <AssignmentPreview
                  {...assignment}
                  isTeacher={
                    this.context.userType ===
                    "http://www.semanticweb.org/semanticweb#Teacher"
                      ? true
                      : false
                  }
                  toggle={this.toggle(index)}
                  collapse={this.state.assignmentCollapse[index]}
                  history={this.props.history}
                />
              </Card>
            );
          })}
          {this.context.userType ===
          "http://www.semanticweb.org/semanticweb#Teacher" ? (
            <Button color="success" tag={Link} to={"/newQuizAssignment"}>
              Create quiz assignment
            </Button>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

QuizAssignmentsOverview.contextType = UserTypeContext;
AssignmentPreview.contextType = UserTypeContext;

export default QuizAssignmentsOverview;
