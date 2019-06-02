import React, { Component, useContext } from "react";
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
  Badge,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { UserTypeContext, userTypes } from "../user-type-context.jsx";

function AssignmentPreview({
  id,
  description,
  startTime,
  endTime,
  questions,
  isTeacher
}) {
  return (
    <React.Fragment>
      <h5>Assignment</h5>
      {isTeacher ? (
        <Button color="primary" tag={Link} to={"/editQuestionAssignment/" + id}>
          Edit Question Assignment
        </Button>
      ) : null}
      <div>{description}</div>
      <div>{startTime}</div>
      <div>{endTime}</div>
      <Container>
        <Row>
          {questionsTable("Approved", questions.approved, isTeacher)}
          {questionsTable("In progress", questions.notApproved, isTeacher)}
        </Row>
      </Container>
      <Button color="primary" tag={Link} to={"/newQuestion"}>
        Create Question
      </Button>
    </React.Fragment>
  );

  function questionsTable(headerText, questions, isTeacher) {
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
                  {questions.map(question => {
                    return (
                      <ListGroupItem
                        key={question.id}
                        tag="a"
                        href={"/question/" + question.id}
                        action
                      >
                        {"Question name: " + question.label + " "}
                        {isTeacher ? (
                          new Date(question.lastSeenTeacher) <
                          new Date(question.lastChange) ? (
                            <Badge color="danger">Changed</Badge>
                          ) : (
                            <Badge color="success">Not Changed</Badge>
                          )
                        ) : new Date(question.lastSeenStudent) <
                        new Date(question.lastChange) ? (
                          <Badge color="danger">Changed</Badge>
                        ) : (
                          <Badge color="success">Not Changed</Badge>
                        )}
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    );
  }
}
function TopicPreview({
  id,
  topicLabel,
  assignment,
  toggle,
  collapse,
  isTeacher
}) {
  return (
    <React.Fragment>
      <Button color="primary" onClick={toggle}>
        {topicLabel}
      </Button>
      <Collapse isOpen={collapse}>
        <Card>
          <CardBody>
            <h4>{topicLabel}</h4>
            {!assignment && isTeacher ? (
              <Button color="primary" tag={Link} to={"/newQuestionAssignment"}>
                Create Question Assignment
              </Button>
            ) : assignment ? (
              <AssignmentPreview {...assignment} isTeacher={isTeacher} />
            ) : null}
          </CardBody>
        </Card>
      </Collapse>
    </React.Fragment>
  );
}
class QuestionsOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      topicCollapse: []
    };
  }
  toggle = index => e => {
    let updatedTopicCollapse = this.state.topicCollapse;
    updatedTopicCollapse[index] = !updatedTopicCollapse[index];
    this.setState({ topicCollapse: updatedTopicCollapse });
  };
  getQuestionGroups = () => {
    fetch("/api/questionGroups/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: this.props.userType
      })
    }).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.setState({
              topics: data,
              topicCollapse: new Array(data.length).fill(false)
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  componentDidMount() {
    this.getQuestionGroups();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userType !== this.props.userType) this.getQuestionGroups();
  }
  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.topics.map((topic, index) => {
            return (
              <li key={topic.id}>
                <TopicPreview
                  {...topic}
                  isTeacher={this.props.userType === "teacher" ? true : false}
                  toggle={this.toggle(index)}
                  collapse={this.state.topicCollapse[index]}
                />
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}
QuestionsOverview.contextType = UserTypeContext;

export default QuestionsOverview;
