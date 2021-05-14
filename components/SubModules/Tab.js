import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import colors from "../Config/colors";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Tab({
  style,
  title,
  onPress,
  color = "primary",
  textStyle,
  up,
  down,
  arrowStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: colors[color] }, style]}
    >
      <Text style={[styles.text, textStyle]}>{title} </Text>
      {up ? <AntDesign style={arrowStyle} name={"caretup"} /> : null}
      {down ? <AntDesign style={arrowStyle} name={"caretdown"} /> : null}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 4, width: 3 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    backgroundColor: "#fff",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
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
