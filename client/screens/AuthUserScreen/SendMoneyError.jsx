import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { clearLastTransaction, getUserTransactions } from "../../redux/actions/transactionActions";
import { useDispatch, useSelector } from "react-redux";

const SendMoneyError = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const lastTransaction = useSelector(
    (state) => state.transactions.lastTransaction
  );

  useEffect(() => {
    dispatch(
      getUserTransactions(loggedUser.username, loggedUser.data.data.token)
    );
    dispatch(clearLastTransaction());
  }, [lastTransaction]);
  return (
    <View style={styles.container}>
      <Text>Ups! Couldn't send the money</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnContent}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendMoneyError;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
  },
  button: {
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#25D681",
    marginRight: 18,
    marginLeft: 18,
    top: 380,
  },
  btnContent: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
