import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../Config/colors";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Tab from "../SubModules/Tab";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class EIDA3 extends Component {
  state = { show: false };
  handleUp = async () => {
    if (this.props.points < this.props.rank3) {
      this.props.onProgress(this.props.name, 1);
    } else return;
    await delay(10);
    if (this.props.points == this.props.rank3) {
      this.props.onDone(this.props.name);
    }
  };
  handleDown = async () => {
    if (this.props.points > 0) {
      this.props.onProgress(this.props.name, -1);
    } else return;
    await delay(10);
    if (this.props.points == this.props.rank3) {
      this.props.onDone(this.props.name);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <TouchableOpacity
            style={styles.leftPart}
            onPress={() => this.setState({ show: !this.state.show })}
          >
            <View style={[styles.inLine, styles.topLine]}>
              <Text style={styles.name}> {this.props.name} </Text>
              {this.props.inProgress ? (
                <Text style={styles.name}>
                  Need: {this.props.rank3 - this.props.points},000
                </Text>
              ) : (
                <Text style={{ top: 5 }}>Done?{"      "}</Text>
              )}
              {this.props.inProgress ? null : (
                <TouchableOpacity
                  style={styles.checkView}
                  onPress={() => this.props.onDone(this.props.name)}
                >
                  <View style={styles.checkbox}></View>
                  {this.props.done ? (
                    <Entypo
                      name="check"
                      size={33}
                      color={"green"}
                      style={styles.checkMark}
                    />
                  ) : null}
                </TouchableOpacity>
              )}
            </View>
            {this.props.inProgress || this.props.done ? (
              <View style={styles.inLine}>
                <Tab
                  title={"Reset"}
                  color={"fire"}
                  style={styles.button}
                  onPress={() => {
                    if (this.props.done) {
                      this.props.onDone(this.props.name);
                    }
                    this.props.onReset(this.props.name);
                  }}
                />
              </View>
            ) : null}
            <View style={styles.inLine}>
              <Text style={{ flex: 1 }}>Rank 3: {this.props.rank3},000</Text>
              <Text style={styles.inLine}>
                Give points at Lezona{" "}
                <Text style={{ fontWeight: "bold" }}>F{this.props.floor}</Text>
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rightPart}>
            {!this.props.inProgress && !this.props.done ? (
              <Tab
                title={"Start"}
                color={"fire"}
                style={styles.button}
                onPress={() => this.props.onStart(this.props.name)}
              />
            ) : !this.props.done ? (
              <View style={styles.increment}>
                <TouchableOpacity onPress={() => this.handleUp()}>
                  <AntDesign name="caretup" size={24} color="black" />
                </TouchableOpacity>
                <Text>+/- 1k</Text>
                <TouchableOpacity onPress={() => this.handleDown()}>
                  <AntDesign name="caretdown" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity
              style={{ marginTop: 9, minHeight: "100%" }}
              onPress={() => this.setState({ show: !this.state.show })}
            ></TouchableOpacity>
          </View>
        </View>
        {this.state.show ? (
          <TouchableOpacity
            style={styles.sub}
            onPress={() => this.setState({ show: !this.state.show })}
          >
            <View style={styles.inLine}>
              <Text style={{ fontWeight: "bold" }}>Get From:{"  "}</Text>
              <Text style={styles.inLine}>{this.props.getHow}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          false
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: { paddingHorizontal: 10, margin: 10 },
  leftPart: { flex: 3 },
  rightPart: { flex: 1 },
  checkbox: {
    width: 20,
    borderRadius: 2,
    borderWidth: 2,
    height: 20,
    backgroundColor: colors.crystal,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    top: 10,
    right: -4,
  },
  checkMark: { position: "absolute", elevation: 3 },
  checkView: { width: 40, top: -5, height: 40 },
  container: {
    minWidth: "100%",
    flex: 1,
    backgroundColor: colors.earthOpe,
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
  },
  increment: {
    alignItems: "center",
    paddingVertical: 5,
    flex: 1,
  },
  inLine: { flexDirection: "row", flex: 1 },
  name: { fontWeight: "bold", fontSize: 23, width: "50%" },
  main: { width: "100%", flex: 1, flexDirection: "row" },
  sub: { borderTopWidth: 1, paddingTop: 10 },
  topLine: {
    paddingTop: 5,
  },
});
