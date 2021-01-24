import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './screens/LandingPage';
import CreateAccount from './screens/CreateAccount';

export default function App() {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LandingPage">
        <Drawer.Screen name="LandingPage" component={LandingPage} />
        <Drawer.Screen name="CreateAccount" component={CreateAccount} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
