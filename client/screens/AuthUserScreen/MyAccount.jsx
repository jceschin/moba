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
import {apiEndpoint} from '../../const'
import { Entypo } from '@expo/vector-icons';

const MyAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(loggedUser.username);
  }, []);

  async function getUser(username) {
    let response = await axios.get(`http://${apiEndpoint}/users/${username}`);

    setUser(response.data);
  }

  return (
    <View style={styles.colorContainer}>
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
            <Text style={styles.greeting}>Hello {user.name}!</Text>
          </View>
        </View>
        <View style={styles.whiteContainer}>
          <Text style={styles.accountTag}>Account</Text>
          <View style={styles.options}>
            <View style={styles.option}>
              <MaterialCommunityIcons name="credit-card" size={24} color="black" />
              <TouchableOpacity onPress={() => navigation.navigate('Card')}>
                <Text style={styles.optionName}>Card</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <Entypo name="plus" size={24} color="black"/>
              <TouchableOpacity onPress={() => navigation.navigate('AddMoney')}>
                <Text style={styles.optionName}>Add Money</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <FontAwesome name="long-arrow-right" size={24} color="black"/>
              <TouchableOpacity onPress={() => navigation.navigate('MyContacts')}>
                <Text style={styles.optionName}>Send Money</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <MaterialIcons name="compare-arrows" size={24} color="black"/>
              <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
                <Text style={styles.optionName}>Statistics</Text>
              </TouchableOpacity  >
            </View>
            <View style={styles.option}>
              <AntDesign name="contacts" size={24} color="black" />
              <TouchableOpacity onPress={() => navigation.navigate('MyContacts')}>
                <Text style={styles.optionName}>Contacts</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.settingsTag}>Account Settings</Text>
          <View style={styles.options}>
            <View style={styles.option}>
              <MaterialCommunityIcons
                name="account-settings-outline"
                size={24}
                color="black"
              />
              <TouchableOpacity>
                <Text style={styles.optionName}>Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <Feather name="help-circle" size={24} color="black" />
              <TouchableOpacity>
                <Text style={styles.optionName}>Help</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <MaterialCommunityIcons
                name="logout-variant"
                size={24}
                color="black"
              />
              <TouchableOpacity
                onPress={() => {
                  dispatch(logoutUserAction());
                }}
              >
                <Text style={styles.optionName}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    backgroundColor: "#521886",
    opacity: 0.9
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 18,
    marginRight: 18,
    marginTop: 37
  },
  greeting: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  whiteContainer: {
    marginTop: 40,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "100%",
  },
  accountTag: {
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
  options: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,
  },
  optionName: {
    color: "black",
    fontSize: 18,
    fontWeight: "normal",
    marginLeft: 30,
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
