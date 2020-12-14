import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import colors from "../Config/colors";
import Banner from "../Modules/Banner";
import * as firebase from "firebase";
import Tab from "../Modules/Tab";

export default class Puller extends Component {
  state = {
    banners: [],
    characters: [],
  };
  handleNewBanner = async () => {
    let banners = [...this.props.banners];
    banners.push(banners[banners.length - 1]);
    await firebase.database().ref("banners").set({ banners });
  };
  render() {
    return (
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        {/*<Tab title={"new banner"} onPress={() => this.handleNewBanner()} />*/}
        <View style={{ flexDirection: "column-reverse" }}>
          {this.props.banners.map((b) => (
            <Banner
              rates={b.rates}
              key={b.key}
              charactersAs={b.charactersAs}
              charactersFive={b.charactersFive}
              AsRates={b.AsRates}
              bannerCharacters={b.bannerCharacters}
              bannerFiveRates={b.bannerFiveRates}
              bannerFourFRates={b.bannerFourFRates}
              bannerImage={b.bannerImage}
              characters={this.state.characters}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "95%",
    flex: 1,
  },
});
