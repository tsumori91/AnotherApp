import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  Button,
  ScrollView,
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
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

export default class AnotherApp extends Component {
  state = {
    display: "fishing",
    loading: true,
    tracker: [],
    characters: [],
    charactersTest: [],
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
        uri: "https://static.miraheze.org/anotheredenwiki/thumb/4/42/870000102.png/120px-870000102.png",
      },
      {
        name: "Kraken",
        rarity: 4,
        tier: 6,
        reqLv: 30,
        hook: 3,
        location: ["Actuel"],
        uri: "https://static.miraheze.org/anotheredenwiki/thumb/0/07/870000079.png/120px-870000079.png",
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
      .ref("charactersTest")
      .once("value", async (snapshot) => {
        await Storage.setItem("charactersTest", snapshot.val().charactersTest);
        this.setState({
          charactersTest: snapshot.val().charactersTest,
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
    let charactersTest = await Storage.getItem("charactersTest");
    let weapons = await Storage.getItem("weapons");
    let armor = await Storage.getItem("armor");
    let banners = await Storage.getItem("banners");
    let freeList = await Storage.getItem("freeList");
    let grasta = await Storage.getItem("grasta");
    await delay(20);
    if (
      characters == null ||
      charactersTest == null ||
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
        charactersTest,
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
        <SafeAreaView style={styles.buttons}>
          <View style={styles.buttonDrop}>
            <Tab
              textStyle={styles.tabText}
              selected={this.state.showMenu === "equipment" ? true : false}
              title={`Equipment`}
              color={this.state.showMenu === "equipment" ? "darkGrey" : "grey"}
              style={styles.button}
              onPress={() => this.handleMenu("equipment")}
              up={this.state.showMenu === "equipment" && true}
              down={this.state.showMenu !== "equipment" && true}
              arrowStyle={styles.arrowStyle}
            />
            {this.state.showMenu !== "equipment" ? null : (
              <View style={styles.subButtons}>
                <Tab
                  textStyle={styles.tabText}
                  selected={this.state.display === "grasta" ? true : false}
                  title={"Grasta"}
                  color={this.state.display === "grasta" ? "darkGrey" : "grey"}
                  style={styles.eachDropButton}
                  onPress={() => this.handlePages("grasta")}
                />
                <Tab
                  textStyle={styles.tabText}
                  selected={this.state.display === "weapons" ? true : false}
                  title={"Weapons"}
                  color={this.state.display === "weapons" ? "darkGrey" : "grey"}
                  style={styles.eachDropButton}
                  onPress={() => this.handlePages("weapons")}
                />
                <Tab
                  textStyle={styles.tabText}
                  selected={this.state.display === "armor" ? true : false}
                  title={"Armors"}
                  color={this.state.display === "armor" ? "darkGrey" : "grey"}
                  style={styles.eachDropButton}
                  onPress={() => this.handlePages("armor")}
                />
                <Tab
                  textStyle={styles.tabText}
                  selected={this.state.display === "myEquips" ? true : false}
                  title={"My Equips"}
                  color={
                    this.state.display === "myEquips" ? "darkGrey" : "grey"
                  }
                  style={styles.eachDropButton}
                  onPress={() => this.handlePages("myEquips")}
                />
              </View>
            )}
          </View>
          <View style={styles.buttonDrop}>
            <Tab
              textStyle={styles.tabText}
              selected={this.state.showMenu === "other" ? true : false}
              title={"Other"}
              color={this.state.showMenu === "other" ? "darkGrey" : "grey"}
              style={styles.button}
              onPress={() => this.handleMenu("other")}
              up={this.state.showMenu === "other" && true}
              down={this.state.showMenu !== "other" && true}
              arrowStyle={styles.arrowStyle}
            />
            {this.state.showMenu !== "other" ? null : (
              <View style={styles.subButtons}>
                <Tab
                  textStyle={styles.tabText}
                  selected={this.state.display === "IDA3" ? true : false}
                  title={"IDA3"}
                  color={this.state.display === "IDA3" ? "darkGrey" : "grey"}
                  style={styles.eachDropButton}
                  onPress={() => this.handlePages("IDA3")}
                />
                <Tab
                  textStyle={styles.tabText}
                  selected={this.state.display === "puller" ? true : false}
                  title={"Pullsim"}
                  color={this.state.display === "puller" ? "darkGrey" : "grey"}
                  style={styles.eachDropButton}
                  onPress={() => this.handlePages("puller")}
                />
                <Tab
                  textStyle={styles.tabText}
                  selected={this.state.display === "fishing" ? true : false}
                  title={"Fishing"}
                  color={this.state.display === "fishing" ? "darkGrey" : "grey"}
                  onPress={() => this.handlePages("fishing")}
                  style={styles.eachDropButton}
                />
              </View>
            )}
          </View>
          <View style={styles.buttonDrop}>
            <Tab
              textStyle={styles.tabText}
              selected={this.state.display === "myChars" ? true : false}
              title={"MyChars"}
              color={this.state.display === "myChars" ? "darkGrey" : "grey"}
              onPress={() => this.handlePages("myChars")}
              style={styles.button}
            />
          </View>
          <View style={styles.buttonDrop}>
            <Tab
              textStyle={styles.tabText}
              selected={this.state.display === "characters" ? true : false}
              title={"Characters"}
              color={this.state.display === "characters" ? "darkGrey" : "grey"}
              onPress={() => this.handlePages("characters")}
              style={styles.button}
            />
          </View>
        </SafeAreaView>
        {this.state.loading ? (
          <ActivityIndicator
            size={"large"}
            color={colors.black}
            style={{ flex: 1, alignSelf: "center" }}
          />
        ) : (
          <SafeAreaView style={styles.container}>
            <View nestedScrollEnabled={true} style={styles.componentContainer}>
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
                <Fishing
                  characters={this.state.characters}
                  fish={this.state.fish}
                />
              ) : (
                <CPage
                  characters={characters}
                  charactersTest={this.state.charactersTest}
                />
              )}
            </View>
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
  arrowStyle: { color: colors.black },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: "0.5%",
    position: "absolute",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 65 : 75,
    marginBottom: Platform.OS === "android" ? 10 : 0,
  },
  componentContainer: {
    flex: 1,
  },
  eachDropButton: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 33,
    flexGrow: 1,
    alignSelf: "flex-start",
  },
  buttonDrop: {
    flexShrink: 1,
    alignSelf: "flex-start",
  },
  button: {
    borderRadius: 0,
    paddingHorizontal: 10,
    borderColor: colors.offWhite,
    borderWidth: 0.8,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingVertical: 7,
    maxHeight: 33,
    flexGrow: 1,
    alignSelf: "flex-start",
    width: "100%",
    height: "100%",
  },
  buttons: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 15 : 0,
    marginBottom: Platform.OS === "android" ? 10 : 0,
    minHeight: 82,
    maxHeight: 82,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "1%",
    flexDirection: "row",
    elevation: 1,
    zIndex: 1,
  },
  subButtons: {
    alignItems: "flex-start",
  },
  tabText: {
    fontSize: 14,
  },
});
