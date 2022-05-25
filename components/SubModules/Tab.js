import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  View,
} from "react-native";
import colors from "../Config/colors";
import { AntDesign } from "@expo/vector-icons";

export default function Tab({
  style,
  title,
  onPress,
  color = "grey",
  textStyle,
  up,
  down,
  arrowStyle,
  selected = false,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        selected
          ? { backgroundColor: "darkGrey" }
          : { backgroundColor: "grey" },
        { backgroundColor: colors[color] },
        style,
      ]}
    >
      <View
        style={[
          styles.innerContainer,
          up || down ? { justifyContent: "space-between" } : null,
        ]}
      >
        <Text
          style={[
            styles.text,
            selected ? { color: colors.offWhite } : null,
            textStyle,
          ]}
        >
          {title}
        </Text>
        {up ? <AntDesign style={arrowStyle} name={"caretup"} /> : null}
        {down ? <AntDesign style={arrowStyle} name={"caretdown"} /> : null}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 4, width: 3 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    // height: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: Platform.OS == "android" ? "normal" : "Arial",
  },
});
