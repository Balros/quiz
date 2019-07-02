import React, { Component } from "react";
import NewQuestion from "./new-question";
import SavedQuestion from "./saved-question";
import { Button } from "reactstrap";
import { UserTypeContext } from "../common/user-type-context";
class QuestionOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionVersions: [],
      isEdit: false,
      questionId: this.props.match.params.id,
      allTopics: new Map(),
      allQuestionTypes: {},
      title: "",
      approvedAsPublicId: "",
      approvedAsPrivateId: "",
      lastSeenByStudent: "",
      lastSeenByTeacher: "",
      lastChange: ""
    };
  }

  getAllQuestionTypes = () => {
    fetch("/api/questionTypes").then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            if (data && data.length && data.length > 0) {
              let questionTypeMap = new Map();
              data.forEach(questionType => {
                questionTypeMap.set(questionType.id, questionType.name);
              });
              this.setState({
                allQuestionTypes: questionTypeMap
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  getAllTopics = () => {
    fetch("/api/topics", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: this.context.userType })
    }).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            if (data && data.length && data.length > 0) {
              const item = data;
              let topicsMap = new Map();
              item.forEach(topic => {
                topicsMap.set(topic.id, topic.name);
              });
              this.setState({
                allTopics: topicsMap
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  getQuestionVersions = () => {
    fetch("/api/getQuestionVersions/" + this.state.questionId).then(
      response => {
        if (response.ok) {
          response
            .json()
            .then(data => {
              if (data) {
                this.setState({
                  title: data.title,
                  selectedTopic: data.topic,
                  lastSeenByStudent: data.lastSeenByStudent,
                  lastSeenByTeacher: data.lastSeenByTeacher,
                  lastChange: data.lastChange,
                  approvedAsPublicId: data.approvedAsPublicId,
                  approvedAsPrivateId: data.approvedAsPrivateId,
                  questionVersions: data.questionVersions
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    );
  };

  componentDidMount() {
    this.getAllQuestionTypes();
    this.getAllTopics();
    this.getQuestionVersions();
  }

  onSendComment = (questionVersionId, newComment) => {
    const data = {
      questionId: this.props.match.params.id,
      questionVersionId: questionVersionId,
      newComment: newComment,
      token: localStorage.getItem("userType")
    };
    fetch("/api/addComment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        this.getQuestionVersions();
      }
    });
  };
  render() {
    let lastKnownQuestionVersion =
      this.state.questionVersions && this.state.questionVersions.length
        ? this.state.questionVersions[0]
        : null;
    return (
      <React.Fragment>
        <Button onClick={() => this.setState({ isEdit: !this.state.isEdit })}>
          Edit question
        </Button>
        {this.state.isEdit && lastKnownQuestionVersion ? (
          <NewQuestion
            questionId={decodeURIComponent(this.props.match.params.id)}
            title={this.state.title}
            text={lastKnownQuestionVersion.text.value}
            answers={lastKnownQuestionVersion.answers}
            topic={this.state.selectedTopic.id}
            questionType={lastKnownQuestionVersion.questionType}
            history={this.props.history}
          />
        ) : null}
        {this.state.questionVersions.map(questionVersion => {
          return (
            <SavedQuestion
              key={questionVersion.id}
              id={questionVersion.id}
              title={this.state.title}
              text={questionVersion.text}
              answers={questionVersion.answers}
              topic={this.state.selectedTopic.name}
              questionType={this.state.allQuestionTypes.get(
                questionVersion.questionType
              )}
              comments={questionVersion.comments}
              onSendComment={this.onSendComment}
              isApprovedAsPublic={
                this.state.approvedAsPublicId === questionVersion.id
              }
              isApprovedAsPrivate={
                this.state.approvedAsPrivateId === questionVersion.id
              }
              isTeacher={
                this.context.userType ===
                "http://www.semanticweb.org/semanticweb#Teacher"
                  ? true
                  : false
              }
              history={this.props.history}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
QuestionOverview.contextType = UserTypeContext;
export default QuestionOverview;
