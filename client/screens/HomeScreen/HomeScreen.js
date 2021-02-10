import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./LandingPage";
import SplashScreen from "./SplashScreen"
import { getUserInfo } from "../../redux/actions/user";
import SplashScreen2 from './SplashScreen2'
const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
      </Stack.Navigator>
    </>
  );
};

export default RootStackScreen;
