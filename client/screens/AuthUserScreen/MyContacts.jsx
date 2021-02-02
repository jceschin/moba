import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MyContact from './MyContact';

const MyContacts = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    isLoading: false,
  })

  if (state.isLoading) {
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
              <Text style={styles.greeting}>Contacts</Text>
              <View style={styles.action}>
                <TouchableOpacity>
                  <Ionicons name="person-add" size={24} color="black" style={styles.optionIcon} />
                  <Text style={styles.option}>Add Contact</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.whiteContainer}>
            <Text style={styles.contactsTag}>Your contacts</Text>
            <View style={{
              ...StyleSheet.absoluteFill,
              alignItems: 'center', justifyContent: 'center'
            }}>
              <ActivityIndicator size='large' color="#d9d9d9" />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

    )
  }

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
            <Text style={styles.greeting}>Contacts</Text>
            <View style={styles.action}>
              <TouchableOpacity>
                <Ionicons name="person-add" size={24} color="black" style={styles.optionIcon} />
                <Text style={styles.option}>Add Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.whiteContainer}>
          <Text style={styles.contactsTag}>Your contacts</Text>
          <MyContact />
          <MyContact />
          <MyContact />
          <MyContact />
          <MyContact />
          <MyContact />
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
    marginTop: 15,
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
  contentContainer: {
    paddingVertical: 20,
  },
  optionIcon: {
    textAlign: "center",
    marginBottom: 5,
  },
  option: {
    fontSize: 16,
  },
});