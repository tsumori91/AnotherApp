import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import Banner from "../Modules/Banner";
import * as firebase from "firebase";

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
              characters={this.props.characters}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height - 150,
    marginTop: 40,
    width: "95%",
    flex: 1,
  },
});
