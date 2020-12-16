import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import colors from "./colors";
export default class MySwitch extends Component {
  state = {};
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress()}
      >
        <View
          style={[
            styles.leftHalf,
            this.props.switchOn ? styles.halfOff : styles.halfOn,
          ]}
        >
          <Text style={styles.text}>Off</Text>
        </View>
        <View
          style={[
            styles.rightHalf,
            this.props.switchOn ? styles.halfOn : styles.halfOff,
          ]}
        >
          <Text style={styles.text}>On</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: { width: 90, height: 35, flexDirection: "row" },
  halfOn: { backgroundColor: colors.black },
  halfOff: { backgroundColor: colors.grey },
  leftHalf: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightHalf: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "50%",
    height: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: { color: colors.white, fontWeight: "bold" },
});
