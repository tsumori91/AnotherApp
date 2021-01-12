import React from "react";
import { TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
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
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 10, // Android
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "none",
    fontFamily: Platform.OS == "android" ? "normal" : "Arial",
  },
});
