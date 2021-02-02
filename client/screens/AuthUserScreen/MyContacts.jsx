import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyContact from './MyContact';

//Redux
// import { getUserContacts, addNewContact } from '../../redux/actions/user';

const MyContacts = () => {
  // const dispatch = useDispatch();
  const navigation = useNavigation();  
  let userContacts = useSelector((state) => state.user.user);

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
                {
                  userContacts.map(contact => {
                    return (
                      <MyContact
                        name={contact.contact_name}
                        surname={contact.contact_surname}
                        phone={contact.contact_phone}
                        username={contact.contact_username}
                      />
                    )
                  })
                }
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
        height: 1000
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
      contentContainer: {
        paddingVertical: 20,
      },
});