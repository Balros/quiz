import React, { Component } from "react";
import NewQuestion from "./new-question";
import SavedQuestion from "./saved-question";
import { Button } from "reactstrap";
class EditQuestion extends Component {
  //TODO this.props.match.params.id marks id questionsGroups,
  //then you need to look for last question from that group and load that question
  //IDEA we don't need to load anything, we just show all previous questions from group
  //and show blank form for new question
  //for good UX we can preload last question but maybe it's not necessary
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
    let halo2 = "/api/getQuestion/" + this.state.questionGroupId;
    fetch(halo2).then(response => {
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
        {this.state.questionVersions.map(question => {
          return (
            <SavedQuestion
              key={question.id}
              title={question.title}
              text={question.text}
              answers={question.answers}
              topic={question.topic}
              questionType={question.questionType}
              comments={question.comments}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
export default EditQuestion;
