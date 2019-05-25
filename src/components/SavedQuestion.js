import React, { Component } from "react";
import { Label, FormGroup, Input } from "reactstrap";
import "../App.css";
import AnswerComponent from "../AnswerComponent";

class SavedQuestion extends Component {
  render() {
    return (
      <div className="question">
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" disabled value={this.props.title} />
        </FormGroup>
        <FormGroup>
          <Label for="question">Question</Label>
          <Input type="text" name="question" disabled value={this.props.text} />
        </FormGroup>
        <FormGroup>
          <Label for="topic">Topic</Label>
          <Input type="select" name="topic" disabled>
            <option>{this.props.topic}</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="questionType">Question type</Label>
          <Input type="select" name="questionType" disabled>
            <option>{this.props.questionType}</option>
          </Input>
        </FormGroup>
        {this.props.answers.map(answer => {
          return (
            <AnswerComponent
              key={answer.id}
              readOnly
              correct={answer.correct}
              value={answer.text}
              disabled={true}
            />
          );
        })}
      </div>
    );
  }
}

export default SavedQuestion;
