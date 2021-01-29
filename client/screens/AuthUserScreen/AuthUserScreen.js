import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./Homepage";
import HomeNavbar from "./HomeNavbar";
import MyAccount from "./MyAccount";
import AccountNumber from "./AccountNumber";
const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="HomeNavbar" component={HomeNavbar} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="AccountNumber" component={AccountNumber} />
      </Stack.Navigator>
    </>
  );
};

export default RootStackScreen;
