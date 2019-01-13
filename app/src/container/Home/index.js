// redux
import { connect } from "react-redux";
import _ from "lodash";
// react
import React, { Component } from "react";
import { ScrollView, View } from "react-native";

import PropTypes from "prop-types";

// components
import { Text, ButtonView } from "../../components";

import { Questions } from "../../controls";

import { Actions } from "react-native-router-flux";
import {
  getQuestions as questionaireAction,
  updateAnswers as updateAnswerAction
} from "../../actions/QuestionaireActons";

import styles from "./styles";

let QuestionairHeading =
  "Questionnaire For Parents With Children With ASD Or ASD Traits";

// let reduce_question = [];

class Home extends Component<{}> {
  static PropTypes = {
    _questionaire: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      reduce_question: []
    };
  }
  static propTypes = {};

  componentDidMount() {
    this.props.questionaireAction({});
    this.state.reduce_question.push(...this.props.questionaire.data);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.questionaire, nextProps.questionaire)) {
      this.state.reduce_question = [];
      this.state.reduce_question.push(...nextProps.questionaire.data);
      this.setState({
        reduce_question: this.state.reduce_question
      });
    }
  }
  getResult() {
    let { questionaire } = this.props;
    const { data } = questionaire;

    console.log(data);
  }

  giveAnswer(question, ans, index) {
    this.props.updateAnswerAction({ id: question.id, answer: ans });

    // this.state._questions[index].answer = ans;
    // this.setState({
    //   _questions: this.state._questions
    // });
  }

  render() {
    const { reduce_question } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.heading}>
          <Text
            style={styles.headText}
            type="AvenirNextMedium"
            color="HanBlue"
            size="eighteen"
          >
            {QuestionairHeading}
          </Text>
        </View>
        {reduce_question.map((_q, i) => {
          return (
            <Questions
              key={i}
              data={_q.choices}
              question={_q.what}
              type={_q.type}
              onPress={q => this.giveAnswer(_q, q, i)}
              value={_q.answer}
            />
          );
        })}
        <ButtonView onPress={() => this.getResult()} style={styles.submit}>
          <Text color={"primary"} type="AvenirNextDemiBold" size="twelve">
            {"Submit"}
          </Text>
        </ButtonView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  questionaire: state.questionaire
});

const actions = { questionaireAction, updateAnswerAction };

export default connect(
  mapStateToProps,
  actions
)(Home);
