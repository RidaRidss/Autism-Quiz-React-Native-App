// redux
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
// react
import React, { Component } from "react";
import { ScrollView, View } from "react-native";

import PropTypes from "prop-types";

// components
import { Text, ButtonView } from "../../components";

import { Questions } from "../../controls";

import { Actions } from "react-native-router-flux";
import PushNotification from "react-native-push-notification";
import {
  getQuestions as questionaireAction,
  updateAnswers as updateAnswerAction
} from "../../actions/QuestionaireActons";

import reuseableFunctions from "../../reusableFunction/reuseableFunction";

import Util from "../../util";

import styles from "./styles";

let QuestionairHeading =
  "Questionnaire For Parents With Children With ASD Or ASD Traits";

let count = 0;

class Home extends Component<{}> {
  static PropTypes = {
    _questionaire: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      reduce_question: [],
      emptyAnswer: [],
      alldone: false
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
    if (data && data.length > 0) {
      data
        .map(obj => ({ obj, ref: this[obj] }))
        .forEach(({ obj, ref }) => {
          if (obj.answer == "") {
            console.log(
              "question " + (parseInt(obj.id) + 1) + " is un answered"
            );
          } else {
            this.setState({
              alldone: true
            });
          }
        });
      if (this.state.alldone) {
        alert(
          "Thank You for your responses , your report will be published within 24 hours"
        );
        // result will generate after 24 hours , user will get a push notification for their result
        count = reuseableFunctions.autoIDGenerator();
        // preparing payload for notification
        let result_id = count;
        let title = "Result Reminder";
        let desc = "Your Result Is Ready, Tap to Continue . . .";
        let dateObject = new Date();
        dateObject.setDate(dateObject.getDate() + 1);
        reuseableFunctions.createLocalResultNotification(
          result_id,
          title,
          desc,
          dateObject
        );
      } else {
        alert("you have not answered all questions");
      }
    }
  }

  giveAnswer(question, ans) {
    this.props.updateAnswerAction({ id: question.id, answer: ans });
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
              onPress={q => this.giveAnswer(_q)}
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
