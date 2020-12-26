import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Storage from "../Config/Storage";
import Equip from "../Modules/Equip";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../Config/colors";

export default class EquipsToDo extends Component {
  state = {
    weapons: [],
    weaponsRead: [],
    myWeapons: [],
    loading: true,
    gotList: [],
  };
  componentDidMount() {
    this.loadWeapons();
  }
  loadWeapons = async () => {
    this.setState({ loading: true });
    let weapons = [...this.props.weapons];
    let armor = [...this.props.armor];
    weapons = weapons.concat(armor);
    weapons = weapons.filter((wpn) => !wpn.craft);
    let gotList = await Storage.getItem("gotList");
    this.setState({ weapons, weaponsRead: weapons });
    if (gotList !== null) {
      this.setState({ gotList });
    }
    this.setState({ loading: false });
  };
  handleFilterWeapon = (v) => {
    this.setState({ loading: true });
    let weaponsRead = this.state.weapons.filter((w) => w.type == v);
    if (v === this.state.weaponFilter) weaponsRead = [...this.props.weapons];
    if (v === this.state.weaponFilter) this.setState({ weaponFilter: "" });
    else this.setState({ weaponFilter: v });
    this.setState({ weaponsRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleOtherFilters = (v) => {
    this.setState({ loading: true });
    let weaponsRead = [...this.state.weapons];
    let gotList = [...this.state.gotList];
    if (this.state.weaponFilter) {
      weaponsRead = weaponsRead.filter(
        (w) => w.type == this.state.weaponFilter
      );
    }
    switch (v) {
      case 0:
        weaponsRead = weaponsRead.filter((w) => gotList.indexOf(w.name) !== -1);
        break;
      case 1:
        weaponsRead = weaponsRead.filter((w) => gotList.indexOf(w.name) == -1);
        break;
      case 2:
        weaponsRead = weaponsRead.filter(
          (w) => w.getHow.toLowerCase().indexOf("auction house") !== -1
        );
        break;
      case 4:
        weaponsRead = weaponsRead.filter(
          (w) => w.getHow.toLowerCase().indexOf("defeat") !== -1
        );
        break;
      case 6:
        weaponsRead = weaponsRead.filter(
          (w) => w.getHow.toLowerCase().indexOf("marks exchange") !== -1
        );
        break;
      case 7:
        weaponsRead = weaponsRead.filter(
          (w) => w.getHow.toLowerCase().indexOf("konium tavern") !== -1
        );
        break;
      case 8:
        weaponsRead = [...this.state.weapons];
        this.setState({ weaponFilter: "" });
        break;
    }
    this.setState({ weaponsRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleGot = (name) => {
    let gotList = [...this.state.gotList];
    if (gotList.indexOf(name) !== -1)
      gotList = gotList.filter((weapon) => weapon !== name);
    else gotList.push(name);
    Storage.setItem("gotList", gotList);
    this.setState({ gotList });
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
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              flex: 1,
              marginLeft: "1.5%",
            }}
          >
            Got:{" "}
            <Text
              style={{
                color:
                  this.state.gotList.length < this.state.weapons.length / 4
                    ? colors.fire
                    : this.state.gotList.length <
                      this.state.weapons.length / 1.33
                    ? colors.shadow
                    : this.state.gotList.length < this.state.weapons.length
                    ? colors.water
                    : this.state.gotList.length == this.state.weapons.length
                    ? "green"
                    : null,
              }}
            >
              {this.state.gotList.length}
            </Text>
            /{this.state.weapons.length}
          </Text>
          <DropDownPicker
            items={[
              { label: "Got", value: 0 },
              { label: "Not Gotten", value: 1 },
              { label: "Auction House", value: 2 },
              { label: "Boss reward", value: 4 },
              { label: "Toto Weapons", value: 6 },
              { label: "Cruel Angel", value: 7 },
              { label: "Remove Filters", value: 8 },
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
            <Text>Acquired?</Text>
          </View>
          <View style={styles.effect}>
            <Text>How to Get</Text>
          </View>
        </View>
        {this.state.loading ? (
          <ActivityIndicator size={"large"} color={"black"} />
        ) : (
          <View style={styles.main}>
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
                    uri={u.uri}
                    craft={u.craft}
                    type={u.type}
                    handleGot={this.handleGot}
                    toDo={true}
                    got={
                      this.state.gotList.indexOf(u.name) !== -1 ? true : false
                    }
                  />
                );
              })}
              <View style={{ height: 240 }}></View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10, width: "100%" },
  fade: {
    opacity: 0.65,
  },
  effect: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  filter: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  main: {
    flex: 1,
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
