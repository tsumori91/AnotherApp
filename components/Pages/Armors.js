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

export default class Armors extends Component {
  state = {
    armor: [{}],
    armorRead: [],
    armorFilter: "",
    sort: null,
    loading: false,
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
  handleFilterArmor = (v) => {
    this.setState({ loading: true });
    let armorRead = this.state.armor.filter((w) => w.type == v);
    if (v === this.state.armorFilter) armorRead = this.state.armor;
    if (v === this.state.armorFilter) this.setState({ armorFilter: "" });
    else this.setState({ armorFilter: v });
    this.setState({ armorRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleOtherFilters = (v) => {
    this.setState({ loading: true });
    let armorRead = [...this.state.armor];
    if (this.state.armorFilter) {
      armorRead = armorRead.filter((w) => w.type == this.state.armorFilter);
    }
    switch (v) {
      case 0:
        armorRead = armorRead.filter((w) => w.effects);
        break;
      case 1:
        armorRead = armorRead.filter((w) => !w.effects);
        break;
      case 2:
        armorRead = armorRead.filter(
          (w) => w.getHow.toLowerCase().indexOf("auction house") !== -1
        );
        break;
      case 3:
        armorRead = armorRead.filter((w) => w.materialsLocation);
        armorRead = armorRead.filter(
          (w) => w.materialsLocation.toLowerCase().indexOf("otherlands") !== -1
        );
        break;
      case 4:
        armorRead = armorRead.filter(
          (w) => w.getHow.toLowerCase().indexOf("defeat") !== -1
        );
        break;
    }
    this.setState({ armorRead });
    setTimeout(() => this.setState({ loading: false }));
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
    armor.push({
      craft: false,
      effects: "",
      getHow: "Purchased from Blacksmith",
      materials: ["1", "2", "3"],
      materialsLocation: "",
      name: "",
      stats: [1, 1],
      type: "",
    });
    await firebase.database().ref("armor").set({ armor });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <TouchableOpacity onPress={() => this.handleFilterArmor("Bangle")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.armorFilter === "Bangle" ? styles.fade : null,
              ]}
              source={require("../pics/Bangle.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterArmor("Ring")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.armorFilter === "Ring" ? styles.fade : null,
              ]}
              source={require("../pics/Ring.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleFilterArmor("Necklace")}>
            <Image
              style={[
                styles.weaponIcon,
                this.state.armorFilter === "Necklace" ? styles.fade : null,
              ]}
              source={require("../pics/Necklace.png")}
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
            onChangeItem={(i) => this.sortArm(i.value)}
          />
          <DropDownPicker
            items={[
              { label: "Effect", value: 0 },
              { label: "No Effect", value: 1 },
              { label: "Auction House", value: 2 },
              { label: "Otherlands", value: 3 },
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
        {this.state.loading ? (
          <ActivityIndicator size={"large"} color={colors.black} />
        ) : (
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
                  armor={true}
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
  picker: {
    flex: 1,
    height: 43,
    marginVertical: 4,
    marginHorizontal: 9,
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.crystal,
  },
  stats: {
    flex: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  type: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  weaponIcon: {
    height: 40,
    width: 40,
    marginHorizontal: 1.3,
    marginVertical: 5,
  },
});
