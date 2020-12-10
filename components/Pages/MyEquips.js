import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Weapon from "../Modules/Equip";
import TrackEquip from "../Modules/TrackEquip";
export default class MyEquips extends Component {
  state = { dungeons: [] };
  componentDidMount() {
    this.updateDungeon();
  }
  handleDelete = (v) => {
    let tracker = [...this.props.tracker];
    tracker = tracker.filter((t) => t.name !== v);
    this.props.addEquip(tracker);
  };
  updateDungeon = () => {
    let tracker = [...this.props.tracker];
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.tracker.length ? (
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.dungeonList}>
              <Text style={{ fontWeight: "bold" }}>
                Dungeons you need to run:
              </Text>
              {this.state.dungeons.map((d, i) => {
                i++;
                return <Text key={i}>{"\n" + d}</Text>;
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
