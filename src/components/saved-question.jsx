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
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "../App.css";
import AnswerComponent from "../answer-component";

let publicApprove = 0;
let privateApprove = 1;
class SavedQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
      dropdownOpen: false
    };
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onApprove = approveNumber => {
    fetch("/api/approveQuestionVersion", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: this.props.userType,
        approveNumber: approveNumber
      })
    }).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {})
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

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
              <ListGroupItem key={answer.id}>
                <AnswerComponent
                  readOnly
                  correct={answer.correct}
                  value={answer.text}
                  disabled={true}
                />
              </ListGroupItem>
            );
          })}
          {this.props.comments ? (
            this.props.comments.map(comment => {
              return (
                <ListGroupItem key={comment.id} color="warning">
                  <ListGroupItemHeading>{comment.author}</ListGroupItemHeading>
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
              <Input
                type="text"
                name="newComment"
                placeholder="Write a comment..."
                onChange={this.changeHandler}
              />
              <InputGroupAddon addonType="append">
                <Button color="warning" onClick={this.props.onSendComment}>
                  Send
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ListGroupItem>
          {!this.props.approved ? (
            <ListGroupItem color="success">
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret color="success">
                  Approve as
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.onApprove(publicApprove)}>
                    Approve as public
                  </DropdownItem>
                  <DropdownItem onClick={this.onApprove(privateApprove)}>
                    Approve as private
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ListGroupItem>
          ) : null}
        </ListGroup>
      </div>
    );
  }
}

export default SavedQuestion;
