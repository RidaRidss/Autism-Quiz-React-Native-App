// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, TextInput } from "react-native";

import { Text } from "../../components";
import styles from "./style";
import { Metrics, Images } from "../../theme";
import RadioForm, { RadioButton } from "react-native-simple-radio-button";

export default class Questions extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    data: PropTypes.array,
    question: PropTypes.string,
    type: PropTypes.string,
    onPress: PropTypes.func
  };

  static defaultProps = {
    value: (PropTypes.number = 0),
    type: PropTypes.string,
    data: PropTypes.array,
    question: PropTypes.string,
    onPress: PropTypes.func
  };

  render() {
    const { value, data, onPress, question, type, style } = this.props;
    return (
      <View style={[styles.componentParent, style]}>
        <View style={styles.questionContainer}>
          <Text type="AvenirNextMedium" color="HanBlue" size="fourteen">
            {question}
          </Text>
        </View>
        <View style={styles.answerContainer}>
          {type === "radio" ? (
            <View>
              <RadioForm
                style={styles.radioForm}
                radio_props={data}
                initial={value}
                formHorizontal={false}
                labelHorizontal={true}
                animation={true}
                onPress={onPress}
                labelStyle={styles.labelStyle}
              />
            </View>
          ) : (
            <TextInput
              underlineColorAndroid={"white"}
              style={styles.textInput}
              onChangeText={onPress}
              value={value}
            />
          )}
        </View>
      </View>
    );
  }
}
