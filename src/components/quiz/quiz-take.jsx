import React, { Component } from "react";
import { UserTypeContext } from "../common/user-type-context";
import { Form, Button } from "reactstrap";
import {
  fetchGetQuizTake,
  fetchSubmitQuizTake,
  fetchSubmitReview
} from "../../api-adapter";
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
                  correct: answer.correct ? answer.correct : false,
                  text: answer.text
                };
              });
              orderedQuestions[question.id] = {
                id: question.id,
                text: question.questionVersion.text,
                answers: answers
              };
              if (question.userAnswers) {
                orderedQuestions[question.id].userAnswers =
                  question.userAnswers;
              }
              if (question.score !== undefined) {
                orderedQuestions[question.id].score = question.score;
              }
            });
            console.log(orderedQuestions);

            this.setState({
              quizTakeId: data.id,
              orderedQuestions: orderedQuestions,
              isSubmited: data.isSubmited,
              isReviewed: data.isReviewed
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
  onScore = (event, orderedQuestionId) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const orderedQuestion = this.state.orderedQuestions[orderedQuestionId];
    orderedQuestion.score = value;
    this.setState({
      orderedQuestions: {
        ...this.state.orderedQuestions,
        [orderedQuestionId]: orderedQuestion
      }
    });
  };

  formSubmitUserAnswers = () => {
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
  formSubmitReview = () => {
    const orderedQuestionScore = [];
    const orderedQuestions = Object.values(this.state.orderedQuestions);
    orderedQuestions.forEach(orderedQuestion => {
      const obj = {};
      obj.id = orderedQuestion.id;
      obj.score = orderedQuestion.score;
      orderedQuestionScore.push(obj);
    });
    const data = {
      quizTakeId: this.state.quizTakeId,
      orderedQuestions: orderedQuestionScore,
      token: this.context.userType
    };
    fetch(fetchSubmitReview(), {
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
              isQuizTake={!this.state.isSubmited && !this.state.isReviewed}
              isPreview={this.state.isSubmited || this.state.isReviewed}
              isSubmited={this.state.isSubmited}
              isReviewed={this.state.isReviewed}
              userAnswers={
                "userAnswers" in value
                  ? Object.values(value.userAnswers)
                  : undefined
              }
              score={"score" in value ? value.score : undefined}
              text={value.text}
              answers={Object.values(value.answers)}
              onChange={e => this.onChange(e, key)}
              onScore={e => this.onScore(e, key)}
              isTeacher={
                this.context.userType ===
                "http://www.semanticweb.org/semanticweb#Teacher"
                  ? true
                  : false
              }
            />
          );
        })}
        {(this.context.userType !==
          "http://www.semanticweb.org/semanticweb#Teacher" &&
          (!this.state.isSubmited && !this.state.isReviewed)) ||
        (this.context.userType ===
          "http://www.semanticweb.org/semanticweb#Teacher" &&
          (!this.state.isSubmited && !this.state.isReviewed)) ? (
          <Button color="success" onClick={() => this.formSubmitUserAnswers()}>
            Submit
          </Button>
        ) : null}
        {this.context.userType ===
          "http://www.semanticweb.org/semanticweb#Teacher" &&
        (this.state.isSubmited || this.state.isReviewed) ? (
          <Button color="success" onClick={() => this.formSubmitReview()}>
            Submit review
          </Button>
        ) : null}
      </Form>
    );
  }
}
QuizTake.contextType = UserTypeContext;
export default QuizTake;
