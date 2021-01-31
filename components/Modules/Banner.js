import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import colors from "../Config/colors";
import Tab from "../SubModules/Tab";

export default class Banner extends Component {
  state = {
    units: [""],
    totalPulls: 0,
    pullButton: { uri: "../pics/PullButton.png" },
    unitsPulled: [],
  };
  handlePull = () => {
    let ratesTotal = this.getRates();
    let units = [...this.state.units];
    let unitsGetting = this.getRarity(ratesTotal);
    let unitsPulled = [...this.state.unitsPulled];
    this.getFourFs(unitsGetting, unitsPulled);
    this.getFives(unitsGetting, unitsPulled);
    units = units.concat(unitsGetting);
    this.setState({ units, unitsPulled });
    this.setState({ totalPulls: this.state.totalPulls + 1 });
  };
  getFives(unitsGetting, unitsPulled) {
    unitsGetting
      .filter((u) => u == "5*")
      .forEach(() => {
        let bannerChance =
          this.props.bannerFiveRates.reduce(
            (partial_sum, a) => partial_sum + a,
            0
          ) -
          (this.props.rates[4] * this.props.bannerCharacters.length) /
            (this.props.charactersFive.length / (this.props.rates[4] / 100));
        let AsChance = this.props.AsRates * this.props.charactersAs.length;
        let rng = null;
        if (Math.random() * this.props.rates[4] < bannerChance) {
          rng = Math.floor(Math.random() * this.props.bannerCharacters.length);
          unitsPulled.push(this.props.bannerCharacters[rng] + "5*");
        } else if (Math.random() < AsChance) {
          rng = Math.floor(Math.random() * this.props.charactersAs.length);
          unitsPulled.push(this.props.charactersAs[rng] + "5*");
        } else {
          rng = Math.floor(Math.random() * this.props.charactersFive.length);
          unitsPulled.push(this.props.charactersFive[rng] + "5*");
        }
      });
  }

  getFourFs(unitsGetting, unitsPulled) {
    unitsGetting
      .filter((u) => u == "4.5*")
      .forEach(() => {
        let bannerChance =
          this.props.bannerFourFRates.reduce(
            (partial_sum, a) => partial_sum + a,
            0
          ) -
          (this.props.rates[3] * this.props.bannerCharacters.length) /
            (this.props.charactersFive.length / (this.props.rates[3] / 100));
        let rng = null;
        if (Math.random() * this.props.rates[3] < bannerChance) {
          rng = Math.floor(Math.random() * this.props.bannerCharacters.length);
          if (this.props.bannerCharacters[rng].includes("(AS)")) {
            let char = this.props.bannerCharacters[rng];
            char = char.slice(0, -4);
            unitsPulled.push(char + "4*");
          } else unitsPulled.push(this.props.bannerCharacters[rng] + "4*");
        } else {
          rng = Math.floor(Math.random() * this.props.charactersFive.length);
          unitsPulled.push(this.props.charactersFive[rng] + "4*");
        }
      });
  }

  getRates() {
    let rates = [...this.props.rates];
    let ratesTotal = [
      rates[0],
      rates[0] + rates[1],
      rates[0] + rates[1] + rates[2],
      rates[0] + rates[1] + rates[2] + rates[3],
      rates[0] + rates[1] + rates[2] + rates[3] + rates[4],
      rates[5],
      rates[5] + rates[6],
      rates[5] + rates[6] + rates[7],
    ];
    return ratesTotal;
  }

  getRarity(ratesTotal) {
    let unitsGetting = [""];
    for (let i = 1; i <= 9; i++) {
      let result = Math.floor(Math.random() * 10001) / 100;
      if (result <= ratesTotal[0]) unitsGetting.push("3*");
      else if (result <= ratesTotal[1]) unitsGetting.push("3.5*");
      else if (result <= ratesTotal[2]) unitsGetting.push("4*");
      else if (result <= ratesTotal[3]) unitsGetting.push("4.5*");
      else if (result <= ratesTotal[4]) unitsGetting.push("5*");
    }
    let result = Math.floor(Math.random() * 10001) / 100;
    if (result <= ratesTotal[5]) unitsGetting.push("4*");
    else if (result <= ratesTotal[6]) unitsGetting.push("4.5*");
    else if (result <= ratesTotal[7]) unitsGetting.push("5*");
    return unitsGetting;
  }
  background = (u) => {
    const fives = [u].filter((name) => name.includes("5*"));
    if (fives[0]) {
      return styles.fiveBackground;
    } else return styles.fourBackground;
  };
  getPic = (n) => {
    let characters = this.props.characters;
    if (n.includes("(AS)")) {
      n = n.slice(0, -4);
      let thisChar = characters.filter((name) => name.name === n);
      if (thisChar[0]) {
        return thisChar[0].uriAs;
      }
    }
    let thisChar = characters.filter((name) => name.name === n);
    if (thisChar[0]) {
      return thisChar[0].uri;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.banner}
          imageStyle={{ borderRadius: 10 }}
          source={this.props.bannerImage}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => this.handlePull()}>
              <Image
                style={styles.pullButton}
                source={require("../pics/PullButton.png")}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {this.state.totalPulls !== 0 ? (
          <View>
            <Tab
              style={styles.button}
              title={"Reset"}
              color={"grey"}
              onPress={() =>
                this.setState({
                  units: [],
                  totalPulls: 0,
                  unitsPulled: [],
                })
              }
            />
            <View style={styles.resultsTotal}>
              <View style={styles.resultsBackground}>
                <Text>Total pulls: {this.state.totalPulls * 10}</Text>
                <Text>
                  Total 4.5*:
                  {this.state.units.filter((u) => u == "4.5*").length}
                </Text>
                <Text>
                  Total 5*: {this.state.units.filter((u) => u == "5*").length}
                </Text>
              </View>
              <View style={styles.results}>
                <Text>Units Pulled:</Text>
                {this.state.unitsPulled.map((u, i) => {
                  i++;
                  const n = u.slice(0, -2);
                  return (
                    <View key={i} style={styles.pull}>
                      <Image
                        style={styles.cPic}
                        source={{
                          uri: this.getPic(n),
                        }}
                      />
                      <Text key={i} style={this.background(u)}>
                        {u}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  banner: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    resizeMode: "cover",
    height: 200,
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  container: {
    minWidth: "99%",
    marginBottom: 40,
  },
  cPic: {
    height: 70,
    width: 70,
  },
  fiveBackground: {
    backgroundColor: colors.gold,
    marginHorizontal: 2,
  },
  fourBackground: {
    marginHorizontal: 2,
  },
  pull: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  pullButton: {
    width: 80,
    height: 30,
  },
  results: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  resultsBackground: {
    backgroundColor: colors.wind,
    marginRight: 1,
    marginBottom: 5,
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  resultsTotal: {
    borderRadius: 5,
    borderWidth: 1,
    paddingBottom: 5,
  },
});
