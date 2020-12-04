import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import colors from "../Config/colors";

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
        >
          <View style={styles.row}>
            <Image
              style={styles.type}
              source={this.props.uri ? { uri: this.props.uri } : this.getPic()}
              resizeMode={"contain"}
            />
            <View style={styles.name}>
              <Text>{this.props.name}</Text>
            </View>
            {
              <View style={styles.stats}>
                <Text>
                  {this.props.armor === true ? "Defense: " : "Attack: "}
                  {this.props.stats[0]}
                </Text>
                <Text>
                  {this.props.armor === true ? "M.Defense: " : "M.Attack: "}
                  {this.props.stats[1]}
                </Text>
              </View>
            }
            <View style={styles.effects}>
              <Text>{this.props.effects}</Text>
            </View>
          </View>
          {this.state.expand === true ? (
            <View style={[styles.row, styles.container]}>
              <Text
                style={[
                  styles.name,
                  {
                    flex: 3,
                    borderLeftWidth: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                {this.props.getHow}
              </Text>
              {this.props.craft === true ? (
                <View style={styles.materials}>
                  <Text style={{ fontWeight: "bold", marginHorizontal: 5 }}>
                    {this.props.materialsLocation}
                  </Text>
                  <Text style={{ marginHorizontal: 5 }}>
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
                      <Text style={{ fontWeight: "bold", marginHorizontal: 5 }}>
                        {"\n"}
                        {this.props.materialsLocation2}
                      </Text>
                      <Text style={{ marginHorizontal: 5 }}>
                        -
                        {this.props.materialsLocation3
                          ? this.props.materials[1]
                          : this.props.materials.slice(-1).join("\n-")}
                      </Text>
                      {this.props.materialsLocation3 ? (
                        <View>
                          <Text
                            style={{ fontWeight: "bold", marginHorizontal: 5 }}
                          >
                            {"\n"}
                            {this.props.materialsLocation3}
                          </Text>
                          <Text style={{ marginHorizontal: 5 }}>
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
  },
  backgroundLight: {
    backgroundColor: "grey",
  },
  container: {
    borderTopWidth: 2,
    borderColor: colors.white,
    minWidth: "100%",
  },
  effects: {
    flex: 3,
    paddingHorizontal: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
  },
  name: {
    flex: 2,
    borderLeftWidth: 2,
    paddingHorizontal: 3,
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
    paddingHorizontal: 3,
    borderRightWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  type: {
    flex: 1,
    borderRightWidth: 2,
    height: 40,
    borderColor: colors.white,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  materials: {
    flex: 5,
    paddingHorizontal: 1.5,
    marginHorizontal: 2.2,
    paddingVertical: 3,
  },
});
