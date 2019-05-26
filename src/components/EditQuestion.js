import React, { Component } from "react";
import NewQuestion from "./NewQuestion";
import SavedQuestion from "./SavedQuestion";
import { Button } from "reactstrap";
class EditQuestion extends Component {
  //TODO this.props.match.params.id marks id questionsGroups,
  //then you need to look for last question from that group and load that question
  //IDEA we don't need to load anything, we just show all previous questions from group
  //and show blank form for new question
  //for good UX we can preload last question but maybe it's not necessary
  constructor(props) {
    super(props);
    // const questionGroupId = this.props.match.params.id;
    //TODO load by questionGroupId
    this.state = {
      loadQuestions: [],
      loadTopics: [],
      loadQuestionTypes: [],
      questionVersions: [],
      isEdit: false
    };
  }
  getQuestionVersions = () => {
    //TODO zmenit na generic verziu vid. to co sme robili s pintom
    // this.props.questionUri = "";
    let halo = "WifqB";
    let halo2 = "/api/getQuestionVersions/" + halo;
    fetch(halo2).then(response => {
      if (response.ok) {
        response
          .json()
          .then(data => {
            if (data) {
              this.setState({
                questionVersions: data
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  componentDidMount() {
    this.getQuestionVersions();
  }
  render() {
    let question =
      this.state.questionVersions && this.state.questionVersions.length
        ? this.state.questionVersions[0]
        : null;

    return (
      <React.Fragment>
        <Button onClick={() => this.setState({ isEdit: !this.state.isEdit })}>
          Edit question
        </Button>
        {this.state.isEdit && question ? (
          <NewQuestion
            questionGroup={this.props.match.params.id}
            title={question.title}
            text={question.text}
            answers={question.answers}
            topic={question.topic}
            questionType={question.questionType}
          />
        ) : null}
        {this.state.questionVersions.map(question => {
          return (
            <SavedQuestion
              key={question.id}
              title={question.title}
              text={question.text}
              answers={question.answers}
              topic={question.topic}
              questionType={question.questionType}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
export default EditQuestion;
