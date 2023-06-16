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
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native-gesture-handler";
import firebase from "firebase";
SplashScreen.preventAutoHideAsync();

export default class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      colorTag: "duvida",
      dropdownHeight: 40,
    };
  }
  addArticle = async () => {
    if (this.state.article && this.state.title) {
      let artData = {
        color: this.state.colorTag,
        article: this.state.article,
        // author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        // author_uid: firebase.auth().currentUser.uid,
        likes: 0,
        title: this.state.title,
      };
      await firebase
        .database()
        .ref("/articles/" + Math.random().toString(36).slice(2))
        .set(artData)
        .then(function (snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Feed");
    } else {
      alert(
        "Ops",
        "Todos os campos são obrigatórios!",
        [{ text: "OK", onPress: () => console.log("OK Pressionado") }],
        { cancelable: false }
      );
    }
  };
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
          source={require("../assets/background.jpg")}
          style={Styles.fundo}
        >
          <View style={Styles.titleContainer}>
            <Text style={Styles.titleTextContainer}>Forum dos AssassinoS</Text>
          </View>
          <ScrollView>
            <View style={Styles.tag}>
              <View
                style={[
                  Styles.circle,
                  { backgroundColor: tags[this.state.colorTag] },
                ]}
              />

              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "curiosidade", value: "curiosidade" },
                    { label: "dúvida", value: "duvida" },
                    { label: "dica", value: "dica" },
                    { label: "meme", value: "meme" },
                    { label: "outro", value: "outro" },
                  ]}
                  defaultValue={this.state.previewImage}
                  open={this.state.dropdownHeight == 170 ? true : false}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderWidth: 1,
                    borderColor: "black",
                    width: 300,
                    alignSelf: "center",
                  }}
                  textStyle={{
                    color: this.state.dropdownHeight == 170 ? "black" : "white",
                    fontFamily: "Bubblegum-Sans",
                  }}
                  onSelectItem={(item) =>
                    this.setState({
                      colorTag: item.value,
                    })
                  }
                  placeholder={this.state.colorTag}
                />
              </View>
            </View>
            <TextInput
              placeholder="Título"
              onChangeText={(title) => {
                this.setState({ title });
              }}
              style={[
                Styles.inputFont,
                Styles.inputFontExtra,
                Styles.inputTextBig,
              ]}
              numberOfLines={2}
            />
            <TextInput
              placeholder="Artigo"
              onChangeText={(article) => {
                this.setState({ article });
              }}
              style={[
                Styles.inputFont,
                Styles.inputFontExtra,
                Styles.inputTextBig,
                { height: 150 },
              ]}
              numberOfLines={15}
              multiline={true}
            />
            <TouchableOpacity style={Styles.submit} onPress={this.addArticle}>
              <Text style={Styles.subimtText}>submit</Text>
            </TouchableOpacity>
          </ScrollView>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    marginLeft: 30,
  },
  circle: {
    height: 50,
    width: 50,
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
});
