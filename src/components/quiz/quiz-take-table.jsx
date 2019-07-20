import React, { Component } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { Table, NavLink, CardSubtitle } from "reactstrap";
class QuizTakeTable extends Component {
  render() {
    return (
      <React.Fragment>
        <CardSubtitle tag={"h4"} className={"h5"}>
          {this.props.headerText}
        </CardSubtitle>
        <Table hover striped size="sm">
          <thead>
            <tr>
              {this.props.authorHeader ? (
                <th className={"h6"}>{this.props.authorHeader}</th>
              ) : null}
              {this.props.scoreHeader ? (
                <th className={"h6"}>{this.props.scoreHeader}</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {this.props.questions
              ? this.props.questions.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <NavLink
                          tag={LinkRouter}
                          to={this.props.link + encodeURIComponent(item.id)}
                          color="primary"
                        >
                          {item.author.name}
                        </NavLink>
                      </td>
                      <td>
                        <NavLink
                          tag={LinkRouter}
                          to={this.props.link + encodeURIComponent(item.id)}
                          color="primary"
                        >
                          {item.totalScore}
                        </NavLink>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default QuizTakeTable;
