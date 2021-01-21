import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import colors from "../Config/colors";
import Egrasta from "../Modules/Egrasta";
import * as firebase from "firebase";
import Storage from "../Config/Storage";
import WeaponFilter from "../Modules/WeaponFilter";
import { Entypo } from "@expo/vector-icons";
import ElementFilter from "../Modules/ElementFilter";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Grasta extends Component {
  state = {
    checkList: [],
    loading: true,
    grasta: {},
    tab: "all",
    weaponFilter: "",
    gotOrNot: null,
    elementFilter: "",
    elementFilter2: "",
    locationFilter: "",
  };
  componentDidMount() {
    this.load();
  }
  handleCheck = async (name) => {
    let checkList = [...this.state.checkList];
    if (checkList.indexOf(name) == -1) {
      checkList.push(name);
    } else checkList = checkList.filter((v) => v !== name);
    Storage.setItem("grastaList", checkList);
    this.setState({ checkList });
  };
  setTab = async (tab) => {
    this.setState({ loading: true });
    this.setState({ tab });
    await delay(5);
    this.setState({ loading: false });
  };
  load = async () => {
    let checkList = await Storage.getItem("grastaList");
    this.setState({
      grasta: this.props.grasta,
      checkList: checkList ? checkList : [],
    });
    this.setState({ loading: false });
  };
  add = async () => {
    let grasta = this.props.grasta;
    for (let i = 0; i < 0; i++) {
      grasta.support.push({
        effect: "Obtain 's Prayer (+30% damage, 2 turns) skill",
        getHow: "Antiquity Garulea (Hard)\nSuperior Dogu exchange in Gadaro",
        name: "'s Prayer",
        stats: ["mp", "lck"],
      });
    }
    await firebase.database().ref("grasta").set({ grasta });
  };
  findTotal = () => {
    let grasta = this.state.grasta;
    if (grasta && grasta.special) {
      let value =
        this.state.tab == "attack"
          ? grasta.attack.length
          : this.state.tab == "life"
          ? grasta.life.length
          : this.state.tab == "support"
          ? grasta.support.length
          : this.state.tab == "special"
          ? grasta.special.length
          : grasta.special.length +
            grasta.attack.length +
            grasta.life.length +
            grasta.support.length;
      return value;
    }
  };
  findGotten = () => {
    let grasta = this.state.grasta;
    let checkList = this.state.checkList;
    if (grasta && grasta.special) {
      let attack = grasta.attack
        .filter((gra) => checkList.indexOf(gra.name) !== -1)
        .map((gra) => gra.name);
      let life = grasta.life
        .filter((gra) => checkList.indexOf(gra.name) !== -1)
        .map((gra) => gra.name);
      let support = grasta.support
        .filter((gra) => checkList.indexOf(gra.name) !== -1)
        .map((gra) => gra.name);
      let special = grasta.special
        .filter((gra) => checkList.indexOf(gra.name) !== -1)
        .map((gra) => gra.name);
      let value =
        this.state.tab == "attack"
          ? attack.length
          : this.state.tab == "life"
          ? life.length
          : this.state.tab == "support"
          ? support.length
          : this.state.tab == "special"
          ? special.length
          : special.length + attack.length + life.length + support.length;
      return value;
    }
  };
  handleWF = async (weaponFilter) => {
    if (this.state.weaponFilter !== weaponFilter) {
      this.setState({ weaponFilter });
    } else this.setState({ weaponFilter: "" });
    await this.handleFilters();
  };
  handleEF = async (elementFilter) => {
    if (this.state.elementFilter !== elementFilter) {
      this.setState({ elementFilter });
      switch (elementFilter) {
        case "quake":
          this.setState({ elementFilter2: "earth" });
          break;

        case "rapids":
          this.setState({ elementFilter2: "water" });
          break;
        case "inferno":
          this.setState({ elementFilter2: "fire" });
          break;
        case "gale":
          this.setState({ elementFilter2: "wind" });
          break;
        case "void":
          this.setState({ elementFilter2: "null" });
          break;
      }
    } else this.setState({ elementFilter: "", elementFilter2: "" });
    await this.handleFilters();
  };

  handleFilterGot = async (gotOrNot) => {
    if (this.state.gotOrNot !== gotOrNot) {
      this.setState({ gotOrNot });
    } else this.setState({ gotOrNot: null });
    await this.handleFilters();
  };
  handleLF = async (locationFilter) => {
    if (this.state.locationFilter !== locationFilter) {
      this.setState({ locationFilter });
    } else this.setState({ locationFilter: "" });
    await this.handleFilters();
  };
  async handleFilters() {
    this.setState({ loading: true });
    let grasta = await Storage.getItem("grasta");
    let checkList = this.state.checkList;
    let attack = grasta.attack;
    let life = grasta.life;
    let support = grasta.support;
    let special = grasta.special;
    if (this.state.weaponFilter !== "") {
      attack = attack.filter(
        (grasta) =>
          grasta.name.toLowerCase().indexOf(this.state.weaponFilter) !== -1
      );
      life = life.filter(
        (grasta) =>
          grasta.name.toLowerCase().indexOf(this.state.weaponFilter) !== -1
      );
      support = support.filter(
        (grasta) =>
          grasta.name.toLowerCase().indexOf(this.state.weaponFilter) !== -1
      );
      special = special.filter(
        (grasta) =>
          grasta.name.toLowerCase().indexOf(this.state.weaponFilter) !== -1
      );
    }
    if (this.state.gotOrNot !== null) {
      attack = attack.filter((grasta) => {
        if (checkList.indexOf(grasta.name) !== -1) {
          return this.state.gotOrNot;
        } else return !this.state.gotOrNot;
      });
      life = life.filter((grasta) => {
        if (checkList.indexOf(grasta.name) !== -1) {
          return this.state.gotOrNot;
        } else return !this.state.gotOrNot;
      });
      support = support.filter((grasta) => {
        if (checkList.indexOf(grasta.name) !== -1) {
          return this.state.gotOrNot;
        } else return !this.state.gotOrNot;
      });
      special = special.filter((grasta) => {
        if (checkList.indexOf(grasta.name) !== -1) {
          return this.state.gotOrNot;
        } else return !this.state.gotOrNot;
      });
    }
    if (this.state.elementFilter !== "") {
      attack = attack.filter(
        (grasta) =>
          grasta.name.toLowerCase().indexOf(this.state.elementFilter) !== -1 ||
          grasta.name.toLowerCase().indexOf(this.state.elementFilter2) !== -1
      );
      life = life.filter(
        (grasta) =>
          grasta.name.toLowerCase().indexOf(this.state.elementFilter) !== -1 ||
          grasta.name.toLowerCase().indexOf(this.state.elementFilter2) !== -1
      );
      support = support.filter(
        (grasta) =>
          grasta.name.toLowerCase().indexOf(this.state.elementFilter) !== -1 ||
          grasta.name.toLowerCase().indexOf(this.state.elementFilter2) !== -1
      );
      special = special.filter(
        (grasta) =>
          grasta.name.toLowerCase().indexOf(this.state.elementFilter) !== -1
      );
    }
    if (this.state.locationFilter !== "") {
      attack = attack.filter(
        (grasta) =>
          grasta.getHow.toLowerCase().indexOf(this.state.locationFilter) !== -1
      );
      life = life.filter(
        (grasta) =>
          grasta.getHow.toLowerCase().indexOf(this.state.locationFilter) !== -1
      );
      support = support.filter(
        (grasta) =>
          grasta.getHow.toLowerCase().indexOf(this.state.locationFilter) !== -1
      );
      special = special.filter(
        (grasta) =>
          grasta.getHow.toLowerCase().indexOf(this.state.locationFilter) !== -1
      );
    }
    grasta = { attack, life, support, special };
    this.setState({ grasta });
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.allFilters}>
          <View style={styles.weaponFilter}>
            <TouchableOpacity
              onPress={() => this.handleFilterGot(true)}
              onLongPress={() =>
                Alert.alert("Grasta you have", "", [{ text: "Okay" }], {
                  cancelable: true,
                })
              }
            >
              <Entypo
                style={[this.state.gotOrNot == true ? styles.fade : null]}
                name="check"
                size={33}
                color={"green"}
              />
            </TouchableOpacity>
            <WeaponFilter
              imageStyle={[
                styles.pic,
                this.state.weaponFilter == "staff" ? styles.fade : null,
              ]}
              weapon={"staff"}
              onPress={() => this.handleWF("staff")}
            />
            <WeaponFilter
              imageStyle={[
                styles.pic,
                this.state.weaponFilter == "sword" ? styles.fade : null,
              ]}
              weapon={"sword"}
              onPress={() => this.handleWF("sword")}
            />
            <WeaponFilter
              imageStyle={[
                styles.pic,
                this.state.weaponFilter == "katana" ? styles.fade : null,
              ]}
              weapon={"katana"}
              onPress={() => this.handleWF("katana")}
            />
            <WeaponFilter
              imageStyle={[
                styles.pic,
                this.state.weaponFilter == "axe" ? styles.fade : null,
              ]}
              weapon={"axe"}
              onPress={() => this.handleWF("axe")}
            />
            <WeaponFilter
              imageStyle={[
                styles.pic,
                this.state.weaponFilter == "lance" ? styles.fade : null,
              ]}
              weapon={"lance"}
              onPress={() => this.handleWF("lance")}
            />
            <WeaponFilter
              imageStyle={[
                styles.pic,
                this.state.weaponFilter == "bow" ? styles.fade : null,
              ]}
              weapon={"bow"}
              onPress={() => this.handleWF("bow")}
            />
            <WeaponFilter
              imageStyle={[
                styles.pic,
                this.state.weaponFilter == "fists" ? styles.fade : null,
              ]}
              weapon={"fists"}
              onPress={() => this.handleWF("fists")}
            />
            <WeaponFilter
              imageStyle={[
                styles.pic,
                this.state.weaponFilter == "hammer" ? styles.fade : null,
              ]}
              weapon={"hammer"}
              onPress={() => this.handleWF("hammer")}
            />
          </View>
          <View style={[styles.weaponFilter, { right: 15 }]}>
            <TouchableOpacity
              onPress={() => this.handleFilterGot(false)}
              onLongPress={() =>
                Alert.alert(
                  "Grasta you don't have (yet)",
                  "",
                  [{ text: "Okay" }],
                  {
                    cancelable: true,
                  }
                )
              }
            >
              <View
                style={[
                  styles.pic,
                  this.state.gotOrNot == false ? styles.fade : null,
                ]}
              >
                <View style={styles.checkbox}></View>
              </View>
            </TouchableOpacity>
            <ElementFilter
              imageStyle={[
                styles.pic,
                this.state.elementFilter == "void" ? styles.fade : null,
              ]}
              element={"null"}
              onPress={() => this.handleEF("void")}
            />
            <ElementFilter
              imageStyle={[
                styles.pic,
                this.state.elementFilter == "inferno" ? styles.fade : null,
              ]}
              element={"fire"}
              onPress={() => this.handleEF("inferno")}
            />
            <ElementFilter
              imageStyle={[
                styles.pic,
                this.state.elementFilter == "gale" ? styles.fade : null,
              ]}
              element={"wind"}
              onPress={() => this.handleEF("gale")}
            />
            <ElementFilter
              imageStyle={[
                styles.pic,
                this.state.elementFilter == "rapids" ? styles.fade : null,
              ]}
              element={"water"}
              onPress={() => this.handleEF("rapids")}
            />
            <ElementFilter
              imageStyle={[
                styles.pic,
                this.state.elementFilter == "quake" ? styles.fade : null,
              ]}
              element={"earth"}
              onPress={() => this.handleEF("quake")}
            />
            <TouchableOpacity
              onPress={() => this.handleLF("antiquity garulea")}
              onLongPress={() =>
                Alert.alert(
                  "Grasta you find in Antiquity Garulea (Hard)",
                  "",
                  [{ text: "Okay" }],
                  {
                    cancelable: true,
                  }
                )
              }
            >
              <Image
                source={require("../pics/agad.png")}
                style={[
                  styles.pic,
                  this.state.locationFilter == "antiquity garulea"
                    ? styles.fade
                    : null,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleLF("present garulea")}
              onLongPress={() =>
                Alert.alert(
                  "Grasta you find in Present Garulea (Hard)",
                  "",
                  [{ text: "Okay" }],
                  {
                    cancelable: true,
                  }
                )
              }
            >
              <Image
                source={require("../pics/pgad.png")}
                style={[
                  styles.pic,
                  this.state.locationFilter == "present garulea"
                    ? styles.fade
                    : null,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.tracker}>
            {this.findGotten()}/{this.findTotal()}
          </Text>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.attack,
              this.state.tab == "all" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("all")}
          >
            <Text style={styles.title}>All</Text>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.life,
              this.state.tab == "attack" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("attack")}
          >
            <Image
              source={require("../pics/AttackGrastaTab.png")}
              style={[
                styles.tabImage,
                this.state.tab == "attack" ? { opacity: 0.7 } : null,
              ]}
            />
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.life,
              this.state.tab == "life" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("life")}
          >
            <Image
              source={require("../pics/LifeGrastaTab.png")}
              style={[
                styles.tabImage,
                this.state.tab == "life" ? { opacity: 0.7 } : null,
              ]}
            />
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.support,
              this.state.tab == "support" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("support")}
          >
            <Image
              source={require("../pics/SupportGrastaTab.png")}
              style={[
                styles.tabImage,
                this.state.tab == "support" ? { opacity: 0.7 } : null,
              ]}
            />
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.special,
              this.state.tab == "special" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("special")}
          >
            <Image
              source={require("../pics/SpecialGrastaTab.png")}
              style={[
                styles.tabImage,
                this.state.tab == "special" ? { opacity: 0.7 } : null,
              ]}
            />
          </TouchableOpacity>
        </View>
        {this.state.loading ? (
          <ActivityIndicator color={"black"} size={"large"} />
        ) : this.state.grasta !== {} ? (
          <ScrollView style={[styles.listContainer]}>
            {this.state.tab == "attack" || this.state.tab == "all"
              ? this.state.grasta.attack.map((grasta, i) => {
                  i++;
                  return (
                    <Egrasta
                      key={i}
                      stats={grasta.stats}
                      effect={grasta.effect}
                      getHow={grasta.getHow}
                      potential={grasta.potential}
                      name={grasta.name}
                      type={"attack"}
                      handleCheck={this.handleCheck}
                      check={
                        this.state.checkList.indexOf(grasta.name) !== -1
                          ? true
                          : false
                      }
                    />
                  );
                })
              : null}
            {this.state.tab == "life" || this.state.tab == "all"
              ? this.state.grasta.life.map((grasta, i) => {
                  i++;
                  return (
                    <Egrasta
                      key={i}
                      stats={grasta.stats}
                      effect={grasta.effect}
                      getHow={grasta.getHow}
                      potential={grasta.potential}
                      name={grasta.name}
                      type={"life"}
                      handleCheck={this.handleCheck}
                      check={
                        this.state.checkList.indexOf(grasta.name) !== -1
                          ? true
                          : false
                      }
                    />
                  );
                })
              : null}
            {this.state.tab == "support" || this.state.tab == "all"
              ? this.state.grasta.support.map((grasta, i) => {
                  i++;
                  return (
                    <Egrasta
                      key={i}
                      stats={grasta.stats}
                      effect={grasta.effect}
                      getHow={grasta.getHow}
                      potential={grasta.potential}
                      name={grasta.name}
                      type={"support"}
                      handleCheck={this.handleCheck}
                      check={
                        this.state.checkList.indexOf(grasta.name) !== -1
                          ? true
                          : false
                      }
                    />
                  );
                })
              : null}
            {this.state.tab == "special" || this.state.tab == "all"
              ? this.state.grasta.special.map((grasta, i) => {
                  i++;
                  return (
                    <Egrasta
                      key={i}
                      stats={grasta.stats}
                      effect={grasta.effect}
                      getHow={grasta.getHow}
                      potential={grasta.potential}
                      name={grasta.name}
                      type={"special"}
                      handleCheck={this.handleCheck}
                      check={
                        this.state.checkList.indexOf(grasta.name) !== -1
                          ? true
                          : false
                      }
                    />
                  );
                })
              : null}
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allFilters: {
    width: "100%",
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 2,
    backgroundColor: colors.crystal,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 4,
    marginRight: 1,
  },
  container: { flex: 1 },
  fade: {
    opacity: 0.5,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "rgba(232,227,227, .8)",
    paddingTop: 10,
    marginHorizontal: 1,
  },
  pic: {
    height: 40,
    width: 40,
    marginHorizontal: 1,
    marginVertical: 2,
    resizeMode: "contain",
  },
  selected: {
    borderBottomWidth: 0,
    elevation: 0,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "rgba(232,227,227, .8)",
  },
  space: { flex: 1, borderBottomWidth: 2, borderColor: colors.earth },
  tab: {
    flex: 2,
    borderWidth: 2,
    borderColor: colors.earth,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    alignItems: "center",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "rgb(232,227,227)",
    elevation: 2, // Android
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  tabImage: { height: 23, width: 23, resizeMode: "contain" },
  tabs: {
    flexDirection: "row",
    width: "100%",
  },
  title: { fontSize: 22 },
  tracker: { fontSize: 18, marginLeft: 8 },
  weaponFilter: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
