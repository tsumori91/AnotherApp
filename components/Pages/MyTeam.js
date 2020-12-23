import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import CharacterBuild from "../Modules/CharacterBuild";
import colors from "../Config/colors";
import DropDownPicker from "react-native-dropdown-picker";

export default class MyTeam extends Component {
  state = {
    characters: [],
    charactersRead: [],
    weaponFilter: "",
    elementFilter: "",
    painFilter: false,
    poisonFilter: false,
    loading: true,
    asChars: [],
  };
  componentDidMount() {
    this.getCharacters();
  }
  getCharacters = () => {
    this.setState({ loading: true });
    let chars = [...this.props.characters];
    let myFreeCharacters = [...this.props.myFreeCharacters];
    let gachaCharacters = [...this.props.myGachaCharacters];
    let myCharacters = myFreeCharacters.concat(gachaCharacters);
    let myAsCharacters = [...myCharacters.filter((c) => c.includes("AS"))];
    myAsCharacters.forEach(
      (value, index, array) =>
        (array[index] = value.substring(0, value.length - 3))
    );
    let characters = chars.map((a) => ({ ...a }));
    characters = characters.filter((c) => myCharacters.indexOf(c.name) !== -1);
    let asChars = chars.map((a) => ({ ...a }));
    asChars = asChars.filter((c) => myAsCharacters.indexOf(c.name) !== -1);
    characters.forEach((val, ind, arr) => (arr[ind].as = false));
    asChars.forEach((val, ind, arr) => (arr[ind].score = val.scoreAs));
    asChars.forEach((val, ind, arr) => (arr[ind].stats = val.statsAs));
    characters = characters.concat(asChars);
    this.setState({ charactersRead: characters, characters });
    this.setState({ loading: false });
  };
  handleFilterWeapon = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.state.characters.filter((w) => w.weapon == v);
    if (v === this.state.weaponFilter) {
      charactersRead = this.state.characters;
    }
    if (this.state.elementFilter !== "") {
      charactersRead = charactersRead.filter(
        (e) => e.element == this.state.elementFilter
      );
    }
    if (v === this.state.weaponFilter) this.setState({ weaponFilter: "" });
    else this.setState({ weaponFilter: v });
    this.setState({ charactersRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleFilterElement = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.state.characters.filter((e) => e.element == v);
    if (v === this.state.elementFilter) {
      charactersRead = this.state.characters;
    }
    if (this.state.weaponFilter !== "") {
      charactersRead = charactersRead.filter(
        (w) => w.weapon == this.state.weaponFilter
      );
    }
    if (v === this.state.elementFilter) this.setState({ elementFilter: "" });
    else this.setState({ elementFilter: v });
    this.setState({ charactersRead });
    this.setState({ loading: false });
  };
  sortChars = (i) => {
    this.setState({ loading: true });
    let charactersRead = [...this.state.charactersRead];
    if (i == 0) {
      charactersRead = charactersRead.sort((a, b) => {
        return b.score - a.score;
      });
    }
    if (i > 0) {
      charactersRead = charactersRead.sort((a, b) => {
        return b.stats[i].value - a.stats[i].value;
      });
    }
    this.setState({ charactersRead });
    this.setState({ loading: false });
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
                  styles.elementIcon,
                  this.state.elementFilter === "Fire" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Fire.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilterElement("Wind")}>
              <Image
                style={[
                  styles.elementIcon,
                  this.state.elementFilter === "Wind" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Wind.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilterElement("Water")}>
              <Image
                style={[
                  styles.elementIcon,
                  this.state.elementFilter === "Water" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Water.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilterElement("Earth")}>
              <Image
                style={[
                  styles.elementIcon,
                  this.state.elementFilter === "Earth" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Earth.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleFilterElement("Shade")}>
              <Image
                style={[
                  styles.elementIcon,
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
                  styles.elementIcon,
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
                  styles.elementIcon,
                  this.state.elementFilter === "Crystal" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Crystal.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sort}>
          <DropDownPicker
            items={[
              { label: "Score", value: 0 },
              { label: "PWR", value: 2 },
              { label: "INT", value: 3 },
              { label: "SPD", value: 4 },
              { label: "END", value: 6 },
              { label: "SPR", value: 7 },
            ]}
            placeholder={"Sort"}
            defaultValue={""}
            containerStyle={styles.picker}
            dropDownStyle={{ height: 120, flex: 1 }}
            onChangeItem={(i) => this.sortChars(i.value)}
          />
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.characterList}>
            {this.state.loading ? (
              <ActivityIndicator size={"large"} color={"black"} />
            ) : (
              <View>
                {this.state.charactersRead.map(
                  (characters, i) => (
                    i++,
                    (
                      <CharacterBuild
                        key={i}
                        id={i}
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
                        uriAs={characters.uriAs}
                        manifest={characters.manifest}
                        manifestAs={characters.manifestAs}
                        LStats={characters.LStats}
                        vcStats={characters.vcStats}
                        vcStatsAs={characters.vcStatsAs}
                        poison={characters.poison}
                        pain={characters.pain}
                        score={characters.score}
                      />
                    )
                  )
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
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
  characterList: { flexDirection: "column-reverse" },
  container: { flex: 1, marginBottom: 70 },
  debuff: {
    resizeMode: "cover",
    height: 34,
    width: 34,
    alignSelf: "center",
    marginVertical: 5,
  },
  fade: {
    opacity: 0.65,
  },
  picker: {
    flex: 1,
    height: 43,
    marginVertical: 4,
    marginHorizontal: 9,
  },
  sort: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  weaponIcon: {
    height: 40,
    width: 40,
    marginHorizontal: 1,
    marginVertical: 2,
  },
  elementIcon: {
    height: 35,
    width: 35,
    marginHorizontal: 0.8,
    marginVertical: 2,
  },
});
