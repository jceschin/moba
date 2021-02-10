import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading";

//Redux
import { clearLastTransaction, getUserTransactions } from "../../redux/actions/transactionActions";

const TransferReceipt = ({ route }) => {

  // Fonts
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  let lastTransaction = route.params;

  const loggedUser = useSelector((state) => state.user);
  const destinatary = useSelector((state) => state.contacts.selectedContact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
        getUserTransactions(loggedUser.username, loggedUser.data.data.token)
      );
    dispatch(clearLastTransaction());
  },[lastTransaction]);

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
            <Text style={styles.text_header}>Successful transfer</Text> {/* Colocara acá el cbu */}
          </View>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <View style={styles.receiptContainer}>
            <Text style={styles.textRecover}>
              Transfer Receipt
            </Text>
            <Text style={styles.textRow}>
              Amount
            </Text>
            <Text style={styles.textRowII}>
              {lastTransaction.lastTransaction.amount}
            </Text>
            <br/>
            <Text style={styles.textRow}>
              From
            </Text>
            <Text style={styles.textRowII}>
             {loggedUser.info.name} {loggedUser.info.surname}
            </Text>
            <Text style={styles.textRowII}>
             {loggedUser.info.account.cvu}
            </Text>
            <br/>
            <Text style={styles.textRow}>
            To
            </Text>
            <Text style={styles.textRowII}>
              {destinatary.name} {destinatary.surname}
            </Text>
            <Text style={styles.textRowII}>
             {destinatary.account.cvu}
            </Text>
            <br/>
            <br/>
            <Text style={styles.textRow}>
              Transaction number
            </Text>
            <Text style={styles.textRowII}>
              {lastTransaction.lastTransaction.number}
            </Text>
            <br/>
            <Text style={styles.textRow}>
              Transaction Date
            </Text>
            <Text style={styles.textRowII}>
             {lastTransaction.lastTransaction.createdAt.slice(0, 10)}
            </Text>
            <Image style={styles.image} source={require("../../resources/images/mobapng.png")} />
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
};

export default TransferReceipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#521886",
  },
  receiptContainer: {
    borderStyle: "solid",
    width: 298,
    height: 550,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 146
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
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#521886",
  },
  textSign: {
    fontSize: 18,
    fontFamily: "OpenSans_800ExtraBold",
  },
  containerImg: {
    alignItems: "center",
  },
  errorMsg: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
    marginTop: 5
  },
  textRecover: {
    fontFamily: "OpenSans_700Bold",
    color: "black",
    fontSize: 18,
    marginTop: 30,
    textAlign: "center"
  },
  textRow: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
    color: "#515151",
    paddingLeft: 6
  },
  textRowII: {
    fontFamily: "OpenSans_700Bold",
    color: "black",
    fontSize: 14,
    paddingLeft: 6
  },
  image: {
    flex: 1,
    width: 152,
    height: 37,
    marginLeft: 5
  },
  checkView: {
    right: 17,
    top: -8
  }
});