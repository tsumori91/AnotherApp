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
import Tab from "./components/SubModules/Tab";
import Weapons from "./components/Pages/Weapons";
import Armors from "./components/Pages/Armors";
import colors from "./components/Config/colors";
import MyEquips from "./components/Pages/MyEquips";
import Storage from "./components/Config/Storage";
import CharTrack from "./components/Pages/CharTrack";
import Grasta from "./components/Pages/Grasta";
import Fishing from "./components/Pages/Fishing";
import IDA3 from "./components/Pages/IDA3";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

export default class AnotherApp extends Component {
  state = {
    display: "myEquips",
    loading: true,
    tracker: [],
    characters: [],
    banners: [],
    weapons: [],
    armor: [],
    grasta: {},
    fish: [
      {
        name: "Kid Kamasu",
        rarity: 1,
        tier: 1,
        reqLv: 1,
        hook: 1,
        location: [
          "Kira Beach",
          "Dragon Palace - Inner Wall Maps",
          "Dragon Palace - Pine Maps",
          "Dragon Palace - Plum Maps",
          "Dragon Palace - Bamboo Maps",
          "Charol Plains",
        ],
        uri:
          "https://static.miraheze.org/anotheredenwiki/thumb/4/42/870000102.png/120px-870000102.png",
      },
      {
        name: "Kraken",
        rarity: 4,
        tier: 6,
        reqLv: 30,
        hook: 3,
        location: ["Actuel"],
        uri:
          "https://static.miraheze.org/anotheredenwiki/thumb/0/07/870000079.png/120px-870000079.png",
      },
    ],
    dates: "",
    freeList: [],
    showMenu: "",
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
    await delay(20);
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
      this.setState({
        characters,
        weapons,
        armor,
        banners,
        freeList,
        grasta,
      });
      await delay(20);
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
    await delay(10);
    if (dates !== oldDate) {
      this.loadData();
    } else if (!this.state.characters.length) {
      this.loadDataLocal();
    } else this.setState({ loading: false });
  };
  handlePages = async (v) => {
    this.setState({ loading: true });
    this.checkDate();
    if (v == "myEquips") {
      let tracker = await Storage.getItem("tracker");
      if (tracker == null || !tracker) {
        tracker = [];
      }
      this.setState({ tracker });
    }
    this.setState({ display: v, showMenu: "" });
    await delay(10);
    this.setState({ loading: false });
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
  findCharacters = async () => {
    return await Storage.getItem("characters");
  };
  handleMenu = (showMenu) => {
    if (this.state.showMenu == showMenu) {
      this.setState({ showMenu: "" });
    } else {
      this.setState({ showMenu });
    }
  };
  render() {
    let characters = this.state.characters;
    return (
      <ImageBackground
        imageStyle={{ opacity: 0.45 }}
        style={styles.allContainer}
        source={require("./components/pics/Background.png")}
      >
        <SafeAreaView
          style={[
            styles.buttons,
            {
              ...(Platform.OS !== "android" && {
                zIndex: 9999,
              }),
            },
          ]}
        >
          <View style={[styles.buttonDrop]}>
            <Tab
              title={`Equipment`}
              color={this.state.showMenu === "equipment" ? "gold" : "primary"}
              style={[styles.button, { width: "100%" }]}
              onPress={() => this.handleMenu("equipment")}
              up={this.state.showMenu === "equipment" && true}
              down={this.state.showMenu !== "equipment" && true}
              arrowStyle={styles.arrowStyle}
            />
            {this.state.showMenu !== "equipment" ? null : (
              <View style={styles.subButtons}>
                <Tab
                  title={"Grasta"}
                  color={this.state.display === "grasta" ? "gold" : "primary"}
                  style={[styles.button, styles.eachDropButton]}
                  onPress={() => this.handlePages("grasta")}
                />
                <Tab
                  title={"Weapons"}
                  color={this.state.display === "weapons" ? "gold" : "primary"}
                  style={[styles.button, styles.eachDropButton]}
                  onPress={() => this.handlePages("weapons")}
                />
                <Tab
                  title={"Armors"}
                  color={this.state.display === "armor" ? "gold" : "primary"}
                  style={[styles.button, styles.eachDropButton]}
                  onPress={() => this.handlePages("armor")}
                />
                <Tab
                  title={"My Equips"}
                  color={this.state.display === "myEquips" ? "gold" : "primary"}
                  style={[styles.button, styles.eachDropButton]}
                  onPress={() => this.handlePages("myEquips")}
                />
              </View>
            )}
          </View>
          <View style={styles.buttonDrop}>
            <Tab
              title={"Other"}
              color={this.state.showMenu === "other" ? "gold" : "primary"}
              style={[styles.button, { width: "100%" }]}
              onPress={() => this.handleMenu("other")}
              up={this.state.showMenu === "other" && true}
              down={this.state.showMenu !== "other" && true}
              arrowStyle={styles.arrowStyle}
            />
            {this.state.showMenu !== "other" ? null : (
              <View style={styles.subButtons}>
                <Tab
                  title={"IDA3"}
                  color={this.state.display === "IDA3" ? "gold" : "primary"}
                  style={[styles.button, styles.eachDropButton]}
                  onPress={() => this.handlePages("IDA3")}
                />
                <Tab
                  title={"Pullsim"}
                  color={this.state.display === "puller" ? "gold" : "primary"}
                  style={[styles.button, styles.eachDropButton]}
                  onPress={() => this.handlePages("puller")}
                />
                <Tab
                  title={"Fishing"}
                  color={this.state.display === "fishing" ? "gold" : "primary"}
                  onPress={() => this.handlePages("fishing")}
                  style={[styles.button, styles.eachDropButton]}
                />
              </View>
            )}
          </View>
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
        {this.state.loading ? (
          <ActivityIndicator
            size={"large"}
            color={colors.black}
            style={{ flex: 1, alignSelf: "center" }}
          />
        ) : (
          <SafeAreaView
            style={styles.container}
            accessible={this.state.showMenu == "" ? true : false}
          >
            <TouchableWithoutFeedback
              onPress={() => this.setState({ showMenu: null })}
            >
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
              ) : this.state.display === "fishing" ? (
                <Fishing fish={this.state.fish} />
              ) : (
                <CPage characters={characters} />
              )}
            </TouchableWithoutFeedback>
          </SafeAreaView>
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
  arrowStyle: { color: colors.white },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: "0.5%",
    flex: 1,
    elevation: 1,
  },
  eachDropButton: {
    minWidth: "100%",
    alignSelf: "center",
    borderTopWidth: 1,
    height: 10,
    elevation: 3,
  },
  buttonDrop: {
    flexShrink: 1,
    flexDirection: "column",
  },
  button: {
    borderRadius: 0,
    borderColor: colors.white,
    borderWidth: 0.8,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 33,
    width: null,
    flexGrow: 1,
    alignSelf: "flex-start",
  },
  subButtons: {
    alignItems: "flex-start",
    position: "absolute",
    top: 33,
    elevation: 10,
  },
  buttons: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0,
    marginBottom: Platform.OS === "android" ? 10 : 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "1%",
    flexDirection: "row",
    elevation: 3,
  },
});
