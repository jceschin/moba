
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons, AntDesign, MaterialCommunityIcons, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyContact from './MyContact';

//Redux
import { getUserInfo } from '../../redux/actions/user'

const MyContacts = () => {
  const navigation = useNavigation();
  // let loggedUser = useSelector((state) => state.user);
  let userContacts = useSelector((state) => state.user.info.contacts);
  // const dispatch = useDispatch();
  // console.log(userContacts);

  // useEffect(() => {
  //   dispatch(getUserInfo(loggedUser.username))
  // }, [userContacts])

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
        <View
          style={{
            display: "flex",
            top: 40,
            borderRadius: 15,
            marginLeft: 10,
            marginRight: 10,
            padding: 5,
            backgroundColor: "white",
            marginBottom: 40,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
        >
          <View style={styles.action}>
            <TouchableOpacity onPress={() => navigation.navigate('')}
              style={{ backgroundColor: "#38046C", padding: 10, borderRadius: 10 }}
            >
              <MaterialCommunityIcons name="plus" size={24} color="white" />
            </TouchableOpacity>
            <View style={{
              padding: 10
            }}>
              <Text style={{
                fontStyle: "normal",
                fontWeight: "bold",
              }}>New Transfer</Text>
            </View>
          </View>
          <View style={styles.action}>
            <TouchableOpacity onPress={() => navigation.navigate("AddContact")}
              style={{ backgroundColor: "#38046C", padding: 10, borderRadius: 10 }}
            >
              <Ionicons name="person-add-outline" size={24} color="white" />
            </TouchableOpacity>
            <View style={{
              padding: 10
            }}>
              <Text style={{
                fontStyle: "normal",
                fontWeight: "bold",
              }}>New Contact</Text>
            </View>
          </View>
          <View style={styles.action}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('');
            }}
              style={{ backgroundColor: "#38046C", padding: 10, borderRadius: 10 }}
            >
              <AntDesign name="edit" size={24} color="white" />
            </TouchableOpacity>
            <View style={{
              padding: 10
            }}>
              <Text style={{
                fontStyle: "normal",
                fontWeight: "bold",
              }}>Edit Contact</Text>
            </View>
          </View>
        </View>
        <View style={styles.whiteContainer}>
          <Text style={styles.contactsTag}>Your contacts</Text>
          {
            !userContacts ? (
              <View style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center', justifyContent: 'center'
              }}>
                <Foundation name="page-search" size={32} color="black" />
                <Text style={styles.notFound}>Contacts not found, add contacts to send money!</Text>
              </View>
            )
            : (
              userContacts.map(contact => {
                return (
                  <MyContact
                    name={contact.contact_name}
                    surname={contact.contact_surname}
                    phone={contact.contact_phone}
                    username={contact.contact_username}
                    alias={contact.alias}
                  />
                )
              })
            )
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
  action: {
    flexDirection: "row",
    padding: 5
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
  notFound: {
    fontSize: 18,
    padding: 20
  },
  contentContainer: {
    paddingVertical: 20,
  },
  optionIcon: {
    textAlign: "center",
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});