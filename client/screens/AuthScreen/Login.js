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
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = ({ navigation }) => {
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

  const loginHandle = async (userName, password) => {
    if (data.username.length === 0 || data.password.length === 0) {
      alert("Username or Password cannot be empty");
    }
    await loginUser(data);
  };

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
          <Text style={styles.text_header}>Welcome</Text>
        </View>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <View style={styles.containerImg}>
            <Image
              style={styles.image}
              source={require("../../assets/MOBA.png")}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Username"
              style={styles.textInputUsername}
              autoCapitalize="none"
              value={data.username}
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />

            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <AntDesign name="checkcircleo" size={14} color="green" />
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

          <TouchableOpacity>
            <Text style={styles.forgot_username}>Forgot your username?</Text>
          </TouchableOpacity>

          <View style={styles.action}>
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInputPassword}
              autoCapitalize="none"
              value={data.password}
              onChangeText={(val) => handlePasswordChange(val)}
            />

            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
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

          <TouchableOpacity>
            <Text style={styles.forgot_password}>Forgot your password?</Text>
          </TouchableOpacity>

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
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8CA5FD",
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
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -80,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInputUsername: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 16,
  },
  textInputPassword: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 16,
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
    marginTop: 300,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#567BFF",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  containerImg: {
    alignItems: "center",
  },
  image: {
    marginBottom: 72,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
});
