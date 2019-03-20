import React, { Component } from "react";
import TextInput from "./formComponents/TextInput";
import Checkbox from "./formComponents/Checkbox";

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
      <div>
        {/* TODO add checkbox to select if true or false */}
        {/* <Checkbox /> */}
        <TextInput
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          touched={this.props.touched}
          valid={this.props.valid}
          disabled={this.props.disabled !== null ? this.props.disabled : false}
        />
      </div>
    );
  }
}

export default AnswerComponent;
