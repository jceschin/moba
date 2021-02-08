import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { passwordRecovery } from "../../redux/actions/emailActions"
import axios from 'axios';
// import { loginStateUser } from "../../redux/actions/user";
// import { useDispatch, useSelector } from "react-redux";

const PasswordRecovery = ({ navigation }) => {

  var emailOrUsername = useSelector((store) => store.email.emailOrUsername);
  console.log(emailOrUsername)

  const token = useSelector((store) => store.email.token)

  const dispatch = useDispatch();

  const [data, setData] = useState({
    usernameOrEmail: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });


  // const emailOrUsername = {
  //   usernameOrEmail: data.usernameOrEmail,
  // }
  // const dispatch = useDispatch();
  // const loginUser = async (data) => dispatch(loginStateUser(data));
   console.log(data.usernameOrEmail)
   const textInputChange = (val) => {
    if (val.length >= 4) {
      setData({
        ...data,
        usernameOrEmail: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        usernameOrEmail: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  // const textInputChange = (val) => {
  //   if (val.length >= 4) {
  //     setData({
  //       ...data,
  //       username: val,
  //       check_textInputChange: true,
  //       isValidUser: true,
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       username: val,
  //       check_textInputChange: false,
  //       isValidUser: false,
  //     });
  //   }
  // };

  // const handlePasswordChange = (val) => {
  //   if (val.trim().length >= 8) {
  //     setData({
  //       ...data,
  //       password: val,
  //       isValidPassword: true,
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       password: val,
  //       isValidPassword: false,
  //     });
  //   }
  // };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  // const updateSecureTextEntry = () => {
  //   setData({
  //     ...data,
  //     secureTextEntry: !data.secureTextEntry,
  //   });
  // };


  // :::::::::::::::::::AXIOS:::::::::::

  // const handleRecoverPass = () => axios.post('http://localhost:8080/email/recoverPass', mailOrUsername ).then((result) => { //Ruta para buscar por mail o userName y encontrar el password
	// 						console.log(result)
  //                           if (result.data === true) {
  //                             alert('We have sent the username to your email box')
	// 							navigation.navigate('Login')
	// 						} else {
	// 							alert('Invalid password or email')
	// 						}
  //           })
            
  // const loginHandle = async (userName, password) => {
  //   if (data.username.length === 0 || data.password.length === 0) {
  //     alert("Username or Password cannot be empty");
  //   }
  //   await loginUser(data);
  // };

  useEffect(() => {
	 
    if(emailOrUsername.length > 0 ){
      console.log(emailOrUsername.length)
      
      if(emailOrUsername[0].emailOrUsername === true ){
        alert('We have sent to your email the code to reset your password')
        navigation.navigate("TokenRecovery")
      } 
      else{
        alert('Email or username not found')
      }
      }
   
   }, [emailOrUsername]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8CA5FD" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            style={{ right: 10 }}
          />
        </TouchableOpacity>

        <View style={styles.welcomeView}>
          <Text style={styles.text_header}>Password Recovery</Text>
        </View>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <View style={styles.containerImg}>
            <Image
              style={styles.image}
              source={require("../../assets/MOBA.png")}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Enter your username or email"
              style={styles.textInputUsername}
              autoCapitalize="none"
              value={data.username}
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />

            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <AntDesign name="checkcircleo" size={14} color="green" />
              </Animatable.View>
            ) : null}
          </View>

          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long
              </Text>
            </Animatable.View>
          )}

       
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}
                 onPress={ () => dispatch(passwordRecovery({dataUser: data.usernameOrEmail}))}
            //  onPress={handleRecoverPass} 
             >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Recover!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default PasswordRecovery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8CA5FD",
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
    flexDirection: "row",
  },
  welcomeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    right: 15,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -80,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInputUsername: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 16,
  },
  textInputPassword: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    fontSize: 16,
  },
  forgot_username: {
    marginBottom: 30,
    left: 10,
  },
  forgot_password: {
    left: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 300,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#567BFF",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  containerImg: {
    alignItems: "center",
  },
  image: {
    marginBottom: 72,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
});
