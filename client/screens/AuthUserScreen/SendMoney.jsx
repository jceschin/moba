import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import accounting from "accounting-js";

// Fonts
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

//Redux functions
import { getContactInfo } from "../../redux/actions/contactActions";
import {
  addNewTransaction,
  getUserTransactions,
} from "../../redux/actions/transactionActions";

const SendMoney = ({ route }) => {

  // Fonts
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  // Redux
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const destinatary = useSelector((state) => state.contacts.selectedContact);
  const lastTransfer = useSelector(
    (state) => state.transactions.lastTransaction
  );

  // Params
  const {
    selectedContactUsername,
    selectedContactNameInitial,
    selectedContactSurnameInitial,
  } = route.params;

  // Amount to be transfered
  const [transferAmount, setTransferAmount] = useState({
    amount: 0,
  });

  // Navigation and Form
  const navigation = useNavigation();
  const { handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getContactInfo(selectedContactUsername));
  }, []);

  const textInputChange = (val) => {
    if (val.length >= 1) {
      setTransferAmount({
        amount: val,
      });
    }
  };

  const onSubmit = () => {
    makeTransfer();
  };

  function makeTransfer() {
    let transferData = {
      cvu_sender: loggedUser.info.account.cvu,
      cvu_receiver: destinatary.account.cvu,
      // All transfer amounts have a 0 as 1st character, so we must get rid of it
      amount: parseInt(transferAmount.amount.toString()),
    };

    dispatch(addNewTransaction(transferData));

    // axios.post(`http://localhost:8080/transaction`, transferData)
    //     .then(res => {
    //         console.log(transferData);
    //         console.log(res);
    //         navigation.navigate("SendMoneySuccess");
    //     })
    //     .catch(error => {
    //         navigation.navigate("SendMoneyError");
    //     })
  }

  // Style functions
  const formatValue = (value) => {
    return accounting.formatMoney(parseFloat(value));
  };

  useEffect(() => {
    if (lastTransfer) {
      if (lastTransfer.status === "confirmed") {
        navigation.navigate("SendMoneySuccess");
      }
      else{
        navigation.navigate("SendMoneyError");
      }
    }
  }, [lastTransfer]);

  return (
    <View style={styles.colorContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          // style={{ position: "absolute" }}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.greeting}>Send money</Text>
        </View>
      </View>
      <View style={styles.whiteContainer}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#C4C4C4",
            borderStyle: "solid",
            marginLeft: 100,
            marginRight: 100
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
        <View style={styles.contact}>
          <View style={styles.avatar}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'OpenSans_700Bold',
                fontSize: 18
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
            }}
          >
            <Text style={styles.name}>
              {destinatary.name} {destinatary.surname}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.btnContent}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    backgroundColor: "#521886",
    opacity: 0.9,
  },
  container: {
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 18,
    marginRight: 18,
    top: 24
  },
  greeting: {
    color: "white",
    fontSize: 20,
    fontFamily: 'OpenSans_700Bold'
  },
  whiteContainer: {
    top: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "100%",
  },
  button: {
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#521886",
    marginRight: 18,
    marginLeft: 18,
    top: 315,
  },
  btnContent: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  avatar: {
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: "#CC1833",
    padding: 10,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "black",
    fontSize: 18,
    fontFamily: 'OpenSans_600SemiBold'
  },
  contact: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "center",
    marginTop: 30,
    height: 41,
  },
  textInputAmount: {
    height: 40,
    textAlign: "center",
    marginTop: 80,
    fontSize: 40,
    color: "#499174",
    fontFamily: 'OpenSans_700Bold'
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
