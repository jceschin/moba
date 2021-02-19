import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

//Redux
import { addNewContact } from "../../redux/actions/contactActions";
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import AppLoading from "expo-app-loading";
import SplashScreen2 from "../HomeScreen/SplashScreen2";

const AddContact = ({ navigation }) => {
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({
    alias: "",
    contact_email: "",
  });
  const [pages, setPages] = useState("");
  const userLoggued = useSelector((state) => state.user.username);
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  const dispatch = useDispatch();

  const submitData = () => {
    dispatch(addNewContact({ ...data, user_username: userLoggued }));
    setPages("success");
  };

  const handleInput = (name, value) => {
    setData({ ...data, [name]: value });
    if (data.alias) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const handleEmail = (email, value) => {
    setData({ ...data, [email]: value });
    if (data.contact_email) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  useEffect(() => {
    setPages("first");
  }, []);

  if (pages === "success") {
    return (
      <Animatable.View animation="zoomIn" style={styles.container}>
        <View style={styles.bodySuccess}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.headerSuccess}>Contact added</Text>
          </View>
          <AntDesign
            name="contacts"
            size={104}
            color="white"
            style={{ marginTop: 21 }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={styles.textSuccess}>
              Successfully added {data.alias} to your contact list
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              marginTop: 215,
            }}
          >
            <TouchableOpacity
              style={styles.buttonSuccess}
              onPress={() => navigation.navigate("MyContacts")}
            >
              <Text style={styles.textButtonSuccess}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  }

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animatable.View animation="slideInRight" style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Add Contact</Text>
            </View>
          </View>
          <View style={styles.body}>
            {pages === "first" ? (
              <Animatable.View animation="slideInRight" style={styles.section}>
                <View style={styles.Wrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Add an alias"
                    value={data.alias}
                    onChangeText={(value) => handleInput("alias", value)}
                    placeholderTextColor={"rgba(0, 0, 0, 0.4);"}
                    fontWeight={"OpenSans_700Bold"}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    disabled={!disable}
                    style={[
                      styles.buttonConfirm,
                      disable === false
                        ? styles.buttonDisable
                        : styles.buttonAble,
                    ]}
                    onPress={() => setPages("second")}
                  >
                    <Text style={styles.textButton}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ) : pages === "second" ? (
              <Animatable.View animation="slideInRight" style={styles.section}>
                <View style={styles.Wrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Now insert the email"
                    value={data.contact_email}
                    onChangeText={(value) =>
                      handleEmail("contact_email", value)
                    }
                    placeholderTextColor={"rgba(0, 0, 0, 0.4);"}
                    fontWeight={"OpenSans_700Bold"}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    disabled={!disable}
                    style={[
                      styles.buttonConfirm,
                      disable === false
                        ? styles.buttonDisable
                        : styles.buttonAble,
                    ]}
                    onPress={submitData}
                  >
                    <Text style={styles.textButton}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ) : null}
          </View>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#521886",
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    marginBottom: 12,
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "OpenSans_700Bold",
    fontSize: 18,
  },
  body: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -60,
    alignItems: "center",
  },
  bodySuccess: {
    flex: 1,
    backgroundColor: "#521886",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginTop: 227,
    justifyContent: "center",
    alignItems: "center",
  },
  Wrapper: {
    width: "80%",
    padding: 5,
    justifyContent: "center",
  },
  input: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
    padding: 5,
    color: "black",
  },
  buttonWrapper: {
    width: 300,
    height: 53,
    marginTop: 306,
  },
  buttonAble: {
    backgroundColor: "#521886",
  },
  buttonDisable: {
    backgroundColor: "rgba(82, 24, 134, 0.56)",
  },
  buttonConfirm: {
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    color: "white",
    fontFamily: "OpenSans_800ExtraBold",
    fontSize: 18,
  },
  headerSuccess: {
    color: "white",
    fontSize: 24,
    fontFamily: "OpenSans_800ExtraBold",
    marginTop: 208,
  },
  textSuccess: {
    color: "white",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
    marginTop: 31,
    textAlign: "center",
  },
  buttonSuccess: {
    width: 379,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    height: 53,
  },
  textButtonSuccess: {
    color: "#521886",
    fontFamily: "OpenSans_700Bold",
    fontSize: 20,
  },
});
