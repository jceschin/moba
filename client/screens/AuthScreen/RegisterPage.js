import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import SplashScreen2 from "../HomeScreen/SplashScreen2";
// REDUX
import { useDispatch } from "react-redux";
import { createNewUser } from "../../redux/actions/user";
import moment from "moment";
import { TextInputMask } from "react-native-masked-text";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RegisterPage = ({ navigation, route }) => {
  const { handleSubmit, control, errors } = useForm();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    name: "",
    surname: "",
    birthdate: "",
    state: "",
    city: "",
    address: "",
    dni: "",
    phone: "",
    password: "",
    confirmPassword: "",
    check_textInputChangeUsername: false,
    check_textInputChangeName: false,
    check_textInputChangeSurname: false,
    check_textInputChangeBirthdate: false,
    check_textInputChangeState: false,
    check_textInputChangeCity: false,
    check_textInputChangeAddress: false,
    check_textInputChangeDni: false,
    check_textInputChangePhone: false,
    secureTextEntry: true,
    isValidUsername: false,
    isValidPassword: false,
    isValidConfirmPassword: false,
    isValidName: false,
    isValidSurname: false,
    isValidState: false,
    isValidCity: false,
    isValidAddress: false,
    isValidPhone: false,
    isValidDni: false,
    isValidBirthdate: false,
    secureTextEntryPassword: true,
    secureTextEntryConfirmPassword: true,
  });

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const [pages, setPages] = useState("");
  const [focus, setFocus] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [disableFirst, setDisableFirst] = useState(false);
  const [disableSecond, setDisableSecond] = useState(false);
  const [disableThird, setDisableThird] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setData({
      ...data,
      birthdate: moment(date).format("DD/MM/YYYY").split("T")[0],
    });
    hideDatePicker();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  useEffect(() => {
    setPages("second");
  }, []);

  useEffect(() => {
    if (
      data.isValidUsername === true &&
      data.isValidName === true &&
      data.isValidSurname === true
    ) {
      setDisableFirst(true);
    } else {
      setDisableFirst(false);
    }
  });

  useEffect(() => {
    if (
      data.birthdate &&
      data.isValidPhone === true &&
      data.isValidDni === true
    ) {
      setDisableSecond(true);
    } else {
      setDisableSecond(false);
    }
  });

  useEffect(() => {
    if (
      data.isValidState === true &&
      data.isValidCity === true &&
      data.isValidAddress === true
    ) {
      setDisableThird(true);
    } else {
      setDisableThird(false);
    }
  });

  useEffect(() => {
    if (data.isValidPassword === true && data.isValidConfirmPassword === true) {
      setDisabledSubmit(true);
    } else {
      setDisabledSubmit(false);
    }
  });

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
  };

  const validateDate = (date) => {
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    return re.test(date)
  }

  const onChangeTextUsername = (val) => {
    if (val.length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChangeUsername: true,
        isValidUsername: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChangeUsername: false,
        isValidUsername: false,
      });
    }
  };

  const onChangeTextName = (val) => {
    if (val.length >= 1) {
      setData({
        ...data,
        name: val,
        check_textInputChangeName: true,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_textInputChangeName: false,
        isValidName: false,
      });
    }
  };

  const onChangeTextSurname = (val) => {
    if (val.length >= 1) {
      setData({
        ...data,
        surname: val,
        check_textInputChangeSurname: true,
        isValidSurname: true,
      });
    } else {
      setData({
        ...data,
        surname: val,
        check_textInputChangeSurname: false,
        isValidSurname: false,
      });
    }
  };

  const onChangeTextState = (val) => {
    if (val.length > 1) {
      setData({
        ...data,
        state: val,
        check_textInputChangeState: true,
        isValidState: true,
      });
    } else {
      setData({
        ...data,
        state: val,
        check_textInputChangeState: false,
        isValidState: false,
      });
    }
  };
  const onChangeTextCity = (val) => {
    if (val.length > 1) {
      setData({
        ...data,
        city: val,
        check_textInputChangeCity: true,
        isValidCity: true,
      });
    } else {
      setData({
        ...data,
        city: val,
        check_textInputChangeCity: false,
        isValidCity: false,
      });
    }
  };
  const onChangeTextAddress = (val) => {
    if (val.length > 1) {
      setData({
        ...data,
        address: val,
        check_textInputChangeAddress: true,
        isValidAddress: true,
      });
    } else {
      setData({
        ...data,
        address: val,
        check_textInputChangeAddress: false,
        isValidAddress: false,
      });
    }
  };

  const onChangeTextPhone = (val) => {
    if (!Number.isNaN(val) & (val.length > 5)) {
      setData({
        ...data,
        phone: val,
        check_textInputChangePhone: true,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        phone: val,
        check_textInputChangePhone: false,
        isValidPhone: false,
      });
    }
  };

  const onChangeTextDni = (val) => {
    if (!Number.isNaN(val) & (val.length === 8)) {
      setData({
        ...data,
        dni: val,
        check_textInputChangeDni: true,
        isValidDni: true,
      });
    } else {
      setData({
        ...data,
        dni: val,
        check_textInputChangeDni: false,
        isValidDni: false,
      });
    }
  };

  const onChangeTextBirthdate = (val) => {
    if (validateDate(val))
      setData({
        ...data,
        birthdate: val,
        isValidBirthdate: true,
      });
    else {
      setData({
        ...data,
        birthdate: val,
        isValidBirthdate: false,
      });
    }
  };

  console.log(data.birthdate)
  console.log("birthdate", data.isValidBirthdate)

  /*   const textInputChange = (text) => {
    if (text.length === 2) {
      text += "/";
    } else if (text.length === 5) {
      text += "/";
    }
    setData({ ...data, birthdate: text });
  }; */

  const handlePassword = (val) => {
    if (validatePassword(val.trim())) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handlePasswordConfirm = (val) => {
    if (val.trim() === data.password) {
      setData({
        ...data,
        confirmPassword: val,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: val,
        isValidConfirmPassword: false,
      });
    }
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

  const onSubmit = () => {
    if (!data.password && !data.confirmPassword) {
      Alert.alert("You need to fill all the fields");
    } else {
      dispatch(createNewUser({ ...data, email: route.params.email }));
      Alert.alert("Account has been created successfully");
      navigation.navigate("AuthScreen", { screen: "Login" });
    }
  };

  const buttonFirstPage = () => {
    if (
      data.isValidUsername === true &&
      data.isValidName === true &&
      data.isValidSurname === true
    ) {
      setPages("second");
    } else {
      setDisableFirst(false);
      Alert.alert("You need to fill all the fields to continue");
    }
  };

  const buttonSecondPage = () => {
    if (
      data.isValidBirthdate === true &&
      data.isValidPhone === true &&
      data.isValidDni === true
    ) {
      setPages("third");
    } else {
      Alert.alert("You need to fill all the fields to continue");
    }
  };

  const buttonThirdPage = () => {
    if (
      data.isValidState === true &&
      data.isValidCity === true &&
      data.isValidAddress === true
    ) {
      setPages("fourth");
    } else {
      Alert.alert("You need to fill all the fields to continue");
    }
  };


  if (!fontsLoaded) {
    return <SplashScreen2 />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            {pages === "first" ? (
              <>
                <Text style={styles.title}>First Step</Text>

                <View
                  style={[
                    focus === "username"
                      ? styles.inputcontainerOneFocus
                      : styles.inputcontainerOne,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeTextUsername(text)}
                    value={data.username}
                    autoCapitalize="none"
                    placeholder="Username"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    maxLength={40}
                    onFocus={() => setFocus("username")}
                  />
                  {data.check_textInputChangeUsername ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={styles.checkView}
                    >
                      <AntDesign name="checkcircle" size={21} color="green" />
                    </Animatable.View>
                  ) : null}
                </View>

                {data.isValidUsername ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsgUsername}>
                      Username must be at least 4 characters
                    </Text>
                  </Animatable.View>
                )}

                <View
                  style={[
                    focus === "name"
                      ? styles.inputcontainerTwoFocus
                      : styles.inputcontainerTwo,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeTextName(text)}
                    value={data.name}
                    placeholder="Firstname"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    maxLength={20}
                    onFocus={() => setFocus("name")}
                  />
                  {data.check_textInputChangeName ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={styles.checkView}
                    >
                      <AntDesign name="checkcircle" size={21} color="green" />
                    </Animatable.View>
                  ) : null}
                </View>

                <View
                  style={[
                    focus === "surname"
                      ? styles.inputcontainerThreeFocus
                      : styles.inputcontainerThree,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeTextSurname(text)}
                    value={data.surname}
                    placeholder="Lastname"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    maxLength={20}
                    onFocus={() => setFocus("surname")}
                  />
                  {data.check_textInputChangeSurname ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={styles.checkView}
                    >
                      <AntDesign name="checkcircle" size={21} color="green" />
                    </Animatable.View>
                  ) : null}
                </View>
                <View style={styles.buttoncontainer}>
                  <TouchableOpacity
                    disabled={!disableFirst}
                    style={[
                      styles.button,
                      disableFirst === false
                        ? styles.buttonDisable
                        : styles.buttonAble,
                    ]}
                    onPress={buttonFirstPage}
                  >
                    <Text style={styles.btncontent}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : pages === "second" ? (
              <>
                <Text style={styles.title}>Keep telling us about you</Text>
                <View
                  style={[
                    focus === "birthdate"
                      ? styles.inputcontainerOneFocus
                      : styles.inputcontainerOne,
                  ]}
                >
                  <TextInputMask
                    type={"datetime"}
                    options={{
                      format: "DD/MM/YYYY",
                    }}
                    placeholder="Birthdate MM/DD/YY"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    value={data.birthdate}
                    onChangeText={(text) => onChangeTextBirthdate(text)}
                    style={styles.input}
                    onFocus={() => setFocus("birthdate")}
                    maxLength={10}
                  />

                  <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.checkView}>
                      <MaterialCommunityIcons
                        name="calendar-month"
                        size={24}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode={mode}
                    value={date}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
                {data.isValidBirthdate ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                      Insert a valid date
                    </Text>
                  </Animatable.View>
                )}


                <View
                  style={[
                    focus === "phone"
                      ? styles.inputcontainerTwoFocus
                      : styles.inputcontainerTwo,
                  ]}
                >
                  <TextInputMask
                    type={"cel-phone"}
                    options={{
                      maskType: "BRL",
                      withDDD: true,
                      dddMask: "(99) ",
                    }}
                    value={data.phone}
                    onChangeText={(text) => onChangeTextPhone(text)}
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    onFocus={() => setFocus("phone")}
                  />
                  {data.check_textInputChangePhone ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={styles.checkView}
                    >
                      <AntDesign name="checkcircle" size={21} color="green" />
                    </Animatable.View>
                  ) : null}
                </View>

                {data.isValidPhone ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsgPhone}>
                      Phone number must be numbers and contain at least 8 digits
                    </Text>
                  </Animatable.View>
                )}
                <View
                  style={[
                    focus === "dni"
                      ? styles.inputcontainerThreeFocus
                      : styles.inputcontainerThree,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    keyboardType={"phone-pad"}
                    onChangeText={(text) => onChangeTextDni(text)}
                    value={data.dni}
                    placeholder="DNI"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    maxLength={8}
                    onFocus={() => setFocus("dni")}
                  />
                  {data.check_textInputChangeDni ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={styles.checkView}
                    >
                      <AntDesign name="checkcircle" size={21} color="green" />
                    </Animatable.View>
                  ) : null}
                </View>
                {data.isValidDni ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                      DNI must contain 8 digits
                    </Text>
                  </Animatable.View>
                )}

                <View style={styles.buttoncontainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      disableSecond === false
                        ? styles.buttonDisable
                        : styles.buttonAble,
                    ]}
                    onPress={buttonSecondPage}
                    disabled={!disableSecond}
                  >
                    <Text style={styles.btncontent}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : pages === "third" ? (
              <>
                <Text style={styles.title}>Where do you live?</Text>
                <View
                  style={[
                    focus === "state"
                      ? styles.inputcontainerThreeFocus
                      : styles.inputcontainerThree,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeTextState(text)}
                    value={data.state}
                    placeholder="State"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    onFocus={() => setFocus("state")}
                  />
                  {data.check_textInputChangeState ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={styles.checkView}
                    >
                      <AntDesign name="checkcircle" size={21} color="green" />
                    </Animatable.View>
                  ) : null}
                </View>
                {data.isValidState ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Insert a valid state</Text>
                  </Animatable.View>
                )}
                <View
                  style={[
                    focus === "city"
                      ? styles.inputcontainerOneFocus
                      : styles.inputcontainerOne,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeTextCity(text)}
                    value={data.city}
                    placeholder="City"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    onFocus={() => setFocus("city")}
                  />
                  {data.check_textInputChangeCity ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={styles.checkView}
                    >
                      <AntDesign name="checkcircle" size={21} color="green" />
                    </Animatable.View>
                  ) : null}
                </View>
                {data.isValidCity ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Insert a valid city</Text>
                  </Animatable.View>
                )}
                <View
                  style={[
                    focus === "address"
                      ? styles.inputcontainerTwoFocus
                      : styles.inputcontainerTwo,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => onChangeTextAddress(text)}
                    value={data.address}
                    placeholder="Address"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    onFocus={() => setFocus("address")}
                  />
                  {data.check_textInputChangeAddress ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={styles.checkView}
                    >
                      <AntDesign name="checkcircle" size={21} color="green" />
                    </Animatable.View>
                  ) : null}
                </View>
                {data.isValidPhone ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Insert a valid address</Text>
                  </Animatable.View>
                )}

                <View style={styles.buttoncontainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      disableThird === false
                        ? styles.buttonDisable
                        : styles.buttonAble,
                    ]}
                    onPress={buttonThirdPage}
                    disabled={!disableThird}
                  >
                    <Text style={styles.btncontent}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : pages === "fourth" ? (
              <>
                <Text style={styles.title}>And last but not least</Text>
                <View
                  style={[
                    focus === "password"
                      ? styles.inputcontainerPasswordFocus
                      : styles.inputcontainerPassword,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => handlePassword(text)}
                    value={data.password}
                    textContentType="password"
                    placeholder="Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    maxLength={40}
                    secureTextEntry={
                      data.secureTextEntryPassword ? true : false
                    }
                    onFocus={() => setFocus("password")}
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

                {data.isValidPassword ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsgPassword}>
                      Password must contain at least 1 uppercase, 1 number and 8
                      characters
                    </Text>
                  </Animatable.View>
                )}

                <View
                  style={[
                    focus === "confirmPassword"
                      ? styles.inputcontainerConfirmPasswordFocus
                      : styles.inputcontainerConfirmPassword,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => handlePasswordConfirm(text)}
                    value={data.confirmPassword}
                    textContentType="password"
                    placeholder="Confirm Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    maxLength={40}
                    secureTextEntry={
                      data.secureTextEntryConfirmPassword ? true : false
                    }
                    onFocus={() => setFocus("confirmPassword")}
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
                {data.isValidConfirmPassword ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                      Passwords must be the same
                    </Text>
                  </Animatable.View>
                )}

                <View style={styles.buttoncontainer}>
                  <TouchableOpacity
                    style={[
                      styles.buttonSubmit,
                      disabledSubmit === false
                        ? styles.buttonDisable
                        : styles.buttonAble,
                    ]}
                    disabled={!disabledSubmit}
                    onPress={handleSubmit(onSubmit)}
                  >
                    <Text style={styles.btncontent}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    justifyContent: "center",
    marginLeft: 18,
    marginTop: 40,
    marginBottom: -20,
  },
  section: {
    flex: 1,
    width: "100%",
    marginTop: 80,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    alignItems: "center",
    position: "relative",
    marginTop: 10,
    width: "100%",
  },
  title: {
    fontFamily: "OpenSans_700Bold",
    color: "black",
    fontSize: 24,
    marginTop: 47,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  textError: {
    color: "red",
    left: 8,
  },
  inputcontainerOne: {
    width: 258,
    marginTop: 39,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  inputcontainerOneFocus: {
    width: 258,
    marginTop: 39,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderBottomColor: "#6D00CE",
  },
  inputcontainerTwo: {
    width: 258,
    marginTop: 85,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  inputcontainerTwoFocus: {
    width: 258,
    marginTop: 85,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#6D00CE",
    paddingBottom: 5,
  },
  inputcontainerThree: {
    width: 258,
    marginTop: 85,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  inputcontainerThreeFocus: {
    width: 258,
    marginTop: 85,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#6D00CE",
    paddingBottom: 5,
  },
  inputcontainerPassword: {
    width: 258,
    marginTop: 103,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  inputcontainerPasswordFocus: {
    width: 258,
    marginTop: 103,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#6D00CE",
    paddingBottom: 5,
  },
  inputcontainerConfirmPassword: {
    width: 258,
    marginTop: 78,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  inputcontainerConfirmPasswordFocus: {
    width: 258,
    marginTop: 78,
    height: 30,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#6D00CE",
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: "black",
    fontSize: 18,
    fontFamily: "OpenSans_600SemiBold",
  },
  buttoncontainer: {
    position: "relative",
    width: "auto",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 379,
    marginTop: 100,
    backgroundColor: "#521886",
  },
  buttonAble: {
    backgroundColor: "#521886",
  },
  buttonDisable: {
    backgroundColor: "rgba(82, 24, 134, 0.56)",
  },
  buttonSubmit: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 379,
    marginTop: 160,
    backgroundColor: "#521886",
  },
  btncontent: {
    fontSize: 18,
    fontFamily: "OpenSans_800ExtraBold",
    color: "#fff",
  },
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
  footer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -60,
    alignItems: "center",
  },
  errorMsg: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
  },
  errorMsgPhone: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
    width: 256,
  },
  errorMsgUsername: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
    width: 200,
  },
  errorMsgPassword: {
    color: "#CC1833",
    fontSize: 15,
    fontFamily: "OpenSans_600SemiBold",
    paddingLeft: 7,
    width: 270,
  },
  checkView: {
    right: 2,
  },
  eyeView: {
    right: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "white",
  },
  textStyle: {
    color: "#521886",
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "OpenSans_700Bold",
  },
  textInputStype: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
  },
});
