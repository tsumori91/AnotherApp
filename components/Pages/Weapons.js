import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import Equip from "../Modules/Equip";
import * as firebase from "firebase";
import colors from "../Config/colors";
import DropDownPicker from "react-native-dropdown-picker";

export default class Weapons extends Component {
  state = {
    weapons: [{}],
    weaponsRead: [],
    weaponFilter: "",
    sort: null,
  };
  componentDidMount() {
    this.getWeapons();
  }
  getWeapons = () => {
    firebase
      .database()
      .ref("weapons")
      .on("value", (snapshot) =>
        this.setState({
          weapons: snapshot.val().weapons,
          weaponsRead: snapshot.val().weapons,
        })
      );
  };
  handleFilterWeapon = (v) => {
    let weaponsRead = this.state.weapons.filter((w) => w.type == v);
    if (v === this.state.weaponFilter) weaponsRead = this.state.weapons;
    if (v === this.state.weaponFilter) this.setState({ weaponFilter: "" });
    else this.setState({ weaponFilter: v });
    this.setState({ weaponsRead });
  };
  sortWep = (i) => {
    this.setState({ sort: i });
    let weaponsRead = [...this.state.weaponsRead];
    weaponsRead = weaponsRead.sort((a, b) => {
      return b.stats[i] - a.stats[i];
    });
    this.setState({ weaponsRead });
  };
  handleAdd = async () => {
    const weapons = [...this.state.weapons];
    this.setState({ weapons });
    weapons.push({
      craft: false,
      effects: "",
      getHow: "Purchased from Blacksmith",
      materials: ["1", "2", "3"],
      materialsLocation: "",
      name: "",
      stats: [1, 1],
      type: "Sword",
    });
    await firebase.database().ref("weapons").set({ weapons });
  };
  render() {
    return (
      <View style={styles.container}>
        <Button title={"Add"} onPress={this.handleAdd} />
        <View style={styles.filter}>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Staff")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Staff" ? styles.fade : null,
              ]}
              source={require("../pics/Staff.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Sword")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Sword" ? styles.fade : null,
              ]}
              source={require("../pics/Sword.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Katana")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Katana" ? styles.fade : null,
              ]}
              source={require("../pics/Katana.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Axe")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Axe" ? styles.fade : null,
              ]}
              source={require("../pics/Axe.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Lance")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Lance" ? styles.fade : null,
              ]}
              source={require("../pics/Lance.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Bow")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Bow" ? styles.fade : null,
              ]}
              source={require("../pics/Bow.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Fists")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Fists" ? styles.fade : null,
              ]}
              source={require("../pics/Fists.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Hammer")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Hammer" ? styles.fade : null,
              ]}
              source={require("../pics/Hammer.png")}
            />
          </TouchableOpacity>
        </View>
        <DropDownPicker
          items={[
            { label: "ATK", value: 0 },
            { label: "M.ATK", value: 1 },
          ]}
          placeholder={"Sort"}
          defaultValue={""}
          containerStyle={{ height: 43 }}
          dropDownStyle={{ height: 80, flex: 1 }}
          onChangeItem={(i) => this.sortWep(i.value)}
        />
        <View style={styles.row}>
          <View style={styles.type}>
            <Text>WPN</Text>
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
          {this.state.weaponsRead.map((u, i) => {
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
                materialsLocation2={u.materialsLocation2}
                uri={u.uri}
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
    flex: 3,
    paddingHorizontal: 3,
    justifyContent: "center",
    alignItems: "center",
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
    flex: 2,
    paddingHorizontal: 3,
    borderRightWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.crystal,
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
    paddingHorizontal: 1,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  weaponIcon: {
    height: 40,
    width: 40,
  },
});
