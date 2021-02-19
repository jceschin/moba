import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Foundation,
  FontAwesome5,
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
  const [modalVisible, setModalVisible] = useState(false);
  let loggedUser = useSelector((state) => state.user);
  const renderContacts = useSelector((state) => state.contacts.contacts);
  let userContacts = useSelector((state) => state.user.info.contacts);
  const dispatch = useDispatch();
  // console.log(userContacts);

  useEffect(() => {
    dispatch(getUserInfo(loggedUser.username));
  }, [renderContacts]);

  const unregisteredContactNavigation = () => {
    navigation.navigate("SendMoneyUnregistered");
    setModalVisible(false);
  };

  const transferTreeBankNavigation = () => {
    navigation.navigate("TransferTreeBank");
    setModalVisible(false);
  };

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
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text style={styles.greeting}>
                Who do you want to send money?
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              top: 20,
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
            <View style={styles.action}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{
                  backgroundColor: "#38046C",
                  padding: 10,
                  borderRadius: 10,
                  height: 45,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5 name="money-bill" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View
                  style={{
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "OpenSans_700Bold",
                    }}
                  >
                    New Transfer
                  </Text>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <TouchableOpacity
                          style={{
                            ...styles.openButton,
                            flexDirection: "column",
                            alignItems: "center",
                            top: 120
                          }}
                          onPress={unregisteredContactNavigation}
                        >
                          <FontAwesome5
                            name="user-circle"
                            size={64}
                            color="white"
                          />
                          <Text style={[styles.textStyle, {top: 20, width: 200}]}>
                            Transfer to an unregistered contact
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            ...styles.openButton,
                            top: 50,
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                          onPress={transferTreeBankNavigation}
                        >
                          <MaterialCommunityIcons
                            name="bank-transfer"
                            size={84}
                            color="white"
                            style={{ left: 12 }}
                          />
                          <Text style={[styles.textStyle, {top: 5}]}>
                            Transfer to another bank
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            ...styles.openButton,
                            backgroundColor: "white",
                            width: 300,
                            top: 20,
                          }}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                          }}
                        >
                          <Text style={{ ...styles.textStyle, color:"#521886", fontSize: 20}}>
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.action}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddContact")}
                style={{
                  backgroundColor: "#38046C",
                  padding: 10,
                  borderRadius: 10,
                  height: 45,
                  width: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="person-add-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddContact")}
              >
                <View
                  style={{
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "OpenSans_700Bold",
                    }}
                  >
                    New Contact
                  </Text>
                </View>
              </TouchableOpacity>
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
  header: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 18,
    marginRight: 18,
    marginTop: Platform.OS === "ios" ? 40: 10,
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 16,
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
    minHeight: 600,
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
    color: "black",
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
    /* marginTop: 22, */
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
    width: 500,
    height: 900,
    justifyContent: "space-around",
    backgroundColor: "#521886"
  },
  openButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#521886",
  },
  textStyle: {
    color: "white",
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "OpenSans_700Bold",
  },
});
