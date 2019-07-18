import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Badge, NavLink } from "reactstrap";
class InfoTable extends Component {
  render() {
    return (
      <Table hover striped size="sm">
        <thead>
          <tr>
            <th>{this.props.headerText}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.questions
            ? this.props.questions.map(item => {
                let text1;
                if (item.title) {
                  text1 = "Question name: " + item.title;
                }
                let text2;
                if (item.author) {
                  text2 = "Author:  " + item.author.name;
                }
                let text3;
                if (item.totalScore) {
                  text3 = " Score: " + item.totalScore;
                }
                return (
                  <tr key={item.id}>
                    <td>
                      <NavLink
                        tag={Link}
                        to={this.props.link + encodeURIComponent(item.id)}
                        color="primary"
                      >
                        {text1 ? (
                          <React.Fragment>
                            {text1} <br />
                          </React.Fragment>
                        ) : null}
                        {text2 ? (
                          <React.Fragment>
                            {text2} <br />
                          </React.Fragment>
                        ) : null}
                        {text3 ? text3 : null}
                        {this.props.isTeacher &&
                        item.lastSeenByTeacher &&
                        item.lastChange ? (
                          new Date(item.lastSeenByTeacher) <
                          new Date(item.lastChange) ? (
                            <Badge color="danger">Changed</Badge>
                          ) : (
                            <Badge color="success">Not Changed</Badge>
                          )
                        ) : item.lastSeenByStudent && item.lastChange ? (
                          new Date(item.lastSeenByStudent) <
                          new Date(item.lastChange) ? (
                            <Badge color="danger">Changed</Badge>
                          ) : (
                            <Badge color="success">Not Changed</Badge>
                          )
                        ) : null}
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  }
}

export default InfoTable;
