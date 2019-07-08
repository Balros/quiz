import React, { Component } from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

export class AnswerComponent extends Component {
  render() {
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <Input
              addon
              type="checkbox"
              aria-label="Checkbox for following text input"
              name={this.props.checkboxName}
              checked={this.props.correct}
              onChange={this.props.onChange}
              readOnly={this.props.disabled && !this.props.isQuizTake}
            />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          valid={this.props.valid}
          disabled={this.props.disabled}
        />
      </InputGroup>
    );
  }
}

export default AnswerComponent;
