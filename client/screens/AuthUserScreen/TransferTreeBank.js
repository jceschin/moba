import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import SplashScreen2 from "../HomeScreen/SplashScreen2";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import accounting from "accounting-js";

const RegisterPage = ({ navigation, route }) => {
  const { handleSubmit, control, errors } = useForm();
  const dispatch = useDispatch();
  let loggedUser = useSelector((state) => state.user);
  const [data, setData] = useState({
    amount: 0,
    description: "",
    contactId: "",
    cvuSender: loggedUser.info.account.cvu,
  });

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const [pages, setPages] = useState("");
  const [focus, setFocus] = useState("");
  const [disableFirst, setDisableFirst] = useState(false);
  const formatValue = (value) => {
    return accounting.formatMoney(parseFloat(value));
  };

  useEffect(() => {
    if (lastTransfer) {
      if (lastTransfer.status === "confirmed") {
        navigation.navigate("SendMoneySuccess");
      } else {
        navigation.navigate("SendMoneyError");
      }
    }
  }, [lastTransfer]);

  const lastTransfer = useSelector(
    (state) => state.transactions.lastTransaction
  );

  useEffect(() => {
    setPages("first");
  }, []);

  useEffect(() => {
    if (data.amount && data.description && data.contactId) {
      setDisableFirst(true);
    } else {
      setDisableFirst(false);
    }
  });

  const onChangeAmount = (val) => {
    if (val >= 1) {
      setData({
        ...data,
        amount: val,
      });
    }
    if (!val) {
      setData({
        ...data,
        amount: 0,
      });
    }
  };

  const onChangeDescription = (val) => {
    if (val.length >= 1) {
      setData({
        ...data,
        description: val,
      });
    } else {
      setData({
        ...data,
        description: val,
      });
    }
  };

  const onChangeContactId = (val) => {
    if (val.length >= 1) {
      setData({
        ...data,
        contactId: val,
      });
    } else {
      setData({
        ...data,
        contactId: val,
      });
    }
  };

  const onSubmit = () => {
    if (!data.amount && !data.description && !data.contactId) {
      Alert.alert("You need to fill all the fields");
    } else {
      /* dispatch(createNewUser({ ...data, email: route.params.email })); */
      navigation.navigate("SendMoneySuccess");
    }
  };

  const buttonFirstPage = () => {
    if (data.amount && data.description && data.contactId) {
      setPages("second");
    } else {
      setDisableFirst(false);
      Alert.alert("You need to fill all the fields to continue");
    }
  };

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("MyContacts")}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.title}>Transfer to another bank</Text>

            <View
              style={[
                focus === "amount"
                  ? styles.inputcontainerOneFocus
                  : styles.inputcontainerOne,
              ]}
            >
              <TextInput
                style={styles.textInputAmount}
                autoCapitalize="none"
                value={formatValue(data.amount)}
                onFocus={() => setFocus("amount")}
              />
              <TextInput
                style={styles.textInputAmountHide}
                autoCapitalize="none"
                onChangeText={(val) => onChangeAmount(val)}
                value={data.amount}
                placeholder="0"
                onFocus={() => setFocus("amount")}
              />
            </View>

            <View
              style={[
                focus === "contactId"
                  ? styles.inputcontainerTwoFocus
                  : styles.inputcontainerTwo,
              ]}
            >
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeContactId(text)}
                value={data.contactId}
                placeholder="Insert the contact to transfer"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                maxLength={20}
                onFocus={() => setFocus("contactId")}
              />
            </View>

            <View
              style={[
                focus === "description"
                  ? styles.inputcontainerThreeFocus
                  : styles.inputcontainerThree,
              ]}
            >
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeDescription(text)}
                value={data.description}
                placeholder="Add a description"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                maxLength={20}
                onFocus={() => setFocus("description")}
              />
            </View>

            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                disabled={!disableFirst}
                style={[
                  styles.button,
                  disableFirst === false
                    ? styles.buttonDisable
                    : styles.buttonAble,
                ]}
                onPress={onSubmit}
              >
                <Text style={styles.btncontent}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    position: "relative",
    marginTop: 10,
    width: "100%",
  },
  title: {
    fontFamily: "OpenSans_700Bold",
    color: "black",
    fontSize: 24,
    marginTop: 47,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  textError: {
    color: "red",
    left: 8,
  },
  inputcontainerOne: {
    width: 258,
    marginTop: 39,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  inputcontainerOneFocus: {
    width: 258,
    marginTop: 39,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: "#6D00CE",
  },
  inputcontainerTwo: {
    width: 258,
    marginTop: 85,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  inputcontainerTwoFocus: {
    width: 258,
    marginTop: 85,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#6D00CE",
    paddingBottom: 5,
  },
  inputcontainerThree: {
    width: 258,
    marginTop: 85,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  inputcontainerThreeFocus: {
    width: 258,
    marginTop: 85,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#6D00CE",
    paddingBottom: 5,
  },
  input: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    width: 300,
    padding: 5,
    height: 40,
    color: "black",
  },
  buttoncontainer: {
    position: "relative",
    width: "auto",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 300,
    marginTop: 100,
    backgroundColor: "#521886",
  },
  buttonAble: {
    backgroundColor: "#521886",
  },
  buttonDisable: {
    backgroundColor: "rgba(82, 24, 134, 0.56)",
  },
  buttonSubmit: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 300,
    marginTop: 160,
    backgroundColor: "#521886",
  },
  btncontent: {
    fontSize: 18,
    fontFamily: "OpenSans_800ExtraBold",
    color: "#fff",
  },
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
  textInputStype: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
  },
  textInputAmount: {
    height: 40,
    textAlign: "center",
    marginTop: 0,
    fontSize: 18,
    paddingLeft: 10,
    /* color: "#499174", */
    fontFamily: "OpenSans_700Bold",
  },
  textInputAmountHide: {
    height: 90,
    textAlign: "center",
    marginTop: -20,
    fontSize: 98,
    left: -40,
    color: "#499174",
    fontFamily: "OpenSans_700Bold",
    opacity: 0,
  },
});
