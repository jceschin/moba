import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './screens/LandingPage';
import Homepage from './screens/Homepage';

export default function App() {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LandingPage">
        <Drawer.Screen name="LandingPage" component={LandingPage} />
        <Drawer.Screen name="Homepage" component={Homepage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
