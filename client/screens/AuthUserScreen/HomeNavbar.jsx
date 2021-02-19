import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Context } from "./AuthUserScreen";
import SplashScreen2 from "../HomeScreen/SplashScreen2";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

const HomeNavbar = () => {

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  const navigation = useNavigation();
  const { colorIcon, setColorIcon } = React.useContext(Context);

  const homePageIcon = () => {
    navigation.navigate("HomePage")
    setColorIcon("homePage")
  }
  const creditCardIcon = () => {
    navigation.navigate("Card")
    setColorIcon("creditCard")
  }
  const moreIcon = () => {
    navigation.navigate("MyAccount")
    setColorIcon("more")
  }
  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.icon}
          onPress={homePageIcon}
        >
          <View style={{ alignItems: "center" }}>
            <AntDesign
              name="home"
              size={30}
              color={colorIcon === "homePage" ? "#521886" : "black"}
            />
            <Text
              style={[
                styles.tag,
                { color: colorIcon === "homePage" ? "#521886" : "black" },
              ]}
            >
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={creditCardIcon}>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name="credit-card"
              size={30}
              color={colorIcon === "creditCard" ? "#521886" : "black"}
            />
            <Text
              style={[
                styles.tag,
                { color: colorIcon === "creditCard" ? "#521886" : "black" },
              ]}
            >
              Card
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={moreIcon}>
          <View style={{ alignItems: "center" }}>
            <SimpleLineIcons
              name="menu"
              size={30}
              color={colorIcon === "more" ? "#521886" : "black"}
            />
            <Text
              style={[
                styles.tag,
                { color: colorIcon === "more" ? "#521886" : "black" },
              ]}
            >
              More
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default HomeNavbar;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: "rgba(167, 167, 167, 0.83)",
    borderStyle: "solid",
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 40,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tag: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    paddingTop: 5,
  },
});
