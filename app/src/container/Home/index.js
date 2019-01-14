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
import {
  getQuestions as questionaireAction,
  updateAnswers as updateAnswerAction
} from "../../actions/QuestionaireActons";

import reuseableFunctions from "../../reusableFunction/reuseableFunction";

import Util from "../../util";

import styles from "./styles";

let QuestionairHeading =
  "Questionnaire For Parents With Children With ASD Or ASD Traits";

// let reduce_question = [];
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
      } else {
        alert("you have not answered all questions");
      }
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  giveAnswer(question, ans) {
    count = reuseableFunctions.autoIDGenerator();
    // testing state time
    // ======================
    var time = Util.timeFormat(reuseableFunctions.getDateTime());
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    console.log(minutes, "logging minutes");
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    formatedStateTime = sHours + ":" + sMinutes;

    var today_date = new Date();
    var today_date_N_time_Set_hours = today_date.setDate(
      today_date.getDate() + 1
    );

    var todaydateObj = new Date(today_date_N_time_Set_hours);
    var generatedFormatDateForToday = this.formatDate(todaydateObj);
    var config = generatedFormatDateForToday + " " + formatedStateTime;
    console.log(config, "logging config");
    let id = count;
    reuseableFunctions.createLocalResultNotification(
      id,
      "test",
      // config,
      count,
      todaydateObj
    );

    // var after24HourDate = reuseableFunctions.getAddedDate(0);

    // dateObjectAfter24Hours = new Date(after24HourDate);

    // var generatedFormatDateAfter24Hours = this.formatDate(
    //   dateObjectAfter24Hours
    // );

    // console.log(dateObjectAfter24Hours, "logged formatted date after 24 hours");

    // this.props.updateAnswerAction({ id: question.id, answer: ans });
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
