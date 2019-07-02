import React, { Component } from "react";
import { Label, FormGroup, Input, Form, Button } from "reactstrap";

class NewTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicName: ""
    };
  }
  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  formSubmit = () => {
    fetch("/api/createTopic", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: this.props.userType,
        topicName: this.state.topicName
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
      <Form>
        <FormGroup>
          <Label for="name">Topic name</Label>
          <Input
            type="textarea"
            name="topicName"
            id="topicName"
            value={this.state.topicName}
            onChange={this.changeHandler}
          />
        </FormGroup>
        <Button color="success" onClick={this.formSubmit}>
          Create topic
        </Button>
      </Form>
    );
  }
}

export default NewTopic;
