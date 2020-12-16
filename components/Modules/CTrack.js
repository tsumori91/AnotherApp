import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export default class CTrack extends Component {
  state = { show: false };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ show: !this.state.show });
          }}
        >
          <Image
            style={styles.image}
            source={
              this.props.uri
                ? {
                    uri: this.props.uri,
                  }
                : require("../pics/no_photo_available.jpg")
            }
          />
          {this.state.show ? <Text>{this.props.name}</Text> : null}
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: "99%", height: 90, flex: 1, resizeMode: "contain" },
});
