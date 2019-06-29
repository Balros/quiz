import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Label,
  Form,
  FormGroup,
  Input,
  Table
} from "reactstrap";
import DatePicker from "react-datepicker";
import { UserTypeContext } from "../user-type-context";

export class CreateQuestionAssignment extends Component {
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

  deleteAgent(selectedAgentUri) {
    let currentSelectedAgents = this.state.selectedAgents;
    let deletedAgentUri = "";
    const index = currentSelectedAgents.indexOf(selectedAgentUri);
    if (index !== -1) {
      currentSelectedAgents.splice(index, 1);
      deletedAgentUri = selectedAgentUri;
    }
    this.setState({
      selectedAgents: currentSelectedAgents,
      agent: deletedAgentUri
    });
  }
  selectAgent = () => {
    const currentAllAgents = this.state.allAgents;
    const currentSelectedAgents = this.state.selectedAgents;
    let selectFind = false;
    let nextAgent = this.state.agent;
    currentAllAgents.forEach(agent => {
      if (agent.id === this.state.agent) {
        currentSelectedAgents.push(this.state.agent);
        selectFind = !selectFind;
      }
    });
    let isEmpty = true;
    if (selectFind) {
      currentAllAgents.forEach(agent => {
        if (currentSelectedAgents.indexOf(agent.id) === -1) {
          isEmpty = false;
          nextAgent = agent.id;
        }
      });
    }
    if (isEmpty) {
      nextAgent = "";
    }
    this.setState({
      allAgents: currentAllAgents,
      agent: nextAgent,
      selectedAgents: currentSelectedAgents
    });
  };
  getQuestionAssignment = () => {
    fetch(
      "/api/getQuestionAssignment/" +
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
    fetch("/api/topicsToCreateModifyQuestionAssignment", {
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
    fetch("/api/getAgents").then(response => {
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
    let fetchAddress = "/api/createQuestionAssignment";
    if (this.isEdit()) {
      data["id"] = this.props.match.params.id;
    }
    fetch(fetchAddress, {
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
          <FormGroup>
            <Label for="startDate">Start date</Label>
            <DatePicker
              id="startDate"
              name="startDate"
              dateFormat="dd/MM/yyyy"
              selected={this.state.startDate}
              onChange={this.onStartDateChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End date</Label>
            <DatePicker
              id="endDate"
              name="endDate"
              dateFormat="dd/MM/yyyy"
              selected={this.state.endDate}
              onChange={this.onEndDateChange}
            />
          </FormGroup>
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
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="agent">Assign to</Label>
            <InputGroup>
              <Input
                type="select"
                name="agent"
                id="agent"
                value={this.state.agent}
                onChange={this.handleChange}
              >
                {this.state.allAgents.map(agent => {
                  return this.state.selectedAgents.indexOf(agent.id) === -1 ? (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ) : null;
                })}
              </Input>
              <InputGroupAddon addonType="append">
                <Button color="success" onClick={this.selectAgent}>
                  Add
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="agents">Assign to</Label>
            <Table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.allAgents.map(agent => {
                  return this.state.selectedAgents.indexOf(agent.id) !== -1 ? (
                    <tr key={agent.id}>
                      <td>{agent.name}</td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => this.deleteAgent(agent.id)}
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </Table>
          </FormGroup>
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

CreateQuestionAssignment.contextType = UserTypeContext;
export default CreateQuestionAssignment;
