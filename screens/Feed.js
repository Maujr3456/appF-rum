import React, { Component } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import firebase from "firebase";
import ArticleCard from "./ArticleCard";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      articles: [],
    };
  }
  componentDidMount() {
    this.LoadFont();
    this.fetchArticle();
  }
  async LoadFont() {
    await Font.loadAsync(
      "Assassins",
      require("../assets/assassin/Assassin$.ttf")
    );
    this.setState({
      fontLoaded: true,
    });
  }

  fetchArticle = () => {
    firebase
      .database()
      .ref("/articles/")
      .on(
        "value",
        (snapshot) => {
          let articles = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              articles.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ articles: articles });
          this.props.setUpdateToFalse();
          console.log("tudo certo");
        },
        function (errorObject) {
          console.log("A leitura falhou: " + errorObject.code);
        }
      );
  };

  renderItem = ({ item: article }) => {
    return <ArticleCard article={article} navigation={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    if (this.state.fontLoaded) {
      SplashScreen.hideAsync();
      return (
        <ImageBackground
          source={require("../assets/background.jpg")}
          style={Styles.fundo}
        >
          <View style={Styles.titleContainer}>
            <Text style={Styles.titleTextContainer}>Forum dos AssassinoS</Text>
          </View>
          {!this.state.articles[0] ? (
            <View style={Styles.noStories}>
              <Text
                style={
                  this.state.light_theme
                    ? Styles.noStoriesTextLight
                    : Styles.noStoriesText
                }
              >
                Ainda não há postagens :(
              </Text>
            </View>
          ) : (
            <View style={Styles.cardContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.articles}
                renderItem={this.renderItem}
              />
            </View>
          )}
        </ImageBackground>
      );
    }
  }
}

const Styles = StyleSheet.create({
  fundo: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: "white",
    marginHorizontal: 10,
    height: 55,
    alignItems: "center",
    borderRadius: 10,
  },
  titleTextContainer: {
    fontSize: 55,
    fontFamily: "Assassins",
    // color: "red",
  },
  cardContainer: {
    flex: 0.85,
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "Assassins",
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Assassins",
  },
});
