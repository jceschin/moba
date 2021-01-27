import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// SCREENS
import LandingPage from './screens/LandingPage';
import RegisterPage from './screens/RegisterPage';
import LastRegisterPage from './screens/LastRegisterPage';
import Homepage from './screens/Homepage';

// REDUX
import { Provider } from 'react-redux';
import reduxStore from './redux/store';

/* let store = reduxStore();  */


export default function App() {

  const Drawer = createDrawerNavigator();

  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='LandingPage'>
          <Drawer.Screen name='LandingPage' component={LandingPage} />
          <Drawer.Screen name='RegisterPage' component={RegisterPage} />
          <Drawer.Screen name='LastRegisterPage' component={LastRegisterPage} />
          <Drawer.Screen name="Homepage" component={Homepage} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
