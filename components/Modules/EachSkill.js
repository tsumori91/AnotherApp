import React, { Component } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../Config/colors";

export default class EachSkill extends Component {
  state = { showManifest: false };

  render() {
    const skill = this.props.skill;
    const skillElement = this.props.skillElement;
    const mSkill = this.props.mSkill;
    const showManifest = this.state.showManifest;
    return (
      <View key={this.props.i}>
        <LinearGradient
          colors={[colors.burgandy, colors.gold, colors.burgandy]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
        ></LinearGradient>
        <Text style={styles.skillName}>
          {showManifest ? mSkill.name : skill.name}
        </Text>
        <View style={[styles.elementBox, skillElement]}>
          <Text style={[styles.element]}>
            {this.state.showManifest ? mSkill.element : skill.element}
          </Text>
          {!mSkill ? null : (
            <Button
              title={this.state.showManifest ? "Show Normal" : "Show Manifest"}
              onPress={() => {
                this.setState({ showManifest: !this.state.showManifest });
              }}
            />
          )}
        </View>
        <LinearGradient
          colors={[colors.burgandy, colors.gold, colors.burgandy]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.linearGradient}
        ></LinearGradient>
        <Text style={styles.skillDetails}>
          {this.state.showManifest ? mSkill.effect : skill.effect}
        </Text>
        <Text style={[styles.skillDetails, { color: colors.gold }]}>
          Multiplier:{" "}
          {this.state.showManifest ? mSkill.multiplier : skill.multiplier}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  skillName: {
    color: colors.offWhite,
    marginTop: 10,
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  skillDetails: {
    color: colors.offWhite,
    margin: 15,
    alignSelf: "center",
  },
  skillContainer: {
    backgroundColor: colors.burgandy,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    maxWidth: "91%",
    maxHeight: 350,
  },
  linearGradient: {
    height: 2,
  },
  element: {
    alignSelf: "center",
  },
  elementBox: {
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 8,
    width: 80,
    alignSelf: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
});
