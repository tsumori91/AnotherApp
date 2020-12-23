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
    asCharsRead: [],
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
    let myAsCharacters = myCharacters.filter((c) => c.includes("AS"));
    myAsCharacters.forEach(
      (value, index, array) =>
        (array[index] = value.substring(0, value.length - 3))
    );
    let characters = chars.filter((c) => myCharacters.indexOf(c.name) !== -1);
    let asChars = chars.filter((c) => myAsCharacters.indexOf(c.name) !== -1);
    this.setState({
      charactersRead: characters,
      characters,
      asChars,
      asCharsRead: asChars,
    });
    this.setState({ loading: false });
  };
  handleFilterWeapon = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.state.characters.filter((w) => w.weapon == v);
    let asCharsRead = this.state.asChars.filter((w) => w.weapon == v);
    if (v === this.state.weaponFilter) {
      charactersRead = this.state.characters;
      asCharsRead = this.state.asChars;
    }
    if (this.state.elementFilter !== "") {
      charactersRead = charactersRead.filter(
        (e) => e.element == this.state.elementFilter
      );
      asCharsRead = asCharsRead.filter(
        (e) => e.element == this.state.elementFilter
      );
    }
    if (v === this.state.weaponFilter) this.setState({ weaponFilter: "" });
    else this.setState({ weaponFilter: v });
    this.setState({ charactersRead, asCharsRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  handleFilterElement = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.state.characters.filter((e) => e.element == v);
    let asCharsRead = this.state.asCharsRead.filter((e) => e.element == v);
    if (v === this.state.elementFilter) {
      charactersRead = this.state.characters;
      asCharsRead = this.state.asCharsRead;
    }
    if (this.state.weaponFilter !== "") {
      charactersRead = charactersRead.filter(
        (w) => w.weapon == this.state.weaponFilter
      );
      asCharsRead = asCharsRead.filter(
        (w) => w.weapon == this.state.weaponFilter
      );
    }
    if (v === this.state.elementFilter) this.setState({ elementFilter: "" });
    else this.setState({ elementFilter: v });
    this.setState({ charactersRead, asCharsRead });
    setTimeout(() => this.setState({ loading: false }));
  };
  render() {
    let charactersRead = [...this.state.charactersRead];
    let asCharsRead = [...this.state.asCharsRead];
    let allCharsRead = charactersRead.concat(asCharsRead);
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
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.characterList}>
            {this.state.loading ? (
              <ActivityIndicator size={"large"} color={"black"} />
            ) : (
              <View>
                {allCharsRead.map(
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
                        as={i > this.state.charactersRead.length ? true : false}
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
  weaponIcon: {
    height: 40,
    width: 40,
    marginHorizontal: 1,
    marginVertical: 2,
  },
});
