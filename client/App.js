import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// SCREENS
import MainScreen from "./screens/MainScreen";
// REDUX
import { Provider } from "react-redux";
import { reduxStore, persistedStore } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { LogBox } from 'react-native';

export default function App() {
  const Drawer = createDrawerNavigator();
  //LogBox.ignoreAllLogs();
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={persistedStore} loading={null}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="MainScreen" component={MainScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
