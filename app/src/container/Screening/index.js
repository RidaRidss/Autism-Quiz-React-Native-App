// redux
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
// react
import React, { Component } from "react";
import { View } from "react-native";

import propTypes from "prop-types";

// components
import { Text, ButtonView } from "../../components";

import { getPaymentStatus as checkPaymentAction } from "../../actions/paymentAction";

import { Actions } from "react-native-router-flux";

import Util from "../../util";

import styles from "./styles";

class Screening extends Component<{}> {
  static propTypes = {
    data: propTypes.array.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      paymentStatus: false
    };
  }

  componentDidMount() {
    this.props.checkPaymentAction({});
  }
  componentWillMount() {
    if (
      this.props &&
      this.props.payment &&
      this.props.payment.data &&
      !_.isEmpty(this.props.payment.data)
    ) {
      let { payment } = this.props;
      let { data } = payment;
      this.setState({
        paymentStatus: data[0].payStatus
      });
    }
  }

  render() {
    const { paymentStatus } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={styles.headText}
          type="AvenirNextMedium"
          color="HanBlue"
          size="eighteen"
        >
          Screening - Steps to Diagnose
        </Text>
        {paymentStatus ? (
          <View>
            <Text type="AvenirNextMedium" color="HanBlue" size="twelve">
              Payment Done Make Videos
            </Text>
          </View>
        ) : (
          <Text type="AvenirNextMedium" color="HanBlue" size="twelve">
            Pay First
          </Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  payment: state.payment
});

const actions = { checkPaymentAction };

export default connect(
  mapStateToProps,
  actions
)(Screening);
