import React, { Component } from "react";
import {
  Label,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Col
} from "reactstrap";
import "../App.css";
import AnswerComponent from "../answer-component";

class SavedQuestion extends Component {
  render() {
    return (
      <div className="question">
        <ListGroup>
          <ListGroupItem>
            <FormGroup row>
              <Label for="title" sm={2}>
                Title
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="title"
                  disabled
                  value={this.props.title}
                />
              </Col>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup row>
              <Label for="question" sm={2}>
                Question
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="question"
                  disabled
                  value={this.props.text}
                />
              </Col>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup row>
              <Label for="topic" sm={2}>
                Topic
              </Label>
              <Col sm={10}>
                <Input type="select" name="topic" disabled>
                  <option>{this.props.topic}</option>
                </Input>
              </Col>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup row>
              <Label for="questionType" sm={2}>
                Question type
              </Label>
              <Col sm={10}>
                <Input type="select" name="questionType" disabled>
                  <option>{this.props.questionType}</option>
                </Input>
              </Col>
            </FormGroup>
          </ListGroupItem>
          {this.props.answers.map(answer => {
            return (
              <ListGroupItem>
                <AnswerComponent
                  key={answer.id}
                  readOnly
                  correct={answer.correct}
                  value={answer.text}
                  disabled={true}
                />
              </ListGroupItem>
            );
          })}
          <ListGroup>
            {this.props.comments ? (
              this.props.comments.map(comment => {
                return (
                  <ListGroupItem key={comment.id} color="warning">
                    <ListGroupItemHeading>
                      {comment.author}
                    </ListGroupItemHeading>
                    <ListGroupItemText>{comment.text}</ListGroupItemText>
                    <ListGroupItemText>{comment.date}</ListGroupItemText>
                  </ListGroupItem>
                );
              })
            ) : (
              <ListGroupItem>
                <ListGroupItemText>No comments.</ListGroupItemText>
              </ListGroupItem>
            )}
            <ListGroupItem color="warning">
              <InputGroup>
                <Input />
                <InputGroupAddon color="warning" addonType="append">
                  <InputGroupText>Send</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </ListGroupItem>
          </ListGroup>
        </ListGroup>
      </div>
    );
  }
}

export default SavedQuestion;
