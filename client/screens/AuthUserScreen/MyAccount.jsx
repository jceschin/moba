import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  MaterialIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { logoutUserAction } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiEndpoint } from "../../const";
import { Entypo } from "@expo/vector-icons";
import HomeNavbar from "./HomeNavbar";
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

const MyAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  useEffect(() => {
    getUser(loggedUser.username);
  }, []);

  async function getUser(username) {
    let response = await axios.get(`http://${apiEndpoint}/users/${username}`);
    setUser(response.data);
  }

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View style={styles.header}>
            <TouchableOpacity
              // style={{ position: "absolute" }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.greeting}>Hello {user.name}!</Text>
            </View>
          </View>
          <View style={styles.whiteContainer}>
            <Text style={styles.accountTag}>Account</Text>
            <View style={styles.option}>
              <View style={styles.optionContactUs}>
                <FontAwesome
                  name="phone"
                  size={24}
                  color="white"
                  style={{ top: 8, left: 9 }}
                />
              </View>
              <TouchableOpacity>
                <Text style={[styles.optionName, {top:7}]}>Contact Us</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <View style={styles.optionLogout}>
                <AntDesign
                  name="poweroff"
                  size={24}
                  color="white"
                  style={{ left: 8, top: 8 }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(logoutUserAction());
                }}
              >
                <Text style={[styles.optionName, {top: -2}]}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <HomeNavbar />
      </View>
    );
  }
};

export default MyAccount;

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    backgroundColor: "#521886",
    opacity: 0.9,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 18,
    marginRight: 18,
    marginTop: 37,
  },
  greeting: {
    color: "white",
    fontSize: 24,
    fontFamily: "OpenSans_800ExtraBold"
  },
  whiteContainer: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "100%",
  },
  accountTag: {
    fontSize: 18,
    fontFamily: "OpenSans_700Bold",
    color: "#A7A7A7",
    marginTop: 40,
    marginBottom: 25,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(167, 167, 167, 0.83)",
    borderStyle: "solid",
  },
  options: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  option: {
    flexDirection: "row",
    marginVertical: 20,
  },
  optionLogout: {
    backgroundColor: "#CC1833",
    width: 40,
    height: 40,
    borderRadius: 11,
    marginTop: -10,
    left: 9,
  },
  optionContactUs: {
    backgroundColor: "rgba(82, 24, 134, 1)",
    width: 40,
    height: 40,
    borderRadius: 11,
    left: 9,
  },
  optionName: {
    color: "black",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    marginLeft: 24,
  },
  settingsTag: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#A7A7A7",
    marginTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(167, 167, 167, 0.83)",
    borderStyle: "solid",
  },
});
