import React, { useState } from "react";
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
import { Feather, AntDesign } from "@expo/vector-icons";
import { loginStateUser } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from 'expo-app-loading';

const LoginScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const dispatch = useDispatch();
  const loginUser = async (data) => dispatch(loginStateUser(data));

  const textInputChange = (val) => {
    if (val.length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
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
    if (val.trim().length >= 4) {
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

  const loginHandle = async () => {
    if (data.username.length === 0 || data.password.length === 0) {
      alert("Username or Password cannot be empty");
    }
    await loginUser(data);
  };

  if(!fontsLoaded){
    return <AppLoading/>
  }
  else {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <View style={styles.containerImg}>
            <Image
              style={styles.image}
              source={require("../../assets/MOBA.png")}
            />
            <Text style={styles.textContainerImg}>
              Your finances simple and fast.
            </Text>
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="rgba(0, 0, 0, 0.35)"
              style={styles.textInputUsername}
              autoCapitalize="none"
              value={data.username}
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />

            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn" style={styles.checkView}>
                <AntDesign name="checkcircle" size={21} color="green" />
              </Animatable.View>
            ) : null}
          </View>

          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long
              </Text>
            </Animatable.View>
          )}
          <View style={styles.action}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(0, 0, 0, 0.35)"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInputPassword}
              autoCapitalize="none"
              value={data.password}
              onChangeText={(val) => handlePasswordChange(val)}
            />

            <TouchableOpacity
              onPress={updateSecureTextEntry}
              style={styles.eyeView}
            >
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={21} />
              ) : (
                <Feather name="eye" color="grey" size={21} />
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
            <TouchableOpacity style={styles.signIn} onPress={loginHandle}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{flexDirection: "row"}}>
            <Text
              style={{
                marginTop: 12,
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.35)",
                fontFamily: "OpenSans_400Regular",
              }}
            >
              Forgot your login information?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotOptions")}>
                <Text
                  style={{ color: "#521886", fontFamily: "OpenSans_700Bold", fontSize: 16, marginTop: 12 }}
                >
                  Help
                </Text>
              </TouchableOpacity>
              </View>
            <View style={{flexDirection: "row"}}>
            <Text
              style={{
                marginTop: 149,
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.35)",
                fontFamily: "OpenSans_400Regular",
              }}
            >
              Not registered yet?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
              <Text
                style={{ color: "#521886", fontFamily: "OpenSans_700Bold", fontSize: 16, marginTop: 149}}
              >
                Create an account
              </Text>
              </TouchableOpacity>
              </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: "#fff"
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    flexDirection: "row",
  },
  action: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    borderWidth: 1,
    borderColor: "rgba(141, 138, 138, 0.54)",
    paddingBottom: 5,
    width: 359,
    height: 52,
    borderRadius: 10,
    backgroundColor: "rgba(83, 83, 83, 0.06)",
  },
  actionPassword: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 41,
    borderWidth: 1,
    borderColor: "rgba(141, 138, 138, 0.54)",
    paddingBottom: 5,
    width: 359,
    height: 52,
    borderRadius: 10,
    backgroundColor: "rgba(83, 83, 83, 0.06)",
  },
  textInputUsername: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 21,
    color: "black",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  textInputPassword: {
    flex: 1,
    paddingLeft: 21,
    color: "black",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
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
    marginTop: 21,
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
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  containerImg: {
    alignItems: "center",
  },
  image: {
    /* margintTop: 207, */
    height: 30,
    width: 113,
  },
  errorMsg: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
  },
  textContainerImg: {
    marginTop: 11,
    fontSize: 18,
    fontFamily: "OpenSans_700Bold",
  },
  checkView: {
    right: 17,
  },
  eyeView: {
    right: 17,
  },
  footer: {
    flex: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
});
