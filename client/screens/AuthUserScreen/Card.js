import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Fontisto, Feather, Entypo } from "@expo/vector-icons";
import CreditCard from "./CardStyle";
import HomeNavbar from "./HomeNavbar";
import { Context } from "./AuthUserScreen";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading";
import SplashScreen2 from "../HomeScreen/SplashScreen2";
export default function Card() {
  const { eye, setEye, toggle, setToggle } = React.useContext(Context);

  const handleToggle = () => {
    toggle === false
      ? setToggle(true)
      : toggle === true
      ? setToggle(false)
      : null;
  };

  const handleEye = () => {
    eye === false ? setEye(true) : eye === true ? setEye(false) : null;
  };

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  if(!fontsLoaded){
    return <SplashScreen2 />
  } else {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.upperContainer}>
        <View style={styles.viewCard}>
          <CreditCard />
        </View>
      </View>

      <View style={styles.movsContainer}>
        <View style={styles.bottomContainer}>
          <View style={styles.iconsRow}>
            <View style={styles.eyeIcon}>
              <TouchableOpacity onPress={handleEye}>
                {toggle === true ? (
                  <Ionicons name="eye-sharp" size={28} color="black" style={{left: 7, top: 5}} />
                ) : (
                  <Ionicons name="eye-off-sharp" size={28} color="black" style={{left: 7, top: 5}} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.movsHeader}>
              <Text style={{ fontSize: 18, fontFamily: "OpenSans_700Bold", right: 4 }}>See Card Info</Text>
            </View>
            <View style={styles.toggleButton}>
              <TouchableOpacity onPress={handleToggle}>
                {toggle === true ? (
                  <Fontisto
                    name="toggle-on"
                    size={31}
                    color="#499174"
                    style={{right: 15}}
                  />
                ) : (
                  <Fontisto
                    name="toggle-off"
                    size={31}
                    color="black"
                    style={{right: 15}}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.subBottomContainer}>
          <View style={styles.iconsColumn}>
            <View style={styles.copyName}>
              <Feather name="copy" size={28} color="black" style={{left: 6, top: 5}} />
              <Text style={styles.textCopyCardName}>Copy Name</Text>
            </View>
            <View style={styles.copyNumberCard}>
              <Feather name="copy" size={28} color="black" style={{left: 6, top: 5}}/>
              <Text style={styles.textCopyCardNumber}>Copy Card Number</Text>
            </View>
            <View style={styles.reportCard}>
            <Entypo name="lock" size={28} color="black" style={{left: 6, top: 5}}/>
              <Text style={styles.textReportCard}>Report Card</Text>
            </View>
          </View>
        </View>
      </View>
      <HomeNavbar />
    </View>
  );
}
}

const styles = StyleSheet.create({
  viewCard: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    top: 40,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(125, 79, 167, 0.46)",
    flex: 1
  },
  movsContainer: {
    top: 70,
    backgroundColor: "white",
    height: 464,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomContainer: {
    borderWidth: 1,
    borderColor: "rgba(167, 167, 167, 0.83)",
    borderStyle: "solid",
    top: 26,
    width: 375,
    left: 51,
    height: 69,
    borderRadius: 10,
  },
  movsHeader: {
    left: 36,
  },
  eyeIcon: {
    left: 23,
    backgroundColor: "rgba(229, 229, 229, 1)",
    width: 40,
    height: 40,
    borderRadius: 11
  },
  iconsRow: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  iconsColumn: {
    flex: 1,
    flexDirection: "column",
  },
  toggleButton: {
    left: 185,
  },
  subBottomContainer: {
    borderWidth: 1,
    borderColor: "#CBC8C8",
    borderStyle: "solid",
    top: 52,
    width: 375,
    height: 214,
    left: 51,
    borderRadius: 10,
  },
  copyName: {
    left: 23,
    top: 29,
    flexDirection: "row",
    backgroundColor: "rgba(229, 229, 229, 1)",
    width: 40,
    height: 40,
    borderRadius: 11
  },
  iconCopyView:{
    backgroundColor: "rgba(229, 229, 229, 1)",
    width: 40,
    height: 40,
  },
  copyNumberCard: {
    left: 23,
    top: 44,
    flexDirection: "row",
    backgroundColor: "rgba(229, 229, 229, 1)",
    width: 40,
    height: 40,
    borderRadius: 11
  },
  reportCard:{
    left: 23,
    top: 59,
    flexDirection: "row",
    backgroundColor: "rgba(229, 229, 229, 1)",
    width: 40,
    height: 40,
    borderRadius: 11
  },
  textCopyCardName: {
    marginLeft: 14,
    fontSize: 18,
    paddingTop: 5,
    width: 113,
    left: 8,
    fontFamily: "OpenSans_700Bold"
  },
  textCopyCardNumber: {
    marginLeft: 14,
    fontSize: 18,
    paddingTop: 4,
    width: 179,
    left: 8,
    fontFamily: "OpenSans_700Bold"
  },
  textReportCard: {
    marginLeft: 14,
    fontSize: 18,
    paddingTop: 4,
    width: 113,
    left: 8,
    fontFamily: "OpenSans_700Bold"
  },
  upperContainer:{
    height: 267
  }
});
