import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import Storage from "../Config/Storage";
import EIDA3 from "../Modules/EIDA3";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default class IDA3 extends Component {
  state = {
    characters: [
      {
        name: "Hismena",
        getHow: "IDA3 Chapter 2",
        location: "N/A",
        floor: 3,
        rank3: 10,
      },
      {
        name: "Operator",
        getHow: "IDA3 Chapter 2",
        location: "IDEA Operations Room",
        floor: 3,
        rank3: 20,
      },
      {
        name: "Saki",
        getHow: "IDA3 Chapter 3",
        location: "N/A",
        floor: 2,
        rank3: 5,
      },
      {
        name: "Isuka",
        getHow: "IDA3 Chapter 3",
        location: "N/A",
        floor: 3,
        rank3: 10,
      },
      {
        name: "Claude",
        getHow: "IDA3 Chapter 3",
        location: "N/A",
        floor: 1,
        rank3: 1,
      },
      {
        name: "Ruina",
        getHow: "From Gacha then talk to her in Aldo's Room",
        location: "Aldo's Room",
        floor: 2,
        rank3: 5,
      },
      {
        name: "Sevyn",
        getHow: "From Gacha then talk to him in Aldo's Room",
        location: "Aldo's Room",
        floor: 3,
        rank3: 10,
      },
      {
        name: "Foran",
        getHow: "From Gacha then talk to her in Aldo's Room",
        location: "Aldo's Room",
        floor: 3,
        rank3: 10,
      },
      {
        name: "Mighty",
        getHow: "From Gacha then talk to him in Aldo's Room",
        location: "Aldo's Room",
        floor: 1,
        rank3: 1,
      },
      {
        name: "Cerrine",
        getHow:
          "Complete her chance encounter fights, then talk to her in Aldo's Room",
        location: "Aldo's Room",
        floor: 2,
        rank3: 5,
      },
      {
        name: "Pom",
        getHow:
          "From Gacha then Obtain Strange Delivery Note and Scarlet Membership Card and show it to the hooded people and finally talk to her in Aldo's Room",
        location: "Aldo's Room",
        floor: 1,
        rank3: 1,
      },
      {
        name: "Jade",
        getHow:
          "After raising Saki to freind Rank 3 talk to him in Aldo's Room",
        location: "Aldo's Room",
        floor: 2,
        rank3: 5,
      },
      {
        name: "Yuriline",
        getHow:
          "Get the 'Yurilin's Secret' Award, initiate this quest by talking to the old man on the right side of Garden IDA (only available after enering the Clock Tower Lounge) ",
        location: "Garden of IDA",
        floor: 1,
        rank3: 5,
      },
      {
        name: "Comedy Boy",
        getHow:
          "Get the 'Comedy Explosion' Award, recieved by collecting the magazines found around IDA and giving them to the boy in the Garden",
        location: "Garden of IDA",
        floor: 2,
        rank3: 10,
      },
      {
        name: "Hide 'n' Seek Boy",
        getHow:
          "Get the 'Hide'n'Seek Master', initiated by talking to the boy on 2nd floor of IDA school",
        location: "Port Bazaar",
        floor: 2,
        rank3: 10,
      },
      {
        name: "Miko",
        getHow:
          "Find Miko's true Form (in H block IDA school)by: \n2F Talk to the boys at the far left\n1F Talk to a girl student in white clothes by the weapon shopSchool \n2F Talk to the Android at the far rightSchool \n3F Talk to a male teacher at the far left\n2F Talk to a male student (client)",
        location: "IDA School H Block 3F",
        floor: 2,
        rank3: 10,
      },
      {
        name: "Occult Writer",
        getHow: "Complete IDA3 Chapter 2",
        location: "IDA School H Block 3F",
        floor: 1,
        rank3: 5,
      },
      {
        name: "Hungry professor",
        getHow: "Talk to them",
        location: "Port Bazaar",
        floor: 2,
        rank3: 10,
      },
      {
        name: "ACC Member",
        getHow: "Talk to them",
        location: "Port Bazaar",
        floor: 3,
        rank3: 20,
      },
      {
        name: "Explosive Boy",
        getHow: "Complete IDA3 Chapter 4",
        location: "Port Lenoza Entrance",
        floor: 2,
        rank3: 5,
      },
      {
        name: "Saki's Friend",
        getHow: "Complete IDA3 Chapter 4",
        location: "Port Lezona Entrance",
        floor: 2,
        rank3: 10,
      },
      {
        name: "New Professor",
        getHow: "Complete IDA3 Chapter 4",
        location: "IDA School H Block Entrance",
        floor: 1,
        rank3: 10,
      },
      {
        name: "Admirer",
        getHow: "Complete IDA3 Chapter 4",
        location: "IDEA Operations Room",
        floor: 2,
        rank3: 10,
      },
      {
        name: "Glasses",
        getHow: "Complete IDA3 Chapter 4",
        location: "IDEA Operations Room",
        floor: 3,
        rank3: 20,
      },
      {
        name: "Lord Sharkington",
        getHow:
          "Complete IDA3 Chapter 4 and get the 'Best Friends with Lord Sharkington' Award",
        location: "IDA School H Block 1F",
        floor: 1,
        rank3: 5,
      },
      {
        name: "Lord Crocodile",
        getHow: "Recruit Lord Sharkington",
        location: "City Entrance",
        floor: 3,
        rank3: 5,
      },
      {
        name: "MEGA Shark",
        getHow:
          "Complete 'The Imperial Invader' quest and obtain all Star-mark Scraps",
        location: "Garden of IDA",
        floor: 3,
        rank3: 20,
      },
      {
        name: "Mayu",
        getHow: "Complete IDA3 Chapter 3",
        location: "IDA School H Block 1F Infirmary",
        floor: 1,
        rank3: 10,
      },
      {
        name: "Ms. Fukahire",
        getHow: "Find/report 30 bugs",
        location: "Dorm. 4F",
        floor: 1,
        rank3: 20,
      },
    ],
  };
  componentDidMount() {
    this.load();
  }
  onDone = (name) => {
    let characters = this.state.characters;
    characters.forEach((character) => {
      if (character.name == name) {
        if (character.done) {
          character.done = false;
        } else character.done = true;
      }
    });
    this.setState({ characters });
    this.save();
  };
  onStart = (name) => {
    let characters = this.state.characters;
    characters.forEach((character) => {
      if (character.name == name) {
        character.done = false;
        character.inProgress = true;
        character.points = 0;
      }
    });
    this.setState({ characters });
    this.save();
  };
  onReset = (name) => {
    let characters = this.state.characters;
    characters.forEach((character) => {
      if (character.name == name) {
        character.done = false;
        character.inProgress = false;
        character.points = 0;
      }
    });
    this.setState({ characters });
    this.save();
  };
  onProgress = (name, value) => {
    let characters = this.state.characters;
    characters.forEach((character) => {
      if (character.name == name) {
        character.points = character.points ? character.points + value : value;
        if (character.points !== character.rank3) {
          character.inProgress = true;
        } else character.inProgress = false;
      }
    });
    this.setState({ characters });
    this.save();
  };
  load = async () => {
    let characters = await Storage.getItem("IDA3characters");
    if (characters === null) characters = [...this.state.characters];
    characters.forEach(
      (character) =>
        (character.pointsLeft = character.done
          ? 99
          : character.points
          ? character.rank3 - character.points
          : character.rank3)
    );
    characters.sort(
      (a, b) => parseFloat(a.pointsLeft) - parseFloat(b.pointsLeft)
    );
    if (characters !== null) {
      this.setState({ characters });
    }
  };
  save = async () => {
    await delay(10);
    let characters = this.state.characters;
    Storage.setItem("IDA3characters", characters);
  };
  render() {
    let done = this.state.characters.filter((character) => character.done)
      .length;
    return (
      <View>
        <View style={styles.topHalf}>
          {done < 25 ? (
            <Text>
              <Text style={styles.done}>
                You need{" "}
                <Text style={{ fontWeight: "bold" }}>{25 - done} </Text>
                more characters to hit max rewards.
              </Text>
              {
                "\nIf possible, prioritize the characters at the top of the list (updates when you reload this page)"
              }
            </Text>
          ) : (
            <Text style={styles.done}>
              You're finished! This page is now useless. ({done}/29)
            </Text>
          )}
        </View>
        <ScrollView>
          {this.state.characters.map(
            (character, i) => (
              i++,
              (
                <View key={i}>
                  <EIDA3
                    name={character.name}
                    getHow={character.getHow}
                    location={character.location}
                    floor={character.floor}
                    rank3={character.rank3}
                    done={character.done}
                    inProgress={character.inProgress}
                    points={character.points}
                    onDone={this.onDone}
                    onProgress={this.onProgress}
                    onReset={this.onReset}
                    onStart={this.onStart}
                  />
                </View>
              )
            )
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  done: { fontSize: 24, padding: 5 },
  topHalf: {
    height: 100,
    margin: 10,
  },
});
