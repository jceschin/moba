import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ForgotOptions = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={20}
              color="white"
            />
          </TouchableOpacity>

          <View style={styles.welcomeView}>
            <Text style={styles.text_header}>Choose an option</Text>
          </View>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <View style={styles.usernameRecovery}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UsernameRecovery")}
            >
              <Text style={styles.forgot_username}>I forgot my username</Text>
            </TouchableOpacity>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="rgba(255, 255, 255, 0.60)"
              style={{ marginLeft: 64 }}
            />
          </View>

          <View style={styles.passwordRecovery}>
            <TouchableOpacity
              onPress={() => navigation.navigate("PasswordRecovery")}
            >
              <Text style={styles.forgot_password}>I forgot my password</Text>
            </TouchableOpacity>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="rgba(255, 255, 255, 0.60)"
              style={{ marginLeft: 64 }}
            />
          </View>
        </Animatable.View>
      </View>
    );
  }
};

export default ForgotOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#521886",
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    marginBottom: 12,
  },
  welcomeView: {
    flex: 1,
    alignItems: "center"
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -60,
    alignItems: "center",
  },
  text_header: {
    color: "#fff",
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
  },
  forgot_username: {
    marginLeft: 63,
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    color: "#fff",
  },
  forgot_password: {
    marginLeft: 63,
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    color: "#fff",
  },
  usernameRecovery: {
    flexDirection: "row",
    marginTop: 142,
    backgroundColor: "rgba(82, 24, 134, 0.5)",
    height: 49,
    width: 332,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#521886",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordRecovery: {
    flexDirection: "row",
    marginTop: 48,
    backgroundColor: "rgba(82, 24, 134, 0.5)",
    height: 49,
    width: 332,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#521886",
    justifyContent: "center",
    alignItems: "center",
  },
});
