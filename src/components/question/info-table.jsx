import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Badge, NavLink, CardSubtitle } from "reactstrap";
class InfoTable extends Component {
  render() {
    return (
      <React.Fragment>
        <CardSubtitle tag={"h4"} className={"h5"}>
          {this.props.headerText}
        </CardSubtitle>
        <Table hover striped size="sm">
          <tbody>
            {this.props.questions
              ? this.props.questions.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <NavLink
                          tag={Link}
                          to={this.props.link + encodeURIComponent(item.id)}
                          color="primary"
                          className="font-weight-bold"
                        >
                          {item.title + " "}

                          {this.props.isTeacher &&
                          item.lastSeenByTeacher &&
                          item.lastChange ? (
                            new Date(item.lastSeenByTeacher) <
                            new Date(item.lastChange) ? (
                              <Badge color="danger">Updated</Badge>
                            ) : null
                          ) : item.lastSeenByStudent &&
                          item.lastChange &&
                          new Date(item.lastSeenByStudent) <
                            new Date(item.lastChange) ? (
                            <Badge color="danger">Updated</Badge>
                          ) : null}
                          <br />
                          <small className="text-muted">
                            {item.author.name}
                          </small>
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

export default InfoTable;
