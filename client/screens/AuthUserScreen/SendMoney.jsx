import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";

const SendMoney = ({ route }) => {
  const navigation = useNavigation();
  const loggedUser = useSelector((state) => state.user);
  const { selectedContactUsername } = route.params;

  // Get selected user data
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getSelectedUser(selectedContactUsername);
  }, []);

  async function getSelectedUser(username) {
    let response = await axios.get(`http://localhost:8000/users/${username}`, {
      headers: { Authorization: `Bearer ${loggedUser.data.data.token}` },
    });

    setSelectedUser(response.data);
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
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
                <Text style={styles.greeting}>Send money</Text>
            </View>
        </View>
        <View style={styles.whiteContainer}>
            <TextInput
                style={{height: 40, textAlign: 'center', marginTop: 80, fontSize: 32}}
                placeholder="US$ 0"
            />
            <View style={styles.contact}>
                <View style={styles.avatar}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>MG</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Text style={styles.name}>Martin Gomez</Text>
                </View>
            </View>    
            <TouchableOpacity
            style={styles.button}
            >
                <Text style={styles.btnContent}>Send</Text>
            </TouchableOpacity>
        </View>    
    </LinearGradient>
  );
};

export default SendMoney;

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
    button: {
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: "center",
        backgroundColor: "#25D681",
        marginRight: 18,
        marginLeft: 18,
        top: 380
      },
      btnContent: {
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold'
      },
      avatar: {
        marginRight: 20,
        borderRadius: '50%',
        backgroundColor: '#25D681',
        padding: 10,
        heigth: 41,
        width: 41,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'left'
    },
    contact: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 18,
        marginVertical: 15,
        justifyContent: 'center',
        marginTop: 30,
        height: 41
    }
});