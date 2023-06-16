import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTab";

import ArticleScreen from "../screens/ArticleScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
export default StackNavigator;
