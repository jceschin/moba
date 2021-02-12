import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Share,
} from "react-native";
import { Feather, AntDesign, Fontisto } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import accounting from "accounting-js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserInfo, chargeAccount } from "../../redux/actions/user";
import { getUserTransactions } from "../../redux/actions/transactionActions";
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
import Clipboard from "expo-clipboard";

const AddMoney = ({ navigation, route }) => {
  const [code, setCode] = React.useState(false);
  const [transfer, setTransfer] = React.useState(false);
  const [amount, setAmount] = React.useState(false);
  const [amountCharge, setAmountCharge] = useState({
    amount: 0,
  });
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.user);
  let cvuInfo = useSelector((state) => state.user.info.account.cvu);
  const [user, setUser] = useState({});
  const [index, setIndex] = useState(0);
  const [valid, setValid] = useState(false);

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const tabCode = () => {
    transfer === true ? setTransfer(false) : null;
  };

  const tabTransfer = () => {
    code === false ? setTransfer(true) : null;
  };

  const amountScreen = () => {
    if (amountCharge.amount >= 100) {
      setAmount(true);
    } else {
      Alert.alert("The minimum amount to charge is $100");
    }
  };

  console.log("amount", amountCharge.amount);

  const textInputChange = (val) => {
    if (val.length >= 1) {
      setAmountCharge({
        ...amountCharge,
        amount: val,
      });
    }
    if (!val) {
      setAmountCharge({
        ...amountCharge,
        amount: 0,
      });
    }
  };

  useEffect(() => {
    amountCharge.amount < 100 ? setValid(false) : setValid(true);
  });

  console.log(valid);

  const formatValue = (value) => {
    return accounting.formatMoney(parseFloat(value.toString()));
  };

  const addMoneyUser = () => {
    dispatch(
      chargeAccount(loggedUser.info.account.rechargeCode, {
        amount: amountCharge.amount,
      })
    );
    setTimeout(() => {
      alert("The charge to your account has been completed successfully");
      dispatch(
        getUserTransactions(loggedUser.username, loggedUser.data.data.token)
      );
      navigation.navigate("HomePage");
    }, 1000);
  };

  useEffect(() => {
    dispatch(getUserInfo(loggedUser.username));
  }, []);

  const shareCvu = async () => {
    try {
      const result = await Share.share(
        {
          message: cvuInfo,
        },
        { excludedActivityTypes: ["net.whatsapp.Whatsapp.ShareExtension"] }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(cvuInfo.toString());
    Alert.alert("Copy to clipboard");
  };

  console.log("user", user);
  console.log("loggedUser", loggedUser);

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.welcomeView}>
            <Text style={styles.text_header}>Add money to your account</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <View>
              <View>
                <TouchableOpacity onPress={tabCode}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingLeft: 75,
                      color:
                        code === false && transfer === false
                          ? "#521886"
                          : "gray",
                    }}
                  >
                    Code
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: 3,
                    width: 260,
                    marginRight: 80,
                    backgroundColor:
                      code === false && transfer === false
                        ? "#521886"
                        : "#f2f2f2",
                  }}
                />
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity onPress={tabTransfer}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingLeft: 60,
                      color:
                        code === false && transfer === true
                          ? "#521886"
                          : "gray",
                    }}
                  >
                    Transfer
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 3,
                  width: 280,
                  backgroundColor:
                    code === false && transfer === true ? "#521886" : "#f2f2f2",
                }}
              />
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {code === false && transfer === false && amount === false ? (
              <View style={styles.amountView}>
                <Text style={styles.textRecover}>
                  How much you want to charge?
                  {"\n"}
                  The minimum amount is{" "}
                  <Text style={{ color: "rgba(73, 145, 116, 1)" }}>$100</Text>
                </Text>

                <TextInput
                  style={[
                    styles.textInputAmount,
                    valid === false
                      ? styles.textInputColorInvalid
                      : styles.textInputColorValid,
                  ]}
                  autoCapitalize="none"
                  value={formatValue(amountCharge.amount)}
                />
                <TextInput
                  style={styles.textInputAmountHide}
                  autoCapitalize="none"
                  value={amountCharge.amount}
                  onChangeText={(val) => textInputChange(val)}
                />

                <TouchableOpacity
                  style={styles.continueCharge}
                  onPress={amountScreen}
                >
                  <Text style={styles.textButton}>Continue</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {code === false && transfer === false && amount === true ? (
            <View styles={styles.codePayment}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.textRecover}>
                  Use this code to charge
                  {"\n"}
                  money to your account.
                </Text>
              </View>
              <View style={styles.qrCodeComponent}>
                <Text style={styles.accountRechargeCode}>
                  {loggedUser && loggedUser.info
                    ? loggedUser.info.account.rechargeCode
                    : null}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.textRecover}>
                  Show this code to the cashier in
                  {"\n"}
                  any of this branches.
                </Text>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/rapipagoLogo.png.png")}
                    style={styles.imageRapipago}
                  />
                  <Image
                    source={require("../../assets/pagofacilLogo.png.png")}
                    style={styles.imagePagoFacil}
                  />
                </View>
              </View>

              <View style={{ paddingTop: 80, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.confirmCharge}
                  onPress={addMoneyUser}
                >
                  <Text style={styles.textButton}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : transfer === true && code === false ? (
            <View style={styles.transferPayment}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.textRecover}>
                  These are your account details,
                  {"\n"}
                  copy them to make a transfer
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 30,
                  width: 351,
                  height: 168,
                  borderWidth: 1,
                  borderColor: "#CCCCCC",
                  alignItems: "center",
                  top: 42,
                }}
              >
                <Text style={styles.titleAccountNumber}>Account Number</Text>
                <Text style={styles.textCvu}>
                  {loggedUser.info ? loggedUser.info.account.cvu : null}
                </Text>
                <View style={{ flexDirection: "row", paddingTop: 38 }}>
                  <View
                    style={{ justifyContent: "center", flexDirection: "row" }}
                  >
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={copyToClipboard}
                    >
                      <View style={{ paddingRight: 5 }}>
                        <Feather name="copy" size={20} color="#38046C" />
                      </View>
                      <Text style={styles.copyButtonText}>Copy</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{ justifyContent: "center", flexDirection: "row" }}
                  >
                    <TouchableOpacity
                      style={styles.shareButton}
                      onPress={shareCvu}
                    >
                      <View style={{ paddingRight: 5 }}>
                        <Fontisto name="share-a" size={18} color="white" />
                      </View>
                      <Text style={styles.shareButtonText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
};

