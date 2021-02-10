import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
} from "react-native";
import { Context } from "./AuthUserScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
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
export default function CreditCard() {
  const [user, setUser] = useState([]);
  const { eye, setEye, toggle, setToggle } = React.useContext(Context);
  const loggedUser = useSelector((state) => state.user);
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  useEffect(() => {}, [loggedUser.info]);

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <>
        <LinearGradient
          style={[s.container, { zIndex: 2 }]}
          colors={["#521886", "rgba(0, 0, 0, 0.35)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={s.textTitle}>Balance</Text>
              <Text style={s.textTitle}>${loggedUser.info.account.balance}</Text>
            </View>
            <View style={s.logoContainer}>
              <Image
                style={s.image}
                source={require("../../assets/MOBA.png")}
              />
            </View>
          </View>

          <View style={[s.bgCircle, s.rightBgCircle]} />
          <Text style={[s.textTitle, {top: 13 }]}>
            {loggedUser.info.name + " " + loggedUser.info.surname}
          </Text>
          <View style={s.cardNumberContainer}>
            <View style={s.cardNumberPart}>
              <View>
                <Text style={[s.text, {top: 10}]}>
                  {toggle === false
                    ? "**** **** **** ****"
                    : loggedUser.info.account
                    ? loggedUser.info.account.card_id.replace(
                        /\B(?=(\d{4})+(?!\d))/g,
                        " "
                      )
                    : null}
                </Text>
              </View>
            </View>
            <Text style={[s.text, { color: "white" }]}>{}</Text>
          </View>
          <View style={s.footerContainer}>
            <View style={s.dateContainer}>
              <Text
                style={{
                  color: "#C7A8D9",
                  fontSize: 16,
                  letterSpacing: 0.53,
                  textAlign: "left",
                }}
              >
                Exp. Date
              </Text>
              <Text style={[s.text, { right: 11 }]}>
                {loggedUser.info.account
                  ? loggedUser.info.account.card_expiration.substr(3)
                  : null}
              </Text>
            </View>
            <View style={s.cvvContainer}>
              <Text
                style={s.textTitle}
              >
                CVV
              </Text>
              <Text style={s.text}>
                {toggle === false
                  ? "***"
                  : loggedUser.info.account
                  ? loggedUser.info.account.card_cvv
                  : null}
              </Text>
            </View>
            <View style={s.visaContainer}>
              <Image
                style={s.imageVisa}
                source={require("../../assets/simbolos.png")}
              />
            </View>
          </View>
        </LinearGradient>
      </>
    );
  }
}

const s = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    borderRadius: 12,
    width: 380,
    position: "relative",
    overflow: "hidden",
  },
  textTitle:{
    color: "#C7A8D9", 
    fontSize: 16, 
    letterSpacing: 0.53,
    fontFamily: "OpenSans_700Bold"
  },
  logoContainer: {
    position: "relative",
    marginBottom: 24,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 2,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  rightCircle: {
    backgroundColor: "#F2E5E5",
    position: "absolute",
    left: 20,
  },
  leftCircle: {
    backgroundColor: "black",
    zIndex: 999,
  },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    width: 184,
  },
  cardNumberPart: {
    flexDirection: "row",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    letterSpacing: 0.53,
    color: "white"
  },
  bgCircle: {
    position: "absolute",
    backgroundColor: "#9D9797",
    opacity: 0.2,
    height: 250,
    width: 250,
    borderRadius: 250,
  },
  rightBgCircle: {
    top: 20,
    right: 220,
    overflow: "hidden",
    zIndex: 1,
  },
  bottomBgCircle: {
    bottom: (-1 * 250) / 2,
    left: (0 * (-1 * 250)) / 2,
  },
  image: {
    width: 100,
    height: 25,
  },
  imageVisa: {
    width: 83,
    height: 40,
  },
  textColor: {
    color: "#949292",
  },
  visaContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 2,
    top: 10,
  },
  dateContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cvvContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 59,
  },
});
