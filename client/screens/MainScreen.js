import React from "react";
import { Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import HomeScreen from "./HomeScreen/HomeScreen";
import AuthScreen from "./AuthScreen/AuthScreen";
import AuthUserScreen from "./AuthUserScreen/AuthUserScreen";
const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.data);
  return (
    <>
      <Stack.Navigator headerMode="none">
        {!user ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
          </>
        ) : !user.data.token ? null : (
          <Stack.Screen name="AuthUserScreen" component={AuthUserScreen} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootStackScreen;
