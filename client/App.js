import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './screens/LandingPage';
import CreateAccount from './screens/CreateAccount';
import {Provider} from 'react-redux';
import generateStore from './Store'
import Homepage from './screens/Homepage';
import HomeNavbar from './screens/HomeNavbar';
import MyAccount from './screens/MyAccount';

export default function App() {

  const Drawer = createDrawerNavigator();
  const store = generateStore()

  return (
    <Provider store= {store}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Homepage">
        <Drawer.Screen name="LandingPage" component={LandingPage} />
        <Drawer.Screen name="CreateAccount" component={CreateAccount} />
        <Drawer.Screen name="Homepage" component={Homepage} />
        <Drawer.Screen name="HomeNavbar" component={HomeNavbar} />
        <Drawer.Screen name="MyAccount" component={MyAccount} />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}