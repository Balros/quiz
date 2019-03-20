import React, { Component } from "react";
import { Link } from "react-router-dom";
class NewTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsGroups: []
    };
  }
  getQuestionGroups = () => {
    fetch("/questionGroups").then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.setState({
              questionsGroups: data
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  componentDidMount() {
    this.getQuestionGroups();
  }
  render() {
    return (
      <ul>
        {this.state.questionsGroups.map(question => {
          return (
            <li>
              <div>
                {/* <Checkbox /> */}
                <p>
                  <Link to={"/editQuestion/" + question.id}>
                    {"Otazka name: " + question.name}
                  </Link>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default NewTest;
