import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import Slider from "@react-native-community/slider";
import colors from "../Config/colors";
import Tab from "../SubModules/Tab";

export default class CharacterBuildNaoko extends Component {
  state = {
    light: 0,
    expand: false,
  };

  weaponImage = () => {
    let weapon = require("../pics/Sword.png");
    if (this.props.weapon === "Fists") {
      weapon = require("../pics/Fists.png");
    } else if (this.props.weapon === "Bow") {
      weapon = require("../pics/Bow.png");
    } else if (this.props.weapon === "Hammer") {
      weapon = require("../pics/Hammer.png");
    } else if (this.props.weapon === "Lance") {
      weapon = require("../pics/Lance.png");
    } else if (this.props.weapon === "Katana") {
      weapon = require("../pics/Katana.png");
    } else if (this.props.weapon === "Staff") {
      weapon = require("../pics/Staff.png");
    } else if (this.props.weapon === "Ax") {
      weapon = require("../pics/Axe.png");
    }
    return weapon;
  };
  shadowImage = () => {
    const light = require("../pics/Light.png");
    const shadow = require("../pics/LShadow.png");
    if (this.props.shadow) return shadow;
    else return light;
  };
  render() {
    const weapon = this.weaponImage();
    const shadow = this.shadowImage();
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ImageBackground
            source={{ uri: this.props.uri }}
            resizeMode="cover"
            style={styles.characterPicture}
          >
            <View style={styles.bottomPart}>
              <View>
                <LinearGradient
                  colors={[colors.burgandy, colors.gold, colors.burgandy]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.linearGradient}
                ></LinearGradient>
              </View>
              <View style={styles.imageText}>
                <Text style={styles.characterName}>{this.props.name} </Text>
                <Image style={styles.weapon} source={weapon} />
                <Image style={styles.shadow} source={shadow} />
              </View>
              <View>
                <LinearGradient
                  colors={[colors.burgandy, colors.gold, colors.burgandy]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.linearGradient}
                ></LinearGradient>
              </View>
              <Tab
                title={
                  this.state.expand ? "Click to minimize" : "Click to expand"
                }
                style={styles.tabStyle}
                textStyle={{ color: colors.burgandy }}
                onPress={() => this.setState({ expand: !this.state.expand })}
              />
            </View>
          </ImageBackground>
        </View>
        {this.state.expand ? (
          <View>
            {this.props.activeSkills.map(
              (skill, i) => (
                i++,
                (
                  <View key={i}>
                    <Text>{skill.name}</Text>
                  </View>
                )
              )
            )}
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bottomPart: {
    backgroundColor: colors.burgandy,
    alignContent: "center",
  },
  characterName: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.offWhite,
    alignSelf: "center",
    flexWrap: "wrap",
    maxWidth: "70%",
  },
  characterPicture: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  container: {
    marginVertical: 20,
    minWidth: "100%",
  },
  imageText: {
    flexDirection: "row",
    justifyContent: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignSelf: "center",
    height: 300,
    width: "70%",
  },
  linearGradient: {
    height: 2,
    marginBottom: 5,
  },
  shadow: {
    resizeMode: "contain",
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  tabStyle: {
    flexShrink: 0,
    backgroundColor: colors.offWhite,
    marginBottom: 15,
    paddingHorizontal: 13,
  },
  weapon: {
    resizeMode: "contain",
    width: 40,
    height: 40,
    alignSelf: "center",
  },
  weaponWrapper: {},
});
