import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../Config/colors";

export default class CTrack extends Component {
  state = {};
  handlePress = () => {
    if (this.props.easySelect) {
      this.props.onSelect(this.props.name);
    } else
      Alert.alert(
        "Do you want to add/remove " + this.props.name + "?",
        "Turn on Multi-add to skip this confirmation.",
        [
          { text: "Yes", onPress: () => this.props.onSelect(this.props.name) },
          { text: "No" },
        ],
        { cancelable: true }
      );
  };
  render() {
    let show = false;
    if (this.props.charList.indexOf(this.props.name) !== -1) {
      show = true;
    }
    return (
      <View
        style={[styles.container, show ? styles.selected : styles.notSelected]}
      >
        <TouchableOpacity
          onPress={() => {
            this.handlePress();
          }}
        >
          <Image
            style={styles.image}
            blurRadius={show ? 0 : 0.4}
            source={
              this.props.uri
                ? {
                    uri: this.props.uri,
                  }
                : require("../pics/no_photo_available.jpg")
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: "100%",
    height: 85,
    flex: 1,
    resizeMode: "stretch",
    borderRadius: 15,
  },
  notSelected: { borderWidth: 4, borderColor: colors.white, borderRadius: 33 },
  selected: {
    borderWidth: 4,
    borderColor: colors.water,
    borderRadius: 33,
  },
});
