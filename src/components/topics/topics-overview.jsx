import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardLink,
  CardSubtitle,
  Collapse,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { UserTypeContext } from "../common/user-type-context";
import { fetchQuestionGroups } from "../../api-adapter";
import InfoTable from "../common/info-table";
const tablesStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
};
function AssignmentPreview({
  id,
  description,
  startTime,
  endTime,
  isTeacher,
  topic
}) {
  return (
    <React.Fragment>
      <CardSubtitle tag={"h4"} className={"h6"}>
        Assignment
      </CardSubtitle>
      <div>{description}</div>
      <div>{startTime}</div>
      <div>{endTime}</div>
      {isTeacher ? (
        <Button
          color="primary"
          tag={Link}
          to={"/editQuestionAssignment/" + encodeURIComponent(id)}
        >
          Edit Assignment
        </Button>
      ) : null}
    </React.Fragment>
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
      <Card>
        <CardBody>
          <h3>{name}</h3>
          <CardLink href="#" onClick={toggle}>
            expand
          </CardLink>
        </CardBody>
        <Collapse isOpen={collapse}>
          <CardBody className="pt-0">
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
          <CardBody>
            <h4>Questions</h4>
            <div style={tablesStyle}>
              {questionsNotApproved ? (
                <InfoTable
                  headerText={"In progress"}
                  questions={questionsNotApproved}
                  isTeacher={isTeacher}
                  link={"/question/"}
                />
              ) : null}
              {questionsApproved ? (
                <InfoTable
                  headerText={"Approved"}
                  questions={questionsApproved}
                  isTeacher={isTeacher}
                  link={"/question/"}
                />
              ) : null}
            </div>
            {(assignment &&
              (new Date(assignment.startTime) < new Date() &&
                new Date(assignment.endTime) > new Date())) ||
            isTeacher ? (
              <Button
                color="primary"
                tag={Link}
                to={"/newQuestion/" + encodeURIComponent(id)}
              >
                Create Question
              </Button>
            ) : null}
          </CardBody>
        </Collapse>
      </Card>
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
    e.preventDefault();
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
      <React.Fragment>
        <h3>Questions by topic</h3>
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
      </React.Fragment>
    );
  }
}
TopicsOverview.contextType = UserTypeContext;

export default TopicsOverview;
