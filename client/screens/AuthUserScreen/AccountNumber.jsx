import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import axios from 'axios';

const AccountNumber = () => {
    const navigation = useNavigation();
    const loggedUser = useSelector((state) => state.user);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser(loggedUser.username);
    }, []);

    async function getUser(username) {
        let response = await axios.get(`http://localhost:8080/users/${username}`);
    
        setUser(response.data);
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
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.greeting}>Account</Text>
          </View>
        </View>
        <View style={styles.whiteContainer}>
            <Text style={styles.accountTag}>Account number:</Text>
            {
                user.account
                ? (
                    <Text style={styles.cvu}>{user.account.cvu}</Text>
                )
                : null
            }
            
        </View>            
        </LinearGradient>
    )
}

export default AccountNumber;

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
        height: 80,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    cvu: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#C9C7C7',
        textAlign: 'left',
        marginTop: 10
    },
    accountTag: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left'
    }
})