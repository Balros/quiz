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
      orderedQuestions: new Map()
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
            let orderedQuestions = {};
            data.quizTake.orderedQuestions.forEach(question => {
              const answers = {};
              question.questionVersion.answers.forEach(answer => {
                answers[answer.id] = {
                  id: answer.id,
                  correct: false,
                  text: answer.text
                };
              });
              orderedQuestions[question.id] = {
                text: question.questionVersion.text,
                answers: answers
              };
            });

            this.setState({
              quizAssignmentId: data.id,
              quizTakeId: data.quizTake.id,
              orderedQuestions: orderedQuestions
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  onChange = (event, orderedQuestionId) => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const orderedQuestion = this.state.orderedQuestions[orderedQuestionId];
    const answer = orderedQuestion.answers[name];
    answer.correct = value;
    orderedQuestion.answers[name] = answer;
    this.setState({
      orderedQuestions: {
        ...this.state.orderedQuestions,
        orderedQuestionId: orderedQuestion
      }
    });
  };
  componentDidMount() {
    this.generateQuizTake();
  }
  render() {
    return (
      <React.Fragment>
        {Object.keys(this.state.orderedQuestions).map(key => {
          const value = this.state.orderedQuestions[key];
          return (
            <SavedQuestion
              key={key}
              isQuizTake={true}
              text={value.text}
              answers={Object.values(value.answers)}
              onChange={e => this.onChange(e, key)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default QuizGenerate;
