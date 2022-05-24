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
import colors from "../Config/colors";
import Tab from "../SubModules/Tab";
import Slider from "@react-native-community/slider";

export default class CharacterBuildNaoko extends Component {
  state = {
    light: 0,
    expand: true,
    accordionTab: "skill",
    statsTotal: [],
    bonusStats: [],
  };
  onAccordionTabPress = (tabName) => {
    this.setState({ accordionTab: tabName });
  };
  slider = (v) => {
    if (this.props.bonusStats) {
      let bonusStats = [...this.props.bonusStats];
      if (this.state.bonusStats.length > 0) {
        bonusStats = this.state.bonusStats;
      }
      bonusStats = bonusStats.slice(0, v);
      let statsTotal = { ...this.props.stats };
      if (v == 10) {
        statsTotal.INT += 10;
        statsTotal.PWR += 10;
        statsTotal.SPD += 10;
        statsTotal.SPR += 10;
        statsTotal.LCK += 10;
        statsTotal.END += 10;
      }
      bonusStats.forEach((a) => {
        switch (a.stat) {
          case "INT":
            statsTotal.INT += a.value;
            break;
          case "PWR":
            statsTotal.PWR += a.value;
            break;
          case "HP":
            statsTotal.HP += a.value;
            break;
          case "MP":
            statsTotal.MP += a.value;
            break;
          case "LCK":
            statsTotal.LCK += a.value;
            break;
          case "SPD":
            statsTotal.SPD += a.value;
            break;
          case "SPR":
            statsTotal.SPR += a.value;
            break;
          case "END":
            statsTotal.END += a.value;
            break;
          default:
            break;
        }
      });
      this.setState({ statsTotal });
    }
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
  getStats = () => {
    let stats = this.props.stats;
    this.state.statsTotal.PWR ? (stats = this.state.statsTotal) : null;
    return stats;
  };
  render() {
    let bonus = 0;
    switch (this.state.light) {
      case 0:
        bonus = 0;
        break;
      case 1:
        bonus = 5;
        break;
      case 2:
        bonus = 15;
        break;
      case 3:
        bonus = 30;
        break;
      case 4:
        bonus = 50;
        break;
      case 5:
        bonus = 75;
        break;
      case 6:
        bonus = 105;
        break;
      case 7:
        bonus = 140;
        break;
      case 8:
        bonus = 175;
        break;
      case 9:
        bonus = 215;
        break;
      case 10:
        bonus = 255;
        break;
    }
    const weapon = this.weaponImage();
    const shadow = this.shadowImage();
    const stats = this.getStats();
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
              <View style={styles.elementContianer}>
                {this.props.element.map((elementRaw) => {
                  let elementColour = { backgroundColor: colors.black };
                  // let textColor = {color: colors.white};
                  const element = elementRaw
                    .replace(/[^a-zA-Z]/g, "")
                    .toLowerCase();
                  switch (element) {
                    case "fire":
                      elementColour = { backgroundColor: colors.fire };
                      // textColor = {color: colors.white};
                      break;
                    case "water":
                      elementColour = { backgroundColor: colors.water };
                      break;
                    case "thunder":
                      elementColour = { backgroundColor: colors.lightning };
                      break;
                    case "crystal":
                      elementColour = { backgroundColor: colors.crystal };
                      break;
                    case "earth":
                      elementColour = { backgroundColor: colors.earth };
                      break;
                    case "wind":
                      elementColour = { backgroundColor: colors.wind };
                      break;
                    case "shade":
                      elementColour = { backgroundColor: colors.shadow };
                      break;

                    default:
                      break;
                  }
                  return (
                    <View style={[styles.elementBox, elementColour]}>
                      <Text style={styles.element}>{elementRaw}</Text>
                    </View>
                  );
                })}
              </View>
              <View>
                <LinearGradient
                  colors={[colors.burgandy, colors.gold, colors.burgandy]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
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
          <View style={styles.Accordion}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabBox,
                  this.state.accordionTab == "main" ? styles.tabSelected : null,
                ]}
                onPress={() => this.onAccordionTabPress("main")}
              >
                <Text style={styles.tabName}>Main</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabBox,
                  this.state.accordionTab == "skill"
                    ? styles.tabSelected
                    : null,
                ]}
                onPress={() => this.onAccordionTabPress("skill")}
              >
                <Text style={styles.tabName}>Skill</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabBox,
                  this.state.accordionTab == "stats"
                    ? styles.tabSelected
                    : null,
                ]}
                onPress={() => this.onAccordionTabPress("stats")}
              >
                <Text style={styles.tabName}>Stats</Text>
              </TouchableOpacity>
            </View>
            <View>
              {this.state.accordionTab == "skill" ? (
                <ScrollView
                  indicatorStyle="white"
                  persistentScrollbar={true}
                  style={styles.skillContainer}
                  nestedScrollEnabled={true}
                >
                  {this.props.activeSkills.map((skill, i) => {
                    i++;
                    let skillElement = {};
                    switch (skill.element) {
                      case "Fire":
                        skillElement = { backgroundColor: colors.fire };
                        // textColor = {color: colors.white};
                        break;
                      case "Water":
                        skillElement = { backgroundColor: colors.water };
                        break;
                      case "Thunder":
                        skillElement = { backgroundColor: colors.lightning };
                        break;
                      case "Crystal":
                        skillElement = { backgroundColor: colors.crystal };
                        break;
                      case "Earth":
                        skillElement = { backgroundColor: colors.earth };
                        break;
                      case "Wind":
                        skillElement = { backgroundColor: colors.wind };
                        break;
                      case "Shade":
                        skillElement = { backgroundColor: colors.shadow };
                        break;

                      default:
                        break;
                    }
                    return (
                      <View key={i}>
                        <LinearGradient
                          colors={[
                            colors.burgandy,
                            colors.gold,
                            colors.burgandy,
                          ]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.linearGradient}
                        ></LinearGradient>
                        <Text style={styles.skillName}>{skill.name}</Text>
                        <View style={[styles.elementBox, skillElement]}>
                          <Text style={[styles.element]}>{skill.element}</Text>
                        </View>
                        <LinearGradient
                          colors={[
                            colors.burgandy,
                            colors.gold,
                            colors.burgandy,
                          ]}
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 0 }}
                          style={styles.linearGradient}
                        ></LinearGradient>
                        <Text style={styles.skillDetails}>{skill.effect}</Text>
                        <Text
                          style={[styles.skillDetails, { color: colors.gold }]}
                        >
                          Multiplier: {skill.multiplier}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : this.state.accordionTab == "stats" ? (
                <View style={styles.statsContainer}>
                  <Text style={styles.lightBonus}>
                    Stats with {bonus} {this.props.shadow ? "Shadow" : "Light"}
                  </Text>
                  {this.props.bonusStats.length > 8 ? (
                    <Slider
                      tapToSeek={true}
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={10}
                      step={1}
                      onValueChange={(v) => {
                        this.slider(v);
                        this.setState({ light: v });
                      }}
                    />
                  ) : null}
                  <View style={styles.stats}>
                    <View
                      style={{
                        flex: 1,
                        // alignItems: "center",
                      }}
                    >
                      <Text style={styles.eachStat}>
                        HP: {stats.HP}
                        {stats.HP !== this.props.stats.HP ? (
                          <Text style={styles.bonusStat}>
                            {" "}
                            (+{stats.HP - this.props.stats.HP})
                          </Text>
                        ) : null}
                      </Text>
                      <Text style={styles.eachStat}>
                        MP: {stats.MP}
                        {stats.MP !== this.props.stats.MP ? (
                          <Text style={styles.bonusStat}>
                            {" "}
                            (+{stats.MP - this.props.stats.MP})
                          </Text>
                        ) : null}
                      </Text>
                      <Text style={styles.eachStat}>
                        PWR: {stats.PWR}
                        {stats.PWR !== this.props.stats.PWR ? (
                          <Text style={styles.bonusStat}>
                            {" "}
                            (+{stats.PWR - this.props.stats.PWR})
                          </Text>
                        ) : null}
                      </Text>
                      <Text style={styles.eachStat}>
                        INT: {stats.INT}
                        {stats.INT !== this.props.stats.INT ? (
                          <Text style={styles.bonusStat}>
                            {" "}
                            (+{stats.INT - this.props.stats.INT})
                          </Text>
                        ) : null}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.eachStat}>
                        END: {stats.END}
                        {stats.END !== this.props.stats.END ? (
                          <Text style={styles.bonusStat}>
                            {" "}
                            (+{stats.END - this.props.stats.END})
                          </Text>
                        ) : null}
                      </Text>
                      <Text style={styles.eachStat}>
                        SPD: {stats.SPD}
                        {stats.SPD !== this.props.stats.SPD ? (
                          <Text style={styles.bonusStat}>
                            {" "}
                            (+{stats.SPD - this.props.stats.SPD})
                          </Text>
                        ) : null}
                      </Text>
                      <Text style={styles.eachStat}>
                        LCK: {stats.LCK}
                        {stats.LCK !== this.props.stats.LCK ? (
                          <Text style={styles.bonusStat}>
                            {" "}
                            (+{stats.LCK - this.props.stats.LCK})
                          </Text>
                        ) : null}
                      </Text>
                      <Text style={styles.eachStat}>
                        SPR: {stats.SPR}
                        {stats.SPR !== this.props.stats.SPR ? (
                          <Text style={styles.bonusStat}>
                            {" "}
                            (+{stats.SPR - this.props.stats.SPR})
                          </Text>
                        ) : null}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : this.state.accordionTab == "main" ? (
                <View style={styles.main}>
                  <Text>
                    Valor Chant:{" "}
                    {this.props.valorChant[0] !== undefined
                      ? this.props.valorChant[0]
                      : null}
                    {this.props.valorChant[1] ? (
                      <Text>With proof: {this.props.valorChant[1]}</Text>
                    ) : null}
                  </Text>
                  <Text>Tome Name: {this.props.tomeName}</Text>
                  <Text>Tome Location: {this.props.tomeLocation}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Accordion: {
    flexDirection: "row",
    marginTop: 10,
    maxWidth: "100%",
    marginLeft: 15,
  },
  bonusStat: {
    color: colors.gold,
  },
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
  eachStat: {
    color: colors.offWhite,
    marginLeft: 25,
    marginBottom: 8,
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
  elementContianer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageText: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 2,
  },
  innerContainer: {
    justifyContent: "center",
    alignSelf: "center",
    height: 360,
    width: "79%",
    marginLeft: 10,
  },
  lightBonus: {
    color: colors.offWhite,
    margin: 25,
    marginBottom: 5,
  },
  linearGradient: {
    height: 2,
  },
  main: {
    backgroundColor: colors.burgandy,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    minWidth: "91%",
    maxWidth: "91%",
    height: 255,
  },
  shadow: {
    resizeMode: "contain",
    width: 30,
    height: 30,
    alignSelf: "center",
  },
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
  stats: {
    marginTop: 15,
    flexDirection: "row",
  },
  statsContainer: {
    backgroundColor: colors.burgandy,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    minWidth: "91%",
    maxWidth: "91%",
    height: 255,
  },
  tabBox: {
    backgroundColor: "rgba(121, 1, 31, 0.6)",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    maxHeight: 81,
    minHeight: 81,
    marginBottom: 6,
    justifyContent: "center",
  },
  tabContainer: {
    maxWidth: "10%",
  },
  tabName: {
    transform: [{ rotate: "-90deg" }],
    color: colors.offWhite,
    justifyContent: "center",
  },
  tabStyle: {
    flexShrink: 0,
    backgroundColor: colors.offWhite,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 13,
  },
  tabSelected: {
    backgroundColor: colors.burgandy,
  },
  weapon: {
    resizeMode: "contain",
    width: 40,
    height: 40,
    alignSelf: "center",
  },
  weaponWrapper: {},
});
