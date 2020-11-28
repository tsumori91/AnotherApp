import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../Config/colors";

export default function Tab({
  style,
  title,
  onPress,
  color = "primary",
  textStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: colors[color] }, style]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "none",
  },
});
