import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import HomeNavbar from "./HomeNavbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserInfo } from "../../redux/actions/user";
import { getUserTransactions } from "../../redux/actions/transactionActions";


const Homepage = () => {
  const navigation = useNavigation();
  const loggedUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const transactions = useSelector((state) => state.user.transactions);
  const dispatch = useDispatch();

  const renderTransactions = () => {
    if (transactions.length > 0) {
      var sortedTransactions = transactions.map((t) => {
        var data;
        if (t.sender === loggedUser.username) {
          data = (
            <Text style={styles.movType}>
              You send US${t.amount} to {t.receiver}
            </Text>
          );
        } else {
          data =
            t.type === "recharge" ? (
              <Text style={styles.movType}>You deposit US${t.amount}</Text>
            ) : (
              <Text style={styles.movType}>
                You received US${t.amount} from {t.sender}
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
                <Text style={styles.movType}>− US${t.amount}</Text>
              ) : (
                <Text style={styles.movType}>US${t.amount}</Text>
              )}
            </View>
          </View>
        );
      });
      return sortedTransactions
    }
  };

  useEffect(() => {
    dispatch(getUserInfo(loggedUser.username));
  }, [transactions]);

//
  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={{flex: 1, height: "100%"}}>
        <View style={styles.mainContainer}>
          <View style={styles.upperContainer}>
            <Text style={styles.accountOwner}>
              {loggedUser.info &&
                `${loggedUser.info.name} ${loggedUser.info.surname}`}
            </Text>
            <Text style={styles.balanceTag}>Balance</Text>
            {(loggedUser.info && loggedUser.info.account) ? (
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
                  <MaterialCommunityIcons
                    name="cash-plus"
                    size={24}
                    color="black"
                    style={styles.optionIcon}
                  />
                  <Text style={styles.option}>Add Money</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity 
                  onPress={() => navigation.navigate("Stats")}
                  >
                  <MaterialCommunityIcons
                    name="bank-transfer"
                    size={24}
                    color="black"
                    style={styles.optionIcon}
                  />
                  <Text style={styles.option}>Transfer</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MyContacts")}
                >
                  <MaterialIcons
                    name="send-to-mobile"
                    size={24}
                    color="black"
                    style={styles.optionIcon}
                  />
                  <Text style={styles.option}>Send Money</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.movsContainer}>
            <Text style={styles.movsHeader}>Last Movements</Text>
            {transactions && renderTransactions()}
          </View>
        </View>
      </ScrollView>

      <HomeNavbar />
    </LinearGradient>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  accountOwner: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 31,
  },
  balanceTag: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "normal",
    marginTop: 25,
  },
  balance: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 30,
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
    fontWeight: "normal",
  },
  mov: {
    marginTop: 15,
    marginBottom: 15,
  },
  movDate: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "normal",
    marginBottom: 5,
  },
  movDateContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(167, 167, 167, 0.83)",
    borderStyle: "solid",
    paddingLeft: 18,
    paddingRight: 18,
  },
  movDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 5,
  },
  movType: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "normal",
  },
  movAmount: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: "normal",
  },
});