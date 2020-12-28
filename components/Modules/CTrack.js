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
      <View>
        <View
          style={[
            styles.container,
            show ? styles.selected : styles.notSelected,
          ]}
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
        <Text
          style={{
            alignSelf: "center",
            color: show ? colors.black : colors.fire,
          }}
        >
          {this.props.name}
        </Text>
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
    borderRadius: Platform.OS === "android" ? 16 : 29,
    overflow: "hidden",
  },
  notSelected: {
    borderWidth: 4.5,
    borderColor: colors.fire,
    borderRadius: 33,
    opacity: 0.65,
  },
  selected: {
    borderWidth: 4.5,
    borderColor: colors.water,
    borderRadius: 33,
  },
});
