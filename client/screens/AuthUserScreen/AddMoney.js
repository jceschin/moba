import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import accounting from "accounting-js";
import {useSelector} from 'react-redux'
import axios from 'axios'
import {useDispatch} from 'react-redux'

const AddMoney = ({navigation}) => {
  const [code, setCode] = React.useState(false);
  const [transfer, setTransfer] = React.useState(false);
  const [amount, setAmount] = React.useState(false);
  const [amountCharge, setAmountCharge] = React.useState({
    amount: 0
  });
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(loggedUser.username);
  }, []);

  const tabCode = () => {
    transfer === true ? setTransfer(false) : null;
  };

  const tabTransfer = () => {
    code === false ? setTransfer(true) : null;
  };

  const amountScreen = () => {
    setAmount(true);
  };

  console.log("amount", amountCharge.amount);

  const textInputChange = (val) => {
    if (val.length >= 1) {
      setAmountCharge({
        ...amountCharge,
        amount: val,
      });
    }
  };

  const formatValue = (value) => {
    return accounting.formatMoney(parseFloat(value));
  };

  async function getUser(username) {
    let response = await axios.get(`http://localhost:8080/users/${username}`, {
      headers: { Authorization: `Bearer ${loggedUser.data.data.token}` },
    });

    setUser(response.data);
  }

  async function addMoney(chargeCode) {
    let response = await axios.put(`http://localhost:8080/accounts/recharge/${user.account.rechargeCode}`, {
      headers: {Authorization: `Bearer ${loggedUser.data.data.token}`},
      amount: amountCharge.amount,
    })
    console.log(response)
    alert(`The charge to your account of $${amountCharge.amount} has been completed successfully`)
    navigation.navigate("HomePage")
  }
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8CA5FD" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            style={{ right: 10 }}
          />
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
                  }}
                >
                  Code
                </Text>
              </TouchableOpacity>
              <View style={styles.hairline} />
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity onPress={tabTransfer}>
                <Text
                  style={{
                    fontSize: 20,
                    paddingLeft: 50,
                  }}
                >
                  Transfer
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hairline} />
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
            <View styles={styles.amountView}>
              <View style={{ paddingTop: 34 }}>
                <Text style={{ fontSize: 20 }}>
                  How much you want to charge?
                  {"\n"}
                  The minimum amount is $100
                </Text>

                <View
                  style={{
                    color: "#168903",
                    top: "50%",
                    left: "35%",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={styles.textInputAmount}
                    autoCapitalize="none"
                    value={formatValue(amountCharge.amount)}
                  />
                  <TextInput
                    style={styles.textInputAmountHide}
                    autoCapitalize="none"
                    value={amountCharge.amount}
                    onChangeText={(val) => textInputChange(val)}
                  />
                </View>

                <TouchableOpacity
                  style={styles.continueCharge}
                  onPress={amountScreen}
                >
                  <Text style={{ fontSize: 18, color: "#fff" }}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
        {code === false && transfer === false && amount === true ? (
          <View styles={styles.codePayment}>
            <View style={{ textAlign: "center", paddingTop: 20 }}>
              <Text style={{ fontSize: 16 }}>
                Use this code to charge money to your account.
              </Text>
            </View>
            <View style={styles.qrCodeComponent}>
              <View
                style={{
                  paddingBottom: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 40,
                  width: 196,
                  height: 55,
                  borderBottomWidth: 1,
                  borderBottomColor: "#8CA5FD",
                }}
              >
                <Text style={{ fontSize: 18 }}>{user.account ? user.account.rechargeCode : null}</Text>
              </View>
            </View>
            <View style={{ textAlign: "center", paddingTop: 60 }}>
              <Text style={{ fontSize: 16 }}>
                Show this code to the cashier in any of this branches.
                {"\n"}
                <View style={{ flexDirection: "row", paddingTop: 30 }}>
                  <Image
                    source={require("../../assets/rapipagoLogo.png.png")}
                    style={styles.imageRapipago}
                  />
                  <Image
                    source={require("../../assets/pagofacilLogo.png.png")}
                    style={styles.imagePagoFacil}
                  />
                </View>
              </Text>
            </View>
            <View style={{ paddingTop: 200, alignItems: "center" }}>
              <TouchableOpacity style={styles.confirmCharge} onPress={() => dispatch(addMoney)}>
                <Text style={{ fontSize: 18, color: "#fff" }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : transfer === true && code === false ? (
          <View style={styles.transferPayment}>
            <View style={{ paddingTop: 29 }}>
              <Text style={{ fontSize: 16 }}>
                These are your account details, copy them to make a transfer
              </Text>
            </View>
            <View
              style={{
                paddingTop: 30,
                width: 375,
                height: 214,
                borderWidth: 1,
                borderColor: "#E3DADA",
                alignItems: "center",
                top: 30,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold", top: 15 }}>
                Account Number
              </Text>
              <Text style={{ fontSize: 16, paddingTop: 9 }}>
                {user.account ? user.account.cvu: null}
              </Text>
              <View style={{ justifyContent: "space-between" }}>
                <TouchableOpacity style={styles.copyButton}>
                  <Text
                    style={{
                      color: "#0000EE",
                      fontSize: 18,
                      fontWeight: "500",
                      paddingLeft: 10,
                    }}
                  >
                    <View style={{ right: 17 }}>
                      <Feather name="copy" size={28} color="black" />
                    </View>
                    Copy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8CA5FD",
  },
  hairline: {
    height: 3,
    width: 220,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    flexDirection: "row",
  },
  welcomeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    right: 15,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 30,
    marginTop: -80,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  codePayment: {},
  confirmCharge: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#567BFF",
  },
  qrCodeComponent: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageRapipago: {
    width: 133,
    height: 24,
    top: 30,
    right: 15,
  },
  imagePagoFacil: {
    width: 80,
    height: 83,
    left: 15,
  },
  transferPayment: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  copyButton: {
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#E3DADA",
    borderWidth: 1,
    top: 40,
  },
  continueCharge: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#567BFF",
    top: 300,
  },
  textInputAmount: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    /* paddingLeft: 10, */
    color: "#168903",
    fontSize: 24,
  },
  textInputAmountHide: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    /* paddingLeft: 10, */
    color: "#168903",
    fontSize: 24,
    marginTop: -30,
    opacity: 0,
  },
});
