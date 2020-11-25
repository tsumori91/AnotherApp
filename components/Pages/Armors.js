import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Equip from "../Modules/Equip";
import * as firebase from "firebase";
import colors from "../Config/colors";

export default class Armors extends Component {
  state = {
    armors: [
      {
        name: "Swift Cherry Blossom",
        stats: [170, 28],
        effects: "SPD+ (10)\nType Attack+ (10%)",
        getHow: "Purchased from Blacksmith",
        materials: ["Thick palm", "Water wheel plume", "Bear Stomach"],
        materialsLocation: "Vermillion Road",
        craft: true,
        type: "Sword",
      },
    ],
    armorsRead: [],
    armorFilter: "",
  };

  getarmors = () => {
    firebase
      .database()
      .ref("armors")
      .once("value", (snapshot) =>
        this.setState({
          armors: snapshot.val().armors,
          armorsRead: snapshot.val().armors,
        })
      );
  };
  handleFilterarmor = (v) => {
    let armorsRead = this.state.armors.filter((w) => w.type == v);
    if (v === this.state.armorFilter) armorsRead = this.state.armors;
    if (v === this.state.armorFilter) this.setState({ armorFilter: "" });
    else this.setState({ armorFilter: v });
    this.setState({ armorsRead });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <TouchableOpacity onPress={() => this.handleFilterarmor("Bangle")}>
            <Image
              style={[
                styles.armorIcon,
                this.state.armorFilter === "Bangle" ? styles.fade : null,
              ]}
              source={require("../pics/Bangle.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterarmor("Necklace")}>
            <Image
              style={[
                styles.armorIcon,
                this.state.armorFilter === "Necklace" ? styles.fade : null,
              ]}
              source={require("../pics/Necklace.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterarmor("Ring")}>
            <Image
              style={[
                styles.armorIcon,
                this.state.armorFilter === "Ring" ? styles.fade : null,
              ]}
              source={require("../pics/Ring.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.type}>
            <Text>Type</Text>
          </View>
          <View style={styles.name}>
            <Text>Name</Text>
          </View>
          <View style={styles.stats}>
            <Text>Stats</Text>
          </View>
          <View style={styles.effect}>
            <Text>Effect (max)</Text>
          </View>
        </View>
        <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
          {this.state.armorsRead.map((u, i) => {
            i++;
            return (
              <Equip
                key={i}
                id={i}
                name={u.name}
                stats={u.stats}
                effects={u.effects}
                getHow={u.getHow}
                materials={u.materials}
                materialsLocation={u.materialsLocation}
                craft={u.craft}
                type={u.type}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    width: "100%",
  },
  effect: {
    flex: 2,
    paddingHorizontal: 3,
  },
  fade: {
    opacity: 0.65,
  },
  filter: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  name: {
    flex: 1,
    paddingHorizontal: 3,
    borderRightWidth: 2,
    borderColor: colors.white,
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.crystal,
  },
  stats: {
    flex: 1,
    paddingHorizontal: 3,
    borderRightWidth: 2,
    borderColor: colors.white,
  },
  armorIcon: {
    height: 40,
    width: 40,
  },
});
