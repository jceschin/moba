import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeNavbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate("HomePage")}
      >
        <View style={{ alignItems: "center" }}>
          <AntDesign name="home" size={24} color="black" />
          <Text style={styles.tag}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Card")}>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="credit-card" size={24} color="black" />
          <Text style={styles.tag}>Card</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyAccount")}>
        <View style={{ alignItems: "center" }}>
          <SimpleLineIcons name="menu" size={24} color="black" />
          <Text style={styles.tag}>More</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
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
    fontWeight: "normal",
    paddingTop: 5,
  },
});
