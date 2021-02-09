import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import MFishing from "../Modules/MFishing";
import * as firebase from "firebase";

export default class Fishing extends Component {
  state = {
    fish: [],
    loading: false,
  };
  componentDidMount() {
    this.setPage();
  }
  setPage = () => {
    let fish = [...this.props.fish];
    this.setState({ fish });
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size={"large"} color={colors.black} />
        ) : (
        <ScrollView style={styles.container} nestedScrollEnabled={true}>
          <View style={{ flexDirection: "column-reverse" }}>
            {this.props.fish.map((f) => (
              <MFishing 
                name={f.name}
                rarity={f.rarity}
                tier={f.tier}
                reqLv={f.reqLv}
                hook={f.hook}
                location={f.location}
                uri={f.uri}
                />
            ))}
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
  },
});
