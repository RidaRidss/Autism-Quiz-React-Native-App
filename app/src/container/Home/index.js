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
    this.animatedValue = [];
    this.state.reduce_question.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }
  static propTypes = {};

  componentDidMount() {
    this.animate();
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
    if (!_.isEqual(this.props.questionaire, nextProps.questionaire)) {
      this.state.reduce_question = [];
      this.state.reduce_question.push(...nextProps.questionaire.data);
      this.setState({
        reduce_question: this.state.reduce_question
      });
    }
  }

  animate() {
    const animations = this.state.reduce_question.map(item => {
      return Animated.timing(this.animatedValue[item], {
        toValue: 1,
        duration: 5000
      });
    });
    Animated.sequence(animations).start();
  }

  getResult() {
    let { questionaire } = this.props;
    const { data } = questionaire;
    if (data && data.length > 0) {
      for (let counter = 0; counter < data.length; counter++) {
        if (data[counter].answer == "") {
          this.setState({ alldone: false }, () => {
            alert("you have not answered all questions");
          });

          break;
        } else {
          this.setState({ alldone: true });
          if (counter == data.length - 1) {
            this.setState({ alldone: true }, () => {
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
              title = "Result Reminder";
              desc = "Your Result Is Ready, Tap to Continue . . .";
              dateObject = new Date();
              dateObject.setDate(dateObject.getDate() + 1);
              reuseableFunctions.createLocalResultNotification(
                result_id,
                title,
                desc,
                dateObject
              );
            });
          }
        }
      }
    }
  }

  giveAnswer(question, ans) {
    this.props.updateAnswerAction({ id: question.id, answer: ans });
  }

  render() {
    const { reduce_question } = this.state;
    const childs = reduce_question.map((_q, i) => {
      return (
        <Animated.View
          key={i}
          style={{
            opacity: this.animatedValue[_q],

            backgroundColor: "transparent"
          }}
        >
          <Questions
            style={{ backgroundColor: "transparent" }}
            key={i}
            data={_q.choices}
            question={_q.what}
            type={_q.type}
            onPress={q => this.giveAnswer(_q)}
            value={_q.answer}
          />
        </Animated.View>
      );
    });
    return (
      <Animated.ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: {
                    toValue: 100,
                    easing: Easing.back(),
                    duration: 7000
                  }
                }
              }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
      >
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
        {childs}
        <ButtonView onPress={() => this.getResult()} style={styles.submit}>
          <Text color={"primary"} type="AvenirNextDemiBold" size="twelve">
            {"Submit"}
          </Text>
        </ButtonView>
      </Animated.ScrollView>
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
