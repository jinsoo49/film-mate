import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import DetailScreen from "../screens/Detail";
import { headerStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    Tabs: { screen: TabNavigation, navigationOptions: { header: null } },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        ...headerStyles,
        headerBackTitle: null
      }
    }
  },
  {
    // Detail에서 Back 시도시에 흰색 헤더가 보였다가 사라짐 -> 일부는 헤더가 있고 일부는 없는 경우
    // main에는 헤더가 null인데 각 screen에 헤더가 있는 구조가 원인
    // 헤더모드를 screen으로 변경하여 해결
    headerMode: "screen",
    // 헤더는 스크린에서 스크린부터 독립적이고 anymate 하지 않음, default는 float
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MainNavigation);

// stackNavigator doc
// https://reactnavigation.org/docs/en/stack-navigator.html
