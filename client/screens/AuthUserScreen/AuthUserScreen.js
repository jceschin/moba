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
import Stats from "./Stats";
import TransferReceipt from "./TransferReceipt";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import SendInvitation from "./SendInvitation";
import SendMoneyUnregistered from "./SendMoneyUnregistered";
import EditProfile from "./EditProfile";
import TransferTreeBank from "./TransferTreeBank";
import Contactus from "./ContactUs";
const Stack = createStackNavigator();

export const Context = React.createContext({
  eye: null,
  setEye: () => {},
  toggle: null,
  setToggle: () => {},
  colorIcon: null,
  seColorIcon: () => {},
});

const RootStackScreen = ({ navigation }) => {
  const [eye, setEye] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [colorIcon, setColorIcon] = React.useState("");
  return (
    <>
      <Context.Provider
        value={{ eye, setEye, toggle, setToggle, colorIcon, setColorIcon }}
      >
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Contactus" component={Contactus} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="HomeNavbar" component={HomeNavbar} />
          <Stack.Screen name="MyAccount" component={MyAccount} />
          <Stack.Screen name="AccountNumber" component={AccountNumber} />
          <Stack.Screen name="MyContacts" component={MyContacts} />
          <Stack.Screen name="EditContact" component={EditContact} />
          <Stack.Screen name="AddContact" component={AddContact} />
          <Stack.Screen name="MyContact" component={MyContact} />
          <Stack.Screen name="SendMoney" component={SendMoney} />
          <Stack.Screen name="SendMoneySuccess" component={SendMoneySuccess} />
          <Stack.Screen name="SendMoneyError" component={SendMoneyError} />
          <Stack.Screen name="AddMoney" component={AddMoney} />
          <Stack.Screen name="Card" component={Card} />
          <Stack.Screen name="Stats" component={Stats} />
          <Stack.Screen name="TransferReceipt" component={TransferReceipt} />
          <Stack.Screen name="SendInvitation" component={SendInvitation} />
          <Stack.Screen
            name="SendMoneyUnregistered"
            component={SendMoneyUnregistered}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="TransferTreeBank" component={TransferTreeBank} />
        </Stack.Navigator>
      </Context.Provider>
    </>
  );
};

export default RootStackScreen;
