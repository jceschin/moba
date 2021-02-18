import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

//Redux
import { addNewContact } from "../../redux/actions/contactActions";
import { useSelector, useDispatch } from "react-redux";
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
import {
  addNewTransaction,
  getUserTransactions,
} from "../../redux/actions/transactionActions";
import { sendEmailToRegister } from "../../redux/actions/emailActions";
import accounting from "accounting-js";
import * as Linking from "expo-linking";
import { apiEndpoint } from "../../const";

const SendMoneyUnregistered = ({ navigation }) => {
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({
    contact_email: "",
  });
  const [pages, setPages] = useState("");
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const destinatary = useSelector((state) => state.contacts.selectedContact);
  const lastTransfer = useSelector(
    (state) => state.transactions.lastTransaction
  );

  useEffect(() => {
    setPages("first");
    alert("You can send money to unregistered users too! Try it!");
  }, []);

  useEffect(() => {
    if (lastTransfer) {
      if (lastTransfer.status === "confirmed") {
        navigation.navigate("SendMoneySuccess");
      } else {
        navigation.navigate("SendMoneyError");
      }
    }
  }, [lastTransfer]);

  const submitData = () => {
    makeTransfer();
    navigation.navigate("MyContacts");
    /* setTimeout() */
    dispatch(
      sendEmailToRegister({
        email: data.contact_email,
        urlApp: `http://${apiEndpoint}/email/redirect`,
        amount: transferAmount.amount,
        sender: loggedUser.info.email
      })
    );
  }; 

  console.log(loggedUser.info.email)

  const handleEmail = (email, value) => {
    setData({ ...data, [email]: value });
    if (data.contact_email) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const [transferAmount, setTransferAmount] = useState({
    amount: 0,
  });

  const makeTransfer = () => {
    let transferData = { 
      cvu_sender: loggedUser.info.account.cvu, 
      cvu_receiver: data.contact_email,
      // All transfer amounts have a 0 as 1st character, so we must get rid of it
      amount: parseInt(transferAmount.amount.toString()),
    };

    dispatch(addNewTransaction(transferData));
  };

  const formatValue = (value) => {
    return accounting.formatMoney(parseFloat(value));
  };

  const textInputChange = (val) => {
    if (val.length >= 1) {
      setTransferAmount({
        amount: val,
      });
    }
  };

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animatable.View animation="slideInRight" style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>New Transfer</Text>
            </View>
          </View>
          <View style={styles.body}>
            {pages === "first" ? (
              <Animatable.View animation="slideInRight" style={styles.section}>
                <View style={styles.Wrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Contact email"
                    value={data.contact_email}
                    autoCapitalize="none"
                    onChangeText={(value) =>
                      handleEmail("contact_email", value.trim())
                    }
                    placeholderTextColor={"rgba(0, 0, 0, 0.4);"}
                    fontWeight={"OpenSans_700Bold"}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    disabled={!disable}
                    style={[
                      styles.buttonConfirm,
                      disable === false
                        ? styles.buttonDisable
                        : styles.buttonAble,
                    ]}
                    onPress={() => setPages("second")}
                  >
                    <Text style={styles.textButton}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ) : pages === "second" ? (
              <View style={styles.whiteContainer}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#C4C4C4",
                    borderStyle: "solid",
                    marginLeft: 100,
                    marginRight: 100,
                  }}
                >
                  <TextInput
                    style={styles.textInputAmount}
                    autoCapitalize="none"
                    value={formatValue(transferAmount.amount)}
                  />
                  <TextInput
                    style={styles.textInputAmountHide}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    value={transferAmount.amount}
                  />
                </View>

                {/* <View style={styles.contact}>
                  <View style={styles.avatar}>
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "OpenSans_700Bold",
                        fontSize: 14,
                      }}
                    >
                      {selectedContactNameInitial}
                      {selectedContactSurnameInitial}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: 45,
                    }}
                  >
                    <Text style={styles.name}>
                      {destinatary.name} {destinatary.surname}
                    </Text>
                  </View>
                </View> */}
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={{
                      ...styles.buttonConfirm,
                      backgroundColor: "#521886",
                    }}
                    onPress={submitData}
                  >
                    <Text style={styles.textButton}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
};

export default SendMoneyUnregistered;

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
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "OpenSans_700Bold",
    fontSize: 18,
  },
  body: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -60,
    alignItems: "center",
  },
  bodySuccess: {
    flex: 1,
    backgroundColor: "#521886",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginTop: 227,
    justifyContent: "center",
    alignItems: "center",
  },
  Wrapper: {
    width: "80%",
    padding: 5,
    justifyContent: "center",
  },
  input: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
    padding: 5,
    color: "black",
  },
  buttonWrapper: {
    width: 379,
    height: 53,
    marginTop: 306,
  },
  buttonAble: {
    backgroundColor: "#521886",
  },
  buttonDisable: {
    backgroundColor: "rgba(82, 24, 134, 0.56)",
  },
  buttonConfirm: {
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    color: "white",
    fontFamily: "OpenSans_800ExtraBold",
    fontSize: 18,
  },
  headerSuccess: {
    color: "white",
    fontSize: 24,
    fontFamily: "OpenSans_800ExtraBold",
    marginTop: 208,
  },
  textSuccess: {
    color: "white",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    marginTop: 31,
    textAlign: "center",
  },
  buttonSuccess: {
    width: 379,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    height: 53,
  },
  textButtonSuccess: {
    color: "#521886",
    fontFamily: "OpenSans_700Bold",
    fontSize: 20,
  },
  whiteContainer: {
    top: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "100%",
  },
  textInputAmount: {
    height: 40,
    textAlign: "center",
    marginTop: 80,
    fontSize: 40,
    color: "#499174",
    fontFamily: "OpenSans_700Bold",
  },
  textInputAmountHide: {
    height: 40,
    textAlign: "center",
    marginTop: -40,
    fontSize: 32,
    color: "#168903",
    opacity: 0,
  },
});
