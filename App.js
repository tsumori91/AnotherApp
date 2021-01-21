import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  Button,
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
import CharTrack from "./components/Pages/CharTrack";
import Grasta from "./components/Pages/Grasta";
import IDA3 from "./components/Pages/IDA3";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
    grasta: {},
    dates: "",
    freeList: [],
  };
  componentDidMount() {
    this.checkDate();
  }
  loadData = async () => {
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
    firebase
      .database()
      .ref("freeList")
      .once("value", async (snapshot) => {
        await Storage.setItem("freeList", snapshot.val().freeList);
        this.setState({
          freeList: snapshot.val().freeList,
        });
      });
    firebase
      .database()
      .ref("grasta")
      .once("value", async (snapshot) => {
        await Storage.setItem("grasta", snapshot.val().grasta);
        this.setState({
          grasta: snapshot.val().grasta,
        });
      });
    if (firebase.apps.length) {
      this.setDate();
    }
    await delay(1000);
    this.setState({ loading: false });
  };
  loadDataLocal = async () => {
    this.setState({ loading: true });
    let characters = await Storage.getItem("characters");
    let weapons = await Storage.getItem("weapons");
    let armor = await Storage.getItem("armor");
    let banners = await Storage.getItem("banners");
    let freeList = await Storage.getItem("freeList");
    let grasta = await Storage.getItem("grasta");
    await delay(100);
    if (
      characters == null ||
      weapons == null ||
      armor == null ||
      freeList == null ||
      banners == null ||
      grasta == null
    ) {
      this.loadData();
    } else {
      this.setState({ characters, weapons, armor, banners, freeList, grasta });
      await delay(200);
      this.setState({ loading: false });
    }
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
    await delay(50);
    if (dates == oldDate) this.loadDataLocal();
    else this.loadData();
  };
  handlePages = async (v) => {
    this.setState({ loading: true });
    this.checkDate();
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
    tracker.forEach((t, i) =>
      !tracker[i].idCraft
        ? (tracker[i].idCraft = Math.floor(
            Math.random() * 9999 * 9999 * 9999 * 9999
          ))
        : null
    );
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
        <SafeAreaView style={styles.buttons}>
          <Tab
            title={"Grasta"}
            color={this.state.display === "grasta" ? "gold" : "primary"}
            style={styles.button}
            onPress={() => this.handlePages("grasta")}
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
            title={"My Equips"}
            color={this.state.display === "myEquips" ? "gold" : "primary"}
            style={styles.button}
            onPress={() => this.handlePages("myEquips")}
          />
        </SafeAreaView>
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
              <MyEquips
                tracker={this.state.tracker}
                weapons={this.state.weapons}
                armor={this.state.armor}
                addEquip={this.addEquip}
              />
            ) : this.state.display === "myChars" ? (
              <CharTrack
                characters={this.state.characters}
                freeList={this.state.freeList}
              />
            ) : this.state.display === "grasta" ? (
              <Grasta grasta={this.state.grasta} />
            ) : this.state.display === "IDA3" ? (
              <IDA3 />
            ) : (
              <CPage characters={this.state.characters} />
            )}
          </View>
        )}
        <SafeAreaView style={styles.buttonsBottom}>
          <Tab
            title={"IDA3"}
            color={this.state.display === "IDA3" ? "gold" : "primary"}
            style={styles.button}
            onPress={() => this.handlePages("IDA3")}
          />
          <Tab
            title={"Pullsim"}
            color={this.state.display === "puller" ? "gold" : "primary"}
            style={styles.button}
            onPress={() => this.handlePages("puller")}
          />
          <Tab
            title={"MyChars"}
            color={this.state.display === "myChars" ? "gold" : "primary"}
            onPress={() => this.handlePages("myChars")}
            style={styles.button}
          />
          <Tab
            title={"Characters"}
            color={this.state.display === "characters" ? "gold" : "primary"}
            onPress={() => this.handlePages("characters")}
            style={styles.button}
          />
        </SafeAreaView>
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
    height: 33,
  },
  buttons: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0,
    marginBottom: Platform.OS === "android" ? 10 : 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "1%",
    flexDirection: "row",
  },
  buttonsBottom: {
    marginVertical: 10,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "1%",
    flexDirection: "row",
  },
});
