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
      selectedAgents: [],
      dataOld: []
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
            if (data && data.length && data.length > 0) {
              const item = data[0];
              const selectedAgentsTmp = item.selectedAgents.map(
                selectedAgent => {
                  return selectedAgent.id;
                }
              );
              item.selectedAgents = Array.from(selectedAgentsTmp);
              this.setState({
                startDate: new Date(item.startDate),
                endDate: new Date(item.endDate),
                description: item.description,
                topic: item.topic,
                selectedAgents: selectedAgentsTmp,
                dataOld: item
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  getTopics = () => {
    fetch("/api/topics").then(response => {
      this.populateSelect(
        response,
        "allTopics",
        "topic",
        this.props.location.state && this.props.location.state.topic
          ? this.props.location.state.topic
          : null
      );
    });
  };
  getAgents = () => {
    fetch("/api/getAgents").then(response => {
      this.populateSelect(response, "allAgents", "agent", null);
    });
  };
  populateSelect(response, selectElement, elementStateName, selected) {
    if (response.ok) {
      response
        .json()
        .then(data => {
          let selectedTmp = selected
            ? selected
            : data.length >= 1
              ? data[0].id
              : "";
          this.setState({
            [selectElement]: data,
            [elementStateName]: selectedTmp
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
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
      selectedAgents: this.state.selectedAgents
    };
    let fetchAddress = "/api/createQuestionAssignment";
    if (this.isEdit()) {
      data["id"] = this.props.match.params.id;
      data["dataOld"] = this.state.dataOld;

      fetchAddress = "/api/editQuestionAssignment";
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
    return (
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
            Create assignment
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default CreateQuestionAssignment;
