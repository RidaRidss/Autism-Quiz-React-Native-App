// redux
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
// react
import React, { Component } from "react";
import { ScrollView, View, Animated, Easing } from "react-native";

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
let result_id;
let title = "";
let desc = "";
let dateObject;
let getPoints = 0;
let filteredChoicesItems;

class Home extends Component<{}> {
  static PropTypes = {
    _questionaire: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      reduce_question: [],
      alldone: false
    };
  }
  static propTypes = {};

  componentDidMount() {
    this.props.questionaireAction({});
    this.state.reduce_question.push(...this.props.questionaire.data);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.data &&
      nextProps.data.desc &&
      nextProps.data.desc ==
        "Thanks for your response, You will get a push notification once your result gets ready"
    ) {
      alert(
        "Thank You for your responses , your report will be published within 24 hours"
      );
    }
    if (!_.isEqual(this.props, nextProps)) {
      if (!_.isEqual(this.props.questionaire, nextProps.questionaire)) {
        this.state.reduce_question = [];
        this.state.reduce_question.push(...nextProps.questionaire.data);
        this.setState({
          reduce_question: this.state.reduce_question
        });
      }
    }
  }

  getResult() {
    let { questionaire } = this.props;
    let { data } = questionaire;
    if (data && data.length > 0) {
      for (let counter = 0; counter < data.length; counter++) {
        if (data[counter].answer == "") {
          this.setState({ alldone: false }, () => {
            alert("you have not answered all questions");
          });

          break;
        } else {
          if (counter == data.length - 1) {
            this.setState({ alldone: true }, () => {
              // diagnosis screening start
              filteredChoicesItems = data.filter(function(value, index, arr) {
                return value.choices != undefined;
              });
              if (!_.isNil(filteredChoicesItems)) {
                const index = filteredChoicesItems.findIndex(item => {
                  item.choices.map(k => {
                    if (item.answer == k.value) {
                      getPoints += k.point;
                      console.log("total points" + getPoints);
                    }
                  });
                });
              } else {
                for (var j = 0; j < data.length; j++) {
                  for (var k = 0; k < data[j].choices.length; k++) {
                    if (data[j].answer == data[j].choices[k].value) {
                      getPoints += data[j].choices[k].point;
                      console.log("total points" + getPoints);
                    }
                  }
                }
              }
              // ==========  diagnosis screening end ==================

              // user will get a imediate push notification for status
              count = reuseableFunctions.autoIDGenerator();
              // preparing payload for notification
              result_id = count;
              title = "Result Status";
              desc =
                "Thanks for your response, You will get a push notification once your result gets ready";

              dateObject = new Date();
              dateObject.setDate(dateObject.getDate());
              reuseableFunctions.createLocalResultNotification(
                result_id,
                title,
                desc,
                dateObject
              );
              dateObject = undefined;
              // result will generate after 24 hours , user will get a push notification for their result
              count = reuseableFunctions.autoIDGenerator();
              // preparing payload for notification
              result_id = count;
              title = "Result Ready";
              desc =
                "Your Total Score Is " +
                getPoints +
                " , Tap to continue to check if diagnosis is required";

              dateObject = new Date();
              dateObject.setDate(dateObject.getDate() + 1);
              reuseableFunctions.createLocalResultNotification24HoursLater(
                result_id,
                title,
                desc,
                getPoints,
                dateObject
              );
            });
          }
        }
      }
    }
  }

  giveAnswer(ques_obj, ans) {
    this.props.updateAnswerAction({ id: ques_obj.id, answer: ans });
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
              onPress={q => this.giveAnswer(_q, q)}
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
