import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { enviarEmail } from "../../redux/actions/emailActions";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from 'expo-app-loading';
import SplashScreen2 from "../HomeScreen/SplashScreen2";
const CreateAccount = (props) => {
  const dispatch = useDispatch();
  const validateEmail = useSelector((store) => store.email.newEmail);
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  const [interruptor, setinterruptor] = useState(false);
  const [state, setstate] = useState({
    email: "",
    isValidEmail: true,
    check_textInputChange: false
  });
  const [focusEmail, setFocusEmail] = useState(false);

  const changeFocusEmail = () => {
    focusEmail === false ? setFocusEmail(true) : false;
  };

  const handleChangeText = (name, value) => {
    setstate({ ...state, [name]: value });
    if (valideEmail(value)) {
      setstate({
        ...state,
        email: value,
        check_textInputChange: true,
        isValidEmail: true,
      });
    } else {
      setstate({
        ...state,
        email: value,
        check_textInputChange: false,
        isValidEmail: false,
      });
    }
  };

  function valideEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const createNewUser = () => {
    const expReg = /\S+@\S+\.\S+/;
    const esValido = expReg.test(state.email);
    if (state.email === "") {
      alert("Please provide an email");
      return;
    }
    if (esValido === false) {
      alert("Please enter a valid email");
    } else {
      dispatch(enviarEmail(state));
      props.navigation.navigate("Validation");
    }
  };

  const handleValidEmail = (val) => {
    if (valideEmail(val.trim())) {
      setstate({
        ...state,
        isValidEmail: true,
      });
    } else {
      setstate({
        ...state,
        isValidEmail: false,
      });
    }
  };

  if(!fontsLoaded){
    return <SplashScreen2 />
  } else {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
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
        <ScrollView>
          <Text style={styles.textIndication}>Enter your email</Text>
          {validateEmail ? (
            interruptor === false ? (
              <Text style={styles.textLegend}>
                We are going to send you an email to start creating your account
              </Text>
            ) : (
              <Text style={styles.textValidate}>
                Waiting for you to validate the email
              </Text>
            )
          ) : null}

          <View
            style={{
              flexDirection: "row",
              marginTop: 77,
              borderBottomWidth: 1,
              borderBottomColor: focusEmail === false ? "#f2f2f2" : "#521886",
              paddingBottom: 5,
              alignItems: "center"
            }}
          >
            <TextInput
              style={styles.textInputEmail}
              placeholder="Email"
              onChangeText={(value) => handleChangeText("email", value)}
              onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
              onFocus={changeFocusEmail}
            />

            {state.check_textInputChange ? (
            <Animatable.View animation="bounceIn" style={styles.checkView}>
              <AntDesign name="checkcircle" size={21} color="green" />
            </Animatable.View>
          ) : null}
          </View>

          {state.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Insert a valid email
            </Text>
          </Animatable.View>
        )}

          <View style={styles.buttonContainer}>
            {interruptor === false ? (
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => createNewUser()}
              >
                <Text style={styles.btncontent}>Send email</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => createNewUser()}
              >
                <Text style={styles.btncontent}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
}

export default CreateAccount;

const styles = StyleSheet.create({
  textIndication: {
    fontFamily: "OpenSans_700Bold",
    color: "black",
    fontSize: 24,
    marginTop: 30,
  },
  textLegend: {
    marginTop: 11,
    fontSize: 18,
    fontFamily: "OpenSans_700Bold",
  },
  textValidate: {
    fontFamily: "Roboto",
    textAlign: "center",
    fontSize: 25,
    lineHeight: 21,
    marginTop: 35,
    color: "#663399",
    fontWeight: "bold",
  },
  inputContainer: {
    position: "absolute",
    padding: 35,
    width: 414,
    height: 833,
    left: 0,
    marginTop: 71,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  subcontainer: {
    flex: 1,
    position: "absolute",
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 241,
  },
  buttons: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#521886",
  },
  btncontent: {
    fontSize: 18,
    fontFamily: "OpenSans_800ExtraBold",
    color: "#fff"
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
    textAlign: "center"
  },
  text_header: {
    color: "#fff",
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
  },
  textInputEmail: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: "black",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center"
  },
  containerImg: {
    alignItems: "center",
  },
  errorMsg: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
    marginTop: 5,
  },
  checkView: {
    right: 17,
    top: -8,
  },
});
