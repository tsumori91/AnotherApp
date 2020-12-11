import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import Weapon from "../Modules/Equip";
import TrackEquip from "../Modules/TrackEquip";
export default class MyEquips extends Component {
  state = { dungeons: [] };
  componentDidMount() {
    this.updateDungeon();
  }
  handleDelete = (v) => {
    let tracker = [...this.props.tracker];
    let index = tracker.findIndex((t) => t.name === v);
    if (index >= 0) {
      tracker.splice(index, 1);
    }
    Alert.alert(
      "Removing item from craft list.",
      "Do you want to remove " + v + " from your list?",
      [
        {
          text: "No",
          onPress: () => {
            return;
          },
        },
        {
          text: "Yes",
          onPress: () => {
            this.props.addEquip(tracker);
            this.updateDungeon();
          },
        },
      ],
      { cancelable: true }
    );
  };
  updateDungeon = () => {
    let tracker = [...this.props.tracker];
    let dungeons = tracker.map((t) => t.materialsLocation);
    let dungeons2 = tracker.map((t) =>
      t.materialsLocation2 ? t.materialsLocation2 : null
    );
    let dungeons3 = tracker.map((t) =>
      t.materialsLocation3 ? t.materialsLocation3 : null
    );
    dungeons = [...new Set(dungeons.concat(dungeons2).concat(dungeons3))];
    dungeons = dungeons.filter((n) => n !== null);
    this.setState({ dungeons });
  };
  findMats = (d) => {
    let tracker = [...this.props.tracker];
    tracker = tracker.filter(
      (t) =>
        t.materialsLocation === d ||
        t.materialsLocation2 === d ||
        t.materialsLocation3 === d
    );
    let matList = [];
    tracker.map((t) => {
      t.materialsLocation === d ? matList.push(t.materials[0]) : null;
      t.materialsLocation === d && !t.materialsLocation3
        ? matList.push(t.materials[1])
        : null;
      t.materialsLocation === d && !t.materialsLocation2
        ? matList.push(t.materials[2])
        : null;
      t.materialsLocation2 === d
        ? t.materialsLocation3
          ? matList.push(t.materials[1])
          : matList.push(t.materials[2])
        : null;
      t.materialsLocation3 === d ? matList.push(t.materials[2]) : null;
    });
    let cleanMatList = matList.map((value) =>
      value
        .replace(/[0-9,(,)]/g, "")
        .replace(/Horror/g, "(Horror)")
        .replace(/Sparkles/g, "(Sparkles)")
        .replace(/Chest/g, "(Chests)")
    );
    let uniqueList = [...new Set(cleanMatList)];
    const plzWork = this.addValues(uniqueList, cleanMatList, matList);
    return plzWork.map((mat, i) => {
      i++;
      return <Text key={i}>{mat}</Text>;
    });
  };
  addValues = (uniqueList, cleanMatList, matList) => {
    let finishedList = [];
    uniqueList.forEach((element) => {
      let indices = [];
      cleanMatList.forEach((a, i) => {
        if (a === element) indices.push(i);
      });
      let itemNumber = 0;
      indices.forEach(
        (index) => (itemNumber += Number(matList[index].replace(/[^0-9]/g, "")))
      );
      finishedList.push(element + itemNumber);
    });
    return finishedList;
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.tracker.length ? (
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.dungeonList}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  flex: 1,
                  alignSelf: "center",
                }}
              >
                Dungeons to run or places to go:
              </Text>
              {this.state.dungeons.map((d, i) => {
                i++;
                return (
                  <View key={i}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {"\n" + d}
                    </Text>
                    {this.findMats(d)}
                  </View>
                );
              })}
            </View>
            {this.props.tracker.map((u, i) => {
              i++;
              return (
                <TrackEquip
                  key={i}
                  id={i}
                  name={u.name}
                  stats={u.stats}
                  effects={u.effects}
                  materials={u.materials}
                  materialsLocation={u.materialsLocation}
                  materialsLocation2={u.materialsLocation2}
                  materialsLocation3={u.materialsLocation3}
                  uri={u.uri}
                  type={u.type}
                  onAdd={this.handleDelete}
                />
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              flex: 1,
              marginBottom: 50,
            }}
          >
            <Text style={{ fontSize: 20 }}>
              You can add <Text style={{ fontWeight: "bold" }}>craftable</Text>{" "}
              weapons and armor to this list by{" "}
              <Text style={{ fontWeight: "bold" }}>
                clicking and holding them{" "}
              </Text>
              in their respective tabs.
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
});
