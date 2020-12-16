import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import MySwitch from "../Config/MySwitch";
import CTrack from "../Modules/CTrack";
export default class CharTrack extends Component {
  state = {
    switchOn: false,
    charactersTotal: [],
    myFreeCharacters: [],
    freeCharacters: [],
    myGachaCharacters: [],
    gachaCharacters: [],
    freeList: [
      "Aldo",
      "Riica",
      "Cyrus",
      "Amy",
      "Helena",
      "Guildna",
      "Altena",
      "Jade",
      "Saki",
      "Mana",
      "Joker",
      "Morgana",
      "Violet",
      "Skull",
      "Clarte",
      "Sophia",
      "Cress",
      "Yuri",
      "Velvet",
      "Milla",
      "Deirdre",
      "Levia",
    ],
  };
  componentDidMount() {
    this.getCharactersTotal();
  }
  getCharactersTotal = () => {
    let charactersTotal = [...this.props.characters];
    charactersTotal = charactersTotal.filter((c) => c.name);
    charactersTotal = charactersTotal.filter((c) => c.name.indexOf("?") === -1);
    this.setState({ charactersTotal });
    this.getFreeCharacters(charactersTotal);
  };
  getFreeCharacters = (charactersTotal) => {
    let freeList = [...this.state.freeList];
    let freeCharacters = charactersTotal.filter(
      (character) => freeList.indexOf(character.name) + 1
    );
    this.setState({ freeCharacters });
    this.getGachaCharacters(charactersTotal, freeCharacters);
  };
  getGachaCharacters = (charactersTotal, freeCharacters) => {
    let gachaCharacters = charactersTotal.filter((c) => {
      if (freeCharacters.findIndex((f) => f.name === c.name) + 1) {
        return false;
      } else return true;
    });
    this.setState({ gachaCharacters });
  };
  handleSwitch = () => {
    if (!this.state.switchOn) {
      Alert.alert(
        "Do you want to turn on multi-add?",
        "With multi-add you can select the characters, rather than pressing and holding to add, and it will add them without conformation.",
        [
          {
            text: "Yes",
            onPress: () => this.setState({ switchOn: !this.state.switchOn }),
          },
          { text: "No" },
        ],
        { cancelable: true }
      );
    } else this.setState({ switchOn: !this.state.switchOn });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text style={{ flex: 1 }}>
            Turn on to add multiple characters without confirmation
          </Text>
          <MySwitch
            onPress={() => this.handleSwitch()}
            switchOn={this.state.switchOn}
          />
        </View>
        <ScrollView>
          <Text style={styles.heading}>Free Characters</Text>
          <View style={styles.main}>
            {this.state.freeCharacters.map(
              (characters, i) => (
                i++,
                (
                  <View style={styles.eachChar} key={i}>
                    {characters.name !== "" ? (
                      <CTrack
                        key={characters.id}
                        id={characters.id}
                        name={characters.name}
                        skills={characters.skills}
                        weapon={characters.weapon}
                        shadow={characters.shadow}
                        element={characters.element}
                        vc={characters.vc}
                        vcAS={characters.vcAS}
                        uri={characters.uri}
                        tomeName={characters.tomeName}
                        tomeNameAs={characters.tomeNameAs}
                        tomeLocation={characters.tomeLocation}
                        tomeLocationAs={characters.tomeLocationAs}
                        as={characters.as}
                        stats={characters.stats}
                        statsAs={characters.statsAs}
                        uriAs={characters.uriAs}
                        manifest={characters.manifest}
                        manifestAs={characters.manifestAs}
                        LStats={characters.LStats}
                        vcStats={characters.vcStats}
                        vcStatsAs={characters.vcStatsAs}
                        poison={characters.poison}
                        pain={characters.pain}
                        score={characters.score}
                        scoreAs={characters.scoreAs}
                      />
                    ) : null}
                  </View>
                )
              )
            )}
          </View>
          <Text style={styles.heading}>Gacha Characters</Text>
          <View style={styles.main}>
            {this.state.gachaCharacters.map(
              (characters, i) => (
                i++,
                (
                  <View style={styles.eachChar} key={i}>
                    {characters.name !== "" ? (
                      <CTrack
                        key={characters.id}
                        id={characters.id}
                        name={characters.name}
                        skills={characters.skills}
                        weapon={characters.weapon}
                        shadow={characters.shadow}
                        element={characters.element}
                        vc={characters.vc}
                        vcAS={characters.vcAS}
                        uri={characters.uri}
                        tomeName={characters.tomeName}
                        tomeNameAs={characters.tomeNameAs}
                        tomeLocation={characters.tomeLocation}
                        tomeLocationAs={characters.tomeLocationAs}
                        as={characters.as}
                        stats={characters.stats}
                        statsAs={characters.statsAs}
                        uriAs={characters.uriAs}
                        manifest={characters.manifest}
                        manifestAs={characters.manifestAs}
                        LStats={characters.LStats}
                        vcStats={characters.vcStats}
                        vcStatsAs={characters.vcStatsAs}
                        poison={characters.poison}
                        pain={characters.pain}
                        score={characters.score}
                        scoreAs={characters.scoreAs}
                      />
                    ) : null}
                  </View>
                )
              )
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
  },
  heading: { fontWeight: "bold", fontSize: 35 },
  main: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  eachChar: { width: "22.5%", paddingBottom: 10 },
});
