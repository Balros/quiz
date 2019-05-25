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
    currentAllAgents.map(agent => {
      if (agent.value === this.state.agent) {
        console.log(currentSelectedAgents);
        currentSelectedAgents.push(this.state.agent);
        selectFind = !selectFind;
      }
    });
    let isEmpty = true;
    if (selectFind) {
      currentAllAgents.map(agent => {
        if (currentSelectedAgents.indexOf(agent.value) === -1) {
          isEmpty = false;
          nextAgent = agent.value;
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
  getQuestionAssignment = uri => {
    fetch("/api/getQuestionAssignment/" + this.props.match.params.id).then(
      response => {
        if (response.ok) {
          response
            .json()
            .then(data => {
              if (data && data.length && data.length > 0) {
                let item = data[0];

                this.setState({
                  startDate: new Date(),
                  endDate: new Date(),
                  description: item.description,
                  topic: item.topic,
                  selectedAgents: item.selectedAgents
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    );
  };
  getTopics = () => {
    fetch("/api/topics").then(response => {
      this.populateSelect(response, "allTopics", "topic");
    });
  };
  getAgents = () => {
    fetch("/api/getAgents").then(response => {
      this.populateSelect(response, "allAgents", "agent");
    });
  };
  populateSelect(response, selectElement, selected) {
    if (response.ok) {
      response
        .json()
        .then(data => {
          let tmpSelected = "";
          let options = data.map(item => {
            if (tmpSelected === "") {
              tmpSelected = item.id;
            }
            return {
              value: item.id,
              displayValue: item.name
            };
          });
          this.setState({
            [selectElement]: options,
            [selected]: tmpSelected
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
    console.log(data);
  };
  componentDidMount() {
    this.getTopics();
    this.getAgents();
    if (this.props.match.params.id) {
      this.getQuestionAssignment(this.props.match.params.id);
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
                  <option key={topic.value} value={topic.value}>
                    {topic.displayValue}
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
                  return this.state.selectedAgents.indexOf(agent.value) ===
                    -1 ? (
                    <option key={agent.value} value={agent.value}>
                      {agent.displayValue}
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
                  return this.state.selectedAgents.indexOf(agent.value) !==
                    -1 ? (
                    <tr key={agent.value}>
                      <td>{agent.displayValue}</td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => this.deleteAgent(agent.value)}
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
          <Button color="success" onClick={this.formSubmit}>
            Create assignment
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default CreateQuestionAssignment;