export default AddMoney;

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
    marginBottom: 12
  },
  welcomeView: {
    flex: 1,
    alignItems: "center",
  },
  footer: {
    flex: 5,
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
    fontFamily: "OpenSans_800ExtraBold",
    fontSize: 18,
  },
  textRecover: {
    fontFamily: "OpenSans_600SemiBold",
    color: "black",
    fontSize: 18,
    marginTop: 90,
  },
  codePayment: {
    alignItems: "center",
  },
  confirmCharge: {
    width: 379,
    marginBottom: 47,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#521886",
  },
  qrCodeComponent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  imageRapipago: {
    width: 152,
    height: 25,
    marginTop: 32,
  },
  imagePagoFacil: {
    width: 90,
    height: 102,
    marginTop: 29,
  },
  transferPayment: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  copyButton: {
    width: 131,
    height: 34,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#38046C",
    borderWidth: 1,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  shareButton: {
    backgroundColor: "rgba(82, 24, 134, 1)",
    width: 131,
    height: 34,
    marginLeft: 25,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  copyButtonText: {
    color: "rgba(56, 4, 108, 1)",
    fontSize: 17,
    fontFamily: "OpenSans_600SemiBold",
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "OpenSans_600SemiBold",
  },
  continueCharge: {
    width: 379,
    marginBottom: 47,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#521886",
    marginTop: 210,
  },
  textInputAmount: {
    fontSize: 34,
    marginTop: 133,
  },
  textInputColorValid: {
    color: "rgba(73, 145, 116, 1)",
  },
  textInputColorInvalid: {
    color: "rgba(204, 24, 51, 1)",
  },
  textInputAmountHide: {
    color: "#168903",
    fontSize: 34,
    marginTop: -32,
    opacity: 0,
  },
  amountView: {
    alignItems: "center",
  },
  textButton: {
    fontSize: 18,
    fontFamily: "OpenSans_800ExtraBold",
    color: "#fff"
  },
  accountRechargeCode: {
    color: "#38046C",
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
  },
  titleAccountNumber: {
    fontFamily: "OpenSans_800ExtraBold",
    fontSize: 18,
    color: "black",
  },
  textCvu: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "black",
    top: 19,
  },
});
