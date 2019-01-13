// redux
import { connect } from "react-redux";

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

let reduce_question = [];

class Home extends Component<{}> {
  static PropTypes = {
    _questionaire: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
      _questions: [
        {
          id: 0,
          type: "radio",
          what: `My child is...`,
          choices: [
            {
              label: "0-4 years",
              value: "0-4 years"
            },
            {
              label: "5-11 years (at primary school)",
              value: "5-11 years (at primary school)"
            },
            {
              label: "11-16 years (at secondary school)",
              value: "11-16 years (at secondary school)"
            },
            {
              label: "Over 16 years",
              value: "Over 16 years"
            }
          ],
          answer: ""
        },
        {
          id: 1,
          type: "radio",

          what: `My child...`,
          choices: [
            {
              label:
                "has been diagnosed with an autism spectrum condition (including Asperger syndrome) or autistic traits.",
              value:
                "has been diagnosed with an autism spectrum condition (including Asperger syndrome) or autistic traits"
            },
            {
              label:
                "has been through assessment but was not diagnosed as having an autistic spectrum condition.",
              value:
                "has been through assessment but was not diagnosed as having an autistic spectrum condition."
            },
            {
              label: "is waiting for assessment.",
              value: "is waiting for assessment."
            },
            {
              label:
                "does not have a diagnosis because we have not yet asked for an assessment.",
              value:
                "does not have a diagnosis because we have not yet asked for an assessment."
            },
            {
              label:
                "has been refused an autistic spectrum condition assessment.",
              value:
                "has been refused an autistic spectrum condition assessment."
            }
          ],
          answer: ""
        },
        {
          id: 2,
          type: "radio",
          what: `We live in:`,
          choices: [
            {
              label: "Central Shropshire/Shrewsbury",
              value: "Central Shropshire/Shrewsbury"
            },
            {
              label: "North Shropshire",
              value: "North Shropshire"
            },
            {
              label: "South Shropshire",
              value: "South Shropshire"
            }
          ],
          answer: ""
        },
        {
          id: 3,
          type: "free_text",
          what: `Please provide your post code to help us identify if there are
          any specific issues to a particular geographic area...`,
          answer: ""
        }
      ]
    };
  }
  static propTypes = {};

  componentDidMount() {
    console.log(this.state._questionaire, "logging reducer state");
    this.props.questionaireAction({});
    reduce_question.push(...this.props.questionaire.data);
    reduce_question
      .map(obj => ({ obj, ref: this[obj] }))
      .forEach(({ obj, ref }) => {
        console.log(obj, "logging reducer object");
      });
  }

  componentWillUnmount() {}

  getResult() {
    let { _questions } = this.state;
    alert("get result on behalf of questionaire");
  }

  giveAnswer(question, ans, index) {
    this.props.updateAnswerAction({ id: question.id, answer: ans });
    // this.state._questions[index].answer = ans;
    // this.setState({
    //   _questions: this.state._questions
    // });
    // console.log(this.state._questions);
  }

  render() {
    // const { questionaire } = this.props;
    // const { question } = questionaire.data;
    // console.log(question), "lettter";
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
