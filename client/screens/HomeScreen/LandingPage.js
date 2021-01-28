import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const LandingPage = (props) => {
  
  const createAccount = () => {
    props.navigation.navigate("AuthScreen", { screen: "CreateAccount" });
  };

  const loginNavigation = () => {
    props.navigation.navigate("AuthScreen", { screen: "Login" });
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animatable.View animation="fadeIn" style={styles.animate}>
        <View style={styles.subcontainer}>
          <Text style={styles.title}>Welcome to MOBA</Text>
          <Text style={styles.subtitle}>
            Your finances simple and fast.
            {"\n"}
            Open your account now.
          </Text>
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => loginNavigation()}
          >
            <Text style={styles.btncontent}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => createAccount()}
          >
            <Text style={styles.btncontent}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  animate: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    marginBottom: 0,
    marginTop: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subcontainer: {
    flex: 1,
    position: "absolute",
    padding: 10,
  },
  buttoncontainer: {
    flex: 1,
    alignItems: "center",
    width: "auto",
    justifyContent: "flex-end",
    marginBottom: 80,
  },
  title: {
    flex: 1,
    position: "relative",
    marginLeft: 18,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#fff",
    textShadowRadius: 5,
    lineHeight: 42,
    fontSize: 36,
    height: 42,
  },
  subtitle: {
    flex: 1,
    position: "relative",
    marginLeft: 18,
    fontFamily: "Roboto",
    fontWeight: "500",
    textShadowRadius: 5,
    color: "#fff",
    fontSize: 18,
    lineHeight: 21,
    height: 63,
  },
  buttons: {
    width: "90%",
    marginBottom: 20,
    height: "10%",
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "#567BFF",
  },
  btncontent: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 20,
  },
});
