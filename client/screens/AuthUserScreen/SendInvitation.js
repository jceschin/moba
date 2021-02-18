import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Share,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Feather, AntDesign, Ionicons, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { apiEndpoint } from "../../const";
import HomeNavbar from "./HomeNavbar";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import SplashScreen2 from "../HomeScreen/SplashScreen2";
import * as Linking from "expo-linking";
import * as Contacts from "expo-contacts";
import MyContact from "./MyContact";

const SendInvitation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);

  const [data, setData] = useState({
    contacts: [],
    loading: false,
    inMemoryContacts: [],
  });
  const [user, setUser] = useState({});
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  /* useEffect(() => {
    getUser(loggedUser.username);
  }, []); */

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      return;
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
    });

    setData({
      contacts: data,
      inMemoryContacts: data,
      loading: false, 
    });
  };
  console.log("loading", data.loading);
  useEffect(() => {
    setData({ loading: true });
    loadContacts();
  }, []);

  /* console.log("contacts", data.contacts); */
 
  async function getUser(username) {
    let response = await axios.get(`http://${apiEndpoint}/users/${username}`);
    setUser(response.data);
  }

  let redirectUrl = Linking.createURL(
    "exp://wg-qka.community.app.exp.direct:80"
  );

  const shareUrl = async () => {
    try {
      const result = await Share.share(
        {
          message: redirectUrl,
        },
        { excludedActivityTypes: ["net.whatsapp.Whatsapp.ShareExtension"] }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const contactsSorted = !data.contacts
    ? null
    : data.contacts.sort((a, b) => {
        return a.name > b.name;
      });

  const searchContacts = (value) => {
    const filteredContacts = !data.inMemoryContacts
      ? null
      : data.inMemoryContacts.filter((contact) => { 
          let contactLowercase = contact.name.toLowerCase();

          let searchTermLowercase = value.toLowerCase();
 
          return contactLowercase.indexOf(searchTermLowercase) > -1;
        });
    setData({ ...data, contacts: filteredContacts });
  };

  console.log("in memory", data.contacts);
  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            // style={{ position: "absolute" }}
            onPress={shareUrl}
          >
            <Feather name="arrow-left" size={20} color="white" style={{top:21}}/>
          </TouchableOpacity>
          <View 
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text style={styles.greeting}>Invite your friends to MOBA family!</Text>
          </View>
        </View>

        <View style={styles.whiteContainer}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                borderBottomWidth: 2,
                borderBottomColor: "#521886",
              }}
            >
              <View style={{ top: 2, left: 10 }}>
                <AntDesign name="search1" size={20} color="#521886" />
              </View>
              <TextInput
                placeholder="Search a friend"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                style={{
                  height: 30,
                  fontSize: 18,
                  color: "black",
                  fontFamily: "OpenSans_700Bold",
                  left: 20,
                  width: "100%"
                }}
                onChangeText={(value) => searchContacts(value)}
              />
            </View>
            {!data.contacts ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  alignItems: "center",
                  justifyContent: "center",
                  top: 300,
                }}
              >
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : (
              contactsSorted.map((contact) => {
                return (
                  <View style={styles.wrapper}>
                    <View style={styles.avatar}>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "OpenSans_700Bold",
                          fontSize: 18,
                        }}
                      >
                        {contact.name.slice(0, 1).toUpperCase()}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        height: 70,
                      }}
                    >
                      <Text style={[styles.textList, { fontSize: 18 }]}>
                        {contact.name}
                      </Text>
                      <Text
                        style={[
                          styles.textList,
                          { color: "rgba(0, 0, 0, 0.4)" },
                        ]}
                      >
                        {!contact.phoneNumbers
                          ? null
                          : contact.phoneNumbers.map(
                              (numbers) => numbers.digits
                            )}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
};

export default SendInvitation;

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
    marginTop: 40,
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "OpenSans_800ExtraBold",
    top: 20,
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
    height: 800,
    flexDirection: "row",
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
  wrapper: {
    flexDirection: "row",
    /* justifyContent: 'space-between', */
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    borderStyle: "solid",
    paddingBottom: 5,
  },
  textList: {
    color: "black",
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
    textAlign: "left",
  },
  avatar: {
    marginTop: 10,
    marginRight: 20,
    backgroundColor: "#521886",
    height: 48,
    width: 45,
    left: 8,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});
