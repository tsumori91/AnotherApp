import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import colors from "../Config/colors";
import { Entypo } from "@expo/vector-icons";

export default class Weapon extends Component {
  state = {
    expand: false,
  };
  getBackground = () => {
    let background = styles.backgroundLight;
    if (this.props.id % 2 !== 0) {
      background = styles.backgroundGrey;
    }
    return background;
  };
  getPic = () => {
    if (this.props.type === "Staff") {
      return require("../pics/Staff.png");
    }
    if (this.props.type === "Sword") {
      return require("../pics/Sword.png");
    }
    if (this.props.type === "Axe") {
      return require("../pics/Axe.png");
    }
    if (this.props.type === "Bangle") {
      return require("../pics/Bangle.png");
    }
    if (this.props.type === "Bow") {
      return require("../pics/Bow.png");
    }
    if (this.props.type === "Fists") {
      return require("../pics/Fists.png");
    }
    if (this.props.type === "Hammer") {
      return require("../pics/Hammer.png");
    }
    if (this.props.type === "Katana") {
      return require("../pics/Katana.png");
    }
    if (this.props.type === "Lance") {
      return require("../pics/Lance.png");
    }
    if (this.props.type === "Necklace") {
      return require("../pics/Necklace.png");
    }
    if (this.props.type === "Ring") {
      return require("../pics/Ring.png");
    }
  };
  render() {
    return (
      <View style={[styles.container, this.getBackground()]}>
        <TouchableOpacity
          onPress={() => this.setState({ expand: !this.state.expand })}
          onLongPress={() =>
            !this.props.toDo ? this.props.onAdd(this.props.name) : null
          }
        >
          <View style={styles.row}>
            <Image
              style={styles.type}
              source={this.props.uri ? { uri: this.props.uri } : this.getPic()}
              resizeMode={"contain"}
            />
            <View style={styles.name}>
              <Text style={styles.text}>{this.props.name}</Text>
            </View>
            {this.props.toDo ? (
              <View style={styles.stats}>
                <TouchableOpacity
                  style={styles.checkBox}
                  onPress={() => this.props.handleGot(this.props.name)}
                >
                  {this.props.got ? (
                    <Entypo name="check" size={40} color={"green"} />
                  ) : null}
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.stats}>
                <Text style={styles.text}>
                  {this.props.armor === true ? "Def: " : "Atk: "}
                  {this.props.stats[0]}
                </Text>
                <Text style={styles.text}>
                  {this.props.armor === true ? "M.Def: " : "M.Atk: "}
                  {this.props.stats[1]}
                </Text>
              </View>
            )}
            <View style={styles.effects}>
              <Text style={styles.text}>
                {this.props.toDo ? this.props.getHow : this.props.effects}
              </Text>
            </View>
          </View>
          {this.state.expand === true ? (
            <View style={[styles.row, styles.container, { borderTopWidth: 2 }]}>
              <View style={styles.type}>
                <Text style={styles.text}></Text>
              </View>
              <View
                style={[
                  styles.name,
                  !this.props.craft && !this.props.toDo
                    ? { flex: 7, borderRightWidth: 0 }
                    : null,
                ]}
              >
                {this.props.toDo ? (
                  <View>
                    <Text style={styles.text}>
                      {this.props.armor === true ? "Def: " : "Atk: "}
                      {this.props.stats[0]}
                    </Text>
                    <Text style={styles.text}>
                      {this.props.armor === true ? "M.Def: " : "M.Atk: "}
                      {this.props.stats[1]}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.text}>{this.props.getHow}</Text>
                )}
              </View>
              {this.props.toDo ? (
                <View style={[styles.materials, this.getBackground()]}>
                  <Text style={styles.text}>{this.props.effects}</Text>
                </View>
              ) : this.props.craft === true ? (
                <View style={[styles.materials, this.getBackground()]}>
                  <Text
                    style={[
                      styles.text,
                      { fontWeight: "bold", paddingHorizontal: 15 },
                    ]}
                  >
                    {this.props.materialsLocation}
                  </Text>
                  <Text style={styles.text}>
                    -
                    {this.props.materialsLocation3
                      ? this.props.materials[0]
                      : this.props.materialsLocation2
                      ? this.props.materials
                          .slice(0, -1)
                          .filter((v) => v !== "")
                          .join("\n-")
                      : this.props.materials.join("\n-")}
                  </Text>
                  {this.props.materialsLocation2 ? (
                    <View>
                      <Text
                        style={[
                          styles.text,
                          { fontWeight: "bold", paddingHorizontal: 15 },
                        ]}
                      >
                        {"\n"}
                        {this.props.materialsLocation2}
                      </Text>
                      <Text style={styles.text}>
                        -
                        {this.props.materialsLocation3
                          ? this.props.materials[1]
                          : this.props.materials.slice(-1).join("\n-")}
                      </Text>
                      {this.props.materialsLocation3 ? (
                        <View>
                          <Text
                            style={[
                              styles.text,
                              { fontWeight: "bold", paddingHorizontal: 15 },
                            ]}
                          >
                            {"\n"}
                            {this.props.materialsLocation3}
                          </Text>
                          <Text style={styles.text}>
                            -{this.props.materials[2]}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundGrey: {
    backgroundColor: colors.grey,
    borderRightColor: colors.grey,
  },
  backgroundLight: {
    backgroundColor: "grey",
    borderRightColor: "grey",
  },
  checkBox: {
    marginVertical: "5%",
    height: 40,
    maxHeight: 40,
    width: 40,
    flex: 1,
    backgroundColor: colors.crystal,
  },
  container: {
    borderTopWidth: 2,
    borderColor: colors.white,
    minWidth: "100%",
  },
  effects: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
  },
  name: {
    flex: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  stats: {
    flex: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 6,
  },
  type: {
    height: 40,
    width: 40,
    borderColor: colors.white,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  materials: {
    flex: 5,
    paddingVertical: 4,
    borderRightWidth: 2,
  },
});
