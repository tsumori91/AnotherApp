import React, { Component } from "react";
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import Char from "../Modules/Echaracter";
import Storage from "../Config/Storage";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../Config/colors";

class CPage extends Component {
  state = {
    charactersRead: [],
    weaponFilter: "",
    elementFilter: "",
    loading: false,
    poisonFilter: false,
    painFilter: false,
    date: "",
  };
  componentDidMount() {
    this.setPage();
  }
  setPage = () => {
    let charactersRead = [...this.props.characters];
    this.setState({ charactersRead });
  };
  handleAdd = async () => {
    let characters = [...this.props.characters];
    const newChar = {
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
      LStats: [
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
      ],
      score: 0,
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
    };
    characters.splice(80, 0, newChar);
    /*await firebase.database().ref("characters").set({ characters });*/
  };
  handleFilterWeapon = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.props.characters.filter((w) => w.weapon == v);
    if (v === this.state.weaponFilter) charactersRead = this.props.characters;
    if (this.state.elementFilter !== "")
      charactersRead = charactersRead.filter(
        (e) => e.element == this.state.elementFilter
      );
    if (this.state.painFilter) {
      charactersRead = charactersRead.filter((w) => w.pain == true);
    }
    if (this.state.poisonFilter) {
      charactersRead = charactersRead.filter((w) => w.poison == true);
    }
    if (v === this.state.weaponFilter) this.setState({ weaponFilter: "" });
    else this.setState({ weaponFilter: v });
    this.setState({ charactersRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleFilterElement = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.props.characters.filter((e) => e.element == v);
    if (v === this.state.elementFilter) charactersRead = this.props.characters;
    if (this.state.weaponFilter !== "")
      charactersRead = charactersRead.filter(
        (w) => w.weapon == this.state.weaponFilter
      );
    if (this.state.painFilter) {
      charactersRead = charactersRead.filter((w) => w.pain == true);
    }
    if (this.state.poisonFilter) {
      charactersRead = charactersRead.filter((w) => w.poison == true);
    }
    if (v === this.state.elementFilter) this.setState({ elementFilter: "" });
    else this.setState({ elementFilter: v });
    this.setState({ charactersRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleFilterPain = () => {
    this.setState({ loading: true });
    let charactersRead = this.props.characters.filter((e) => e.pain == true);
    if (this.state.painFilter) charactersRead = [...this.props.characters];
    if (this.state.weaponFilter !== "")
      charactersRead = charactersRead.filter(
        (w) => w.weapon == this.state.weaponFilter
      );
    if (this.state.elementFilter !== "")
      charactersRead = charactersRead.filter(
        (e) => e.element == this.state.elementFilter
      );
    if (this.state.poisonFilter) {
      charactersRead = charactersRead.filter((w) => w.poison == true);
    }
    this.setState({ painFilter: !this.state.painFilter });
    this.setState({ charactersRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleFilterPoison = () => {
    this.setState({ loading: true });
    let charactersRead = this.props.characters.filter((e) => e.poison == true);
    if (this.state.poisonFilter) charactersRead = [...this.props.characters];
    if (this.state.weaponFilter !== "")
      charactersRead = charactersRead.filter(
        (w) => w.weapon == this.state.weaponFilter
      );
    if (this.state.elementFilter !== "")
      charactersRead = charactersRead.filter(
        (e) => e.element == this.state.elementFilter
      );
    if (this.state.painFilter) {
      charactersRead = charactersRead.filter((w) => w.pain == true);
    }
    this.setState({ poisonFilter: !this.state.poisonFilter });
    this.setState({ charactersRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  saveDate() {
    let today = new Date();
    let date = String(today.getDate()) + String(today.getMonth());
    this.setState({ date });
    Storage.setItem("charactersDate", date);
  }

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
            <TouchableOpacity onPress={() => this.handleFilterPoison()}>
              <Image
                style={[
                  styles.weaponIcon,
                  styles.debuff,
                  this.state.poisonFilter ? styles.fade : null,
                ]}
                source={require("../pics/Poison.png")}
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
            <TouchableOpacity onPress={() => this.handleFilterPain()}>
              <Image
                style={[
                  styles.weaponIcon,
                  styles.debuff,
                  this.state.painFilter ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Pain.png")}
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
                          vcStats={characters.vcStats}
                          vcStatsAs={characters.vcStatsAs}
                          poison={characters.poison}
                          pain={characters.pain}
                          score={characters.score}
                          scoreAs={characters.scoreAs}
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
  debuff: {
    resizeMode: "cover",
    height: 34,
    width: 34,
    alignSelf: "center",
    marginVertical: 5,
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
