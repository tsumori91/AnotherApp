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
  componentDidMount() {
    this.handleGetBanners();
  }
  handleGetBanners = () => {
    firebase
      .database()
      .ref("banners")
      .once("value", (snapshot) =>
        this.setState({
          banners: snapshot.val().banners,
        })
      );
    firebase
      .database()
      .ref("characters")
      .once("value", (snapshot) =>
        this.setState({
          characters: snapshot.val().characters,
        })
      );
  };
  handleNewBanner = async () => {
    let banners = [...this.state.banners];
    banners.push(banners[banners.length - 1]);
    this.setState({ banners });
    await firebase.database().ref("banners").set({ banners });
  };
  render() {
    return (
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        {/*<Tab title={"new banner"} onPress={() => this.handleNewBanner()} />*/}
        <View style={{ flexDirection: "column-reverse" }}>
          {this.state.banners.map((b) => (
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
