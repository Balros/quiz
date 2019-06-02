import React, { Component } from "react";
import NewQuestion from "./new-question";
import SavedQuestion from "./saved-question";
import { Button } from "reactstrap";
class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadQuestions: [],
      loadTopics: [],
      loadQuestionTypes: [],
      questionVersions: [],
      isEdit: false,
      questionGroupId: this.props.match.params.id
    };
  }
  getQuestionVersions = () => {
    fetch("/api/getQuestion/" + this.state.questionGroupId).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            if (data) {
              this.setState({
                questionVersions: data
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  componentDidMount() {
    this.getQuestionVersions();
  }
  onSendComment = questionVersionId => {
    console.log("posielam comment");
    const data = {
      comment: this.state.newComment,
      date: new Date(),
      token: localStorage.getItem("userType")
    };
    fetch("/api/addComment/" + questionVersionId, {
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
    let question =
      this.state.questionVersions && this.state.questionVersions.length
        ? this.state.questionVersions[0]
        : null;
    return (
      <React.Fragment>
        <Button onClick={() => this.setState({ isEdit: !this.state.isEdit })}>
          Edit question
        </Button>
        {this.state.isEdit && question ? (
          <NewQuestion
            questionGroup={this.props.match.params.id}
            title={question.title}
            text={question.text}
            answers={question.answers}
            topic={question.topic}
            questionType={question.questionType}
          />
        ) : null}
        {this.state.questionVersions.map(questionVersion => {
          return (
            <SavedQuestion
              key={questionVersion.id}
              id={questionVersion.id}
              title={questionVersion.title}
              text={questionVersion.text}
              answers={questionVersion.answers}
              topic={questionVersion.topic}
              questionType={questionVersion.questionType}
              comments={questionVersion.comments}
              onSendComment={() => this.onSendComment(questionVersion.id)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
export default EditQuestion;
