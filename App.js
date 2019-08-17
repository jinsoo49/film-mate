import React from "react";
import { AppLoading } from "expo";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import MainNavigation from "./navigation/MainNavigation";

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
        <>
          <StatusBar barStyle="light-content" />
          <MainNavigation />
        </>
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
