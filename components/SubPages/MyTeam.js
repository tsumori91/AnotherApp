import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  AppRegistry,
  Alert,
  TextInput,
  Dimensions,
} from "react-native";
import CharacterBuild from "../Modules/CharacterBuild";
import colors from "../Config/colors";
import DropDownPicker from "react-native-dropdown-picker";
import Storage from "../Config/Storage";
import { AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import EditChar from "../SubModules/EditChar";
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
    characters.sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });
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
      charactersRead = charactersRead.filter(
        (char) => char.buffList || char.buffListAs
      );
      charactersRead = charactersRead.filter((char) => {
        if (!char.as && char.buffList) {
          if (
            char.buffList.filter((buff) => buff == this.state.buffFilter).length
          ) {
            return true;
          } else {
            return false;
          }
        } else if (char.buffListAs) {
          if (
            char.buffListAs.filter((buff) => buff == this.state.buffFilter)
              .length
          ) {
            return true;
          } else {
            return false;
          }
        } else return false;
      });
      return charactersRead;
    }
  };
  filterDebuff = (charactersRead) => {
    if (this.state.debuffFilter !== "") {
      charactersRead = charactersRead.filter(
        (char) => char.debuffList || char.debuffListAs
      );
      charactersRead = charactersRead.filter((char) => {
        if (!char.as) {
          if (
            char.debuffList.filter(
              (debuff) => debuff == this.state.debuffFilter
            ).length
          ) {
            return true;
          } else {
            return false;
          }
        } else if (char.debuffListAs) {
          if (
            char.debuffListAs.filter(
              (debuff) => debuff == this.state.debuffFilter
            ).length
          ) {
            return true;
          } else {
            return false;
          }
        }
      });
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
  handleEdit = (name) => {
    this.setState({ edit: true, editChar: name });
  };
  closeEdit = () => {
    this.setState({ edit: false });
  };
  handleSearchBar = (value) => {
    value = value.toLowerCase();
    this.setState({ searchBar: value });
  };
  render() {
    let character = null;
    if (this.state.edit)
      character = this.state.characters.filter(
        (character) => character.name == this.state.editChar
      );
    let charactersRead = [...this.state.charactersRead];
    if (this.state.searchBar)
      charactersRead = charactersRead.filter(
        (character) =>
          character.name.toLowerCase().indexOf(this.state.searchBar) !== -1
      );
    return this.state.edit ? (
      <View style={styles.container}>
        <EditChar
          name={character[0].name}
          skills={character[0].skills}
          weapon={character[0].weapon}
          shadow={character[0].shadow}
          element={character[0].element}
          vc={character[0].vc}
          vcAS={character[0].vcAS}
          uri={character[0].uri}
          tomeName={character[0].tomeName}
          tomeNameAs={character[0].tomeNameAs}
          tomeLocation={character[0].tomeLocation}
          tomeLocationAs={character[0].tomeLocationAs}
          as={character[0].as}
          stats={character[0].stats}
          uriAs={character[0].uriAs}
          manifest={character[0].manifest}
          manifestAs={character[0].manifestAs}
          LStats={character[0].LStats}
          vcStats={character[0].vcStats}
          vcStatsAs={character[0].vcStatsAs}
          poison={character[0].poison}
          pain={character[0].pain}
          score={character[0].score}
          bonusDungeon={character[0].bonusDungeon}
          close={this.closeEdit}
        />
      </View>
    ) : (
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
                  onLongPress={() =>
                    Alert.alert("Inflicts guaranteed poison", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "poison" ? styles.fade : null,
                    ]}
                    source={require("../pics/Poison.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("pain");
                  }}
                  onLongPress={() =>
                    Alert.alert("Inflicts guaranteed pain", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "pain" ? styles.fade : null,
                    ]}
                    source={require("../pics/Pain.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("int");
                  }}
                  onLongPress={() =>
                    Alert.alert("Intelligence Debuff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "int" ? styles.fade : null,
                    ]}
                    source={require("../pics/intDebuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("pwr");
                  }}
                  onLongPress={() =>
                    Alert.alert("Power Debuff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "pwr" ? styles.fade : null,
                    ]}
                    source={require("../pics/pwrDebuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("spd");
                  }}
                  onLongPress={() =>
                    Alert.alert("Speed Debuff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "spd" ? styles.fade : null,
                    ]}
                    source={require("../pics/spdDebuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("physical");
                  }}
                  onLongPress={() =>
                    Alert.alert("Physical Resistance Debuff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "physical"
                        ? styles.fade
                        : null,
                    ]}
                    source={require("../pics/physResDebuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("type");
                  }}
                  onLongPress={() =>
                    Alert.alert(
                      "One/All Type (Element) Resistance Debuff",
                      "",
                      [],
                      {
                        cancelable: true,
                      }
                    )
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "type" ? styles.fade : null,
                    ]}
                    source={require("../pics/typeResDebuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("pierce");
                  }}
                  onLongPress={() =>
                    Alert.alert("Piercing Resistance Debuff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "pierce" ? styles.fade : null,
                    ]}
                    source={require("../pics/pierceDebuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("blunt");
                  }}
                  onLongPress={() =>
                    Alert.alert("Blunt Resistance Debuff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "blunt" ? styles.fade : null,
                    ]}
                    source={require("../pics/bluntDebuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterDebuff("slash");
                  }}
                  onLongPress={() =>
                    Alert.alert("Slash Resistance Debuff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.debuffFilter === "slash" ? styles.fade : null,
                    ]}
                    source={require("../pics/slashDebuff.png")}
                  />
                </TouchableOpacity>
              </View>
              {/*Break between 
              debuff/buff lines */}
              <View style={[styles.buttonContainer, { right: 38 }]}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("critRate");
                  }}
                  onLongPress={() =>
                    Alert.alert("Critical Rate Buff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.buffFilter === "critRate" ? styles.fade : null,
                    ]}
                    source={require("../pics/CritRate.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("critDamage");
                  }}
                  onLongPress={() =>
                    Alert.alert("Critical Damage Buff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.buffFilter === "critDamage"
                        ? styles.fade
                        : null,
                    ]}
                    source={require("../pics/CritDamage.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("int");
                  }}
                  onLongPress={() =>
                    Alert.alert("Intelligence Buff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.buffFilter === "int" ? styles.fade : null,
                    ]}
                    source={require("../pics/intBuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("pwr");
                  }}
                  onLongPress={() =>
                    Alert.alert("Power Buff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.buffFilter === "pwr" ? styles.fade : null,
                    ]}
                    source={require("../pics/pwrBuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("spd");
                  }}
                  onLongPress={() =>
                    Alert.alert("Speed Buff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.buffFilter === "spd" ? styles.fade : null,
                    ]}
                    source={require("../pics/SpdBuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("physRes");
                  }}
                  onLongPress={() =>
                    Alert.alert("Physical Resistance Buff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.buffFilter === "physRes" ? styles.fade : null,
                    ]}
                    source={require("../pics/physResBuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("typeRes");
                  }}
                  onLongPress={() =>
                    Alert.alert("One/All Type Resistance Buff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.buffFilter === "typeRes" ? styles.fade : null,
                    ]}
                    source={require("../pics/typeResBuff.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleFilterBuff("typeAtk");
                  }}
                  onLongPress={() =>
                    Alert.alert("One/All Type (Element) Attack Buff", "", [], {
                      cancelable: true,
                    })
                  }
                >
                  <Image
                    style={[
                      styles.buffIcon,
                      this.state.buffFilter === "typeAtk" ? styles.fade : null,
                    ]}
                    source={require("../pics/typeAtkBuff.png")}
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
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBox}
            placeholder={"Search by Name"}
            onChangeText={(text) => this.handleSearchBar(text)}
          ></TextInput>
        </View>
        <ScrollView
          style={{ height: Dimensions.get("window").height - 150 }}
          nestedScrollEnabled={true}
        >
          <View style={styles.characterList}>
            {this.state.loading ? (
              <ActivityIndicator size={"large"} color={"black"} />
            ) : (
              <View>
                {charactersRead
                  ? charactersRead.map(
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
                            edit={this.handleEdit}
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
  container: { flex: 1, marginBottom: 70, width: "100%", height: "100%" },
  debuff: {
    resizeMode: "cover",
    height: 34,
    width: 34,
    alignSelf: "center",
    marginVertical: 5,
  },
  editChar: {
    flex: 1,
    minHeight: "100%",
    elevation: 10,
    minWidth: "100%",
    position: "absolute",
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
  sort: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  weaponIcon: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    marginHorizontal: 1,
    marginVertical: 2,
  },
  buffIcon: {
    height: 33,
    width: 33,
    resizeMode: "contain",
    marginHorizontal: 2,
    marginVertical: 2,
  },
  wrapper: { flex: 1, minHeight: 90, maxHeight: 90, minWidth: "100%" },
});

AppRegistry.registerComponent("myproject", () => SwiperComponent);
