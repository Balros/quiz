import React, { Component } from "react";
import { Link } from "react-router-dom";

export class QuestionPreview extends Component {
  render() {
    return (
      <div>
        {/* <Checkbox /> */}
        <p>
          <Link to={"/editQuestion/" + this.props.subject}>
            {"Otazka name: " + this.props.name}
          </Link>
        </p>
      </div>
    );
  }
}

export default QuestionPreview;
