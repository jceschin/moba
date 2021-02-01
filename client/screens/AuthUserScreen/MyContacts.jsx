import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyContact from './MyContact';
import axios from "axios";

const MyContacts = () => {
  const navigation = useNavigation();  
  const loggedUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(loggedUser.username);
  }, []);

  async function getUser(username) {
    let response = await axios.get(`http://localhost:8000/users/${username}`, {
      headers: { Authorization: `Bearer ${loggedUser.data.data.token}` },
    });

    setUser(response.data);
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
        <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity
                    // style={{ position: "absolute" }}
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                >
                    <Text style={styles.greeting}>Who do you want to send?</Text>
                </View>
            </View>
            <View style={styles.whiteContainer}>
                <Text style={styles.contactsTag}>Your contacts</Text>
                <MyContact/>
                <MyContact/>
                <MyContact/>
                <MyContact/>
                <MyContact/>
                <MyContact/>
                <MyContact/>
                <MyContact/>
                <MyContact/>
                <MyContact/>
            </View>
        </ScrollView>
    </LinearGradient>
  );
};

export default MyContacts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 18,
        marginRight: 18,
        top: 24,
    },
    greeting: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },
    whiteContainer: {
        top: 50,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: "100%",
    },
    contactsTag: {
        fontSize: 18,
        fontWeight: "normal",
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
});