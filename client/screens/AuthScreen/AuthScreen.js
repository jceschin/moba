import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterPage from "./RegisterPage";
import LastRegisterPage from "./LastRegisterPage";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import Validation from "./Validation";
import UsernameRecovery from "./UsernameRecovery";
import PasswordRecovery from "./PasswordRecovery";
import FormNewPassword from "./FormNewPassword";
import TokenRecovery from "./TokenRecovery";
import ForgotOptions from "./ForgotOptions";
const Stack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Validation" component={Validation} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="UsernameRecovery" component={UsernameRecovery} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Stack.Screen name="FormNewPassword" component={FormNewPassword} />
        <Stack.Screen name="TokenRecovery" component={TokenRecovery} />
        <Stack.Screen name="ForgotOptions" component={ForgotOptions} />
      </Stack.Navigator>
    </>
  );
};

export default RootStackScreen;
