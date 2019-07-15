import React, { Component } from "react";
import { UserTypeContext } from "../common/user-type-context";
import { Form, Button } from "reactstrap";
import { fetchGetQuizTake, fetchSubmitQuizTake } from "../../api-adapter";
import SavedQuestion from "../question/saved-question";

export class QuizTake extends Component {
  static contextType = UserTypeContext;
  constructor(props) {
    super(props);
    this.state = {
      quizTakeId: "",
      orderedQuestions: {}
    };
  }
  getQuizTake = () => {
    fetch(fetchGetQuizTake() + encodeURIComponent(this.props.match.params.id), {
      method: "GET",
      headers: {
        token: this.context.userType
      }
    }).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            let orderedQuestions = {};
            data.orderedQuestions.forEach(question => {
              const answers = {};
              question.questionVersion.answers.forEach(answer => {
                answers[answer.id] = {
                  id: answer.id,
                  correct: false,
                  text: answer.text
                };
              });
              orderedQuestions[question.id] = {
                id: question.id,
                text: question.questionVersion.text,
                answers: answers
              };
            });

            this.setState({
              quizTakeId: data.id,
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
        [orderedQuestionId]: orderedQuestion
      }
    });
  };

  formSubmit = () => {
    const orderedQuestions = Object.values(this.state.orderedQuestions);
    orderedQuestions.forEach(orderedQuestion => {
      orderedQuestion.answers = Object.values(orderedQuestion.answers);
    });
    const data = {
      quizTakeId: this.state.quizTakeId,
      orderedQuestions: orderedQuestions,
      token: this.context.userType
    };
    fetch(fetchSubmitQuizTake(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        this.props.history.push("/quizAssignmentsOverview");
      }
    });
  };

  componentDidMount() {
    this.getQuizTake();
  }
  render() {
    return (
      <Form>
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
        <Button color="success" onClick={() => this.formSubmit()}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default QuizTake;
