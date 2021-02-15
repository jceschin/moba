import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { usernameRecovery } from "../../redux/actions/emailActions";
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
const UsernameRecovery = ({ navigation }) => {
  var username = useSelector((store) => store.email.username);
  console.log(username);

  const [data, setData] = useState({
    mail: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const [focusUsername, setFocusUsername] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const changeFocusUser = () => {
    if (focusUsername === false) {
      setFocusUsername(true);
    }
    if (focusPassword === true) {
      setFocusPassword(false);
    }
  };

  const changeFocusPassword = () => {
    if (focusUsername === true) {
      setFocusUsername(false);
    }
    if (focusPassword === false) {
      setFocusPassword(true);
    }
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  console.log(data.mail);

  const mailAndPass = {
    mail: data.mail,
    password: data.password,
  };
  console.log(mailAndPass);
  const dispatch = useDispatch();

  const textInputChange = (val) => {
    if (validateEmail(val)) {
      setData({
        ...data,
        mail: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        mail: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
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

  const handleValidUser = (val) => {
    if (validateEmail(val.trim())) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  useEffect(() => {
    if (username.length > 0) {
      if (username[0].foundUsername === true) {
        alert("We have sent the username to your email box");
        navigation.navigate("Login");
      } else {
        alert("Invalid password or email");
      }
    }
  }, [username]);

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>

          <View style={styles.welcomeView}>
            <Text style={styles.text_header}>Recover your username</Text>
          </View>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={styles.textRecover}>
              Insert your email and password to help us to recover your username
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 39,
                borderBottomWidth: 1,
                borderBottomColor:
                  focusUsername === false ? "#f2f2f2" : "#521886",
                paddingBottom: 5,
              }}
            >
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#D3D0D0"
                style={styles.textInputUsername}
                autoCapitalize="none"
                value={data.username}
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                onFocus={changeFocusUser}
              />

              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn" style={styles.checkView}>
                  <AntDesign name="checkcircle" size={21} color="green" />
                </Animatable.View>
              ) : null}
            </View>

            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Insert a valid email</Text>
              </Animatable.View>
            )}

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
                placeholder="Enter your password"
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
                  Password must be 8 characters long
                </Text>
              </Animatable.View>
            )}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => dispatch(usernameRecovery(mailAndPass))}
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
    );
  }
};

export default UsernameRecovery;

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
    fontSize: 20,
  },
  textInputUsername: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "black",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
  },
  textInputPassword: {
    flex: 1,
    marginTop: 45,
    paddingLeft: 10,
    color: "black",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
  },
  forgot_username: {
    marginBottom: 30,
    left: 10,
  },
  forgot_password: {
    left: 10,
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
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  checkView: {
    right: 17,
    top: -8,
  },
  eyeView: {
    right: 17,
    top: 38,
  },
});
