import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './screens/LandingPage';
import CreateAccount from './screens/CreateAccount';
import {Provider} from 'react-redux';
import generateStore from './store'
import Homepage from './screens/Homepage';

export default function App() {

  const Drawer = createDrawerNavigator();
  const store = generateStore()

  return (
    <Provider store= {store}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LandingPage">
        <Drawer.Screen name="LandingPage" component={LandingPage} />
        <Drawer.Screen name="CreateAccount" component={CreateAccount} />
        <Drawer.Screen name="Homepage" component={Homepage} />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
