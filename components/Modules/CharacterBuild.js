import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import colors from "../Config/colors";
import Tab from "./Tab";

export default class CharacterBuild extends Component {
  state = {
    skills: false,
    showAs: false,
    main: true,
    stats: false,
    statsTotal: [],
    light: 0,
    LStats: [],
  };

  tabColor = (a) => {
    if (a) {
      return styles.tabSelected;
    } else return styles.tabDeselected;
  };
  slider = (v) => {
    if (this.props.LStats) {
      let LStats = [...this.state.LStats];
      LStats = LStats.slice(0, v);
      let statsTotal = [...this.props.stats];
      LStats.forEach((a, i) => {
        let pos = statsTotal.map((x) => x.stat).indexOf(LStats[i].stat);
        statsTotal.splice(pos, 1, {
          stat: LStats[i].stat,
          value: statsTotal[pos].value + LStats[i].value,
        });
      });
      this.setState({ statsTotal });
    }
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
    const light = require("../pics/Light.png");
    const shadow = require("../pics/LShadow.png");
    let statusColour = null;
    if (this.props.element === "Earth") {
      statusColour = styles.containerE;
    } else if (this.props.element === "Fire") {
      statusColour = styles.containerF;
    } else if (this.props.element === "Water") {
      statusColour = styles.containerWa;
    } else if (this.props.element === "Wind") {
      statusColour = styles.containerWi;
    } else if (this.props.element === "Shade") {
      statusColour = styles.containerS;
    } else if (this.props.element === "Thunder") {
      statusColour = styles.containerL;
    } else if (this.props.element === "Crystal") {
      statusColour = styles.containerC;
    }
    let elementPic = null;
    switch (this.props.element) {
      case "Wind":
        elementPic = require("../pics/Wind.png");
        break;
      case "Fire":
        elementPic = require("../pics/Fire.png");
        break;
      case "Water":
        elementPic = require("../pics/Water.png");
        break;
      case "Earth":
        elementPic = require("../pics/Earth.png");
        break;
      case "Crystal":
        elementPic = require("../pics/Crystal.png");
        break;
      case "Shade":
        elementPic = require("../pics/Shade.png");
        break;
      case "Thunder":
        elementPic = require("../pics/Thunder.png");
        break;
    }
    const skillColour = (v) => {
      if (v.match(/^Wind/)) {
        return styles.containerWi;
      } else if (v.match(/^Water/)) {
        return styles.containerWa;
      } else if (v.match(/^Fire/)) {
        return styles.containerF;
      } else if (v.match(/^Earth/)) {
        return styles.containerE;
      } else if (v.match(/^Shade/)) {
        return styles.containerS;
      } else if (v.match(/^Crystal/)) {
        return styles.containerC;
      } else if (v.match(/^Thunder/)) {
        return styles.containerL;
      } else return;
    };

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
    } else if (this.props.weapon === "Axe") {
      weapon = require("../pics/Axe.png");
    }
    return (
      <View style={styles.all}>
        <View style={styles.inLine}>
          <Tab
            title={this.props.as ? this.props.name + " AS" : this.props.name}
            style={[
              styles.topTab,
              styles.topLeftTab,
              this.tabColor(!this.state.showAs),
              { borderTopRightRadius: 10 },
            ]}
          />
        </View>
        <View style={[styles.inLine, styles.mainPage]}>
          <View style={[styles.deLine, { width: 130 }]}>
            <Image
              source={
                this.props.uriAs && this.props.as
                  ? {
                      uri: this.props.uriAs,
                    }
                  : this.props.uri
                  ? {
                      uri: this.props.uri,
                    }
                  : require("../pics/no_photo_available.jpg")
              }
              style={styles.image}
            />
            <View style={[styles.inLine, { width: 130.2 }]}>
              <Tab
                style={[styles.tabsBottom, { borderBottomEndRadius: 0 }]}
                textStyle={styles.tabsBottomText}
                color={this.state.main === true ? "gold" : "primary"}
                onPress={() =>
                  this.setState({ main: true, skills: false, stats: false })
                }
                title={"Main"}
              />
              <Tab
                style={[styles.tabsBottom, { borderRadius: 0 }]}
                textStyle={styles.tabsBottomText}
                color={this.state.skills === true ? "gold" : "primary"}
                onPress={() =>
                  this.setState({ main: false, skills: true, stats: false })
                }
                title={"Skills"}
              />
              <Tab
                style={[styles.tabsBottom, { borderRadius: 0 }]}
                textStyle={styles.tabsBottomText}
                color={this.state.stats === true ? "gold" : "primary"}
                onPress={() => {
                  let statsTotal = [...this.props.stats];
                  let LStats = this.props.LStats ? [...this.props.LStats] : [];
                  this.setState({
                    main: false,
                    skills: false,
                    stats: true,
                    statsTotal,
                    LStats,
                  });
                }}
                title={"Stats"}
              />
            </View>
          </View>
          {this.state.main === true ? (
            <View
              style={[
                styles.main,
                { paddingHorizontal: 7 },
                statusColour,
                styles.borderOg,
              ]}
            >
              <View style={[styles.inLine]}>
                <View style={[styles.inLine, styles.weaponLine, { flex: 3 }]}>
                  <Text
                    style={{
                      fontSize: 23,
                      fontWeight: "bold",
                      lineHeight: 5,
                      paddingTop: 22,
                    }}
                  >
                    {this.props.name}
                  </Text>
                  <Image style={styles.pic} source={weapon} />
                  <Image
                    style={styles.pic}
                    source={this.props.shadow === true ? shadow : light}
                  />
                </View>
                <Text
                  style={{
                    alignItems: "flex-end",
                    fontSize: 23,
                    fontWeight: "bold",
                    lineHeight: 5,
                    paddingTop: 23,
                    flex: 1,
                    width: "20%",
                  }}
                >
                  {this.props.score}
                </Text>
              </View>
              {this.props.bonusDungeon ? (
                <View style={[styles.inLine, styles.weaponLine]}>
                  <Text style={{ fontWeight: "bold" }}>
                    <Image
                      style={[styles.pic, { height: 16.8, width: 20 }]}
                      source={this.props.shadow === true ? shadow : light}
                    />{" "}
                    Farm:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {this.props.bonusDungeon}
                    </Text>
                  </Text>
                </View>
              ) : null}
              <View style={[styles.inLine, styles.weaponLine]}>
                <Text style={{ fontWeight: "bold" }}>Element type: </Text>
                <Text>{this.props.element}</Text>
              </View>
              <View style={[styles.inLine, styles.weaponLine]}>
                <Image
                  style={styles.pic}
                  source={require("../pics/Tome.png")}
                />
                <Text style={{ fontWeight: "bold" }}>
                  Name:{" "}
                  <Text style={{ fontWeight: "normal" }}>
                    {this.props.as === true
                      ? this.props.tomeNameAs
                      : this.props.tomeName}
                  </Text>
                </Text>
              </View>
              <View style={[styles.inLine, styles.weaponLine]}>
                <Image
                  style={styles.pic}
                  source={require("../pics/Tome.png")}
                />
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  Location:{" "}
                  <Text style={{ fontWeight: "normal" }}>
                    {this.props.as === true
                      ? this.props.tomeLocationAs
                      : this.props.tomeLocation}
                  </Text>
                </Text>
              </View>
              {(!this.props.as && this.props.manifest) ||
              (this.props.as && this.props.manifestAs) ? (
                <View style={[styles.inLine, styles.weaponLine]}>
                  <Text style={{ fontWeight: "bold" }}>
                    Manifest received?
                    <Text style={{ fontWeight: "normal" }}>
                      {this.props.gotManifest ? " Got it!! " : " Not yet"}
                      {"         "}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.checkBox}
                    onPress={() =>
                      this.props.handleManifest(this.props.name, this.props.as)
                    }
                  >
                    {this.props.gotManifest ? (
                      <Image
                        style={[styles.pic, { height: 20, width: 20 }]}
                        source={weapon}
                      />
                    ) : null}
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          ) : this.state.skills === true ? (
            <View
              style={[
                styles.main,
                { paddingHorizontal: 7 },
                statusColour,
                styles.borderOg,
              ]}
            >
              <Text style={styles.stats}>Skills </Text>
              <View style={styles.inLine}>
                <Text style={{ fontWeight: "bold" }}>VC: </Text>
                <Text style={styles.descriptions}>
                  {this.props.as ? this.props.vcAS : this.props.vc}
                </Text>
              </View>
            </View>
          ) : this.state.stats === true ? (
            <View
              style={[
                styles.main,
                { paddingHorizontal: 7 },
                statusColour,
                styles.borderOg,
              ]}
            >
              <Text style={styles.stats}>
                Stats at {bonus}{" "}
                {this.props.shadow === true ? "Shadow" : "Light"}
              </Text>
              {this.props.LStats[8].stat !== "" &&
              this.props.LStats[1].stat !== "" ? (
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
              <View style={styles.inLine}>
                {this.state.statsTotal.map(
                  (stats, i) => (
                    i++,
                    (
                      <View key={i} style={[styles.inLine, { width: "50%" }]}>
                        <Text
                          style={[{ fontWeight: "bold" }, styles.descriptions]}
                        >
                          {stats.stat}:{" "}
                        </Text>
                        <Text
                          style={[
                            styles.descriptions,
                            stats.value === this.props.stats[i - 1].value
                              ? styles.textBlack
                              : styles.textPink,
                          ]}
                        >
                          {stats.value}{" "}
                          {stats.value !== this.props.stats[i - 1].value
                            ? `(+${
                                stats.value - this.props.stats[i - 1].value
                              })`
                            : null}
                        </Text>
                      </View>
                    )
                  )
                )}
                <Text style={[{ fontWeight: "bold" }, styles.descriptions]}>
                  VC Grasta Gives:{" "}
                </Text>
                <Text
                  style={[
                    styles.descriptions,
                    { fontSize: 12.5, textTransform: "uppercase" },
                  ]}
                >
                  {this.props.as && this.props.vcStatsAs
                    ? this.props.vcStatsAs
                    : this.props.vcStats}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={{ marginVertical: 10 }}>
          {this.state.skills === true ? (
            <View style={{ flex: 1 }}>
              <ScrollView
                nestedScrollEnabled={true}
                style={[
                  styles.scroll,
                  statusColour,
                  { height: 300, borderRadius: 8 },
                ]}
              >
                {this.props.element === "Thunder" ? (
                  <View style={[styles.inLine]}>
                    <View style={styles.boxName}>
                      <Text style={styles.skillText}>Lunatic</Text>
                    </View>
                    <View style={styles.boxEffect}>
                      <Text>
                        Activate Lunatic Status on user (3 turns){"\n"}Charge:
                        For each attack (including damage to self), add
                        Thunder-type attack (XS)
                        {"\n"}Attack type is determined by the original attack
                        {"\n"}Lunatic replaces the basic attack button, can be
                        used once per battle
                      </Text>
                    </View>
                  </View>
                ) : this.props.element === "Shade" ? (
                  <View style={[styles.inLine]}>
                    <View style={styles.boxName}>
                      <Text style={styles.skillText}>Lunatic</Text>
                    </View>
                    <View style={styles.boxEffect}>
                      <Text>
                        Activate Lunatic Status on user (3 turns){"\n"}Rise:
                        Convert a all END to P.ATK and all SPR to M.ATK.
                        {"\n"}Increase in M.ATK does not affect Elemental
                        Modifier
                        {"\n"}Lunatic replaces the basic attack button, can be
                        used once per battle
                      </Text>
                    </View>
                  </View>
                ) : this.props.element === "Crystal" ? (
                  <View style={[styles.inLine]}>
                    <View style={styles.boxName}>
                      <Text style={styles.skillText}>Lunatic</Text>
                    </View>
                    <View style={styles.boxEffect}>
                      <Text>
                        Activate Lunatic Status on user (3 turns){"\n"}Copy:
                        Skill executes twice.
                        {"\n"}Copy has 0 MP cost and no AF gain, but increases
                        combo multiplier in AF.{"\n"}Copy counts as 2nd move for
                        buffs, and doubles animation in AF.
                        {"\n"}Lunatic replaces the basic attack button, can be
                        used once per battle
                      </Text>
                    </View>
                  </View>
                ) : null}
                {this.props.skills.slice(0, 6).map(
                  (skills, i) => (
                    i++,
                    (
                      <View
                        key={i}
                        style={[styles.inLine, skillColour(skills.skillEffect)]}
                      >
                        <View key={i} style={styles.boxName}>
                          <Text style={styles.skillText}>
                            {skills.skillName}
                          </Text>
                        </View>
                        <View key={i * 10} style={styles.boxEffect}>
                          <Text>{skills.skillEffect}</Text>
                        </View>
                      </View>
                    )
                  )
                )}
                {this.props.as === true
                  ? this.props.skills.slice(8).map(
                      (skills, i) => (
                        i++,
                        (
                          <View
                            key={i}
                            style={[
                              styles.inLine,
                              skillColour(skills.skillEffect),
                            ]}
                          >
                            <View style={styles.boxName}>
                              <Text style={styles.skillText}>
                                {skills.skillName}
                              </Text>
                              {this.props.manifestAs === true ? (
                                <Text style={styles.fade}>Manifest</Text>
                              ) : null}
                            </View>
                            <View style={styles.boxEffect}>
                              <Text>{skills.skillEffect}</Text>
                              {this.props.manifestAs === true ? (
                                <View style={{ paddingVertical: 5 }}>
                                  <Text style={styles.fade}>
                                    {skills.skillEffectManifest}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          </View>
                        )
                      )
                    )
                  : this.props.skills.slice(6, 8).map(
                      (skills, i) => (
                        i++,
                        (
                          <View
                            key={i}
                            style={[
                              styles.inLine,
                              skillColour(skills.skillEffect),
                            ]}
                          >
                            <View style={styles.boxName}>
                              <Text style={styles.skillText}>
                                {skills.skillName}
                              </Text>
                              {this.props.manifest === true ? (
                                <Text style={styles.fade}>Manifest</Text>
                              ) : null}
                            </View>
                            <View style={styles.boxEffect}>
                              <Text>{skills.skillEffect}</Text>
                              {this.props.manifest === true ? (
                                <View style={{ paddingVertical: 5 }}>
                                  <Text style={styles.fade}>
                                    {skills.skillEffectManifest}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          </View>
                        )
                      )
                    )}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textBlack: {
    color: colors.black,
  },
  textPink: {
    backgroundColor: "pink",
    color: colors.black,
  },
  all: {
    marginVertical: 5,
    justifyContent: "center",
    minWidth: "97%",
    maxWidth: "97%",
    alignSelf: "center",
  },
  borderOg: {
    borderBottomRightRadius: 10,
  },
  borderAs: { borderBottomLeftRadius: 10 },
  boxEffect: {
    borderWidth: 1,
    borderRightWidth: 0,
    alignContent: "center",
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 10,
    flex: 3,
    minHeight: 50,
    borderColor: colors.white,
  },
  boxName: {
    borderWidth: 1,
    paddingHorizontal: 5,
    flex: 1,
    borderLeftWidth: 0,
    minHeight: 80,
    borderColor: colors.white,
  },
  checkBox: { height: 20, maxWidth: 20, backgroundColor: colors.grey, flex: 1 },
  containerC: {
    backgroundColor: colors.crystal,
  },
  containerE: {
    backgroundColor: colors.earth,
  },
  containerF: {
    backgroundColor: colors.fire,
  },
  containerL: {
    backgroundColor: colors.lightning,
  },
  containerN: {
    backgroundColor: colors.white,
  },
  containerWa: {
    backgroundColor: colors.water,
  },
  containerWi: {
    backgroundColor: colors.wind,
  },
  containerS: {
    backgroundColor: colors.shadow,
  },
  deLine: {
    flexDirection: "column",
  },
  descriptions: { lineHeight: 15 },
  fade: {
    backgroundColor: colors.grey,
  },
  image: {
    resizeMode: "cover",
    flexGrow: 1,
    width: 130,
  },

  inLine: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  main: {
    flexGrow: 1,
    height: "100%",
    justifyContent: "space-evenly",
    paddingVertical: "1.3%",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 4, width: 3 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  mainPage: {
    alignItems: "flex-start",
    height: 160,
  },
  pic: {
    height: 22,
    width: 22,
    paddingVertical: 0,
  },
  scroll: {
    flex: 5,
    height: "100%",
    paddingBottom: "4%",
  },
  showButton: {
    paddingHorizontal: 10,
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
  },
  skillText: {
    marginTop: 3,
    fontWeight: "bold",
    maxWidth: "92%",
    alignSelf: "center",
  },
  stats: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },
  tabsBottom: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingVertical: 1,
    height: 21,
  },
  tabsBottomText: {
    fontSize: 13,
  },
  tabDeselected: { backgroundColor: colors.primary },
  tabGreyed: { backgroundColor: colors.black },
  tabSelected: { backgroundColor: colors.gold },
  topTab: {
    flex: 1,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  topLeftTab: {
    borderTopRightRadius: 0,
  },
  topRightTab: {
    borderTopLeftRadius: 0,
  },
  tomeLine: {
    lineHeight: 5,
    paddingBottom: 1,
    bottom: 8,
  },
  weaponLine: {
    lineHeight: 5,
    flex: 1,
  },
});
