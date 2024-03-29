import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  ActivityIndicator,
  Platform,
  TextInput,
  Dimensions,
} from "react-native";
import Equip from "../Modules/Equip";
import * as firebase from "firebase";
import colors from "../Config/colors";
import DropDownPicker from "react-native-dropdown-picker";

export default class Armors extends Component {
  state = {
    armorRead: [],
    armorFilter: "",
    sort: null,
    loading: false,
    date: "",
  };
  componentDidMount() {
    this.setPage();
  }
  setPage = () => {
    let armorRead = [...this.props.armor];
    this.setState({ armorRead });
  };
  handleFilterArmor = (v) => {
    this.setState({ loading: true });
    let armorRead = this.props.armor.filter((w) => w.type == v);
    if (v === this.state.armorFilter) armorRead = [...this.props.armor];
    if (v === this.state.armorFilter) this.setState({ armorFilter: "" });
    else this.setState({ armorFilter: v });
    this.setState({ armorRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleOtherFilters = (v) => {
    this.setState({ loading: true });
    let armorRead = [...this.props.armor];
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
      this.setState({ sort: i + 3 });
      armorRead = armorRead.sort((a, b) => {
        return a.stats[i] - b.stats[i];
      });
    } else {
      this.setState({ sort: i });
      armorRead = armorRead.sort((a, b) => {
        return b.stats[i] - a.stats[i];
      });
    }
    this.setState({ armorRead });
  };
  handleAddArmor = async () => {
    const armor = [...this.props.armor];
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
  handleAdd = (v) => {
    let tracker = [...this.props.tracker];
    let num = this.props.armor.findIndex((w) => w.name === v);
    let toAdd = this.props.armor.slice(num, num + 1);
    if (!toAdd[0].craft) return;
    Alert.alert(
      "Adding armor to craft list.",
      "Do you want to add " + v + " to your list?",
      [
        {
          text: "No",
          onPress: () => {
            return;
          },
        },
        {
          text: "Yes",
          onPress: () => {
            tracker = tracker.concat(toAdd);
            this.props.addEquip(tracker);
          },
        },
      ],
      { cancelable: true }
    );
  };
  handleSearchBar = (value) => {
    value = value.toLowerCase();
    this.setState({ searchBar: value });
  };
  render() {
    let armorRead = [...this.state.armorRead];
    if (this.state.searchBar)
      armorRead = armorRead.filter((armor) => {
        if (armor.name.toLowerCase().indexOf(this.state.searchBar) !== -1) {
          return true;
        } else if (armor.effects) {
          if (
            armor.effects.toLowerCase().indexOf(this.state.searchBar) !== -1
          ) {
            return true;
          }
        } else return false;
      });
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
        <View
          style={[
            styles.filter,
            {
              ...(Platform.OS !== "android" && {
                zIndex: 999,
              }),
            },
          ]}
        >
          <DropDownPicker
            items={[
              { label: "DEF", value: 0 },
              { label: "M.DEF", value: 1 },
            ]}
            placeholder={"Sort"}
            defaultValue={""}
            containerStyle={styles.picker}
            dropDownStyle={{
              height: 80,
              flex: 1,
              marginTop: 2,
            }}
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
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBox}
            placeholder={"Search by Name or Effect"}
            onChangeText={(text) => this.handleSearchBar(text)}
          ></TextInput>
        </View>
        <View style={[styles.row]}>
          <View style={styles.type}>
            <Text>ARM</Text>
          </View>
          <View style={styles.name}>
            <Text>Name</Text>
          </View>
          <View style={styles.stats}>
            <Text>Stats</Text>
          </View>
          <View style={[styles.effect]}>
            <Text>Effect (max)</Text>
          </View>
        </View>
        {this.state.loading ? (
          <ActivityIndicator size={"large"} color={colors.black} />
        ) : (
          <ScrollView
            style={{ height: Dimensions.get("window").height - 150 }}
            nestedScrollEnabled={true}
          >
            {armorRead.map((u, i) => {
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
  searchBar: {
    backgroundColor: colors.white,
    borderRadius: 5,
    maxWidth: "95%",
    minWidth: "95%",
    marginVertical: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  searchBox: {
    borderBottomWidth: 1,
    minWidth: "95%",
    borderColor: colors.grey,
    marginHorizontal: "2.5%",
    marginVertical: 5,
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
