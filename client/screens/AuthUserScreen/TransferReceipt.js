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
import SplashScreen2 from "../HomeScreen/SplashScreen2";
const PasswordRecovery = ({ navigation }) => {
  var emailOrUsername = useSelector((store) => store.email.emailOrUsername);
  console.log(emailOrUsername);
  const loggedUser = useSelector((state) => state.user);
  console.log(loggedUser)
  const destinatary = useSelector((state) => state.contacts.selectedContact);
  console.log(destinatary)

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



  if (!fontsLoaded) {
    return <SplashScreen2 />;
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
            <Text style={styles.text_header}>Desde transfer </Text> {/* Colocara acá el cbu */}
          </View>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <View style={styles.receiptContainer}>
            <Text style={styles.textRecover}>
              Transfer Receipt
            </Text>
            <Text style={styles.textRow}>
              Amount
            </Text>
            <Text style={styles.textRowII}>
              xxxxxxxxx
            </Text>
            <br/>
            <Text style={styles.textRow}>
              From
            </Text>
            <Text style={styles.textRowII}>
             Nombre persona
            </Text>
            <Text style={styles.textRowII}>
             cbu xxxxxx
            </Text>
            <br/>
            <Text style={styles.textRow}>
            To
            </Text>
            <Text style={styles.textRowII}>
            Nombre persona
            </Text>
            <Text style={styles.textRowII}>
             cbu xxxx
            </Text>
            <br/>
            <Text style={styles.textRow}>
              Reason for Wire Transfer
            </Text>
            <Text style={styles.textRowII}>
              Varios
            </Text>
            <br/>
            <Text style={styles.textRow}>
              Reference Number
            </Text>
            <Text style={styles.textRowII}>
              xxxxxxxxx
            </Text>
            <br/>
            <Text style={styles.textRow}>
              Transaction Date
            </Text>
            <Text style={styles.textRowII}>
             fecha de transferencia xxxx
            </Text>
            <Image style={styles.image} source={require("../../resources/images/mobapng.png")} />
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
  receiptContainer: {
    borderStyle: "solid",
    width: 298,
    height: 550,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 146
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
    fontSize: 18,
    marginTop: 30,
    textAlign: "center"
  },
  textRow: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
    color: "#515151",
    paddingLeft: 6
  },
  textRowII: {
    fontFamily: "OpenSans_700Bold",
    color: "black",
    fontSize: 14,
    paddingLeft: 6
  },
  image: {
    flex: 1,
    width: 152,
    height: 37,
    marginLeft: 5
  },
  checkView: {
    right: 17,
    top: -8
  }
});