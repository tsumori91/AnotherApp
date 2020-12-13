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
    weapons: [{}],
    loading: true,
    tracker: [],
  };
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }));
  }
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
              <Weapons tracker={this.state.tracker} addEquip={this.addEquip} />
            ) : this.state.display === "puller" ? (
              <Puller />
            ) : this.state.display === "armor" ? (
              <Armors tracker={this.state.tracker} addEquip={this.addEquip} />
            ) : this.state.display === "myEquips" ? (
              <MyEquips tracker={this.state.tracker} addEquip={this.addEquip} />
            ) : (
              <CPage />
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
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 45,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "1%",
    flexDirection: "row",
  },
});
