import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import colors from "../Config/colors";

export default class CTrack extends Component {
  state = { show: false };
  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.show ? styles.selected : styles.notSelected,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          <Image
            style={styles.image}
            blurRadius={this.state.show ? 0 : 0.4}
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
    borderColor: colors.gold,
    borderRadius: 33,
  },
});
