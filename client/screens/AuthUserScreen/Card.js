import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Fontisto, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import CreditCard from "./CardStyle";
import HomeNavbar from "./HomeNavbar";
import { Context } from "./AuthUserScreen";

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

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView>
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
                      <Ionicons name="eye-sharp" size={28} color="black" />
                    ) : (
                      <Ionicons name="eye-off-sharp" size={28} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.movsHeader}>
                  <Text style={{ fontSize: 18 }}>See Card Info</Text>
                </View>
                <View style={styles.toggleButton}>
                  <TouchableOpacity onPress={handleToggle}>
                    {toggle === true ? (
                      <Fontisto
                        name="toggle-on"
                        size={31}
                        color="green"
                        style={{ transition: "2s ease-out" }}
                      />
                    ) : (
                      <Fontisto
                        name="toggle-off"
                        size={31}
                        color="black"
                        style={{ transition: "2s ease-out" }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.subBottomContainer}>
              <View style={styles.iconsColumn}>
                <View style={styles.copyName}>
                  <Feather name="copy" size={28} color="black" />
                  <Text style={styles.textCopyCardName}>Copy Name</Text>
                </View>
                <View style={styles.copyNumberCard}>
                  <Feather name="copy" size={28} color="black" />
                  <Text style={styles.textCopyCardNumber}>
                    Copy Card Number
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <HomeNavbar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
  movsContainer: {
    top: 70,
    minHeight: 290,
    backgroundColor: "white",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomContainer: {
    borderWidth: 1,
    borderColor: "rgba(167, 167, 167, 0.83)",
    borderStyle: "solid",
    top: 26,
    width: 375,
    left: 18,
    height: 69,
    borderRadius: 10,
  },
  movsHeader: {
    left: 36,
  },
  eyeIcon: {
    left: 21,
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
    left: 18,
    borderRadius: 10,
  },
  copyName: {
    left: 23,
    top: 20,
    flexDirection: "row",
  },
  copyNumberCard: {
    left: 23,
    top: 35,
    flexDirection: "row",
  },
  textCopyCardName: {
    marginLeft: 14,
    fontSize: 18,
    paddingTop: 5,
  },
  textCopyCardNumber: {
    marginLeft: 14,
    fontSize: 18,
    paddingTop: 4,
  },
});
