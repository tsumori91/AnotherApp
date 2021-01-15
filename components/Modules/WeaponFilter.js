import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

export default function WeaponFilter({
  style,
  onPress,
  weapon = "sword",
  imageStyle,
}) {
  let pic = require("../pics/Sword.png");
  switch (weapon) {
    case "staff":
      pic = require("../pics/Staff.png");

      break;
    case "katana":
      pic = require("../pics/Katana.png");

      break;
    case "axe":
      pic = require("../pics/Axe.png");

      break;
    case "lance":
      pic = require("../pics/Lance.png");

      break;
    case "bow":
      pic = require("../pics/Bow.png");

      break;
    case "fists":
      pic = require("../pics/Fists.png");

      break;
    case "hammer":
      pic = require("../pics/Hammer.png");

      break;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      weapon={weapon}
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
