import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import colors from "../Config/colors";
import { Entypo } from "@expo/vector-icons";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Egrasta extends Component {
  state = { show: false };
  handleCheck = (name) => {
    this.props.handleCheck(name);
  };

  render() {
    let type = this.props.type;
    let stats = this.props.stats;
    let img = null;
    let check = this.props.check;
    switch (type) {
      case "attack":
        img = require("../pics/AttackGrasta.png");
        break;
      case "life":
        img = require("../pics/LifeGrasta.png");
        break;
      case "special":
        img = require("../pics/SpecialGrasta.png");
        break;
      case "support":
        img = require("../pics/SupportGrasta.png");
        break;

      default:
        img = require("../pics/SupportGrasta.png");
        break;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.setState({ show: !this.state.show })}
        >
          <View
            style={[
              styles.row,
              styles.border,
              this.state.show
                ? styles.selected && { borderBottomRightRadius: 0 }
                : null,
            ]}
          >
            <View style={styles.picContainer}>
              <Image source={img} style={styles.pic} />
            </View>
            <View style={styles.details}>
              <View style={styles.row}>
                <Text style={styles.name}>{this.props.name}</Text>
                <TouchableOpacity
                  style={styles.checkView}
                  onPress={() => this.handleCheck(this.props.name)}
                >
                  <View style={styles.checkbox}></View>
                  {check ? (
                    <Entypo
                      name="check"
                      size={33}
                      color={"green"}
                      style={styles.checkMark}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View style={styles.otherDetails}>
                <View style={styles.stats}>
                  <Text style={styles.eachStat}>
                    {stats[0]}{" "}
                    {stats[2]
                      ? stats[2]
                      : stats[0] == "hp"
                      ? "300"
                      : stats[0] == "mp"
                      ? "50"
                      : "10"}
                  </Text>
                  <Text style={styles.eachStat}>
                    {stats[1]}{" "}
                    {stats[3]
                      ? stats[3]
                      : stats[1] == "hp"
                      ? "300"
                      : stats[1] == "mp"
                      ? "50"
                      : "10"}
                  </Text>
                </View>
                <View style={styles.effectBox}>
                  <Text style={styles.effects}>{this.props.effect}</Text>
                </View>
              </View>
            </View>
          </View>
          {this.state.show ? (
            <View style={styles.row}>
              <View style={styles.picContainer}>
                <View style={{ minHeight: 40, minWidth: 40 }}></View>
              </View>
              <View
                style={[
                  styles.details,
                  styles.border,
                  { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
                ]}
              >
                <Text style={styles.getHow}>{this.props.getHow}</Text>
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  border: {
    padding: 4,
    backgroundColor: colors.grey,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  container: { flex: 1, minWidth: "99.5%", marginVertical: 4 },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: colors.crystal,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 4,
    marginRight: 1,
  },
  checkMark: { position: "absolute", elevation: 3 },
  checkView: { flex: 1, marginVertical: 2, padding: 4 },
  details: { flex: 4 },
  eachStat: {
    flex: 1,
    fontWeight: "bold",
    backgroundColor: "grey",
    textTransform: "uppercase",
    marginHorizontal: 4,
    paddingHorizontal: 3,
    borderRadius: 3,
    alignSelf: "center",
    alignItems: "center",
    maxWidth: 65,
  },
  effects: {
    flexWrap: "wrap",
    alignSelf: "center",
    flex: 1,
    width: "90%",
  },
  effectBox: {
    flex: 1,
  },
  getHow: { paddingHorizontal: 7 },
  name: { fontWeight: "bold", fontSize: 20, flex: 6 },
  otherDetails: { flexDirection: "row" },
  pic: { height: 65, width: 65 },
  picContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  selected: { opacity: 0.6 },
  stats: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginVertical: 5,
  },
  row: { flexDirection: "row" },
});
