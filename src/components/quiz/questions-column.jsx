import React from "react";
import QuestionRow from "./question-row";
import { ListGroup } from "reactstrap";
import { Droppable } from "react-beautiful-dnd";
const style = {
  minHeight: "100px"
};
export default class QuestionsColumn extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h3>{this.props.column.title}</h3>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <div
              style={style}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <ListGroup>
                {this.props.questions.map((question, index) => {
                  return (
                    <QuestionRow
                      question={question}
                      index={index}
                      key={index}
                    />
                  );
                })}
                {provided.placeholder}
              </ListGroup>
            </div>
          )}
        </Droppable>
      </React.Fragment>
    );
  }
}
