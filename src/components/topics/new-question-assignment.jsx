import React, { Component } from "react";
import { Button, Label, Form, FormGroup, Input } from "reactstrap";
import { UserTypeContext } from "../common/user-type-context";
import AgentOperator from "../common/agent-operator";
import AssignmentHeader from "../common/assignment-header";
import {
  fetchGetQuestionAssignment,
  fetchTopicsToCreateModifyQuestionAssignment,
  fetchGetAgents,
  fetchCreateQuizAssignment
} from "../../api-adapter";

export class NewQuestionAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      allTopics: [],
      allAgents: [],
      topic: "",
      agent: "",
      description: "",
      selectedAgents: []
    };
  }

  getQuestionAssignment = () => {
    fetch(
      fetchGetQuestionAssignment() +
        encodeURIComponent(this.props.match.params.id)
    ).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.setState({
              startDate: new Date(data.startDate),
              endDate: new Date(data.endDate),
              description: data.description,
              topic: data.topic,
              selectedAgents: data.selectedAgents
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  getTopics = () => {
    fetch(fetchTopicsToCreateModifyQuestionAssignment(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        editedQuestionAssignment: this.props.match.params.id
      })
    }).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.populateSelect(
              data,
              "allTopics",
              "topic",
              this.props.location.state && this.props.location.state.topic
                ? this.props.location.state.topic
                : null
            );
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  getAgents = () => {
    fetch(fetchGetAgents()).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.populateSelect(data, "allAgents", "agent", null);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  populateSelect(data, selectElement, elementStateName, selected) {
    let selectedTmp = selected ? selected : data.length >= 1 ? data[0].id : "";
    this.setState({
      [selectElement]: data,
      [elementStateName]: selectedTmp
    });
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  onStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };
  onEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };
  formSubmit = () => {
    const data = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
      topic: this.state.topic,
      selectedAgents: this.state.selectedAgents,
      token: this.context.userType
    };
    if (this.isEdit()) {
      data["id"] = this.props.match.params.id;
    }
    fetch(fetchCreateQuizAssignment(), {
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
  isEdit = () => {
    return this.props.match.params.id ? true : false;
  };
  componentDidMount() {
    this.getTopics();
    this.getAgents();
    if (this.isEdit()) {
      this.getQuestionAssignment();
    }
  }
  render() {
    return this.context.userType ===
      "http://www.semanticweb.org/semanticweb#Teacher" ? (
      <React.Fragment>
        <h3>Create new question assignment</h3>
        <Form>
          <AssignmentHeader
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            description={this.state.description}
            onStartDateChange={this.onStartDateChange}
            onEndDateChange={this.onEndDateChange}
            handleChange={this.handleChange}
          />
          <FormGroup>
            <Label for="topic">Topic</Label>
            <Input
              type="select"
              name="topic"
              id="topic"
              value={this.state.topic}
              onChange={this.handleChange}
            >
              {this.state.allTopics.map(topic => {
                return (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <AgentOperator
            allAgents={this.state.allAgents}
            selectedAgents={this.state.selectedAgents}
            setSelectedAgents={this.setSelectedAgents}
          />
          <Button color="success" onClick={() => this.formSubmit()}>
            {this.isEdit() ? "Edit assignment" : "Create assignment"}
          </Button>
        </Form>
      </React.Fragment>
    ) : (
      <div>Not authorized.</div>
    );
  }
}

NewQuestionAssignment.contextType = UserTypeContext;
export default NewQuestionAssignment;
