import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import CPage from "./components/Pages/Characters";
import Puller from "./components/Pages/Puller";
import * as firebase from "firebase";
import ApiKeys from "./components/Config/ApiKeys";
import Tab from "./components/Modules/Tab";
import Weapons from "./components/Pages/Weapons";
import Armors from "./components/Pages/Armors";
import colors from "./components/Config/colors";
import MyEquips from "./components/Pages/MyEquips";
import Storage from "./components/Config/Storage";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

export default class AnotherApp extends Component {
  state = {
    display: "characters",
    loading: true,
    tracker: [],
    characters: [],
    banners: [],
    weapons: [],
    armor: [],
    dates: "",
  };
  componentDidMount() {
    this.checkDate();
  }
  loadData = () => {
    this.setState({ loading: true });
    firebase
      .database()
      .ref("characters")
      .once("value", async (snapshot) => {
        await Storage.setItem("characters", snapshot.val().characters);
        this.setState({
          characters: snapshot.val().characters,
        });
      });
    firebase
      .database()
      .ref("weapons")
      .once("value", async (snapshot) => {
        await Storage.setItem("weapons", snapshot.val().weapons);
        this.setState({
          weapons: snapshot.val().weapons,
        });
      });
    firebase
      .database()
      .ref("armor")
      .once("value", async (snapshot) => {
        await Storage.setItem("armor", snapshot.val().armor);
        this.setState({
          armor: snapshot.val().armor,
        });
      });
    firebase
      .database()
      .ref("banners")
      .once("value", async (snapshot) => {
        await Storage.setItem("banners", snapshot.val().banners);
        this.setState({
          banners: snapshot.val().banners,
        });
      });
    if (firebase.apps.length) {
      this.setDate();
    }
    setTimeout(() => this.setState({ loading: false }));
  };
  loadDataLocal = async () => {
    this.setState({ loading: true });
    let characters = await Storage.getItem("characters");
    let weapons = await Storage.getItem("weapons");
    let armor = await Storage.getItem("armor");
    let banners = await Storage.getItem("banners");
    this.setState({ characters, weapons, armor, banners });
    this.setState({ loading: false });
  };
  setDate = async () => {
    let today = new Date();
    let dates = String(today.getDate()) + String(today.getMonth());
    this.setState({ dates });
    await Storage.setItem("dates", dates);
  };
  checkDate = async () => {
    let today = new Date();
    let dates = String(today.getDate()) + String(today.getMonth());
    let oldDate = await Storage.getItem("dates");
    if (dates === oldDate) this.loadDataLocal();
    else this.loadData();
  };
  handlePages = async (v) => {
    this.setState({ loading: true });
    this.setState({ display: v });
    let tracker = await Storage.getItem("tracker");
    if (tracker == null || !tracker) {
      tracker = [];
    }
    this.setState({ tracker });
    setTimeout(() => this.setState({ loading: false }));
  };
  addEquip = async (tracker) => {
    this.setState({ tracker });
    await Storage.setItem("tracker", tracker);
  };
  backup = async () => {
    let charactersBack = [...this.state.characters];
    let bannersBack = [...this.state.banners];
    let weaponsBack = [...this.state.weapons];
    let armorBack = [...this.state.armor];
    await firebase.database().ref("charactersBack").set({ charactersBack });
    await firebase.database().ref("bannersBack").set({ bannersBack });
    await firebase.database().ref("weaponsBack").set({ weaponsBack });
    await firebase.database().ref("armorBack").set({ armorBack });
  };
  render() {
    return (
      <ImageBackground
        imageStyle={{ opacity: 0.45 }}
        style={styles.allContainer}
        source={require("./components/pics/Background.png")}
      >
        <View style={styles.buttons}>
          <Tab
            title={"Characters"}
            color={this.state.display === "characters" ? "gold" : "primary"}
            onPress={() => this.handlePages("characters")}
            style={styles.button}
          />
          <Tab
            title={"My Equips"}
            color={this.state.display === "myEquips" ? "gold" : "primary"}
            style={styles.button}
            onPress={() => this.handlePages("myEquips")}
          />
          <Tab
            title={"Weapons"}
            color={this.state.display === "weapons" ? "gold" : "primary"}
            style={styles.button}
            onPress={() => this.handlePages("weapons")}
          />
          <Tab
            title={"Armors"}
            color={this.state.display === "armor" ? "gold" : "primary"}
            style={styles.button}
            onPress={() => this.handlePages("armor")}
          />
          <Tab
            title={"Pullsim"}
            color={this.state.display === "puller" ? "gold" : "primary"}
            style={styles.button}
            onPress={() => this.handlePages("puller")}
          />
        </View>
        {this.state.loading ? (
          <ActivityIndicator
            size={"large"}
            color={colors.black}
            style={{ flex: 1, alignSelf: "center" }}
          />
        ) : (
          <View style={styles.container}>
            {this.state.display === "weapons" ? (
              <Weapons
                tracker={this.state.tracker}
                addEquip={this.addEquip}
                weapons={this.state.weapons}
              />
            ) : this.state.display === "puller" ? (
              <Puller
                characters={this.state.characters}
                banners={this.state.banners}
              />
            ) : this.state.display === "armor" ? (
              <Armors
                tracker={this.state.tracker}
                addEquip={this.addEquip}
                armor={this.state.armor}
              />
            ) : this.state.display === "myEquips" ? (
              <MyEquips tracker={this.state.tracker} addEquip={this.addEquip} />
            ) : (
              <CPage characters={this.state.characters} />
            )}
          </View>
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  allContainer: {
    alignItems: "center",
    marginHorizontal: "0.1%",
    resizeMode: "cover",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: "0.5%",
    flex: 1,
  },
  button: {
    borderRadius: 0,
    borderColor: colors.white,
    borderWidth: 0.8,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flexGrow: 1,
  },
  buttons: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 50,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "1%",
    flexDirection: "row",
  },
});
