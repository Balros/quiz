import React, { Component } from "react";
import { UserTypeContext } from "../common/user-type-context";
import { fetchCreateQuizTake } from "../../api-adapter";
import SavedQuestion from "../question/saved-question";

export class QuizGenerate extends Component {
  static contextType = UserTypeContext;
  constructor(props) {
    super(props);
    this.state = {
      quizAssignmentId: "",
      quizTakeId: "",
      questions: []
    };
  }
  generateQuizTake = () => {
    fetch(
      fetchCreateQuizTake() + encodeURIComponent(this.props.match.params.id),
      {
        method: "GET",
        headers: {
          token: this.context.userType
        }
      }
    ).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.setState({
              quizAssignmentId: data.id,
              quizTakeId: data.quizTake.id,
              questions: data.quizTake.orderedQuestions
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  componentDidMount() {
    this.generateQuizTake();
  }
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {this.state.questions.map(question => {
          console.log(question);
          console.log(question.questionVersion.text);
          return (
            <SavedQuestion
              key={question.id}
              isQuizTake={true}
              // id={questionVersion.id}
              text={question.questionVersion.text}
              answers={question.questionVersion.answers}
              // history={this.props.history}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default QuizGenerate;
