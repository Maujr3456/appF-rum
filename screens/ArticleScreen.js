import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native-gesture-handler";
import firebase from "firebase";
SplashScreen.preventAutoHideAsync();

export default class ArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      colorTag: "duvida",
    };
  }

  componentDidMount() {
    this.LoadFont();
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

  render() {
    if (this.state.fontLoaded) {
      SplashScreen.hideAsync();
      let tags = {
        curiosidade: "yellow",
        duvida: "red",
        dica: "green",
        meme: "purple",
        outro: "blue",
      };
      return (
        <ImageBackground
          style={Styles.fundo}
          source={require("../assets/background2.png")}
        >
          <View style={Styles.cardContainer}>
            <View style={Styles.tag}>
              <View
                style={[
                  Styles.circle,
                  {
                    backgroundColor:
                      tags[this.props.route.params.article.color],
                  },
                ]}
              />
              <Text>{this.props.route.params.article.titleTag}</Text>
            </View>
            <Text style={Styles.textTitle}>
              {this.props.route.params.article.title}
            </Text>
            <Text style={Styles.textArticle}>
              {this.props.route.params.article.article}
            </Text>
          </View>
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
  tag: {
    flex: 0.1,
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  circle: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 2,
  },
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
    marginHorizontal: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderColor: "black",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
  submit: {
    backgroundColor: "#F1F6FB",
    borderRadius: 10,
    marginTop: 200,
    marginHorizontal: 150,
    alignItems: "center",
    height: 50,

    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  subimtText: {
    fontSize: 45,
    fontFamily: "Assassins",
    fontWeight: "bold",
  },
  cardContainer: {
    backgroundColor: "#70090C",
    opacity: 0.8,
    marginTop: 45,
    width: 400,
    height: 750,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#CD2224",
    justifyContent: "center",
  },
  textTitle: {
    alignSelf: "center",
    fontSize: 20,
    color: "white",
  },
  textArticle: {
    color: "white",
    // marginLeft: 20,
    // marginTop: 10,
    // marginBottom: 10,
  },
});
