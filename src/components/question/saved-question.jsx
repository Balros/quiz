import React, { Component } from "react";
import {
  Label,
  FormGroup,
  Input,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  InputGroup,
  InputGroupAddon,
  Card,
  CardBody,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import AnswerComponent from "./answer-component";
import { UserTypeContext } from "../common/user-type-context";
import { fetchApproveQuestionVersion } from "../../api-adapter";

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

  onApprove = isPrivate => {
    fetch(fetchApproveQuestionVersion(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: this.context.userType,
        questionVersionUri: this.props.id,
        isPrivate: isPrivate
      })
    }).then(response => {
      if (response.ok) {
        this.props.history.push("/questionGroups");
      }
    });
  };
  //TODO make questionVersion green when approved
  render() {
    return (
      <div className="question">
        {this.props.isApprovedAsPublic ? <div>Approved as Public</div> : null}
        {this.props.isApprovedAsPrivate ? <div>Approved as Private</div> : null}
        <Card>
          <CardBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                disabled
                value={this.props.title}
              />
            </FormGroup>
            <FormGroup>
              <Label for="question">Question</Label>
              <Input
                type="text"
                name="question"
                disabled
                value={this.props.text.value}
              />
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
                <FormGroup key={answer.id}>
                  <AnswerComponent
                    readOnly
                    correct={answer.correct}
                    value={answer.text.value}
                    disabled={true}
                  />
                </FormGroup>
              );
            })}
            {this.props.comments ? (
              this.props.comments.map(comment => {
                return (
                  <ListGroupItem key={comment.id} color="warning">
                    <ListGroupItemHeading>
                      {comment.author.name}
                    </ListGroupItemHeading>
                    <ListGroupItemText>{comment.text}</ListGroupItemText>
                    <ListGroupItemText>{comment.date}</ListGroupItemText>
                  </ListGroupItem>
                );
              })
            ) : (
              <FormGroup>
                <ListGroupItemText>No comments.</ListGroupItemText>
              </FormGroup>
            )}
            <FormGroup color="warning">
              <InputGroup>
                <Input
                  type="text"
                  name="newComment"
                  placeholder="Write a comment..."
                  onChange={this.changeHandler}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="warning"
                    onClick={() =>
                      this.props.onSendComment(
                        this.props.id,
                        this.state.newComment
                      )
                    }
                  >
                    Send
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            {this.props.isTeacher ? (
              <FormGroup color="success">
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle caret color="success">
                    Approve as
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.onApprove(false)}>
                      Approve as public
                    </DropdownItem>
                    <DropdownItem onClick={() => this.onApprove(true)}>
                      Approve as private
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </FormGroup>
            ) : null}
          </CardBody>
        </Card>
      </div>
    );
  }
}

SavedQuestion.contextType = UserTypeContext;
export default SavedQuestion;
