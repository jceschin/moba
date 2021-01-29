import React from "react";
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
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { logoutUserAction } from "../../redux/actions/user";
import { useDispatch } from "react-redux";

const MyAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
            <Text style={styles.greeting}>Hello Juan!</Text>
          </View>
        </View>
        <View style={styles.whiteContainer}>
          <Text style={styles.accountTag}>Account</Text>
          <View style={styles.options}>
            <View style={styles.option}>
              <MaterialIcons name="credit-card" size={18} color="black" />
              <TouchableOpacity>
                <Text style={styles.optionName}>Credit Cards</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <Ionicons name="add-circle-outline" size={18} color="black" />
              <TouchableOpacity>
                <Text style={styles.optionName}>Add Money</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <MaterialIcons name="compare-arrows" size={18} color="black" />
              <TouchableOpacity>
                <Text style={styles.optionName}>Transfers</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <Feather name="activity" size={18} color="black" />
              <TouchableOpacity>
                <Text style={styles.optionName}>Activity</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <AntDesign name="contacts" size={18} color="black" />
              <TouchableOpacity>
                <Text style={styles.optionName}>Contacts</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.settingsTag}>Account Settings</Text>
          <View style={styles.options}>
          
            <View style={styles.option}>
              <MaterialCommunityIcons
                name="account-settings-outline"
                size={18}
                color="black"
              />
              <TouchableOpacity>
                <Text style={styles.optionName}>Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <Feather name="help-circle" size={18} color="black" />
              <TouchableOpacity>
                <Text style={styles.optionName}>Help</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <MaterialCommunityIcons
                name="logout-variant"
                size={18}
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
    </LinearGradient>
  );
};

export default MyAccount;

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
