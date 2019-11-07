import React from "react";
import { Link } from "react-router-dom";
import { Table, Badge, NavLink, CardSubtitle } from "reactstrap";
interface Props {
  headerText: string;
  isTeacher: boolean;
  link: string;
  questions: Array<{
    id: string;
    title: string;
    lastSeenByTeacher: string;
    lastSeenByStudent: string;
    lastChange: string;
    author: { name: string };
  }>;
}

class InfoTable extends React.Component<Props> {
  render() {
    const { headerText, isTeacher, link, questions } = this.props;
    return (
      <React.Fragment>
        <CardSubtitle tag={"h4"} className={"h5"}>
          {headerText}
        </CardSubtitle>
        <Table hover striped size="sm">
          <tbody>
            {questions
              ? questions.map(question => {
                  return (
                    <tr key={question.id}>
                      <td>
                        <NavLink
                          tag={Link}
                          to={link + encodeURIComponent(question.id)}
                          color="primary"
                          className="font-weight-bold"
                        >
                          {question.title + " "}

                          {isTeacher &&
                          question.lastSeenByTeacher &&
                          question.lastChange ? (
                            new Date(question.lastSeenByTeacher) <
                            new Date(question.lastChange) ? (
                              <Badge color="danger">Updated</Badge>
                            ) : null
                          ) : question.lastSeenByStudent &&
                          question.lastChange &&
                          new Date(question.lastSeenByStudent) <
                            new Date(question.lastChange) ? (
                            <Badge color="danger">Updated</Badge>
                          ) : null}
                          <br />
                          <small className="text-muted">
                            {question.author.name}
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
