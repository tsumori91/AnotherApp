import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import colors from "../Config/colors";

export default class Weapon extends Component {
  state = {
    expand: false,
  };
  getBackground = () => {
    let background = null;
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
              source={this.getPic()}
              resizeMode={"contain"}
            />
            <View style={styles.name}>
              <Text>{this.props.name}</Text>
            </View>
            {this.props.armor === true ? (
              <View style={styles.stats}>
                <Text>Defense: {this.props.stats[0]} </Text>
                <Text>M.Defense: {this.props.stats[1]} </Text>
              </View>
            ) : (
              <View style={styles.stats}>
                <Text>Attack: {this.props.stats[0]} </Text>
                <Text>M.Attack: {this.props.stats[1]} </Text>
              </View>
            )}
            <View style={styles.effects}>
              <Text>{this.props.effects}</Text>
            </View>
          </View>
          {this.state.expand === true ? (
            <View
              style={[
                styles.row,
                styles.container,
                this.props.id % 2 === 0 ? { borderColor: colors.grey } : null,
              ]}
            >
              <Text style={[styles.name, { flex: 3 }]}>
                {this.props.getHow}
              </Text>
              {this.props.craft === true ? (
                <View style={styles.materials}>
                  <Text style={{ fontWeight: "bold" }}>
                    {this.props.materialsLocation}
                  </Text>
                  <Text>-{this.props.materials.join("\n-")}</Text>
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
  container: {
    borderTopWidth: 2,
    borderColor: colors.white,
    minWidth: "100%",
  },
  effects: {
    flex: 3,
    paddingHorizontal: 3,
  },
  name: {
    flex: 2,
    paddingHorizontal: 3,
    borderRightWidth: 2,
    borderColor: colors.white,
  },
  row: {
    flexDirection: "row",
  },
  stats: {
    flex: 2,
    paddingHorizontal: 3,
    borderRightWidth: 2,
    borderColor: colors.white,
  },
  type: {
    flex: 1,
    backgroundColor: colors.white,
    borderRightWidth: 2,
    height: 40,
    borderColor: colors.white,
  },
  materials: {
    flex: 5,
    paddingHorizontal: 5,
    marginHorizontal: 0.2,
  },
});
