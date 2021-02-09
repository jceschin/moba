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
  Image,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { passwordRecovery } from "../../redux/actions/emailActions";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading";

const PasswordRecovery = ({ navigation }) => {
  var emailOrUsername = useSelector((store) => store.email.emailOrUsername);
  console.log(emailOrUsername);

  const token = useSelector((store) => store.email.token);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    usernameOrEmail: "",
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

  const changeFocusUser = () => {
    focusUsername === false ? setFocusUsername(true) : false;
  };

  const textInputChange = (val) => {
    if (val.length >= 4) {
      setData({
        ...data,
        usernameOrEmail: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        usernameOrEmail: val,
        check_textInputChange: false,
        isValidUser: false,
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

  useEffect(() => {
    if (emailOrUsername.length > 0) {
      console.log(emailOrUsername.length);

      if (emailOrUsername[0].emailOrUsername === true) {
        alert("We have sent to your email the code to reset your password");
        navigation.navigate("TokenRecovery");
      } else {
        alert("Email or username not found");
      }
    }
  }, [emailOrUsername]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
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
            <Text style={styles.text_header}>Recover your password</Text>
          </View>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={styles.textRecover}>
              Insert your email or username to help us to recover your password
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 77,
                borderBottomWidth: 1,
                borderBottomColor:
                  focusUsername === false ? "#f2f2f2" : "#521886",
                paddingBottom: 5,
              }}
            >
              <TextInput
                placeholder="Enter your username or email"
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
                <Text style={styles.errorMsg}>
                  Insert a valid email or username
                </Text>
              </Animatable.View>
            )}

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() =>
                  dispatch(passwordRecovery({ dataUser: data.usernameOrEmail }))
                }
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

export default PasswordRecovery;

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
    alignItems: "center"
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
  textInputUsername: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "black",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
  },
  button: {
    alignItems: "center",
    marginTop: 342,
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
  containerImg: {
    alignItems: "center",
  },
  errorMsg: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
    marginTop: 5
  },
  textRecover: {
    fontFamily: "OpenSans_700Bold",
    color: "black",
    fontSize: 20,
    marginTop: 30,
  },
  checkView: {
    right: 17,
    top: -8
  }
});
