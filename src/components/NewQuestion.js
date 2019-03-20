import React, { Component } from "react";
import Select from "../formComponents/Select";
import validate from "../validate";
import "../App.css";
import * as dataFile from "../data/data";
import AnswerComponent from "../AnswerComponent";
import TextInput from "../formComponents/TextInput";

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    let untouchedCss = "form-control";
    let touchedCss = "form-control control-error";
    let tmpFormControls = {
      topic: {
        value: "1",
        placeholder: "Choose topic",
        valid: true,
        touched: false,
        validationRules: {
          isRequired: true
        },
        options: []
      },
      questionType: {
        value: "1",
        placeholder: "Choose question type",
        valid: true,
        touched: false,
        validationRules: {
          isRequired: true
        },
        options: dataFile.loadQuestionTypes.map(function(value) {
          return {
            value: value.id,
            displayValue: value.question_type
          };
        })
      },
      question: {
        value: "",
        placeholder: "What is your question",
        valid: false,
        touched: false,
        validationRules: {
          minLength: 3
        }
      }
    };
    let answers = [];
    dataFile.loadMultipleAnswer.forEach((answer, index) => {
      this.addAnswer(tmpFormControls, answers, answer, index, true);
    });
    this.state = {
      answers: answers,
      formIsValid: false,
      formControls: tmpFormControls,
      touchedCss: touchedCss,
      untouchedCss: untouchedCss
    };
  }
  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
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
    console.dir(this.state.formControls);
    console.dir(this.state.answers);
  };

  addNewAnswer = e => {
    let answer = {
      id: "-1",
      answer_text: "",
      correct: "0"
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
      value: answer.id,
      valid: true,
      touched: true,
      validationRules: {}
    };

    let newElement = {
      answerInputName: answerInputName,
      answerCheckboxName: answerCheckboxName,
      answerId: answer.id,
      answerCorrect: 0,
      answerText: formControls[answerInputName].value
    };

    answers.push(newElement);
  };

  getTopics = () => {
    fetch("/topics").then(response => {
      this.populateSelect(response, "topic");
    });
  };

  getQuestionTypes = () => {
    fetch("/questionTypes").then(response => {
      this.populateSelect(response, "questionType");
    });
  };

  populateSelect(response, selectElement) {
    if (response.ok) {
      response
        .json()
        .then(data => {
          console.log(data);
          let options = data.map(item => {
            return {
              value: item.id,
              displayValue: item.name
            };
          });
          const updatedControls = {
            ...this.state.formControls
          };
          const updatedFormElement = {
            ...updatedControls[selectElement]
          };
          updatedFormElement.options = options;
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

  componentDidMount() {
    this.getTopics();
    this.getQuestionTypes();
  }

  render() {
    return (
      <React.Fragment>
        <TextInput
          name="question"
          placeholder={this.state.formControls.question.placeholder}
          value={this.state.formControls.question.value}
          onChange={this.changeHandler}
          touched={this.state.formControls.question.touched}
          valid={this.state.formControls.question.valid}
        />
        <Select
          name="topic"
          value={this.state.formControls.topic.value}
          onChange={this.changeHandler}
          options={this.state.formControls.topic.options}
          touched={this.state.formControls.topic.touched}
          valid={this.state.formControls.topic.valid}
        />
        <Select
          name="questionType"
          value={this.state.formControls.questionType.value}
          onChange={this.changeHandler}
          options={this.state.formControls.questionType.options}
          touched={this.state.formControls.questionType.touched}
          valid={this.state.formControls.questionType.valid}
        />
        <button onClick={this.addNewAnswer}>Add new answer</button>
        {this.state.answers.map(value => (
          <AnswerComponent
            key={value.answerId}
            name={value.answerInputName}
            placeholder={
              this.state.formControls[value.answerInputName].placeholder
            }
            value={this.state.formControls[value.answerInputName].value}
            onChange={this.changeHandler}
            touched={this.state.formControls[value.answerInputName].touched}
            valid={this.state.formControls[value.answerInputName].valid}
          />
        ))}
        <button
          onClick={this.formSubmitHandler}
          disabled={!this.state.formIsValid}
        >
          Submit
        </button>
      </React.Fragment>
    );
  }
}

export default NewQuestion;
