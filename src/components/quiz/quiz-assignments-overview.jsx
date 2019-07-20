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
  ListGroup,
  ListGroupItem,
  Container,
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
        <Card>
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
              <div>{new Date(this.props.startTime).toLocaleDateString()}</div>
              <div>{new Date(this.props.endTime).toLocaleDateString()}</div>
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
              <Container>
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
              </Container>
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
        </Card>
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
        <ListGroup flush>
          {this.state.assignments.map((assignment, index) => {
            return (
              <ListGroupItem key={assignment.id}>
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
              </ListGroupItem>
            );
          })}
          {this.context.userType ===
          "http://www.semanticweb.org/semanticweb#Teacher" ? (
            <ListGroupItem>
              <Button color="success" tag={Link} to={"/newQuizAssignment"}>
                Create quiz assignment
              </Button>
            </ListGroupItem>
          ) : null}
        </ListGroup>
      </React.Fragment>
    );
  }
}

QuizAssignmentsOverview.contextType = UserTypeContext;
AssignmentPreview.contextType = UserTypeContext;

export default QuizAssignmentsOverview;
