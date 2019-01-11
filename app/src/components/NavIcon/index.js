import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { TabButtonRight, Text } from "../../components";

const NavIcon = ({ onPress, icon }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <TabButtonRight imagesArray={[icon]} actions={[onPress]} />
  </View>
);

NavIcon.propTypes = {
  onPress: PropTypes.func
};

export default NavIcon;
