import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Collapse,
  Button,
  Table,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  NavLink
} from "reactstrap";
import { UserTypeContext } from "../common/user-type-context";
import { fetchQuizAssignments, fetchGenerateQuizTake } from "../../api-adapter";

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
        <Button color="primary" onClick={this.props.toggle}>
          {this.props.title}
        </Button>
        <Collapse isOpen={this.props.collapse}>
          <Card>
            <CardBody>
              <h4>{this.props.title}</h4>
              <h5>Assignment</h5>
              {this.props.isTeacher ? (
                <Button
                  color="primary"
                  tag={Link}
                  to={"/newQuizAssignment/" + encodeURIComponent(this.props.id)}
                >
                  Edit Quiz Assignment
                </Button>
              ) : null}
              <div>{this.props.description}</div>
              <div>{this.props.startTime}</div>
              <div>{this.props.endTime}</div>
              <Container>
                <Row>
                  {quizTakenReviewed
                    ? questionsTable("Reviewed", quizTakenReviewed)
                    : null}
                  {quizTakenNotReviewed
                    ? questionsTable("In progress", quizTakenNotReviewed)
                    : null}
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
          </Card>
        </Collapse>
      </React.Fragment>
    );
  }
}

function questionsTable(headerText, quizzesTaken) {
  return (
    <Col>
      <Table bordered>
        <thead>
          <tr>
            <th>{headerText}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ListGroup>
                {quizzesTaken
                  ? quizzesTaken.map(quizTake => {
                      let text = "Author: " + quizTake.author;
                      if (quizTake.totalScore) {
                        text += " Score: " + quizTake.totalScore;
                      }
                      return (
                        <ListGroupItem key={quizTake.id}>
                          <NavLink
                            tag={Link}
                            to={"/quizTake/" + encodeURIComponent(quizTake.id)}
                          >
                            {text}
                          </NavLink>
                        </ListGroupItem>
                      );
                    })
                  : null}
              </ListGroup>
            </td>
          </tr>
        </tbody>
      </Table>
    </Col>
  );
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
            console.log(data);
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
    );
  }
}

QuizAssignmentsOverview.contextType = UserTypeContext;
AssignmentPreview.contextType = UserTypeContext;

export default QuizAssignmentsOverview;
