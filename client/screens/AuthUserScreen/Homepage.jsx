import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeNavbar from "./HomeNavbar";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/actions/user";
import {
  checkInterappTransactions,
  clearLastTransaction,
  getUserTransactions,
} from "../../redux/actions/transactionActions";
import { Ionicons } from "@expo/vector-icons";
// Fonts
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
const Homepage = () => {
  // Fonts
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const navigation = useNavigation();
  const loggedUser = useSelector((state) => state.user);
  const transactions = useSelector((state) => state.user.transactions);
  const dispatch = useDispatch();

  const renderTransactions = () => {
    if (transactions.length > 0) {
      var sortedTransactions = transactions.map((t) => {
        var data;

        if (t.sender === loggedUser.username) {
          data = (
            <Text style={styles.movType}>
              Sent US${t.amount} to {t.receiver}
              {t.type === "interoperation" && (
                <Text>{"\n"}(Bank Tree user)</Text>
              )}
            </Text>
          );
        } else {
          data =
            t.type === "recharge" ? (
              <Text style={styles.movType}>You deposited US${t.amount}</Text>
            ) : (
              <Text style={styles.movType}>
                Received US${t.amount} from {t.sender}
                {t.type === "interoperation" && (
                  <Text>{"\n"}(Bank Tree user)</Text>
                )}
              </Text>
            );
        }
        return (
          <View style={styles.mov}>
            <View style={styles.movDateContainer}>
              <Text style={styles.movDate}>{t.date.substring(0, 10)}</Text>
            </View>
            <View style={styles.movDetails}>
              {data}
              {t.sender === loggedUser.username ? (
                <Text style={styles.movAmount}>− US${t.amount}</Text>
              ) : (
                <Text style={styles.movAmount}>US${t.amount}</Text>
              )}
            </View>
          </View>
        );
      });
      return sortedTransactions;
    }
  };

  useEffect(() => {
    dispatch(
      getUserTransactions(
        loggedUser.username,
        loggedUser.isAuthenticated === true ? loggedUser.data.data.token : null
      )
    );
    dispatch(getUserInfo(loggedUser.username));
  }, [transactions && transactions.length]);

  //
  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <ScrollView
          contentContainerStyle={
            transactions
              ? styles.scrollHeightTransactions
              : styles.scrollHeightNoTransactions
          }
        >
          <View style={styles.mainContainer}>
            <View style={styles.upperContainer}>
              <Text style={styles.accountOwner}>
                {loggedUser.info &&
                  `${loggedUser.info.name} ${loggedUser.info.surname}`}
              </Text>
              <Text style={styles.balanceTag}>Balance</Text>
              {loggedUser.info && loggedUser.info.account ? (
                <Text style={styles.balance}>
                  US$ {loggedUser.info.account.balance}
                </Text>
              ) : (
                <Text style={styles.balance}>US$ 0</Text>
              )}
              <View style={styles.options}>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("AddMoney")}
                  >
                    <Entypo
                      name="plus"
                      size={24}
                      color="white"
                      style={styles.optionIcon}
                    />
                    <Text style={styles.option}>Add Money</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Stats")}
                  >
                    <MaterialIcons
                      name="compare-arrows"
                      size={24}
                      color="white"
                      style={styles.optionIcon}
                    />
                    <Text style={styles.option}>Statistics</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("MyContacts")}
                  >
                    <FontAwesome
                      name="long-arrow-right"
                      size={24}
                      color="white"
                      style={styles.optionIcon}
                    />
                    <Text style={styles.option}>Send Money</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.movsContainer}>
              <Text style={styles.movsHeader}>Last Movements</Text>
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    checkInterappTransactions(
                      loggedUser.info.account.cvu,
                      loggedUser.username,
                      loggedUser.data.data.token
                    )
                  )
                }
              >
                <Ionicons name="refresh" size={24} color="black" />
              </TouchableOpacity>
              {transactions && renderTransactions()}
            </View>
          </View>
        </ScrollView>
        <HomeNavbar />
      </View>
    );
  }
};

export default Homepage;

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    backgroundColor: "#521886",
    opacity: 0.9,
  },
  container: {
    flex: 1,
  },
  scrollHeightTransactions: {
    height: 2000,
  },
  scrollHeightNoTransactions: {
    height: "100%",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  movsContainer: {
    top: 70,
    backgroundColor: "white",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  accountOwner: {
    fontSize: 36,
    textAlign: "center",
    marginTop: 31,
    fontFamily: "OpenSans_800ExtraBold",
    color: "white",
  },
  balanceTag: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 25,
    color: "white",
    fontFamily: "OpenSans_700Bold",
  },
  balance: {
    fontSize: 36,
    textAlign: "center",
    marginTop: 30,
    fontFamily: "OpenSans_800ExtraBold",
    color: "white",
  },
  options: {
    flexDirection: "row",
    top: 45,
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 18,
  },
  option: {
    fontSize: 16,
    color: "white",
    fontFamily: "OpenSans_700Bold",
  },
  optionIcon: {
    textAlign: "center",
    marginBottom: 5,
  },
  movsHeader: {
    marginTop: 36,
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
    color: "black",
    fontFamily: "OpenSans_800ExtraBold",
  },
  mov: {
    marginTop: 15,
    marginBottom: 15,
  },
  movDate: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 5,
    fontFamily: "OpenSans_700Bold",
    color: "black",
    paddingLeft: 0,
  },
  movDateContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(167, 167, 167, 0.83)",
    borderStyle: "solid",
    paddingLeft: 10,
    paddingRight: 10,
  },
  movDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
  movType: {
    fontSize: 14,
    textAlign: "left",
    color: "black",
    fontFamily: "OpenSans_700Bold",
  },
  movAmount: {
    fontSize: 14,
    textAlign: "right",
    fontFamily: "OpenSans_700Bold",
    color: "#41A89B",
  },
});
