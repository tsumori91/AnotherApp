import React, { PureComponent } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Image,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../Config/colors";
import Storage from "../Config/Storage";
import Tab from "./Tab";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default class EditChar extends PureComponent {
  state = { weapons: [], loadingWeapons: true, page: "weapons" };
  componentDidMount() {
    this.load();
  }
  load = async () => {
    let weapons = await Storage.getItem("weapons");
    weapons = weapons.filter((weapon) => weapon.type == this.props.weapon);
    this.setState({ weapons });
    await delay(1);
    this.setState({ loadingWeapons: false });
  };
  pageChange = (page) => {
    this.setState({ page });
    this.setState({ currentEquip: null });
  };
  handleEquip = async (page, equip) => {
    let characterEquips = await Storage.getItem("characterEquips");
    if (characterEquips == null) characterEquips = [];
    if (
      !characterEquips.filter((character) => character.name == this.props.name)
        .length
    ) {
      characterEquips.push({
        name: this.props.name,
        weapon: page == "weapons" ? equip : null,
        armor: page == "armor" ? equip : null,
        badges: page == "badges" ? equip : null,
        grasta: page == "grasta" ? equip : null,
      });
    } else
      characterEquips.forEach((character) => {
        if (character.name == this.props.name) {
          switch (page) {
            case "weapons":
              character.weapon = equip;
              return;
              break;
            case "armor":
              character.armor = equip;
              return;
              break;
            case "badges":
              character.badges = equip;
              return;
              break;
            case "grasta":
              character.weapon.grasta = equip;
              return;
              break;
          }
        }
      });
    Storage.setItem("characterEquips", characterEquips);
  };
  mapMain = (page, weapon) => {
    switch (page) {
      case "weapons":
        return this.state.weapons.map(
          (wpn, i) => (
            i++,
            (
              <TouchableOpacity
                onPress={() => this.setState({ currentEquip: wpn })}
                style={[
                  styles.weaponView,
                  this.state.currentEquip == wpn ? styles.selected : null,
                ]}
                key={i}
              >
                <Image
                  key={i}
                  source={wpn.uri ? { uri: wpn.uri } : weapon}
                  style={[styles.weaponImage]}
                />
              </TouchableOpacity>
            )
          )
        );

        break;

      case "armor":
        break;
      case "badges":
        break;
      case "grasta":
        break;
    }
  };
  render() {
    let weapon = require("../pics/Sword.png");
    if (this.props.weapon === "Fists") {
      weapon = require("../pics/Fists.png");
    } else if (this.props.weapon === "Bow") {
      weapon = require("../pics/Bow.png");
    } else if (this.props.weapon === "Hammer") {
      weapon = require("../pics/Hammer.png");
    } else if (this.props.weapon === "Lance") {
      weapon = require("../pics/Lance.png");
    } else if (this.props.weapon === "Katana") {
      weapon = require("../pics/Katana.png");
    } else if (this.props.weapon === "Staff") {
      weapon = require("../pics/Staff.png");
    } else if (this.props.weapon === "Axe") {
      weapon = require("../pics/Axe.png");
    }
    return (
      <ImageBackground
        imageStyle={{ opacity: 0.5 }}
        source={
          this.props.as ? { uri: this.props.uriAs } : { uri: this.props.uri }
        }
        style={styles.container}
      >
        <View style={[styles.topTabs]}>
          <TouchableOpacity
            style={[
              styles.topTab,
              this.state.page == "weapons" ? styles.tabSelected : null,
            ]}
            onPress={() => {
              this.pageChange("weapons");
            }}
          >
            <Text style={styles.tabText}>Weapon</Text>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={styles.topTab}
            onPress={() => {
              this.pageChange("armor");
            }}
          >
            <Text style={styles.tabText}>Armor</Text>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={styles.topTab}
            onPress={() => {
              this.pageChange("badges");
            }}
          >
            <Text style={styles.tabText}>Badges</Text>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={styles.topTab}
            onPress={() => {
              this.pageChange("grasta");
            }}
          >
            <Text style={styles.tabText}>Grasta</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.mainScroll}>
          {this.state.page ? (
            <View style={[styles.mainPage]}>
              {this.mapMain(this.state.page, weapon)}
            </View>
          ) : null}
        </ScrollView>
        <View style={styles.weaponDescription}>
          {this.state.currentEquip ? (
            <Text style={styles.allText}>
              <Text>{this.state.currentEquip.name}</Text>
              <Text>
                {"\n"}Atk:{this.state.currentEquip.stats[0]}
              </Text>
              <Text>
                {"\n"}M.Atk:{this.state.currentEquip.stats[1]}
              </Text>
              <Text>
                {"\n"}Effects: {this.state.currentEquip.effects}
              </Text>
            </Text>
          ) : null}
          {this.state.currentEquip ? (
            <Tab
              title={"Equip"}
              style={styles.equipButton}
              color={"shadow"}
              onPress={() =>
                this.handleEquip(this.state.page, this.state.currentEquip)
              }
            />
          ) : null}
        </View>
        <Text> {this.props.name} </Text>
        <Button title={"Close"} onPress={this.props.close} />
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  allText: { fontSize: 17 },
  selected: {
    backgroundColor: colors.wind,
    borderColor: colors.water,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    minHeight: 600,
    minWidth: "100%",
    resizeMode: "cover",
  },
  equipButton: {
    position: "absolute",
    alignSelf: "flex-end",
    margin: 6,
    right: 5,
    paddingHorizontal: 7,
    paddingVertical: 13,
    elevation: 2,
    borderRadius: 4,
  },
  mainScroll: {
    maxHeight: "65%",
  },
  mainPage: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.earth,
    padding: 10,
    justifyContent: "space-evenly",
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.water,
  },
  weaponDescription: {
    borderColor: colors.water,
    borderTopWidth: 3,
    width: "100%",
    backgroundColor: colors.whiteOpe,
    flexGrow: 0.8,
  },
  weaponImage: {
    resizeMode: "cover",
    flex: 1,
  },
  weaponView: {
    margin: 4,
    flex: 1,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.shadow,
    minHeight: 63.3,
    minWidth: 63.3,
    maxHeight: 63.3,
    maxWidth: 63.3,
    backgroundColor: colors.white,
  },
  space: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: colors.water,
  },
  tabText: {
    alignSelf: "center",
  },
  tabSelected: {
    backgroundColor: colors.earth,
    borderBottomWidth: 0,
  },
  topTab: {
    flex: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    backgroundColor: colors.earthOpe,
    borderWidth: 3,
    borderColor: colors.water,
  },
  topTabs: {
    flexDirection: "row",
    width: "100%",
    height: 35,
    marginTop: 5,
  },
});
