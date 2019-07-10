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
  Badge,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { UserTypeContext } from "../common/user-type-context";
import { fetchQuestionGroups } from "../../api-adapter";

function AssignmentPreview({
  id,
  description,
  startTime,
  endTime,
  questions,
  isTeacher,
  topic
}) {
  return (
    <React.Fragment>
      <h5>Assignment</h5>
      {isTeacher ? (
        <Button
          color="primary"
          tag={Link}
          to={"/editQuestionAssignment/" + encodeURIComponent(id)}
        >
          Edit Question Assignment
        </Button>
      ) : null}
      <div>{description}</div>
      <div>{startTime}</div>
      <div>{endTime}</div>

      {(new Date(startTime) < new Date() && new Date(endTime) > new Date()) ||
      isTeacher ? (
        <Button
          color="primary"
          tag={Link}
          to={"/newQuestion/" + encodeURIComponent(topic)}
        >
          Create Question
        </Button>
      ) : null}
    </React.Fragment>
  );
}
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
                {questions
                  ? questions.map(question => {
                      return (
                        <ListGroupItem
                          key={question.id}
                          tag="a"
                          href={"/question/" + encodeURIComponent(question.id)}
                          action
                        >
                          {"Question name: " + question.title + " "}
                          {isTeacher ? (
                            new Date(question.lastSeenByTeacher) <
                            new Date(question.lastChange) ? (
                              <Badge color="danger">Changed</Badge>
                            ) : (
                              <Badge color="success">Not Changed</Badge>
                            )
                          ) : new Date(question.lastSeenByStudent) <
                          new Date(question.lastChange) ? (
                            <Badge color="danger">Changed</Badge>
                          ) : (
                            <Badge color="success">Not Changed</Badge>
                          )}
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
function TopicPreview({
  id,
  name,
  assignment,
  questions,
  toggle,
  collapse,
  isTeacher
}) {
  let questionsApproved = [];
  let questionsNotApproved = [];
  if (questions) {
    questions.forEach(question => {
      question.approvedAsPublicId !== "undefined" ||
      question.approvedAsPrivateId !== "undefined"
        ? questionsApproved.push(question)
        : questionsNotApproved.push(question);
    });
  }
  return (
    <React.Fragment>
      <Button color="primary" onClick={toggle}>
        {name}
      </Button>
      <Collapse isOpen={collapse}>
        <Card>
          <CardBody>
            <h4>{name}</h4>
            {!assignment && isTeacher ? (
              <Button
                color="primary"
                tag={Link}
                to={{
                  pathname: "/newQuestionAssignment",
                  state: { topic: id }
                }}
              >
                Create Question Assignment
              </Button>
            ) : assignment ? (
              <AssignmentPreview
                {...assignment}
                isTeacher={isTeacher}
                topic={id}
              />
            ) : null}
          </CardBody>
        </Card>
        <Container>
          <Row>
            {questionsApproved
              ? questionsTable("Approved", questionsApproved, isTeacher)
              : null}
            {questionsNotApproved
              ? questionsTable("In progress", questionsNotApproved, isTeacher)
              : null}
          </Row>
        </Container>
      </Collapse>
    </React.Fragment>
  );
}
class TopicsOverview extends Component {
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
    fetch(fetchQuestionGroups(), {
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
      <ListGroup flush>
        {this.state.topics.map((topic, index) => {
          return (
            <ListGroupItem key={topic.id}>
              <TopicPreview
                {...topic}
                isTeacher={
                  this.context.userType ===
                  "http://www.semanticweb.org/semanticweb#Teacher"
                    ? true
                    : false
                }
                toggle={this.toggle(index)}
                collapse={this.state.topicCollapse[index]}
              />
            </ListGroupItem>
          );
        })}
        {this.context.userType ===
        "http://www.semanticweb.org/semanticweb#Teacher" ? (
          <ListGroupItem>
            <Button color="success" tag={Link} to={"/createTopic"}>
              Create topic
            </Button>
          </ListGroupItem>
        ) : null}
      </ListGroup>
    );
  }
}
TopicsOverview.contextType = UserTypeContext;

export default TopicsOverview;
