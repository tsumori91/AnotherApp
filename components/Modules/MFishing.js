import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

export default class MFishing extends Component {
  state = {

  };
  componentDidMount() {
    this.setPage();
  }
  setPage = () => {
    this.setState({ });
  };
  render() {
    return (
      <View>        
        {
        <Text> {this.props.name} {this.props.rarity} {this.props.tier} {this.props.reqLv} {this.props.hook} {this.props.location} </Text>
        }
        <View style={[styles.deLine, { height: 150, flex: 3, maxWidth: 130, minWidth: 100 }]}>
          <Image 
                source={
                  this.props.uri
                    ? {
                        uri: this.props.uri,
                      }
                    : require("../pics/no_photo_available.jpg")
                }
                style={styles.image}
              />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    resizeMode: "cover",
    flexGrow: 1,
  },
});