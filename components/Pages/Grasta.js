import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import colors from "../Config/colors";
import Egrasta from "../Modules/Egrasta";
import * as firebase from "firebase";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Grasta extends Component {
  state = {
    tab: "all",
    loading: true,
    grasta: {},
  };
  componentDidMount() {
    this.load();
  }
  setTab = async (tab) => {
    this.setState({ loading: true });
    await delay(5);
    this.setState({ tab });
    this.setState({ loading: false });
  };
  load = () => {
    this.setState({ grasta: this.props.grasta });
    this.setState({ loading: false });
  };
  add = async () => {
    let grasta = this.props.grasta;
    for (let i = 0; i < 8; i++) {
      grasta.life.push({
        effect: "Reserve HP Restore +100%",
        getHow:
          "Antiquity Garulea (Hard)\nZami Monster Femur merchant (50 Femurs)",
        name: "HP Recovery ()",
        stats: ["hp", "end"],
      });
    }
    await firebase.database().ref("grasta").set({ grasta });
  };
  render() {
    return (
      <View style={styles.container}>
        <Button title={"Press me"} onPress={() => this.add()} />
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.attack,
              this.state.tab == "all" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("all")}
          >
            <Text style={styles.title}>All</Text>
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.life,
              this.state.tab == "attack" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("attack")}
          >
            <Image
              source={require("../pics/AttackGrastaTab.png")}
              style={[
                styles.tabImage,
                this.state.tab == "attack" ? { opacity: 0.7 } : null,
              ]}
            />
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.life,
              this.state.tab == "life" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("life")}
          >
            <Image
              source={require("../pics/LifeGrastaTab.png")}
              style={[
                styles.tabImage,
                this.state.tab == "life" ? { opacity: 0.7 } : null,
              ]}
            />
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.support,
              this.state.tab == "support" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("support")}
          >
            <Image
              source={require("../pics/SupportGrastaTab.png")}
              style={[
                styles.tabImage,
                this.state.tab == "support" ? { opacity: 0.7 } : null,
              ]}
            />
          </TouchableOpacity>
          <View style={styles.space}></View>
          <TouchableOpacity
            style={[
              styles.tab,
              styles.special,
              this.state.tab == "special" ? styles.selected : null,
            ]}
            onPress={() => this.setTab("special")}
          >
            <Image
              source={require("../pics/SpecialGrastaTab.png")}
              style={[
                styles.tabImage,
                this.state.tab == "special" ? { opacity: 0.7 } : null,
              ]}
            />
          </TouchableOpacity>
        </View>
        {this.state.loading ? (
          <ActivityIndicator color={"black"} size={"large"} />
        ) : this.state.grasta !== {} ? (
          <ScrollView style={[styles.listContainer]}>
            {this.state.tab == "attack" || this.state.tab == "all"
              ? this.props.grasta.attack.map((grasta, i) => {
                  i++;
                  return (
                    <Egrasta
                      key={i}
                      stats={grasta.stats}
                      effect={grasta.effect}
                      getHow={grasta.getHow}
                      name={grasta.name}
                      type={"attack"}
                    />
                  );
                })
              : null}
            {this.state.tab == "life" || this.state.tab == "all"
              ? this.state.grasta.life.map((grasta, i) => {
                  i++;
                  return (
                    <Egrasta
                      key={i}
                      stats={grasta.stats}
                      effect={grasta.effect}
                      getHow={grasta.getHow}
                      name={grasta.name}
                      type={"life"}
                    />
                  );
                })
              : null}
            {this.state.tab == "support" || this.state.tab == "all"
              ? this.state.grasta.support.map((grasta, i) => {
                  i++;
                  return (
                    <Egrasta
                      key={i}
                      stats={grasta.stats}
                      effect={grasta.effect}
                      getHow={grasta.getHow}
                      name={grasta.name}
                      type={"support"}
                    />
                  );
                })
              : null}
            {this.state.tab == "special" || this.state.tab == "all"
              ? this.state.grasta.special.map((grasta, i) => {
                  i++;
                  return (
                    <Egrasta
                      key={i}
                      stats={grasta.stats}
                      effect={grasta.effect}
                      getHow={grasta.getHow}
                      name={grasta.name}
                      type={"special"}
                    />
                  );
                })
              : null}
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: {
    flex: 1,
    backgroundColor: "rgba(232,227,227, .8)",
    paddingTop: 10,
    marginHorizontal: 1,
  },
  selected: {
    borderBottomWidth: 0,
    elevation: 0,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "rgba(232,227,227, .8)",
  },
  space: { flex: 1, borderBottomWidth: 2, borderColor: colors.earth },
  tab: {
    flex: 2,
    borderWidth: 2,
    borderColor: colors.earth,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    alignItems: "center",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "rgb(232,227,227)",
    elevation: 2, // Android
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  tabImage: { height: 23, width: 23, resizeMode: "contain" },
  tabs: {
    flexDirection: "row",
    width: "100%",
  },
  title: { fontSize: 22 },
});
