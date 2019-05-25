import React, { Component } from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

export class AnswerComponent extends Component {
  constructor(props) {
    super(props);
    this.formControl = "form-control";

    if (props.touched && !props.valid) {
      this.formControl = "form-control control-error";
    }
  }
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
              readOnly={this.props.readOnly}
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
          // touched={this.props.touched}
        />
      </InputGroup>
    );
  }
}

export default AnswerComponent;
