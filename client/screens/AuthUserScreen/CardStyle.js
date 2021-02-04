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
import axios from "axios";
import { useSelector } from "react-redux";

export default function CreditCard() {
  const [user, setUser] = useState([]);
  const { eye, setEye, toggle, setToggle } = React.useContext(Context);
  const loggedUser = useSelector((state) => state.user);

  async function getCardNumber(username) {
    let response = await axios.get(`http://localhost:8080/users/${username}`, {
      headers: { Authorization: `Bearer ${loggedUser.data.data.token}` },
    });
    setUser(response.data);
  }

  useEffect(() => {
    getCardNumber(loggedUser.username);
  }, []);

  return (
    <View style={[s.container, { backgroundColor: "#FFF", zIndex: 2 }]}>
      <View style={{ flexDirection: "row" }}>
        <Text style={s.textTitle}>Débito Virtual</Text>
        <View style={s.logoContainer}>
          <Image style={s.image} source={require("../../assets/MOBA.png")} />
        </View>
      </View>
      <View style={{ top: -20 }}>
        <Text style={s.textColor}>Solo para compras online</Text>
      </View>
      <View style={[s.bgCircle, s.rightBgCircle]} />
      <Text style={[s.text, { color: "#949292", top: -8 }]}>
        {user.name + " " + user.surname}
      </Text>
      <View style={s.cardNumberContainer}>
        <View style={s.cardNumberPart}>
          <View>
            <Text style={{ fontSize: 16 }}>
              {toggle === false
                ? "**** **** **** ****"
                : user.account
                ? user.account.card_id
                : null}
            </Text>
          </View>
        </View>
        <Text style={[s.text, { color: "black" }]}>{ }</Text>
      </View>
      <View style={s.footerContainer}>
        <View style={s.dateContainer}>
          <Text style={{ color: "#949292" }}>Exp. Date</Text>
          <Text style={[s.text, { color: "black" }]}>
            {user.account ? user.account.card_expiration.substr(3) : null}
          </Text>
        </View>
        <View style={s.dateContainer}>
          <Text style={{ color: "#949292" }}>CVV</Text>
          <Text style={[s.text, { color: "black", paddingLeft: 11 }]}>
            {toggle === false ? "***" : user.account ? user.account.cvu : nully}
          </Text>
        </View>
        <View style={s.visaContainer}>
          <Image
            style={s.imageVisa}
            source={require("../../assets/simbolos.png")}
          />
        </View>
      </View>
    </View>
  );
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
  logoContainer: {
    position: "relative",
    marginBottom: 24,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 2,
  },
  circle: { width: 34, height: 34, borderRadius: 17 },
  rightCircle: { backgroundColor: "#F2E5E5", position: "absolute", left: 20 },
  leftCircle: { backgroundColor: "black", zIndex: 999 },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    width: 184,
  },
  cardNumberPart: { flexDirection: "row" },
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
    fontFamily: "Courier",
    fontSize: 16,
    letterSpacing: 0.53,
    fontWeight: "900",
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
    width: 60,
    height: 15,
  },
  imageVisa: {
    width: 60,
    height: 35,
  },
  textColor: {
    color: "#949292",
  },
  textTitle: {
    fontWeight: "900",
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
});
