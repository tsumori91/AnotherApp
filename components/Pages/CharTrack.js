import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import MySwitch from "../Config/MySwitch";
import Storage from "../Config/Storage";
import CTrack from "../Modules/CTrack";
import MyTeam from "./MyTeam";
import * as firebase from "firebase";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default class CharTrack extends Component {
  state = {
    listEdit: false,
    switchOn: false,
    charactersTotal: [],
    myFreeCharacters: [],
    freeCharacters: [],
    myGachaCharacters: [],
    gachaCharacters: [],
    freeAsList: [],
    gachaAsList: [],
    loading: false,
  };
  componentDidMount() {
    this.getCharactersTotal();
    this.loadLists();
  }
  getCharactersTotal = () => {
    let charactersTotal = [...this.props.characters];
    charactersTotal = charactersTotal.filter((c) => c.name);
    charactersTotal = charactersTotal.filter((c) => c.name.indexOf("?") === -1);
    this.setState({ charactersTotal });
    this.getFreeCharacters(charactersTotal);
  };
  getFreeCharacters = async (charactersTotal) => {
    let freeList = [...this.props.freeList];
    let freeCharacters = charactersTotal.filter(
      (character) => freeList.indexOf(character.name) + 1
    );
    let freeAsList = freeCharacters.filter((character) => character.as);
    this.setState({ freeCharacters, freeAsList });
    this.getGachaCharacters(charactersTotal, freeCharacters);
  };
  getGachaCharacters = (charactersTotal, freeCharacters) => {
    let gachaCharacters = charactersTotal.filter((c) => {
      if (freeCharacters.findIndex((f) => f.name === c.name) + 1) {
        return false;
      } else return true;
    });
    let gachaAsList = gachaCharacters.filter((character) => character.as);
    gachaAsList = gachaAsList.filter(
      (character) => character.tomeNameAs.indexOf("?") == -1
    );
    this.setState({ gachaAsList });
    gachaCharacters = gachaCharacters.filter(
      (character) => character.score > 74
    );
    this.setState({ gachaCharacters });
  };
  selectFreeChar = async (name) => {
    let myFreeCharacters = [...this.state.myFreeCharacters];
    if (myFreeCharacters.indexOf(name) !== -1) {
      myFreeCharacters = myFreeCharacters.filter((c) => c !== name);
      this.setState({ myFreeCharacters });
    } else myFreeCharacters.push(name);
    this.setState({ myFreeCharacters });
    await Storage.setItem("myFreeChar", myFreeCharacters);
  };
  selectGachaChar = async (name) => {
    let myGachaCharacters = [...this.state.myGachaCharacters];
    if (myGachaCharacters.indexOf(name) !== -1) {
      myGachaCharacters = myGachaCharacters.filter((c) => c !== name);
      this.setState({ myGachaCharacters });
    } else myGachaCharacters.push(name);
    this.setState({ myGachaCharacters });
    await Storage.setItem("myGachaChar", myGachaCharacters);
    let freeList = [...this.props.freeList];
    await firebase.database().ref("freeList").set({ freeList });
  };
  loadLists = async () => {
    this.setState({ loading: true });
    let myFreeCharacters = await Storage.getItem("myFreeChar");
    let myGachaCharacters = await Storage.getItem("myGachaChar");
    if (myFreeCharacters !== null) {
      this.setState({ myFreeCharacters });
    }
    if (myGachaCharacters !== null) {
      this.setState({ myGachaCharacters });
    }
    this.setState({ loading: false });
  };
  handleReset = () => {
    Alert.alert(
      "Do you want to reset this page?",
      "You will loose all the saved information for both lists.",
      [{ text: "Yes", onPress: () => this.confirmReset() }, { text: "No" }],
      { cancelable: true }
    );
  };
  confirmReset = async () => {
    this.setState({ myFreeCharacters: [], myGachaCharacters: [] });
    await Storage.setItem("myFreeChar", []);
    await Storage.setItem("myGachaChar", []);
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
  handlePages = async () => {
    this.setState({ loading: true });
    this.setState({ listEdit: !this.state.listEdit });
    await delay(200);
    this.setState({ loading: false });
  };
  render() {
    return (
      <View>
        <Button
          title={this.state.listEdit ? "My Character List" : "Add characters"}
          onPress={() => {
            this.handlePages();
          }}
        />
        {this.state.loading ? (
          <ActivityIndicator size={"large"} color={"black"} />
        ) : !this.state.listEdit ? (
          <View>
            <MyTeam
              characters={this.state.charactersTotal}
              myFreeCharacters={this.state.myFreeCharacters}
              myGachaCharacters={this.state.myGachaCharacters}
              asFreeList={this.state.freeAsList}
              asGachaList={this.state.gachaAsList}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <MySwitch
                onPress={() => this.handleSwitch()}
                switchOn={this.state.switchOn}
              />
              <Text style={{ flex: 1, fontSize: 18, marginHorizontal: 8 }}>
                Multi-add
              </Text>
              <Button title={"Reset"} onPress={() => this.handleReset()} />
            </View>
            <ScrollView>
              <Text style={styles.heading}>
                Free Characters {this.state.myFreeCharacters.length}/
                {this.state.freeCharacters.length +
                  this.state.freeAsList.length}
              </Text>
              <View style={styles.main}>
                {this.state.freeCharacters.map(
                  (characters, i) => (
                    i++,
                    (
                      <View style={styles.eachChar} key={i}>
                        {characters.name !== "" ? (
                          <CTrack
                            easySelect={this.state.switchOn}
                            charList={this.state.myFreeCharacters}
                            onSelect={this.selectFreeChar}
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
                {this.state.freeAsList.map(
                  (characters, i) => (
                    i++,
                    (
                      <View style={styles.eachChar} key={i}>
                        {characters.name !== "" ? (
                          <CTrack
                            easySelect={this.state.switchOn}
                            charList={this.state.myFreeCharacters}
                            onSelect={this.selectFreeChar}
                            key={characters.id}
                            id={characters.id * 1000}
                            name={characters.name + " AS"}
                            skills={characters.skills}
                            weapon={characters.weapon}
                            shadow={characters.shadow}
                            element={characters.element}
                            vc={characters.vc}
                            vcAS={characters.vcAS}
                            uri={characters.uriAs}
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
              <Text style={styles.heading}>
                Gacha Characters {this.state.myGachaCharacters.length}/
                {this.state.gachaCharacters.length +
                  this.state.gachaAsList.length}
              </Text>
              <View style={styles.main}>
                {this.state.gachaCharacters.map(
                  (characters, i) => (
                    i++,
                    (
                      <View style={styles.eachChar} key={i}>
                        {characters.name !== "" ? (
                          <CTrack
                            easySelect={this.state.switchOn}
                            charList={this.state.myGachaCharacters}
                            onSelect={this.selectGachaChar}
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
                {this.state.gachaAsList.map(
                  (characters, i) => (
                    i++,
                    (
                      <View style={styles.eachChar} key={i}>
                        {characters.name !== "" ? (
                          <CTrack
                            easySelect={this.state.switchOn}
                            charList={this.state.myGachaCharacters}
                            onSelect={this.selectGachaChar}
                            key={characters.id}
                            id={characters.id * 1000}
                            name={characters.name + " AS"}
                            skills={characters.skills}
                            weapon={characters.weapon}
                            shadow={characters.shadow}
                            element={characters.element}
                            vc={characters.vc}
                            vcAS={characters.vcAS}
                            uri={characters.uriAs}
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
        )}
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
