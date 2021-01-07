import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Button,
} from "react-native";
import TrackEquip from "../Modules/TrackEquip";
import EquipsToDo from "./EquipsToDo";
export default class MyEquips extends Component {
  state = { dungeons: [], toDo: false };
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
    dungeons = dungeons.filter((n) => n !== null);
    let enhanceMats = tracker.map((t) => (t.enhance ? t.enhanceMats : null));
    let enhanceDungeons = enhanceMats.map((List) =>
      List ? List.map((d) => d.location.name) : null
    );
    let enhanceDungeons2 = enhanceMats.map((List) =>
      List ? List.map((d) => (d.location2 ? d.location2.name : null)) : null
    );
    let enhanceDungeons3 = enhanceMats.map((List) =>
      List ? List.map((d) => (d.location3 ? d.location3.name : null)) : null
    );
    let enhanceDungeons4 = enhanceMats.map((List) =>
      List ? List.map((d) => (d.location4 ? d.location4.name : null)) : null
    );
    enhanceDungeons = [
      ...new Set(
        enhanceDungeons
          .concat(enhanceDungeons2)
          .concat(enhanceDungeons3)
          .concat(enhanceDungeons4)
      ),
    ];
    enhanceDungeons = enhanceDungeons.flat().filter((n) => n !== null);
    dungeons = [
      ...new Set(
        dungeons.concat(dungeons2).concat(dungeons3).concat(enhanceDungeons)
      ),
    ];
    dungeons = dungeons.filter((n) => n !== null);
    this.setState({ dungeons });
  };
  findMats = (d) => {
    let tracker = [...this.props.tracker];
    let matList = [];
    tracker.map((t) => {
      if (t.plus < 0 || t.plus == null) {
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
      }
      if (t.enhanceMats)
        t.enhanceMats.forEach((enhance, index) => {
          if (index >= t.plus) {
            enhance.location.name == d
              ? matList.push(enhance.location.mats)
              : enhance.location2
              ? enhance.location2.name == d
                ? matList.push(enhance.location2.mats)
                : null
              : enhance.location3
              ? enhance.location3.name == d
                ? matList.push(enhance.location3.mats)
                : null
              : enhance.location4
              ? enhance.location4.name == d
                ? matList.push(enhance.location4.mats)
                : null
              : null;
          }
        });
    });
    matList = matList.flat();
    let cleanMatList = matList.flat().map((value) =>
      value
        .replace(/[0-9,(,)]/g, "")
        .replace(/Horror/g, "(Horror) ")
        .replace(/Sparkles/g, "(Sparkles) ")
        .replace(/Chest/g, "(Chests) ")
        .replace(/Shiny/g, "(Shiny) ")
        .replace(/Boss/g, "(Boss) ")
        .replace(/Area I/g, "(Area I) ")
        .replace(/Area I\) II/g, "Area III) ")
        .replace(/Area I\) I/g, "Area II) ")
        .replace(/Area I\) V/g, "Area IV) ")
        .replace(/Area I\) -III/g, "Area I-III) ")
        .replace(/Area I\) -II/g, "Area I -II) ")
        .replace(/Area II\) -III/g, "Area II -III) ")
    );
    let uniqueList = [...new Set(cleanMatList)];
    const plzWork = this.addValues(uniqueList, cleanMatList, matList);
    if (matList.length)
      return plzWork.map((mat, i) => {
        i++;
        return <Text key={i}>{mat}</Text>;
      });
    else return false;
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
  handlePlus = (id, value) => {
    let tracker = [...this.props.tracker];
    let index = tracker.findIndex((t) => t.idCraft === id);
    if (tracker[index].plus || tracker[index].plus == 0) {
      tracker[index].plus = tracker[index].plus + value;
    } else tracker[index].plus = 0;
    this.setState({ tracker });
    this.props.addEquip(tracker);
    this.updateDungeon();
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          title={
            this.state.toDo
              ? "Craftable 'To-Farm' List"
              : "Non-Craftable 'To-Get' List"
          }
          onPress={() => this.setState({ toDo: !this.state.toDo })}
        />
        {this.state.toDo ? (
          <EquipsToDo weapons={this.props.weapons} armor={this.props.armor} />
        ) : (
          <View style={styles.main}>
            {this.props.tracker.length ? (
              <View style={styles.main}>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={styles.scrollDungeons}
                >
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
                      if (this.findMats(d)) {
                        return (
                          <View key={i}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                              {"\n" + d}
                            </Text>
                            {this.findMats(d)}
                          </View>
                        );
                      }
                    })}
                  </View>
                  <View style={{ marginVertical: 100 }}></View>
                </ScrollView>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={styles.scrollItems}
                >
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
                        enhance={u.enhance}
                        enhanceMats={u.enhanceMats}
                        plus={u.plus || u.plus == 0 ? u.plus : -1}
                        idCraft={u.idCraft}
                        handlePlus={this.handlePlus}
                      />
                    );
                  })}
                  <View style={{ marginVertical: 100 }}></View>
                </ScrollView>
              </View>
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
                  You can add{" "}
                  <Text style={{ fontWeight: "bold" }}>craftable</Text> weapons
                  and armor to this list by{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    clicking and holding them{" "}
                  </Text>
                  in their respective tabs.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  main: { flex: 1 },
  scrollDungeons: { flex: 3 },
  scrollItems: { flex: 2 },
});
