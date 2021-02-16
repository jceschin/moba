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
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword,
  clearPass,
  cleanEmailOrUsername,
  clearToken,
} from "../../redux/actions/emailActions";
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
const FormNewPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const emailToken = useSelector(
    (store) =>
      store.email.emailOrUsername[0] &&
      store.email.emailOrUsername[0].emailToken
  );
  const pass = useSelector((store) => store.email.pass);
  const [data, setData] = useState({
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidPassword: true,
  });
  const [focusPassword, setFocusPassword] = useState(false);

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
  };

  const handlePasswordChange = (val) => {
    if (validatePassword(val.trim())) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const mailAndPass = {
    dataUser: emailToken,
    password: data.password,
  };

  const confirmPassword = () => {
    dispatch(updatePassword(mailAndPass));
    Alert.alert("Password changed succesfully");
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (pass.length > 0) {
      if (pass[0].changePassword === "Password changed succesfully") {
        dispatch(clearPass());
        dispatch(cleanEmailOrUsername());
        navigation.navigate("Login");
      }
      if (pass[0].changePassword === "user not exists") {
        alert("user not exists");
        dispatch(clearPass());
      }
    }
  }, [pass]);

  const changeFocusPassword = () => {
    if (focusPassword === false) {
      setFocusPassword(true);
    }
  };

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>

            <View style={styles.welcomeView}>
              <Text style={styles.text_header}>New Password</Text>
            </View>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              <Text style={styles.textRecover}>Insert your new password</Text>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor:
                    focusPassword === false ? "#f2f2f2" : "#521886",
                  paddingBottom: 5,
                }}
              >
                <TextInput
                  placeholder="New password"
                  placeholderTextColor="#D3D0D0"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInputPassword}
                  autoCapitalize="none"
                  value={data.password}
                  onChangeText={(val) => handlePasswordChange(val)}
                  onFocus={changeFocusPassword}
                />

                <TouchableOpacity
                  onPress={updateSecureTextEntry}
                  style={styles.eyeView}
                >
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={22} />
                  ) : (
                    <Feather name="eye" color="grey" size={22} />
                  )}
                </TouchableOpacity>
              </View>
              {data.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Your new password must contain at least 1 uppercase, 1
                    number and 8 characters
                  </Text>
                </Animatable.View>
              )}

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => confirmPassword()}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};
export default FormNewPassword;

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
  welcomeView: {
    flex: 1,
    alignItems: "center",
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
  textInputPassword: {
    flex: 1,
    marginTop: 45,
    paddingLeft: 10,
    color: "black",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
  },
  button: {
    alignItems: "center",
    marginTop: 309,
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
  errorMsg: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
  },
  textRecover: {
    fontFamily: "OpenSans_700Bold",
    color: "black",
    fontSize: 20,
    marginTop: 30,
  },
  eyeView: {
    right: 17,
    top: 48,
  },
});
