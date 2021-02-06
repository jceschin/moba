import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./LandingPage";
import { getUserInfo } from "../../redux/actions/user";

const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LandingPage" component={LandingPage} />
      </Stack.Navigator>
    </>
  );
};

export default RootStackScreen;
