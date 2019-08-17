import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default class App extends React.Component {
  state = {
    loaded: false
  };

  // AppLoading의 세가지 props
  handleError = error => console.log(error);
  // 로딩이 끝난 후 발생
  handleLoaded = () => this.setState({ loaded: true });
  // 로딩을 위한 함수 (async)
  loadAssets = async () => {
    await Font.loadAsync({
      ...Ionicons.font
    });
    // 아이콘을 사용하겠다면
    // await Asset.loadAsync([
    //   require("images/icon.png")
    // ])
  };

  render() {
    const { loaded } = this.state;
    if (loaded) {
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      );
    } else {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={this.handleLoaded}
          onError={this.handleError}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
