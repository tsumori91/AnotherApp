import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import CPage from "./components/Pages/Characters";
import Puller from "./components/Pages/Puller";
import * as firebase from "firebase";
import ApiKeys from "./components/Config/ApiKeys";
import Tab from "./components/Modules/Tab";
import Weapons from "./components/Pages/Weapons";
import Armors from "./components/Pages/Armors";
import ToDo from "./components/Pages/ToDo";
import colors from "./components/Config/colors";

if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.firebaseConfig);
}

export default class AnotherApp extends Component {
  state = {
    display: "characters",
    weapons: [{}],
    loading: true,
  };
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }));
  }
  handlePages = (v) => {
    this.setState({ loading: true });
    this.setState({ display: v });
    setTimeout(() => this.setState({ loading: false }));
  };
  getWeapons = () => {
    firebase
      .database()
      .ref("weapons")
      .on("value", (snapshot) =>
        this.setState({
          weapons: snapshot.val().weapons,
        })
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Tab
            title={"Characters"}
            color={this.state.display === "characters" ? "gold" : "primary"}
            onPress={() => this.handlePages("characters")}
            style={styles.button}
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
            title={"Puller"}
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
              <Weapons />
            ) : this.state.display === "puller" ? (
              <Puller />
            ) : this.state.display === "armor" ? (
              <Armors />
            ) : this.state.display === "toDo" ? (
              <ToDo weapons={this.state.weapons} />
            ) : (
              <CPage />
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: "0.5%",
    flex: 1,
  },
  button: {
    borderRadius: 0,
    borderColor: colors.white,
    borderWidth: 1,
    flexGrow: 1,
  },
  buttons: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 45,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "1%",
    flexDirection: "row",
  },
});
