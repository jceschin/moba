import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { clearLastTransaction, getUserTransactions } from "../../redux/actions/transactionActions";
import { useDispatch, useSelector } from "react-redux";

// Fonts
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

const SendMoneySuccess = () => {

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
  const lastTransaction = useSelector((state) => state.transactions.lastTransaction);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
        getUserTransactions(loggedUser.username, loggedUser.data.data.token)
      );
    dispatch(clearLastTransaction());
  },[lastTransaction]);

  return (
    <View style={styles.colorContainer}>
      <View style={styles.contentContainer}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'OpenSans_800ExtraBold',
            color: 'white',
            marginBottom: 20
          }}
        >
          Money sended!</Text>
          <AntDesign name="checkcircleo" size={104} color="white" />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'OpenSans_600SemiBold',
            color: 'white',
            paddingLeft: 18,
            paddingRight: 18,
            marginTop: 20,
            textAlign: 'center'
          }}
        >
          Juan Pedro will receive your money</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Text style={styles.btnContent}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendMoneySuccess;

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    backgroundColor: "#521886",
    opacity: 0.9,
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 200
  },
  button: {
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginRight: 18,
    marginLeft: 18,
    top: 390,
  },
  btnContent: {
    textAlign: "center",
    color: "#521886",
    fontSize: 20,
    fontFamily: 'OpenSans_700Bold'
  },
});
