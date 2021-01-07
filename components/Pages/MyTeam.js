import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  AppRegistry,
} from "react-native";
import CharacterBuild from "../Modules/CharacterBuild";
import colors from "../Config/colors";
import DropDownPicker from "react-native-dropdown-picker";
import Storage from "../Config/Storage";
import { AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class MyTeam extends Component {
  state = {
    characters: [],
    charactersRead: [],
    weaponFilter: "",
    elementFilter: "",
    buffFilter: "",
    debuffFilter: "",
    painFilter: false,
    poisonFilter: false,
    loading: true,
    asChars: [],
    manifestList: [],
    dropFilter: 3,
  };
  componentDidMount() {
    this.getManifestList();
  }
  getCharacters = async () => {
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
    await delay(50);
    this.setState({ loading: false });
  };
  basicFilters = (charactersRead) => {
    if (this.state.weaponFilter !== "")
      charactersRead = charactersRead.filter(
        (w) => w.weapon == this.state.weaponFilter
      );
    if (this.state.elementFilter !== "")
      charactersRead = charactersRead.filter(
        (w) => w.element == this.state.elementFilter
      );
    if (this.state.debuffFilter !== "")
      charactersRead = this.filterDebuff(charactersRead);
    if (this.state.buffFilter !== "")
      charactersRead = this.filterBuff(charactersRead);
    return charactersRead;
  };
  handleFilterWeapon = async (v) => {
    this.setState({ loading: true });
    let charactersRead = this.state.characters;
    if (v === this.state.weaponFilter) {
      this.setState({ weaponFilter: "" });
    } else this.setState({ weaponFilter: v });
    await delay(10);
    if (this.state.dropFilter !== 3) {
      this.dropFilterChars(this.state.dropFilter);
    } else {
      charactersRead = this.basicFilters(charactersRead);
      this.setState({ charactersRead });
      setTimeout(() => this.setState({ loading: false }));
    }
  };
  handleFilterElement = async (v) => {
    this.setState({ loading: true });
    let charactersRead = this.state.characters;
    if (v === this.state.elementFilter) {
      this.setState({ elementFilter: "" });
    } else this.setState({ elementFilter: v });
    await delay(10);
    if (this.state.dropFilter !== 3) {
      this.dropFilterChars(this.state.dropFilter);
    } else {
      charactersRead = this.basicFilters(charactersRead);
      this.setState({ charactersRead });
      setTimeout(() => this.setState({ loading: false }));
    }
  };
  dropFilterChars = async (i) => {
    this.setState({ loading: true });
    let charactersRead = [...this.state.characters];
    charactersRead = this.basicFilters(charactersRead);
    await delay(10);
    let manifestList = [...this.state.manifestList];
    switch (i) {
      case 0:
        charactersRead = charactersRead.filter((char) => {
          if (char.as) {
            if (char.manifestAs) {
              return true;
            } else {
              return false;
            }
          } else {
            if (char.manifest) {
              return true;
            } else return false;
          }
        });

        break;
      case 1:
        charactersRead = charactersRead.filter((char) => {
          if (char.as) {
            if (manifestList.indexOf(char.name + "AS") !== -1) {
              return true;
            } else return false;
          } else {
            if (manifestList.indexOf(char.name) !== -1) {
              return true;
            } else return false;
          }
        });

        break;
      case 2:
        charactersRead = charactersRead.filter((char) => {
          if (char.as) {
            if (char.manifestAs) {
              return true;
            } else {
              return false;
            }
          } else {
            if (char.manifest) {
              return true;
            } else return false;
          }
        });
        charactersRead = charactersRead.filter((char) => {
          if (char.as) {
            if (manifestList.indexOf(char.name + "AS") == -1) {
              return true;
            } else return false;
          } else {
            if (manifestList.indexOf(char.name) == -1) {
              return true;
            } else return false;
          }
        });

        break;
      case 3:
        charactersRead = [...this.state.characters];
        let weaponFilter = "";
        let elementFilter = "";
        let debuffFilter = "";
        let buffFilter = "";
        this.setState({
          weaponFilter,
          elementFilter,
          debuffFilter,
          buffFilter,
        });
        break;
    }
    this.setState({ charactersRead, dropFilter: i });
    setTimeout(() => this.setState({ loading: false }));
  };
  filterBuff = (charactersRead) => {
    if (this.state.buffFilter !== "") {
    }
    switch (this.state.buffFilter) {
      case "critRate":
        charactersRead = charactersRead.filter((char) =>
          char.as ? char.critRateAs : char.critRate
        );
        break;
      case "critDamage":
        charactersRead = charactersRead.filter((char) =>
          char.as ? char.critDamageAs : char.critDamage
        );
        break;
    }
    return charactersRead;
  };
  filterDebuff = (charactersRead) => {
    if (this.state.debuffFilter !== "") {
      switch (this.state.debuffFilter) {
        case "poison":
          charactersRead = charactersRead.filter((char) =>
            char.as ? char.poisonAs : char.poison && !char.poisonAs
          );
          break;
        case "pain":
          charactersRead = charactersRead.filter((char) =>
            char.as ? char.painAs : char.pain && !char.painAs
          );
          break;
      }
      return charactersRead;
    }
  };
  handleFilterDebuff = async (debuff) => {
    this.setState({ loading: true });
    let charactersRead = [...this.state.characters];
    if (this.state.debuffFilter === debuff) {
      this.setState({ debuffFilter: "" });
    } else this.setState({ debuffFilter: debuff });
    await delay(50);
    if (this.state.dropFilter !== 3) {
      this.dropFilterChars(this.state.dropFilter);
    } else {
      charactersRead = this.basicFilters(charactersRead);
      this.setState({ charactersRead });
      await delay(50);
      setTimeout(() => this.setState({ loading: false }));
    }
  };
  handleFilterBuff = async (buff) => {
    this.setState({ loading: true });
    let charactersRead = [...this.state.characters];
    if (this.state.buffFilter === buff) {
      this.setState({ buffFilter: "" });
    } else this.setState({ buffFilter: buff });
    await delay(50);
    if (this.state.dropFilter !== 3) {
      this.dropFilterChars(this.state.dropFilter);
    } else {
      charactersRead = this.basicFilters(charactersRead);
      this.setState({ charactersRead });
      await delay(50);
      setTimeout(() => this.setState({ loading: false }));
    }
  };
  sortChars = async (i) => {
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
    await delay(50);
    this.setState({ loading: false });
  };
  handleManifest = async (name, as) => {
    let manifestList = [...this.state.manifestList];
    /*If the selected character is another style*/
    if (as) {
      if (manifestList.indexOf(name + "AS") !== -1) {
        manifestList = manifestList.filter((n) => {
          n !== name + "AS";
        });
      } else {
        manifestList.push(name + "AS");
      }
    } else {
      /*If the selected character is NOT another style*/
      if (manifestList.indexOf(name) !== -1) {
        manifestList = manifestList.filter((n) => {
          n !== name;
        });
      } else {
        manifestList.push(name);
      }
    }
    await Storage.setItem("manifestList", manifestList);
    this.setState({ manifestList });
  };
  findManifest = (name, as) => {
    let manifestList = [...this.state.manifestList];
    if (as) {
      if (manifestList.indexOf(name + "AS") !== -1) return true;
      else return false;
    } else {
      if (manifestList.indexOf(name) !== -1) return true;
      else return false;
    }
  };
  getManifestList = async () => {
    let manifestList = await Storage.getItem("manifestList");
    await delay(200);
    if (manifestList !== null) {
      this.setState({ manifestList });
    }
    this.getCharacters();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Swiper showsButtons={true} showsPagination={false}>
            <View style={styles.slide1}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterWeapon("Staff");
                  }}
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
                  onPress={() => this.handleFilterWeapon("Axe")}
                >
                  <Image
                    style={[
                      styles.weaponIcon,
                      this.state.weaponFilter === "Axe" ? styles.fade : null,
                    ]}
                    source={require("../pics/Axe.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
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
              </View>
              <View style={[styles.buttonContainer]}>
                <TouchableOpacity
                  onPress={() => this.handleFilterElement("Fire")}
                >
                  <Image
                    style={[
                      styles.elementIcon,
                      this.state.elementFilter === "Fire" ? styles.fade : null,
                      { marginHorizontal: 3 },
                    ]}
                    source={require("../pics/Fire.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleFilterElement("Wind")}
                >
                  <Image
                    style={[
                      styles.elementIcon,
                      this.state.elementFilter === "Wind" ? styles.fade : null,
                      { marginHorizontal: 3 },
                    ]}
                    source={require("../pics/Wind.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleFilterElement("Water")}
                >
                  <Image
                    style={[
                      styles.elementIcon,
                      this.state.elementFilter === "Water" ? styles.fade : null,
                      { marginHorizontal: 3 },
                    ]}
                    source={require("../pics/Water.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleFilterElement("Earth")}
                >
                  <Image
                    style={[
                      styles.elementIcon,
                      this.state.elementFilter === "Earth" ? styles.fade : null,
                      { marginHorizontal: 3 },
                    ]}
                    source={require("../pics/Earth.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handleFilterElement("Shade")}
                >
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
                      this.state.elementFilter === "Thunder"
                        ? styles.fade
                        : null,
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
                      this.state.elementFilter === "Crystal"
                        ? styles.fade
                        : null,
                      { marginHorizontal: 3 },
                    ]}
                    source={require("../pics/Crystal.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.slide2}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("poison");
                  }}
                >
                  <Image
                    style={[
                      styles.weaponIcon,
                      this.state.debuffFilter === "poison" ? styles.fade : null,
                    ]}
                    source={require("../pics/Poison.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("pain");
                  }}
                >
                  <Image
                    style={[
                      styles.weaponIcon,
                      this.state.debuffFilter === "pain" ? styles.fade : null,
                    ]}
                    source={require("../pics/Pain.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("critRate");
                  }}
                >
                  <Image
                    style={[
                      styles.weaponIcon,
                      this.state.buffFilter === "critRate" ? styles.fade : null,
                    ]}
                    source={require("../pics/CritRate.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("critDamage");
                  }}
                >
                  <Image
                    style={[
                      styles.weaponIcon,
                      this.state.buffFilter === "critDamage"
                        ? styles.fade
                        : null,
                    ]}
                    source={require("../pics/CritDamage.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Swiper>
        </View>
        <View
          style={[
            styles.sort,
            {
              ...(Platform.OS !== "android" && {
                zIndex: 999,
              }),
            },
          ]}
        >
          <DropDownPicker
            items={[
              { label: "Manifest available", value: 0 },
              { label: "Got Manifest", value: 1 },
              { label: "Need Manifest", value: 2 },
              { label: "Clear filters", value: 3 },
            ]}
            placeholder={"Filter"}
            defaultValue={""}
            containerStyle={styles.picker}
            dropDownStyle={{ height: 135, flex: 1 }}
            onChangeItem={(i) => this.dropFilterChars(i.value)}
          />
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
            dropDownStyle={{ height: 135, flex: 1 }}
            onChangeItem={(i) => this.sortChars(i.value)}
          />
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.characterList}>
            {this.state.loading ? (
              <ActivityIndicator size={"large"} color={"black"} />
            ) : (
              <View>
                {this.state.charactersRead
                  ? this.state.charactersRead.map(
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
                            bonusDungeon={characters.bonusDungeon}
                            handleManifest={this.handleManifest}
                            gotManifest={this.findManifest(
                              characters.name,
                              characters.as
                            )}
                          />
                        )
                      )
                    )
                  : null}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    minWidth: "100%",
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    flex: 1,
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
  elementIcon: {
    height: 35,
    width: 35,
    marginHorizontal: 0.8,
    marginVertical: 2,
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
  wrapper: { flex: 1, minHeight: 90, maxHeight: 90, minWidth: "100%" },
});

AppRegistry.registerComponent("myproject", () => SwiperComponent);
