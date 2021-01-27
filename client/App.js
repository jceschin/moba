import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// SCREENS
import LandingPage from './screens/LandingPage';
import RegisterPage from './screens/RegisterPage';
import LastRegisterPage from './screens/LastRegisterPage';
import CreateAccount from './screens/CreateAccount';
import {Provider} from 'react-redux';
import generateStore from './Store'
import Homepage from './screens/Homepage';
import HomeNavbar from './screens/HomeNavbar';
import MyAccount from './screens/MyAccount';

// REDUX
import { Provider } from 'react-redux';
import reduxStore from './redux/store';

/* let store = reduxStore();  */


export default function App() {

  const Drawer = createDrawerNavigator();
  const store = generateStore()

  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='LandingPage'>
          <Drawer.Screen name='LandingPage' component={LandingPage} />
          <Drawer.Screen name="CreateAccount" component={CreateAccount} />
          <Drawer.Screen name='RegisterPage' component={RegisterPage} />
          <Drawer.Screen name='LastRegisterPage' component={LastRegisterPage} />
          <Drawer.Screen name="Homepage" component={Homepage} />
          <Drawer.Screen name="HomeNavbar" component={HomeNavbar} />
          <Drawer.Screen name="MyAccount" component={MyAccount} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>  
  );
}
