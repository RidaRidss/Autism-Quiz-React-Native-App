// redux
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
// react
import React, { Component } from "react";
import { View } from "react-native";

import PropTypes from "prop-types";

// components
import { Text, ButtonView } from "../../components";

import { Actions } from "react-native-router-flux";

import Util from "../../util";

import styles from "./styles";

class Result extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      res: "",
      desc: ""
    };
  }
  static propTypes = {};

  componentDidMount() {
    if (
      this.props &&
      this.props.data &&
      this.props.data.desc &&
      this.props.data.desc ==
        "Thanks for your response, You will get a push notification once your result gets ready"
    ) {
      alert(
        "Thank You for your responses , your report will be published within 24 hours"
      );
      this.setState({
        res: this.props.data.result_id,
        desc: "Summary will be publish here after 24 hours"
      });
    }
    if (
      this.props &&
      this.props.data &&
      this.props.data.title &&
      this.props.data.title == "Result Ready"
    ) {
      alert(
        "Thank You for your responses , your report will be published within 24 hours"
      );
      this.setState({
        res: this.props.data.result_id,
        score: this.props.data.score,
        desc: ""
      });
    }
    this.getLevelOfAutism();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.data.title, nextProps.data.title)) {
      if (!_.isUndefined(nextProps.data.score)) {
        this.setState({
          score: score
        });
      }
    }
  }

  getLevelOfAutism() {
    const { score, levelOfAutism } = this.state;
    if (score >= 0 && score <= 30) {
      this.setState({
        levelOfAutism: 1
      });
    } else if (score >= 31 && score <= 65) {
      this.setState({
        levelOfAutism: 2
      });
    } else if (score >= 66 && score <= 100) {
      this.setState({
        levelOfAutism: 3
      });
    } else if (score > 100) {
      this.setState({
        levelOfAutism: 4
      });
    }
  }

  startDiagnosis() {
    let { levelOfAutism } = this.state;
    Actions.screening(levelOfAutism);
  }

  render() {
    const { res, score, desc, levelOfAutism } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={styles.headText}
          type="AvenirNextMedium"
          color="HanBlue"
          size="eighteen"
        >
          Result Id : {res}
        </Text>

        <Text type="AvenirNextMedium" color="HanBlue" size="twelve">
          {desc != "" ? desc : score}
        </Text>
        <Text
          style={styles.headText}
          type="AvenirNextMedium"
          color="HanBlue"
          size="eighteen"
        >
          {levelOfAutism}
        </Text>
        {levelOfAutism == 3 || levelOfAutism == 4 ? (
          <ButtonView
            onPress={() => this.startDiagnosis()}
            style={styles.diagnosis}
          >
            <Text color={"primary"} type="AvenirNextDemiBold" size="twelve">
              {"Start Diagnosis"}
            </Text>
          </ButtonView>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Result);
