import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const AccountNumber = () => {
    return (
        <LinearGradient
            style={styles.container}
            colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
        <View style={styles.header}>
          <TouchableOpacity
            style={{ position: "absolute" }}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.greeting}>Hello Juan!</Text>
          </View>
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
    }
})