import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import Button from "../../components/Button";
import { enviarEmail } from "../../redux/actions/emailActions";
import { verifyEmail } from "../../redux/actions/emailActions";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
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
const SingleNumInput = ({ changed, id, _ref, _next }) => {
  return (
    <TextInput
      style={styles.numInput}
      keyboardType={"phone-pad"}
      maxLength={1}
      onChangeText={(value) => {
        changed(value, id);
        value && _next && _next.current.focus();
      }}
      ref={_ref}
    />
  );
};

export default function CodeVerification({ navigation, route }) {
  console.log("params", route.params);
  const validateEmail = useSelector((store) => store.email.newEmail);
  var verify = useSelector((store) => store.email.verify);
  console.log(verify);
  console.log(validateEmail.email);
  const dispatch = useDispatch();
  const [codeIn, setCodeIn] = React.useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
  });
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const handleInputChange = (value, id) => {
    console.log("ID: ", id, "value: ", value);
    setCodeIn({ ...codeIn, [id]: value });
  };

  const verification_code = parseInt(
    codeIn.A + codeIn.B + codeIn.C + codeIn.D + codeIn.E
  );
  console.log(verification_code);

  const mailAndCode = {
    valideId: verification_code,
    email: validateEmail.email,
  };

  const pin1 = useRef();
  const pin2 = useRef();
  const pin3 = useRef();
  const pin4 = useRef();
  const pin5 = useRef();

  useEffect(() => {
    if (verify.length > 0) {
      if (verify[0].isvalid === true) {
        navigation.navigate("RegisterPage", { email: mailAndCode.email });
      } else {
        Alert.alert("Invalid Code");
      }
    }
  }, [verify]);

  if(!fontsLoaded){
	  return <SplashScreen2 />
  } else {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
          <Text style={styles.text_header}>Create Account</Text>
        </View>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Formik
          initialValues={{
            code: verify,
          }}
          onSubmit={(values) => {
            const { code } = values;
            console.log(values);
            dispatch(verifyEmail(mailAndCode));
            console.log(verify);
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.textValidate}>Account validation</Text>
              <Text style={styles.textIndication}>
                Enter here the code that we sent to your email
              </Text>

              <View style={styles.row}>
                <SingleNumInput
                  changed={handleInputChange}
                  id={"A"}
                  _ref={pin1}
                  _next={pin2}
                />
                <SingleNumInput
                  changed={handleInputChange}
                  id={"B"}
                  _ref={pin2}
                  _next={pin3}
                />
                <SingleNumInput
                  changed={handleInputChange}
                  id={"C"}
                  _ref={pin3}
                  _next={pin4}
                />
                <SingleNumInput
                  changed={handleInputChange}
                  id={"D"}
                  _ref={pin4}
                  _next={pin5}
                />
                <SingleNumInput
                  changed={handleInputChange}
                  id={"E"}
                  _ref={pin5}
                  _next={null}
                  onSubmitEdittin={Keyboard.dismiss}
                />
              </View>

              <Text style={styles.textCode}>Did’nt receive the email?</Text>
              <TouchableOpacity
                onPress={() => dispatch(enviarEmail(mailAndCode))}
              >
                <Text style={styles.textCodeII}>Resend code</Text>
              </TouchableOpacity>

              <View style={styles.buttoncontainer}>
                <Button
                  mode="contained"
                  secureTextEntry={true}
                  title="Validate"
                  style={styles.buttons}
                  onPress={handleSubmit}
                >
                  <Text style={styles.validateTextButton}>Validate</Text>
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </Animatable.View>
    </View>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#521886",
  },
  inputContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 37,
    textAlign: "center",
    alignItems: "center",
  },
  textValidate: {
    textAlign: "center",
    fontSize: 24,
    color: "black",
    fontFamily: "OpenSans_700Bold",
  },
  textIndication: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 100,
    fontFamily: "OpenSans_700Bold",
    width: 268,
  },
  textCode: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 131,
    width: 294,
    fontFamily: "OpenSans_700Bold",
    width: 294,
  },
  textCodeII: {
    color: "#521886",
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    fontSize: 20,
  },
  btncontent: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  buttoncontainer: {
    flex: 1,
    alignItems: "center",
    // width: "auto",
    justifyContent: "flex-end",
  },
  buttons: {
    width: 379,
    marginBottom: 47,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#521886",
    marginTop: 47,
  },
  button: {
    marginBottom: 30,
    backgroundColor: "black",
  },
  row: {
    flexDirection: "row",
    marginTop: 38,
  },
  input: {
    height: 40,
    backgroundColor: "white",
  },
  numInput: {
    height: 45,
    width: 45,
    borderColor: "#A9A6A6",
    borderWidth: 1,
    borderRadius: 11,
    margin: 10,
    textAlign: "center",
    fontSize: 25,
    fontFamily: "OpenSans_700Bold",
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
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
  },
  validateTextButton: {
    fontSize: 18,
    fontFamily: "OpenSans_800ExtraBold",
  },
});
