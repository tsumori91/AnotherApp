import React, { Component } from "react";
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import Char from "../Modules/Echaracter";
import * as firebase from "firebase";
import Tab from "../Modules/Tab";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../Config/colors";

class CPage extends Component {
  state = {
    characters: [
      {
        id: 0,
        name: "",
        vc: "",
        vcAS: "",
        as: false,
        weapon: "",
        manifest: false,
        manifestAs: false,
        uri: "",
        uriAs: "",
        tomeName: "",
        tomeNameAs: "",
        tomeLocationAs: "VH/Garulea dungeons",
        tomeLocation: "",
        element: "",
        stats: [
          { stat: "HP", value: 0 },
          { stat: "MP", value: 0 },
          { stat: "STR", value: 0 },
          { stat: "INT", value: 0 },
          { stat: "SPD", value: 0 },
          { stat: "SPR", value: 0 },
          { stat: "END", value: 0 },
        ],
        statsAs: [
          { stat: "HP", value: 0 },
          { stat: "MP", value: 0 },
          { stat: "STR", value: 0 },
          { stat: "INT", value: 0 },
          { stat: "SPD", value: 0 },
          { stat: "SPR", value: 0 },
          { stat: "END", value: 0 },
        ],
        skillsAs: [
          {
            skillName: "",
            skillEffect: "",
          },
        ],
        skills: [
          {
            skillName: "",
            skillEffect: "",
          },
        ],
      },
    ],
    charactersRead: [{}],
    weaponFilter: "",
    elementFilter: "",
    loading: false,
  };
  componentDidMount() {
    this.getInitialState();
  }
  getInitialState = () => {
    firebase
      .database()
      .ref("characters")
      .on("value", (snapshot) =>
        this.setState({
          characters: snapshot.val().characters,
          charactersRead: snapshot.val().characters,
        })
      );
  };
  handleUpdate = async () => {
    let characters = [...this.state.characters];
    characters.forEach((v) => {
      if (!v.LStats) {
        v.LStats = [
          { stat: "", value: 5 },
          { stat: "", value: 10 },
          { stat: "", value: 10 },
          { stat: "", value: 15 },
          { stat: "", value: 15 },
          { stat: "", value: 20 },
          { stat: "", value: 20 },
          { stat: "", value: 25 },
          { stat: "", value: 25 },
          { stat: "", value: 30 },
        ];
      }
    });
    this.setState({ characters });
    await firebase.database().ref("characters").set({ characters });
  };
  handleAdd = async () => {
    const characters = [...this.state.characters];
    characters.push({
      id: characters[characters.length - 1].id + 1,
      name: "",
      vc: "",
      vcAS: "",
      shadow: false,
      as: false,
      weapon: "",
      manifest: false,
      manifestAs: false,
      uri: "",
      uriAs: "",
      tomeName: "",
      tomeNameAs: "",
      tomeLocationAs: "VH/Garulea dungeons",
      tomeLocation: "",
      element: "",
      stats: [
        { stat: "HP", value: 0 },
        { stat: "MP", value: 0 },
        { stat: "PWR", value: 0 },
        { stat: "INT", value: 0 },
        { stat: "SPD", value: 0 },
        { stat: "LCK", value: 0 },
        { stat: "END", value: 0 },
        { stat: "SPR", value: 0 },
      ],
      statsAs: [
        { stat: "HP", value: 0 },
        { stat: "MP", value: 0 },
        { stat: "PWR", value: 0 },
        { stat: "INT", value: 0 },
        { stat: "SPD", value: 0 },
        { stat: "LCK", value: 0 },
        { stat: "END", value: 0 },
        { stat: "SPR", value: 0 },
      ],
      skills: [
        {
          skillName: "",
          skillEffect: "",
        },
        {
          skillName: "",
          skillEffect: "",
        },
        {
          skillName: "",
          skillEffect: "",
        },
        {
          skillName: "",
          skillEffect: "",
        },
        {
          skillName: "",
          skillEffect: "",
        },
        {
          skillName: "",
          skillEffect: "",
        },
        {
          skillName: "",
          skillEffect: "",
          skillEffectManifest: "",
        },
        {
          skillName: "",
          skillEffect: "",
          skillEffectManifest: "",
        },
        {
          skillName: "",
          skillEffect: "",
          skillEffectManifest: "",
        },
        {
          skillName: "",
          skillEffect: "",
          skillEffectManifest: "",
        },
      ],
    });
    this.setState({ characters });
    await firebase.database().ref("characters").set({ characters });
  };
  handleFilterWeapon = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.state.characters.filter((w) => w.weapon == v);
    if (v === this.state.weaponFilter) charactersRead = this.state.characters;
    if (this.state.elementFilter !== "")
      charactersRead = charactersRead.filter(
        (e) => e.element == this.state.elementFilter
      );
    if (v === this.state.weaponFilter) this.setState({ weaponFilter: "" });
    else this.setState({ weaponFilter: v });
    this.setState({ charactersRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleFilterElement = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.state.characters.filter((e) => e.element == v);
    if (v === this.state.elementFilter) charactersRead = this.state.characters;
    if (this.state.weaponFilter !== "")
      charactersRead = charactersRead.filter(
        (w) => w.weapon == this.state.weaponFilter
      );
    if (v === this.state.elementFilter) this.setState({ elementFilter: "" });
    else this.setState({ elementFilter: v });
    this.setState({ charactersRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.allButtons}>
          <View style={styles.buttonContainer}>
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
          <View style={[styles.buttonContainer]}>
            <TouchableOpacity onPress={() => this.handleFilterElement("Fire")}>
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Fire" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Fire.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilterElement("Wind")}>
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Wind" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Wind.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilterElement("Water")}>
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Water" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Water.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilterElement("Earth")}>
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Earth" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Earth.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilterElement("Shade")}>
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Shade" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Shade.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleFilterElement("Thunder")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Thunder" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Thunder.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleFilterElement("Crystal")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Crystal" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Crystal.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.state.loading ? (
          <ActivityIndicator size={"large"} color={colors.black} />
        ) : (
          <ScrollView nestedScrollEnabled={true}>
            <View style={{ flexDirection: "column-reverse" }}>
              {this.state.charactersRead.map(
                (characters, i) => (
                  i++,
                  (
                    <View key={i}>
                      {characters.name !== "" ? (
                        <Char
                          key={characters.id}
                          id={characters.id}
                          name={characters.name}
                          skills={characters.skills}
                          weapon={characters.weapon}
                          shadow={characters.shadow}
                          element={characters.element}
                          vc={characters.vc}
                          vcAS={characters.vcAS}
                          uri={characters.uri}
                          tomeName={characters.tomeName}
                          tomeNameAs={characters.tomeNameAs}
                          tomeLocation={characters.tomeLocation}
                          tomeLocationAs={characters.tomeLocationAs}
                          as={characters.as}
                          stats={characters.stats}
                          statsAs={characters.statsAs}
                          uriAs={characters.uriAs}
                          manifest={characters.manifest}
                          manifestAs={characters.manifestAs}
                          LStats={characters.LStats}
                        />
                      ) : null}
                    </View>
                  )
                )
              )}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default CPage;

const styles = StyleSheet.create({
  allButtons: {
    backgroundColor: colors.grey,
    minWidth: "100%",
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  weaponIcon: {
    height: 40,
    width: 40,
    marginHorizontal: 1,
    marginVertical: 2,
  },
  fade: {
    opacity: 0.65,
  },
});
