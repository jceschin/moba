import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterPage from "./RegisterPage";
import LastRegisterPage from "./LastRegisterPage";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="LastRegisterPage" component={LastRegisterPage} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </>
  );
};

export default RootStackScreen;
