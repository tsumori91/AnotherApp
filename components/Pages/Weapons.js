import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
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
    loading: false,
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
    this.setState({ loading: true });
    let weaponsRead = this.state.weapons.filter((w) => w.type == v);
    if (v === this.state.weaponFilter) weaponsRead = this.state.weapons;
    if (v === this.state.weaponFilter) this.setState({ weaponFilter: "" });
    else this.setState({ weaponFilter: v });
    this.setState({ weaponsRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleOtherFilters = (v) => {
    this.setState({ loading: true });
    let weaponsRead = [...this.state.weapons];
    if (this.state.weaponFilter) {
      weaponsRead = weaponsRead.filter(
        (w) => w.type == this.state.weaponFilter
      );
    }
    switch (v) {
      case 0:
        weaponsRead = weaponsRead.filter((w) => w.effects);
        break;
      case 1:
        weaponsRead = weaponsRead.filter((w) => !w.effects);
        break;
      case 2:
        weaponsRead = weaponsRead.filter(
          (w) => w.getHow.toLowerCase().indexOf("auction house") !== -1
        );
        break;
      case 3:
        weaponsRead = weaponsRead.filter((w) => w.materialsLocation);
        weaponsRead = weaponsRead.filter(
          (w) => w.materialsLocation.toLowerCase().indexOf("otherlands") !== -1
        );
        break;
      case 4:
        weaponsRead = weaponsRead.filter(
          (w) => w.getHow.toLowerCase().indexOf("defeat") !== -1
        );
        break;
    }
    this.setState({ weaponsRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  sortWep = (i) => {
    this.setState({ loading: true });
    let weaponsRead = [...this.state.weaponsRead];
    if (this.state.sort === i) {
      weaponsRead = weaponsRead.sort((a, b) => {
        return a.stats[i] - b.stats[i];
      });
    } else
      weaponsRead = weaponsRead.sort((a, b) => {
        return b.stats[i] - a.stats[i];
      });
    this.setState({ sort: i });
    this.setState({ weaponsRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleAddWeapon = async () => {
    const weapons = [...this.state.weapons];
    this.setState({ weapons });
    weapons.push({
      craft: false,
      effects: "",
      getHow: "Purchased from Blacksmith",
      materials: ["1", "2", "3"],
      materialsLocation: "",
      materialsLocation2: 0,
      name: "",
      stats: [1, 1],
      type: "",
    });
    await firebase.database().ref("weapons").set({ weapons });
  };
  handleAdd = (v) => {
    let tracker = [...this.props.tracker];
    let num = this.state.weapons.findIndex((w) => w.name === v);
    let toAdd = this.state.weapons.slice(num, num + 1);
    if (!toAdd[0].craft) return;
    tracker = tracker.concat(toAdd);
    this.props.addEquip(tracker);
  };
  render() {
    return (
      <View style={styles.container}>
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
        <View style={styles.filter}>
          <DropDownPicker
            items={[
              { label: "ATK", value: 0 },
              { label: "M.ATK", value: 1 },
            ]}
            placeholder={"Sort"}
            defaultValue={""}
            containerStyle={styles.picker}
            dropDownStyle={{ height: 80, flex: 1 }}
            onChangeItem={(i) => this.sortWep(i.value)}
          />
          <DropDownPicker
            items={[
              { label: "Effect", value: 0 },
              { label: "No Effect", value: 1 },
              { label: "Auction House", value: 2 },
              { label: "Otherlands", value: 3 },
              { label: "Boss reward", value: 4 },
            ]}
            placeholder={"Filter"}
            defaultValue={""}
            containerStyle={styles.picker}
            dropDownStyle={{ height: 100, flex: 1 }}
            onChangeItem={(i) => {
              this.handleOtherFilters(i.value);
            }}
          />
        </View>
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
        {this.state.loading ? (
          <ActivityIndicator size={"large"} color={colors.black} />
        ) : (
          <ScrollView nestedScrollEnabled={true}>
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
                  materialsLocation3={u.materialsLocation3}
                  uri={u.uri}
                  craft={u.craft}
                  type={u.type}
                  onAdd={this.handleAdd}
                />
              );
            })}
            <View style={{ height: 240 }}></View>
          </ScrollView>
        )}
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
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.crystal,
  },
  picker: {
    flex: 1,
    height: 43,
    marginVertical: 4,
    marginHorizontal: 9,
  },
  stats: {
    flex: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  type: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  weaponIcon: {
    height: 40,
    width: 40,
    marginHorizontal: 1.3,
    marginVertical: 5,
  },
});
