import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

export default function ElementFilter({
  style,
  onPress,
  element = "null",
  imageStyle,
}) {
  let pic = require("../pics/Null.png");
  switch (element) {
    case "fire":
      pic = require("../pics/Fire.png");

      break;
    case "earth":
      pic = require("../pics/Earth.png");

      break;
    case "water":
      pic = require("../pics/Water.png");

      break;
    case "wind":
      pic = require("../pics/Wind.png");

      break;
    case "thunder":
      pic = require("../pics/Thunder.png");

      break;
    case "shade":
      pic = require("../pics/Shade.png");

      break;
    case "crystal":
      pic = require("../pics/Crystal.png");

      break;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      element={element}
      style={[styles.container, style]}
    >
      <Image source={pic} style={imageStyle} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
