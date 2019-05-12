import React, { Component } from "react";
import NewQuestion from "./NewQuestion";
import * as dataFile from "../data/data";
import Question from "./Question";
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
      loadQuestions: dataFile.loadQuestions.slice(2, 4),
      loadTopics: dataFile.loadTopics,
      loadQuestionTypes: dataFile.loadQuestionTypes
    };
  }
  getQuestionVersions = () => {
    //TODO zmenit na generic verziu vid. to co sme robili s pintom
    // this.props.questionUri = "";
    let halo = "WifqB";
    let halo2 = "/api/getQuestionVersions/" + halo;
    fetch(halo2).then(response => {});
  };
  componentDidMount() {
    const questionVersions = this.getQuestionVersions();
    this.setState({
      questionVersions: questionVersions
    });
  }
  render() {
    return (
      <React.Fragment>
        {/* <NewQuestion
          questionGroup={this.props.match.params.id}
          question={dataFile.loadQuestions[2]} //TODO hardcoded, change when database is available
          topics={dataFile.loadTopics}
          answerTypes={dataFile.loadQuestionTypes}
          answers={dataFile.loadMultipleAnswer}
        /> */}
        {this.state.loadQuestions.map(question => {
          return (
            <Question
              key={question.ID}
              //TODO toto nieje dobre ani topics ani questionType
              // question={question}
              // answers={question.answers}
              // answers={[]}
              // topics={this.state.loadTopics //TODO hardcoded, change when database is available
              //   .slice(question.topic_id - 1)
              //   .map(topic => {
              //     return {
              //       value: topic.id,
              //       displayValue: topic.topic_name
              //     };
              //   })}
              questionType={this.state.loadQuestionTypes //TODO hardcoded, change when database is available
                .slice(question.question_types_id - 1)
                .map(questionType => {
                  return {
                    value: questionType.id,
                    displayValue: questionType.question_type
                  };
                })}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
export default EditQuestion;
