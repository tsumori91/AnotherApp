import React, { Component, PureComponent } from "react";
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
  Dimensions,
} from "react-native";
import Char from "../Modules/Echaracter";
import Storage from "../Config/Storage";
import colors from "../Config/colors";
import * as firebase from "firebase";
import CharacterBuildNaoko from "../Modules/CharacterBuildNaoko";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

class CPage extends PureComponent {
  state = {
    charactersRead: [],
    charactersTest: [],
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
    let charactersRead = [...this.props.charactersTest];
    this.setState({ charactersRead });
  };
  handleFilterWeapon = (v) => {
    this.setState({ loading: true });
    let charactersRead = this.props.charactersTest.filter((w) => w.weapon == v);
    if (v === this.state.weaponFilter)
      charactersRead = this.props.charactersTest;
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
    let charactersRead = this.props.charactersTest.filter(
      (e) => e.element[0] == v || e.element[1] == v
    );
    if (v === this.state.elementFilter)
      charactersRead = this.props.charactersTest;
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
    let charactersRead = this.props.charactersTest.filter(
      (e) => e.roles.filter((role) => role == "InflictPainIgnore").length > 0
    );
    if (this.state.painFilter) charactersRead = [...this.props.charactersTest];
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
    let charactersRead = this.props.charactersTest.filter(
      (e) => e.roles.filter((role) => role == "InflictPoisonIgnore").length > 0
    );
    if (this.state.poisonFilter)
      charactersRead = [...this.props.charactersTest];
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
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.allButtons}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterWeapon("Staff")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.weaponFilter === "Staff" ? styles.fade : null,
                ]}
                source={require("../pics/Staff.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterWeapon("Sword")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.weaponFilter === "Sword" ? styles.fade : null,
                ]}
                source={require("../pics/Sword.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterWeapon("Katana")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.weaponFilter === "Katana" ? styles.fade : null,
                ]}
                source={require("../pics/Katana.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterWeapon("Ax")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.weaponFilter === "Ax" ? styles.fade : null,
                ]}
                source={require("../pics/Axe.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterWeapon("Lance")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.weaponFilter === "Lance" ? styles.fade : null,
                ]}
                source={require("../pics/Lance.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterWeapon("Bow")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.weaponFilter === "Bow" ? styles.fade : null,
                ]}
                source={require("../pics/Bow.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterWeapon("Fists")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.weaponFilter === "Fists" ? styles.fade : null,
                ]}
                source={require("../pics/Fists.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterWeapon("Hammer")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.weaponFilter === "Hammer" ? styles.fade : null,
                ]}
                source={require("../pics/Hammer.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterPoison()}
            >
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
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterElement("Fire")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Fire" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Fire.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterElement("Wind")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Wind" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Wind.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterElement("Water")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Water" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Water.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterElement("Earth")}
            >
              <Image
                style={[
                  styles.weaponIcon,
                  this.state.elementFilter === "Earth" ? styles.fade : null,
                  { marginHorizontal: 3 },
                ]}
                source={require("../pics/Earth.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterElement("Shade")}
            >
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
              style={styles.buttonView}
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
              style={styles.buttonView}
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
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => this.handleFilterPain()}
            >
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
          <ScrollView
            style={{ height: Dimensions.get("window").height - 150 }}
            nestedScrollEnabled={true}
          >
            <View>
              {this.state.charactersRead.map(
                (characters, i) => (
                  i++,
                  (
                    <View key={i}>
                      {characters.name !== "" ? (
                        <CharacterBuildNaoko
                          name={characters.name}
                          shadow={characters.shadow}
                          weapon={characters.weapon}
                          uri={characters.source}
                          activeSkills={characters.activeSkills}
                          passiveSkills={characters.passiveSkills}
                          manifestSkills={characters.manifestSkills}
                          bonusStats={characters.bonusStats}
                          element={characters.element}
                          roles={characters.roles}
                          stats={characters.stats}
                          valorChant={characters.valorChant}
                          ranking={0}
                          tomeName={characters.tomeName}
                          tomeLocation={characters.tomeLocation}
                          /*<Char
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
                          scoreAs={characters.scoreAs}*/
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
  buttonView: {
    flex: 1,
    maxWidth: "10%",
    height: 40,
    marginHorizontal: 1,
    marginVertical: 2,
    justifyContent: "center",
    alignContent: "center",
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
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    maxWidth: 40,
    maxHeight: 40,
    resizeMode: "contain",
  },
  fade: {
    opacity: 0.65,
  },
});
