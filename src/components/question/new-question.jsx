import React, { Component } from "react";
import validate from "../../validate";
import AnswerComponent from "./answer-component";
import {
  Button,
  Form,
  Card,
  CardBody,
  Label,
  FormGroup,
  Input
} from "reactstrap";
import { UserTypeContext } from "../common/user-type-context";
import {
  fetchCreateNewQuestion,
  fetchQuestionTypes,
  fetchTopics
} from "../../api-adapter";

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    let untouchedCss = "form-control";
    let touchedCss = "form-control control-error";
    let tmpFormControls = {
      topic: {
        value: "",
        placeholder: "Choose topic",
        valid: true,
        touched: false,
        validationRules: {
          isRequired: true
        },
        options: []
      },
      questionType: {
        value: "",
        placeholder: "Choose question type",
        valid: true,
        touched: false,
        validationRules: {
          isRequired: true
        },
        options: []
      },
      question: {
        value: this.props.text ? this.props.text : "",
        placeholder: "What is your question",
        valid: false,
        touched: false,
        validationRules: {
          minLength: 3
        }
      }
    };
    let answers = [];

    this.state = {
      title: this.props.title ? this.props.title : "",
      answers: answers,
      formIsValid: false,
      formControls: tmpFormControls,
      touchedCss: touchedCss,
      untouchedCss: untouchedCss
    };
  }

  changeTitle = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  changeHandler = event => {
    const name = event.target.name;
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(
      value,
      updatedFormElement.validationRules
    );
    updatedControls[name] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = formIsValid && updatedControls[inputIdentifier].valid;
    }
    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });
  };
  formSubmitHandler = () => {
    let answers = this.state.answers.map(answer => {
      return {
        text: this.state.formControls[answer["answerInputName"]].value,
        correct: this.state.formControls[answer["answerCheckboxName"]].value
      };
    });
    let data = {
      token: this.context.userType,
      questionId: this.props.questionId,
      questionText: this.state.formControls["question"].value,
      topic: this.state.formControls["topic"].value,
      questionType: this.state.formControls["questionType"].value,
      title: this.state.title,
      answers: answers
    };
    fetch(fetchCreateNewQuestion(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        this.props.history.push("/questionGroups");
      }
    });
  };

  addNewAnswer = e => {
    e.preventDefault();
    let answer = {
      id: this.state.answers.length,
      answer_text: "",
      correct: false
    };
    let updatedControls = this.state.formControls;
    let updatedAnswers = this.state.answers;

    this.addAnswer(
      updatedControls,
      updatedAnswers,
      answer,
      updatedAnswers.length,
      false
    );

    this.setState({
      formControls: updatedControls,
      answers: updatedAnswers,
      formIsValid: false
    });
  };

  addAnswer = (formControls, answers, answer, index, valid) => {
    let answerInputName = "answerInput" + index;
    let answerCheckboxName = "answerCheckbox" + index;

    formControls[answerInputName] = {
      value: answer.answer_text,
      placeholder: "What is your answer",
      valid: valid,
      touched: false,
      validationRules: {
        isRequired: true
      }
    };
    formControls[answerCheckboxName] = {
      value: answer.correct,
      valid: true,
      touched: true,
      validationRules: {}
    };

    let newElement = {
      answerInputName: answerInputName,
      answerCheckboxName: answerCheckboxName,
      answerId: answer.id
    };

    answers.push(newElement);
  };

  getTopics = () => {
    fetch(fetchTopics(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: this.context.userType })
    }).then(response => {
      this.populateSelect(
        response,
        "topic",
        this.props.topic
          ? this.props.topic
          : this.props.match.params.id
            ? decodeURIComponent(this.props.match.params.id)
            : null
      );
    });
  };

  getQuestionTypes = () => {
    fetch(fetchQuestionTypes()).then(response => {
      this.populateSelect(response, "questionType", this.props.questionType);
    });
  };

  populateSelect(response, selectElement, propValue) {
    if (response.ok) {
      response
        .json()
        .then(data => {
          let options = data;
          const updatedControls = {
            ...this.state.formControls
          };
          const updatedFormElement = {
            ...updatedControls[selectElement]
          };
          updatedFormElement.options = options;
          updatedFormElement.value = propValue
            ? propValue
            : options && options.length
              ? options[0].id
              : undefined;
          updatedControls[selectElement] = updatedFormElement;
          this.setState({
            formControls: updatedControls
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  addExistingAnswers(answers) {
    let tmpAnswer = {};
    answers.forEach((answer, index) => {
      tmpAnswer = {
        id: index,
        answer_text: answer.text.value,
        correct: answer.correct
      };
      let updatedControls = this.state.formControls;
      let updatedAnswers = this.state.answers;

      this.addAnswer(
        updatedControls,
        updatedAnswers,
        tmpAnswer,
        updatedAnswers.length,
        false
      );

      this.setState({
        formControls: updatedControls,
        answers: updatedAnswers,
        formIsValid: false
      });
    });
  }

  componentDidMount() {
    this.getTopics();
    this.getQuestionTypes();
    if (this.props.questionId) this.addExistingAnswers(this.props.answers);
  }

  render() {
    return (
      <Form>
        <Card>
          <CardBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                placeholder={"Add title"}
                value={this.state.title}
                onChange={this.changeTitle}
                // touched={this.state.formControls.question.touched}
                valid={this.state.title.length > 0}
              />
            </FormGroup>
            <FormGroup>
              <Label for="question">Question</Label>
              <Input
                id="question"
                type="text"
                name="question"
                placeholder={this.state.formControls.question.placeholder}
                value={this.state.formControls.question.value}
                onChange={this.changeHandler}
                // touched={this.state.formControls.question.touched}
                valid={this.state.formControls.question.valid}
              />
            </FormGroup>
            <FormGroup>
              <Label for="topic">Topic</Label>
              <Input
                type="select"
                name="topic"
                id="topic"
                value={this.state.formControls.topic.value}
                onChange={this.changeHandler}
                // touched={this.state.formControls.topic.touched}
                valid={this.state.formControls.topic.valid}
              >
                {this.state.formControls.topic.options.map(option => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="questionType">Question type</Label>
              <Input
                type="select"
                name="questionType"
                id="questionType"
                value={this.state.formControls.questionType.value}
                onChange={this.changeHandler}
                // touched={this.state.formControls.questionType.touched}
                valid={this.state.formControls.questionType.valid}
              >
                {this.state.formControls.questionType.options.map(option => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <Button onClick={this.addNewAnswer}>Add new answer</Button>
            {this.state.answers.map(value => (
              <AnswerComponent
                key={value.answerId}
                name={value.answerInputName}
                checkboxName={value.answerCheckboxName}
                placeholder={
                  this.state.formControls[value.answerInputName].placeholder
                }
                correct={
                  this.state.formControls[value.answerCheckboxName].value
                }
                value={this.state.formControls[value.answerInputName].value}
                onChange={this.changeHandler}
                touched={this.state.formControls[value.answerInputName].touched}
                valid={this.state.formControls[value.answerInputName].valid}
              />
            ))}
            <Button
              onClick={this.formSubmitHandler}
              disabled={!this.state.formIsValid}
            >
              {this.props.questionId ? "Edit" : "Create"}
            </Button>
          </CardBody>
        </Card>
      </Form>
    );
  }
}
NewQuestion.contextType = UserTypeContext;
export default NewQuestion;
