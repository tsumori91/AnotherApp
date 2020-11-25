import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import Equip from "../Modules/Equip";

export default class ToDo extends Component {
  render() {
    return (
      <View>
        {this.props.weapons === [{}] ? (
          <View>
            <View style={styles.row}>
              <View style={styles.name}>
                <Text>Name</Text>
              </View>
              <View style={styles.stats}>
                <Text>Stats</Text>
              </View>
              <View style={styles.effect}>
                <Text>Effect (max)</Text>
              </View>
            </View>
            <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
              {this.props.weapons.map((u, i) => {
                i++;
              })}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              To add weapons/armor to your to do list:
            </Text>
            <Text style={{ fontSize: 17 }}>
              Find them in their respective tabs and
            </Text>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              Click+hold them to add
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
