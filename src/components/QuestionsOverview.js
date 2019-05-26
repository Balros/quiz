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
  Col
} from "reactstrap";
function AssignmentPreview({ id, description, startTime, endTime, questions }) {
  return (
    <React.Fragment>
      <h5>Assignment</h5>
      <Button color="primary" tag={Link} to={"/editQuestionAssignment/" + id}>
        Edit Question Assignment
      </Button>
      <div>{description}</div>
      <div>{startTime}</div>
      <div>{endTime}</div>
      <Container>
        <Row>
          <Col>
            <Table bordered>
              <thead>
                <tr>
                  <th>Approved</th>
                </tr>
              </thead>
              <tbody>
                {questions.approved.map(question => {
                  return (
                    <tr key={question.id}>
                      <td>
                        <Link to={"/editQuestion/" + question.id}>
                          {"Question name: " + question.label}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table bordered>
              <thead>
                <tr>
                  <th>In progress</th>
                </tr>
              </thead>
              <tbody>
                {questions.notApproved.map(question => {
                  return (
                    <tr key={question.id}>
                      <td>
                        <Link to={"/editQuestion/" + question.id}>
                          {"Question name: " + question.label}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Button color="primary" tag={Link} to={"/newQuestion"}>
        Create Question
      </Button>
      {/* <ul>
        {questions.map(question => {
          return (
            <li key={question.id}>
              <QuestionLink {...question} />
            </li>
          );
        })}
      </ul> */}
    </React.Fragment>
  );
}
function TopicPreview({ id, topicLabel, assignment, toggle, collapse }) {
  return (
    <React.Fragment>
      <Button color="primary" onClick={toggle}>
        {topicLabel}
      </Button>
      <Collapse isOpen={collapse}>
        <Card>
          <CardBody>
            <h4>{topicLabel}</h4>
            {!assignment ? (
              <Button color="primary" tag={Link} to={"/newQuestionAssignment"}>
                Create Question Assignment
              </Button>
            ) : (
              <AssignmentPreview {...assignment} />
            )}
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
    fetch("/api/questionGroups").then(response => {
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
  render() {
    // return (
    //   <ul>
    //     {this.state.topics.map(question => {
    //       return (
    //         <li key={question.id}>
    //           <div>
    //             <p>
    //               <Link to={"/editQuestion/" + question.id}>
    //                 {"Otazka name: " + question.label}
    //               </Link>
    //             </p>
    //           </div>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // );
    return (
      <React.Fragment>
        <ul>
          {this.state.topics.map((topic, index) => {
            return (
              <li key={topic.id}>
                <TopicPreview
                  {...topic}
                  isTeacher={false}
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
export default QuestionsOverview;
