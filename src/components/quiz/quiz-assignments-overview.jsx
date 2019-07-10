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
  ListGroupItem
} from "reactstrap";
import { UserTypeContext } from "../common/user-type-context";
import { fetchQuizAssignments } from "../../api-adapter";

function AssignmentPreview({
  id,
  title,
  description,
  startTime,
  endTime,
  quiz,
  quizzesTaken,
  isTeacher,
  toggle,
  collapse
}) {
  let quizTakenReviewed = [];
  let quizTakenNotReviewed = [];
  if (quizzesTaken) {
    quizzesTaken.forEach(quiz => {
      quiz.reviewed
        ? quizTakenReviewed.push(quiz)
        : quizTakenNotReviewed.push(quiz);
    });
  }
  return (
    <React.Fragment>
      <Button color="primary" onClick={toggle}>
        {title}
      </Button>
      <Collapse isOpen={collapse}>
        <Card>
          <CardBody>
            <h4>{title}</h4>
            <h5>Assignment</h5>
            {isTeacher ? (
              <Button
                color="primary"
                tag={Link}
                to={"/newQuizAssignment/" + encodeURIComponent(id)}
              >
                Edit Quiz Assignment
              </Button>
            ) : null}
            <div>{description}</div>
            <div>{startTime}</div>
            <div>{endTime}</div>
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
            {(new Date(startTime) < new Date() &&
              new Date(endTime) > new Date()) ||
            isTeacher ? (
              <Button
                color="primary"
                tag={Link}
                to={"/quiz/" + encodeURIComponent(id)}
              >
                Take Quiz
              </Button>
            ) : null}
          </CardBody>
        </Card>
      </Collapse>
    </React.Fragment>
  );

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
                        return (
                          <ListGroupItem
                            key={quizTake.id}
                            tag="a"
                            href={
                              "/quizTake/" + encodeURIComponent(quizTake.id)
                            }
                            action
                          >
                            {"Question name: " + quizTake.author + " "}
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

export default QuizAssignmentsOverview;
