import React, { Component } from "react";
import { Label, Form, FormGroup, Row, Col, Input, Button } from "reactstrap";
import AgentOperator from "../common/agent-operator";
import { DragDropContext } from "react-beautiful-dnd";
import QuestionsColumn from "./questions-column";
import { UserTypeContext } from "../common/user-type-context";
import AssignmentHeader from "../common/assignment-header";
import {
  fetchGetQuestions,
  fetchGetQuizAssignment,
  fetchGetAgents,
  fetchCreateQuizAssignment
} from "../../api-adapter";

class NewQuizAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      allAgents: [],
      selectedAgents: [],
      description: "",
      questions: {}
    };
  }

  setSelectedAgents = selectedAgents => {
    this.setState({
      selectedAgents: selectedAgents
    });
  };

  getQuestions = () => {
    fetch(fetchGetQuestions()).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            const questions = {};
            data.forEach(element => {
              questions[element.id] = element;
            });
            const initialDataDatabase = {
              questions: questions,
              columns: {
                availableQuestions: {
                  id: "availableQuestions",
                  title: "Available questions",
                  questionIds: Object.keys(questions)
                },
                choosenQuestions: {
                  id: "choosenQuestions",
                  title: "Choosen questions",
                  questionIds: []
                }
              },
              columnOrder: ["choosenQuestions", "availableQuestions"] //TODO do i need it?
            };
            this.setState({
              questions: initialDataDatabase //TODO change for data from database
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  getQuizAssignment = () => {
    fetch(
      fetchGetQuizAssignment() + encodeURIComponent(this.props.match.params.id)
    ).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            console.log(data);
            const tmpQuestions = [];
            data.quiz.questions.forEach(selectedQuestion => {
              tmpQuestions.push(selectedQuestion.selectedQuestion.id);
            });
            data.questions = tmpQuestions;
            const newQuestions = {
              ...this.state.questions,
              columns: {
                ...this.state.questions.columns,
                availableQuestions: {
                  ...this.state.questions.columns.availableQuestions,
                  questionIds: this.state.questions.columns.availableQuestions.questionIds.filter(
                    x => !data.questions.includes(x)
                  )
                },
                choosenQuestions: {
                  ...this.state.questions.columns.choosenQuestions,
                  questionIds: data.questions
                }
              }
            };
            this.setState({
              title: data.title,
              startDate: new Date(data.startDate),
              endDate: new Date(data.endDate),
              description: data.description,
              topic: data.topic,
              selectedAgents: data.selectedAgents,
              questions: newQuestions
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  getAgents = () => {
    fetch(fetchGetAgents()).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            this.populateSelect(data, "allAgents", "agent", null);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  populateSelect(data, selectElement, elementStateName, selected) {
    let selectedTmp = selected ? selected : data.length >= 1 ? data[0].id : "";
    this.setState({
      [selectElement]: data,
      [elementStateName]: selectedTmp
    });
  }

  onStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };
  onEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };
  setSelectedAgents = selectedAgents => {
    this.setState({
      selectedAgents: selectedAgents
    });
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  isEdit = () => {
    return this.props.match.params.id ? true : false;
  };
  onDragEnd = result => {
    //TODO da sa pekne farebne odlisit kam sa da dropnut
    //TODO rozsirit funkcionalitu
    //1.(filter podla topicu, budu na sebe vsetky a podla
    // toho aky filter sa zvoli taky column bude ukazany)
    //2. nebudu miznut z povodnej tabulky len sa zafarbia
    // aby bolo jasne ze otazka uz bola pouzita
    //3. v topicoch bude polozka allTopics kde budu vsetky otazky pohromade
    //tato tabulka sa bude menit na pozadi ked sa bude z roznych topicov pridavat
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      const column = this.state.questions.columns[source.droppableId];
      const newQuestionIds = Array.from(column.questionIds);
      newQuestionIds.splice(source.index, 1);
      newQuestionIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...column,
        questionIds: newQuestionIds
      };
      const newState = {
        ...this.state,
        questions: {
          ...this.state.questions,
          columns: {
            ...this.state.questions.columns,
            [newColumn.id]: newColumn
          }
        }
      };
      this.setState(newState);
    } else {
      const columnSource = this.state.questions.columns[source.droppableId];
      const columnDestination = this.state.questions.columns[
        destination.droppableId
      ];
      const newQuestionIdsSource = Array.from(columnSource.questionIds);
      const newQuestionIdsDestination = Array.from(
        columnDestination.questionIds
      );
      newQuestionIdsSource.splice(source.index, 1);
      newQuestionIdsDestination.splice(destination.index, 0, draggableId);
      const newColumnSource = {
        ...columnSource,
        questionIds: newQuestionIdsSource
      };
      const newColumnDestination = {
        ...columnDestination,
        questionIds: newQuestionIdsDestination
      };
      const newState = {
        ...this.state,
        questions: {
          ...this.state.questions,
          columns: {
            ...this.state.questions.columns,
            [newColumnSource.id]: newColumnSource,
            [newColumnDestination.id]: newColumnDestination
          }
        }
      };
      this.setState(newState);
    }
  };
  formSubmit = () => {
    const data = {
      title: this.state.title,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
      selectedAgents: this.state.selectedAgents,
      questions: this.state.questions.columns.choosenQuestions.questionIds,
      token: this.context.userType
    };
    if (this.isEdit()) {
      data["id"] = this.props.match.params.id;
    }
    fetch(fetchCreateQuizAssignment(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.ok) {
        this.props.history.push("/quizAssignmentsOverview");
      }
    });
  };
  componentDidMount() {
    this.getQuestions();
    this.getAgents();
    if (this.isEdit()) {
      this.getQuizAssignment();
    }
    console.log(this.state);
  }

  render() {
    return (
      <React.Fragment>
        <h3>Create new quiz assignment</h3>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder={"Add title"}
              value={this.state.title}
              onChange={this.handleChange}
              valid={this.state.title.length > 0}
            />
          </FormGroup>
          <AssignmentHeader
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            description={this.state.description}
            onStartDateChange={this.onStartDateChange}
            onEndDateChange={this.onEndDateChange}
            handleChange={this.handleChange}
          />
          <FormGroup>
            <Label for="questions">Questions</Label>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Row>
                {this.state.questions && this.state.questions.columnOrder
                  ? this.state.questions.columnOrder.map(columnId => {
                      const column = this.state.questions.columns[columnId];
                      const questions = column.questionIds.map(
                        questionId => this.state.questions.questions[questionId]
                      );
                      return (
                        <Col key={column.id}>
                          <QuestionsColumn
                            column={column}
                            questions={questions}
                          />
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </DragDropContext>
          </FormGroup>
          <AgentOperator
            allAgents={this.state.allAgents}
            selectedAgents={this.state.selectedAgents}
            setSelectedAgents={this.setSelectedAgents}
          />
          <Button color="success" onClick={() => this.formSubmit()}>
            {this.isEdit() ? "Edit assignment" : "Create assignment"}
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

NewQuizAssignment.contextType = UserTypeContext;
export default NewQuizAssignment;
