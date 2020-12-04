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

export default class Armors extends Component {
  state = {
    armor: [{}],
    armorRead: [],
    weaponFilter: "",
    sort: null,
  };
  componentDidMount() {
    this.getarmor();
  }
  getarmor = () => {
    firebase
      .database()
      .ref("armor")
      .on("value", (snapshot) =>
        this.setState({
          armor: snapshot.val().armor,
          armorRead: snapshot.val().armor,
        })
      );
  };
  handleFilterWeapon = (v) => {
    let armorRead = this.state.armor.filter((w) => w.type == v);
    if (v === this.state.weaponFilter) armorRead = this.state.armor;
    if (v === this.state.weaponFilter) this.setState({ weaponFilter: "" });
    else this.setState({ weaponFilter: v });
    this.setState({ armorRead });
  };
  sortArm = (i) => {
    let armorRead = [...this.state.armorRead];
    if (this.state.sort === i) {
      armorRead = armorRead.sort((a, b) => {
        return a.stats[i] - b.stats[i];
      });
    } else
      armorRead = armorRead.sort((a, b) => {
        return b.stats[i] - a.stats[i];
      });
    this.setState({ sort: i });
    this.setState({ armorRead });
  };
  handleAdd = async () => {
    const armor = [...this.state.armor];
    this.setState({ armor });
    armor.push({
      craft: false,
      effects: "",
      armor: true,
      getHow: "Purchased from Blacksmith",
      materials: ["1", "2", "3"],
      materialsLocation: "",
      name: "",
      stats: [1, 1],
      type: "Bangle",
    });
    await firebase.database().ref("armor").set({ armor });
  };
  render() {
    return (
      <View style={styles.container}>
        <Button title={"Add"} onPress={this.handleAdd} />
        <View style={styles.filter}>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Bangle")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Bangle" ? styles.fade : null,
              ]}
              source={require("../pics/Bangle.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Ring")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Ring" ? styles.fade : null,
              ]}
              source={require("../pics/Ring.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterWeapon("Necklace")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.weaponFilter === "Necklace" ? styles.fade : null,
              ]}
              source={require("../pics/Necklace.png")}
            />
          </TouchableOpacity>
        </View>
        <DropDownPicker
          items={[
            { label: "DEF", value: 0 },
            { label: "M.DEF", value: 1 },
          ]}
          placeholder={"Sort"}
          defaultValue={""}
          containerStyle={{ height: 43, marginVertical: 2 }}
          dropDownStyle={{ height: 80, flex: 1 }}
          onChangeItem={(i) => this.sortArm(i.value)}
        />
        <View style={styles.row}>
          <View style={styles.type}>
            <Text>ARM</Text>
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
        <ScrollView nestedScrollEnabled={true}>
          {this.state.armorRead.map((u, i) => {
            i++;
            return (
              <Equip
                key={i}
                id={i}
                name={u.name}
                stats={u.stats}
                effects={u.effects}
                getHow={u.getHow}
                armor={u.armor}
                materials={u.materials}
                materialsLocation={u.materialsLocation}
                materialsLocation2={u.materialsLocation2}
                materialsLocation3={u.materialsLocation3}
                uri={u.uri}
                craft={u.craft}
                type={u.type}
              />
            );
          })}
          <View style={{ height: 240 }}></View>
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
    marginHorizontal: 1.3,
    marginVertical: 5,
  },
});
