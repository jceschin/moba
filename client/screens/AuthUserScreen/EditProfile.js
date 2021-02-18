import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";
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
import SplashScreen2 from "../HomeScreen/SplashScreen2";
/* import Constants from 'expo-constants'; */
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import { getUserInfo } from "../../redux/actions/user";
import axios from "axios";
import { apiEndpoint } from "../../const";
import { TextInputMask } from "react-native-masked-text";

const EditUser = ({ navigation }) => {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [data, setData] = useState({
    activeSections: [],
    collapsed: true,
    multipleSelect: true,
  });
  const [personalData, setPersonalData] = useState({
    username: loggedUser.username,
    name: loggedUser.info.name,
    surname: loggedUser.info.surname,
    birthdate: loggedUser.info.birthdate,
    email: loggedUser.info.email,
    password: "",
    confirmPassword: "",
    secureTextEntryPassword: true,
    secureTextEntryConfirmPassword: true,
  });
  const [contactData, setContactData] = useState({
    address: loggedUser.info.address,
    city: loggedUser.info.city,
    state: loggedUser.info.state,
    phone: loggedUser.info.phone,
  });
  const [lock, setLock] = useState("");
  /*   const [lock, setLock] = useState(false);
  const [lock, setLock] = useState(false);
  const [lock, setLock] = useState(false);
  const [lock, setLock] = useState(false);
  const [lock, setLock] = useState(false);
  const [lock, setLock] = useState(false);
  const [lock, setLock] = useState(false);
  const [lock, setLock] = useState(false);
   */
  const [editable, setEditable] = useState(false);
  const [pages, setPages] = useState("");
  const userLoggued = useSelector((state) => state.user.username);
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });
  const [focus, setFocus] = useState("");

  const submitData = () => {
    updateUserInfo({ ...personalData });
    /* setPages("success"); */
  };

  const onChangeName = (val) => {
    setPersonalData({
      /* ...personalData, */
      name: val,
    });
  };

  const onChangeUsername = (val) => {
    setPersonalData({
      ...personalData,
      username: val,
    });
  };

  const onChangeSurname = (val) => {
    setPersonalData({
      ...personalData,
      surname: val,
    });
  };

  const onChangeBirthdate = (val) => {
    setPersonalData({
      ...personalData,
      birthdate: val,
    });
  };

  const onChangeEmail = (val) => {
    setPersonalData({
      ...personalData,
      email: val,
    });
  };

  const onChangeAddress = (val) => {
    setContactData({
      ...contactData,
      address: val,
    });
  };
  const onChangeCity = (val) => {
    setContactData({
      ...contactData,
      city: val,
    });
  };
  const onChangeState = (val) => {
    setContactData({
      ...contactData,
      state: val,
    });
  };

  const onChangePhone = (val) => {
    setContactData({
      ...contactData,
      phone: val,
    });
  };

  const onChangePassword = (val) => {
    setPersonalData({
      ...personalData,
      password: val,
    });
  };

  const onChangeConfirmPassword = (val) => {
    setPersonalData({
      ...personalData,
      confirmPassword: val,
    });
  };

  const updateSecureTextEntryPassword = () => {
    setData({
      ...data,
      secureTextEntryPassword: !data.secureTextEntryPassword,
    });
  };

  const updateSecureTextEntryConfirmPassword = () => {
    setData({
      ...data,
      secureTextEntryConfirmPassword: !data.secureTextEntryConfirmPassword,
    });
  };

  const toggleExpanded = () => {
    setData({ collapsed: !data.collapsed });
  };

  const setSections = (sections) => {
    setData({
      ...data,
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.headerCollapse,
          isActive ? styles.borderActive : styles.borderInactive,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        transition="backgroundColor"
      >
        <Text
          style={[
            styles.headerText,
            isActive ? styles.textActive : styles.textInactive,
          ]}
        >
          {section.title}
        </Text>
        <View>
          {isActive ? (
            <MaterialIcons name="keyboard-arrow-up" size={24} color="#521886" />
          ) : (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          )}
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [loggedUser]);

  const updateUserInfo = async () => {
    try {
      let response = axios.put(
        `http://${apiEndpoint}/users/${loggedUser.info.dni}`,
        {
          name: personalData.name,
          surname: personalData.surname,
          email: personalData.email,
          birthdate: personalData.birthdate,
          address: contactData.address,
          city: contactData.city,
          state: contactData.state,
          phone: contactData.phone,
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const setLockInput = () => {
    lock === false ? setLock(true) : lock === true ? setLock(false) : null;
  };

  const formPersonalData = (
    <View>
      <View
        style={{
          borderBottomColor: focus === "username" ? "#521886" : "black",
          borderBottomWidth: focus === "username" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
        }}
      >
        <TextInput
          value={personalData.username}
          onChangeText={(text) => onChangeUsername(text)}
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "user" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("username")}
          editable={lock === "user" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("user")}
        >
          {lock === "user" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: focus === "name" ? "#521886" : "black",
          borderBottomWidth: focus === "name" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          value={personalData.name}
          onChangeText={(text) =>
            setPersonalData({ ...personalData, name: text })
          }
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "name" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("name")}
          editable={lock === "name" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("name")}
        >
          {lock === "name" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: focus === "surname" ? "#521886" : "black",
          borderBottomWidth: focus === "surname" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          value={personalData.surname}
          onChangeText={(text) => onChangeSurname(text)}
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "surname" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("surname")}
          editable={lock === "surname" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("surname")}
        >
          {lock === "surname" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: focus === "email" ? "#521886" : "black",
          borderBottomWidth: focus === "email" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          value={personalData.email}
          onChangeText={(text) => onChangeEmail(text)}
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "email" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("email")}
          editable={lock === "email" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("email")}
        >
          {lock === "email" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: focus === "birthdate" ? "#521886" : "black",
          borderBottomWidth: focus === "birthdate" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
          marginTop: 10,
        }}
      >
        <TextInputMask
          type={"datetime"}
          options={{
            format: "YYYY/DD/MM",
          }}
          value={personalData.birthdate}
          onChangeText={(text) => onChangeBirthdate(text)}
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "birthdate" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("birthdate")}
          editable={lock === "birthdate" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("birthdate")}
        >
          {lock === "birthdate" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const formContactData = (
    <View>
      <View
        style={{
          borderBottomColor: focus === "state" ? "#521886" : "black",
          borderBottomWidth: focus === "state" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
        }}
      >
        <TextInput
          value={contactData.state}
          onChangeText={(text) => onChangeState(text)}
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "state" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("state")}
          editable={lock === "state" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("state")}
        >
          {lock === "state" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: focus === "city" ? "#521886" : "black",
          borderBottomWidth: focus === "city" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          value={contactData.city}
          onChangeText={(text) => onChangeCity(text)}
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "city" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("city")}
          editable={lock === "city" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("city")}
        >
          {lock === "city" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: focus === "address" ? "#521886" : "black",
          borderBottomWidth: focus === "address" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          value={contactData.address}
          onChangeText={(text) => onChangeAddress(text)}
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "address" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("address")}
          editable={lock === "address" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("address")}
        >
          {lock === "address" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: focus === "phone" ? "#521886" : "black",
          borderBottomWidth: focus === "phone" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
          marginTop: 10,
        }}
      >
        <TextInputMask
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
          value={contactData.phone}
          onChangeText={(text) => onChangePhone(text)}
          style={[
            styles.textInput,
            {
              flex: 1,
              color: lock === "phone" ? "black" : "rgba(0, 0, 0, 0.4)",
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("phone")}
          editable={lock === "phone" ? true : false}
        />
        <TouchableOpacity
          style={styles.eyeView}
          onPress={() => setLock("phone")}
        >
          {lock === "phone" ? (
            <FontAwesome name="unlock-alt" size={24} color="black" />
          ) : (
            <FontAwesome name="lock" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const formChangePassword = (
    <View>
      <View
        style={{
          borderBottomColor: focus === "password" ? "#521886" : "black",
          borderBottomWidth: focus === "password" ? 1.5 : 1,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
        }}
      >
        <TextInput
          value={personalData.password}
          onChangeText={(text) => onChangePassword(text)}
          style={[styles.textInput, { flex: 1, color: "black" }]}
          textContentType="password"
          placeholder="Insert your new password"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("password")}
          secureTextEntry={data.secureTextEntryPassword ? true : false}
        />
        <TouchableOpacity
          onPress={updateSecureTextEntryPassword}
          style={styles.eyeView}
        >
          {data.secureTextEntryPassword ? (
            <Feather name="eye-off" color="grey" size={22} />
          ) : (
            <Feather name="eye" color="grey" size={22} />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: focus === "confirmPassword" ? "#521886" : "black",
          borderBottomWidth: focus === "confirmPassword" ? 1.5 : 1,
          marginTop: 20,
          width: 258,
          height: 30,
          flexDirection: "row",
          paddingBottom: 5,
        }}
      >
        <TextInput
          value={personalData.confirmPassword}
          onChangeText={(text) => onChangeConfirmPassword(text)}
          style={[styles.textInput, { flex: 1, color: "black" }]}
          textContentType="password"
          placeholder="Confirm your new password"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          onFocus={() => setFocus("confirmPassword")}
          secureTextEntry={data.secureTextEntryConfirmPassword ? true : false}
        />
        <TouchableOpacity
          onPress={updateSecureTextEntryConfirmPassword}
          style={styles.eyeView}
        >
          {data.secureTextEntryConfirmPassword ? (
            <Feather name="eye-off" color="grey" size={22} />
          ) : (
            <Feather name="eye" color="grey" size={22} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const content = [
    {
      title: "Your personal data",
      content: formPersonalData,
    },
    {
      title: "Your contact data",
      content: formContactData,
    },
    {
      title: "Change your password",
      content: formChangePassword,
    },
  ];

  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animatable.View animation="slideInRight" style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("MyAccount")}>
              <Feather name="arrow-left" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Account Info</Text>
            </View>
          </View>
          <View style={styles.body}>
            <ScrollView>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: "OpenSans_700Bold",
                    width: 280,
                    marginTop: 60,
                  }}
                >
                  {loggedUser.info.name + " " + loggedUser.info.surname}
                </Text>
              </View>
              <View
                style={{
                  width: 300,
                  backgroundColor: "#521886",
                  height: 2,
                  top: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "OpenSans_700Bold",
                  width: 300,
                  marginLeft: 5,
                  top: 20,
                }}
              >
                Here you can edit your personal and contact data
              </Text>
              <Animatable.View animation="slideInRight" style={styles.section}>
                <View style={styles.Wrapper}>
                  <View style={styles.multipleToggle}>
                    <Text style={styles.multipleToggle__title}>
                      Multiple Select?
                    </Text>
                    <Switch
                      value={data.multipleSelect}
                      onValueChange={(a) => setData({ multipleSelect: a })}
                    />
                  </View>

                  <Accordion
                    activeSections={data.activeSections}
                    sections={content}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={data.multipleSelect}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={400}
                    onChange={setSections}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    width: 300,
                    height: 50,
                    backgroundColor: "#521886",
                    marginTop: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                  onPress={submitData}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      fontFamily: "OpenSans_700Bold",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </ScrollView>
          </View>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#521886",
    paddingTop: 55,
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
    fontSize: 20,
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
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  Wrapper: {
    /* width: "80%", */
    padding: 5,
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
    width: 379,
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
  headerCollapse: {
    borderWidth: 1,
    padding: 10,
  },
  borderActive: {
    borderColor: "#521886",
    borderWidth: 1.5,
  },
  borderInactive: {
    borderColor: "black",
  },
  borderBottomActive: {
    borderColor: "#521886",
    borderWidth: 1.5,
  },
  borderBottomInactive: {
    borderColor: "black",
  },
  textActive: {
    color: "#521886",
  },
  textInactive: {
    color: "black",
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
    /* height: 200, */
    width: 300,
  },
  /* active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  }, */
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
    display: "none",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  textInput: {
    backgroundColor: "white",
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    paddingLeft: 5,
    flex: 1,
  },
  eyeView: {},
});
