import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyContact from "./MyContact";

// Fonts
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import SplashScreen2 from "../HomeScreen/SplashScreen2";
// import AppLoading from "expo-app-loading";

//Redux
import { getUserInfo } from "../../redux/actions/user";

const MyContacts = () => {
  // Fonts
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const navigation = useNavigation();
  let loggedUser = useSelector((state) => state.user);
  const renderContacts = useSelector((state) => state.contacts.contacts)
  let userContacts = useSelector((state) => state.user.info.contacts);
   const dispatch = useDispatch();
  // console.log(userContacts);

  useEffect(() => {
     dispatch(getUserInfo(loggedUser.username))
  }, [renderContacts])

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
              <Text style={styles.greeting}>Who do you want to send?</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              top: 40,
              borderRadius: 15,
              marginLeft: 18,
              marginRight: 18,
              padding: 5,
              backgroundColor: "white",
              marginBottom: 40,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            {/* <View style={styles.action}>
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
          </View> */}
            <View style={styles.action}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddContact")}
                style={{
                  backgroundColor: "#38046C",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="person-add-outline" size={24} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontStyle: "normal",
                    fontFamily: "OpenSans_700Bold",
                  }}
                >
                  New Contact
                </Text>
              </View>
            </View>
            <View style={styles.action}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditContact");
                }}
                style={{
                  backgroundColor: "#38046C",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <AntDesign name="edit" size={24} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontStyle: "normal",
                    fontFamily: "OpenSans_700Bold",
                  }}
                >
                  Edit Contact
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.whiteContainer}>
            <Text style={styles.contactsTag}>Contacts</Text>
            {!userContacts ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Foundation name="page-search" size={32} color="black" />
                <Text style={styles.notFound}>
                  Contacts not found, add contacts to send money!
                </Text>
              </View>
            ) : (
              userContacts.map((contact) => {
                return (
                  <MyContact
                    name={contact.contact_name}
                    surname={contact.contact_surname}
                    phone={contact.contact_phone}
                    username={contact.contact_username}
                    alias={contact.alias}
                  />
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default MyContacts;

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    backgroundColor: "#521886",
    opacity: 0.9,
  },
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
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "OpenSans_800ExtraBold",
  },
  action: {
    flexDirection: "row",
    padding: 5,
  },
  whiteContainer: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "100%",
    minHeight: 1000,
  },
  contactsTag: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    color: "#000000",
    marginTop: 12,
    marginBottom: 5,
    paddingBottom: 10,
    paddingLeft: 21,
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    borderStyle: "solid",
  },
  notFound: {
    fontSize: 18,
    padding: 20,
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
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
