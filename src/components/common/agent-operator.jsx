import React, { Component } from "react";
import {
  Button,
  Label,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Table
} from "reactstrap";

class AgentOperator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: ""
    };
  }

  deleteAgent(selectedAgentUri) {
    let currentSelectedAgents = this.props.selectedAgents;
    let deletedAgentUri = "";
    const index = currentSelectedAgents.indexOf(selectedAgentUri);
    if (index !== -1) {
      currentSelectedAgents.splice(index, 1);
      deletedAgentUri = selectedAgentUri;
    }
    this.setState({
      agent: deletedAgentUri
    });
    this.props.setSelectedAgents(currentSelectedAgents);
  }

  selectAgent = () => {
    const currentSelectedAgents = this.props.selectedAgents;
    let selectFind = false;
    let nextAgent = this.state.agent;
    this.props.allAgents.forEach(agent => {
      if (agent.id === this.state.agent) {
        currentSelectedAgents.push(this.state.agent);
        selectFind = !selectFind;
      }
    });
    let isEmpty = true;
    if (selectFind) {
      this.props.allAgents.forEach(agent => {
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
      agent: nextAgent
    });
    this.props.setSelectedAgents(currentSelectedAgents);
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.allAgents !== prevProps.allAgents) {
      this.setState({
        agent:
          this.props.allAgents &&
          this.props.allAgents.length &&
          this.props.allAgents.length > 0
            ? this.props.allAgents[0].id
            : ""
      });
    }
  }

  render() {
    return (
      <React.Fragment>
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
              {this.props.allAgents.map(agent => {
                return this.props.selectedAgents.indexOf(agent.id) === -1 ? (
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
              {this.props.allAgents.map(agent => {
                return this.props.selectedAgents.indexOf(agent.id) !== -1 ? (
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
      </React.Fragment>
    );
  }
}

export default AgentOperator;
