import React, { Component } from "react";
import Select from "../formComponents/Select";
import "../App.css";
import AnswerComponent from "../AnswerComponent";

class Question extends Component {
  render() {
    return (
      <div className="question">
        {/* <label>
          {"Title"}
          <div className="form-group">
            <input
              type="text"
              name="title"
              className={"form-control"}
              value={this.props.question.title}
              disabled
            />
          </div>
        </label>
        <label>
          {"Question"}
          <div className="form-group">
            <input
              type="text"
              name="question"
              className={"form-control"}
              value={this.props.question.text}
              disabled
            />
          </div>
        </label>
        <label>
          {"Topic"}
          <Select name="topic" options={this.props.topics} disabled={true} />
        </label> */}
        <label>
          {"Type of question"}
          <Select
            name="questionType"
            value={this.props.questionType.id}
            options={this.props.questionType}
            disabled={true}
          />
        </label>
        {/* {this.props.answers.map(answer => (
          <div>
            <AnswerComponent value={answer.text} disabled />
          </div>
        ))} */}
      </div>
    );
  }
}

export default Question;
