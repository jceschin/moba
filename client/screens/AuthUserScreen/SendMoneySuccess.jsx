import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const SendMoneySuccess = () => {
  const navigation = useNavigation();  

  return (
    <View style={styles.container}>
        <Text>Money sent!</Text>
        <MaterialIcons
            name="send-to-mobile"
            size={60}
            color="black"
            style={styles.optionIcon}
        />
        <Text>Juan Perez will receive the money you send</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomePage')}
        >
            <Text style={styles.btnContent}>Continue</Text>
        </TouchableOpacity>
    </View>
    );
};

export default SendMoneySuccess;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
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
});