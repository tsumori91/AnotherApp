import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Button,
} from "react-native";
import MFishing from "../Modules/MFishing";
import * as firebase from "firebase";
import getRankings from "../APICalls/GetRankings";
import colors from "../Config/colors";
import getCharacters from "../APICalls/GetCharacters";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Fishing extends Component {
  state = {
    fish: [],
    loading: false,
    tierList: [],
    charactersRead: [],
  };
  componentDidMount() {
    this.setPage();
  }

  updateCharacters = async () => {};
  updateRankings = async () => {
    let oldCharacters = [...this.props.characters];
    let rankings = this.state.tierList;
    oldCharacters.forEach((character) => {
      rankings.filter((item) => {
        if (item.name === character.name) {
          character.score = item.ranking;
        }
      });
    });
    const characters = oldCharacters;
    //await firebase.database().ref("characters").set({ characters });
  };
  setPage = async () => {
    this.setState({ loading: true });
    let fish = [...this.props.fish];
    let tierList = await getRankings();
    await getCharacters();
    this.setState({ tierList });
    this.setState({ fish });
    this.setState({ loading: false });
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size={"large"} color={colors.black} />
        ) : (
          <ScrollView style={styles.container} nestedScrollEnabled={true}>
            <View style={{ flexDirection: "column-reverse" }}>
              <Button
                title="Update Rankings"
                onPress={() => this.updateRankings()}
              />
              <Button
                title="Update Characters"
                onPress={() => this.updateCharacters()}
              />
              {/*this.props.fish.map((f) => (
                <MFishing
                  name={f.name}
                  rarity={f.rarity}
                  tier={f.tier}
                  reqLv={f.reqLv}
                  hook={f.hook}
                  location={f.location}
                  uri={f.uri}
                />
              ))*/}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "95%",
    flex: 1,
    height: Dimensions.get("window").height - 150,
  },
});
