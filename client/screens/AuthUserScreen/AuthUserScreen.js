import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./Homepage";
import HomeNavbar from "./HomeNavbar";
import MyAccount from "./MyAccount";
import AccountNumber from "./AccountNumber";
import MyContacts from "./MyContacts";
import MyContact from "./MyContact";
import SendMoney from "./SendMoney";
import SendMoneySuccess from "./SendMoneySuccess";
import SendMoneyError from "./SendMoneyError";
import Card from "./Card";
import AddMoney from "./AddMoney";
import AddContact from "./AddContact";
const Stack = createStackNavigator();

export const Context = React.createContext({
  eye: null,
  setEye: () => { },
  toggle: null,
  setToggle: () => { },
});

const RootStackScreen = ({ navigation }) => {
  const [eye, setEye] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  return (
    <>
      <Context.Provider value={{ eye, setEye, toggle, setToggle }}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="HomeNavbar" component={HomeNavbar} />
          <Stack.Screen name="MyAccount" component={MyAccount} />
          <Stack.Screen name="AccountNumber" component={AccountNumber} />
          <Stack.Screen name="MyContacts" component={MyContacts} />
          <Stack.Screen name="AddContact" component={AddContact} />
          <Stack.Screen name="MyContact" component={MyContact} />
          <Stack.Screen name="SendMoney" component={SendMoney} />
          <Stack.Screen name="SendMoneySuccess" component={SendMoneySuccess} />
          <Stack.Screen name="SendMoneyError" component={SendMoneyError} />
          <Stack.Screen name="AddMoney" component={AddMoney} />
          <Stack.Screen name="Card" component={Card} />
        </Stack.Navigator>
      </Context.Provider>
    </>
  );
};

export default RootStackScreen;
