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
} from "react-native";
import colors from "../Config/colors";
import Storage from "../Config/Storage";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default class EditChar extends PureComponent {
  state = { weapons: [], loadingWeapons: true };
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
        {!this.loadingWeapons ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.state.weapons.map(
              (wpn, i) => (
                i++,
                (
                  <TouchableOpacity
                    onPress={() => this.setState({ currentWeapon: wpn })}
                    style={styles.weaponView}
                  >
                    <Image
                      key={i}
                      source={wpn.uri ? { uri: wpn.uri } : weapon}
                      style={styles.weaponImage}
                    />
                  </TouchableOpacity>
                )
              )
            )}
          </View>
        ) : (
          <ActivityIndicator style={{ flex: 1 }} />
        )}
        {this.state.currentWeapon ? (
          <View style={styles.weaponDescription}>
            <Text style={styles.allText}>
              <Text>{this.state.currentWeapon.name}</Text>
              <Text>
                {"\n"}Atk:{this.state.currentWeapon.stats[0]}
              </Text>
              <Text>
                {"\n"}M.Atk:{this.state.currentWeapon.stats[1]}
              </Text>
              <Text>
                {"\n"}Effects: {this.state.currentWeapon.effects}
              </Text>
            </Text>
            <View></View>
          </View>
        ) : null}
        <Text> {this.props.name} </Text>
        <Button title={"Close"} onPress={this.props.close} />
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  allText: { fontSize: 17 },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    minHeight: 600,
    minWidth: "100%",
    resizeMode: "cover",
  },
  weaponDescription: {
    borderTopWidth: 1,
    width: "100%",
    backgroundColor: colors.whiteOpe,
    flexGrow: 0.8,
  },
  weaponImage: {
    resizeMode: "cover",
    flex: 1,
  },
  weaponView: {
    margin: 2,
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    minHeight: 63.3,
    minWidth: 63.3,
    maxHeight: 63.3,
    maxWidth: 63.3,
  },
});
