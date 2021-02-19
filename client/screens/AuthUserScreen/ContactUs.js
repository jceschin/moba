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
  Image,
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

const Contactus = ({ navigation }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [data, setData] = useState({
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  });

  const [lock, setLock] = useState("");

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });


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
          /* isActive ? styles.borderActive : styles.borderInactive, */
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
            /* isActive ? styles.textActive : styles.textInactive, */
          ]}
        >
          {section.title}
        </Text>
        <View>
          {isActive ? (
            <MaterialIcons name="keyboard-arrow-up" size={24} color="#521886" />
          ) : (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
          )}
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={styles.content}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  const contentFirst = (
    <View>
      <Text style={{fontFamily: "OpenSans_700Bold", fontSize: 16}}>
        MOBA (Mobile Bank) is a mobile banking application, born in January
        2021, part of LABS, at Henry Academy, developed with technologies such
        as <Text style={{ color: "#521886" }}>React Native, React Native Expo, Redux, Express Gateway, Sequelize
        and PostgreSQL</Text>, made with the intention of being a friendly app to the
        eye and the user experience, made with dedication, effort, passion and
        love for learning and self-improvement every day.
      </Text>
    </View>
  );

  const contentSecond = (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "OpenSans_700Bold", fontSize: 30 }}>
          MO<Text style={{ color: "#521886" }}>BA</Text> Staff
        </Text>
        <View style={{ height: 2, width: 200, backgroundColor: "#521886" }} />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../resources/images/facu.jpeg")}
          />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Facundo <Text style={{ color: "#521886" }}>Ortiz</Text>
          </Text>
          <View style={{ height: 2, width: 130, backgroundColor: "#521886" }} />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              /* width: 200 */
            }}
          >
            MO<Text style={{ color: "#521886" }}>BA</Text>{" "}
            <Text style={{ color: "#521886" }}>Backend</Text> Developer
          </Text>
          <View style={{ height: 2, width: 235, backgroundColor: "#521886" }} />

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              width: 100,
            }}
          >
            Full Stack <Text style={{ color: "#521886" }}>Javascript</Text>{" "}
            Developer
          </Text>

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              color: "#521886",
            }}
          >
            Networking
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="github-square" size={40} color="#521886" />
            <FontAwesome
              name="linkedin-square"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../resources/images/ibra.jpeg")}
          />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Ibrahin <Text style={{ color: "#521886" }}>Rodríguez</Text>
          </Text>
          <View style={{ height: 2, width: 160, backgroundColor: "#521886" }} />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              /* width: 200 */
            }}
          >
            MO<Text style={{ color: "#521886" }}>BA</Text>{" "}
            <Text style={{ color: "#521886" }}>Backend</Text> Developer
          </Text>
          <View style={{ height: 2, width: 235, backgroundColor: "#521886" }} />

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              width: 100,
            }}
          >
            Full Stack <Text style={{ color: "#521886" }}>Javascript</Text>{" "}
            Developer
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              color: "#521886",
            }}
          >
            Networking
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="github-square" size={40} color="#521886" />
            <FontAwesome
              name="linkedin-square"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../resources/images/ivan.jpeg")}
          />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Ivan <Text style={{ color: "#521886" }}>Carabajal</Text>
          </Text>
          <View style={{ height: 2, width: 130, backgroundColor: "#521886" }} />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              /* width: 200 */
            }}
          >
            MO<Text style={{ color: "#521886" }}>BA</Text>{" "}
            <Text style={{ color: "#521886" }}>Frontend</Text> Developer
          </Text>
          <View style={{ height: 2, width: 240, backgroundColor: "#521886" }} />

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              width: 100,
            }}
          >
            Full Stack <Text style={{ color: "#521886" }}>Javascript</Text>{" "}
            Developer
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              color: "#521886",
            }}
          >
            Networking
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="github-square" size={40} color="#521886" />
            <FontAwesome
              name="linkedin-square"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../resources/images/jairo.png")}
          />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Jairo <Text style={{ color: "#521886" }}>Ponti</Text>
          </Text>
          <View style={{ height: 2, width: 110, backgroundColor: "#521886" }} />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              /* width: 200 */
            }}
          >
            MO<Text style={{ color: "#521886" }}>BA</Text>{" "}
            <Text style={{ color: "#521886" }}>Frontend</Text> Developer
          </Text>
          <View style={{ height: 2, width: 240, backgroundColor: "#521886" }} />

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              width: 100,
            }}
          >
            Full Stack <Text style={{ color: "#521886" }}>Javascript</Text>{" "}
            Developer
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              color: "#521886",
            }}
          >
            Networking
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="github-square" size={40} color="#521886" />
            <FontAwesome
              name="linkedin-square"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../resources/images/jose.jpeg")}
          />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            José <Text style={{ color: "#521886" }}>Ramírez</Text>
          </Text>
          <View style={{ height: 2, width: 125, backgroundColor: "#521886" }} />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              /* width: 200 */
            }}
          >
            MO<Text style={{ color: "#521886" }}>BA</Text>{" "}
            <Text style={{ color: "#521886" }}>Backend</Text> Developer
          </Text>
          <View style={{ height: 2, width: 235, backgroundColor: "#521886" }} />

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              width: 100,
            }}
          >
            Full Stack <Text style={{ color: "#521886" }}>Javascript</Text>{" "}
            Developer
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              color: "#521886",
            }}
          >
            Networking
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="github-square" size={40} color="#521886" />
            <FontAwesome
              name="linkedin-square"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../resources/images/juan.jpeg")}
          />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Juan <Text style={{ color: "#521886" }}>Ceschin</Text>
          </Text>
          <View style={{ height: 2, width: 120, backgroundColor: "#521886" }} />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              /* width: 200 */
            }}
          >
            MO<Text style={{ color: "#521886" }}>BA</Text>{" "}
            <Text style={{ color: "#521886" }}>Frontend</Text> Developer
          </Text>
          <View style={{ height: 2, width: 240, backgroundColor: "#521886" }} />

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              width: 100,
            }}
          >
            Full Stack <Text style={{ color: "#521886" }}>Javascript</Text>{" "}
            Developer
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              color: "#521886",
            }}
          >
            Networking
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="github-square" size={40} color="#521886" />
            <FontAwesome
              name="linkedin-square"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../resources/images/lucas.jpeg")}
          />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Lucas <Text style={{ color: "#521886" }}>Gualampa</Text>
          </Text>
          <View style={{ height: 2, width: 150, backgroundColor: "#521886" }} />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              /* width: 200 */
            }}
          >
            MO<Text style={{ color: "#521886" }}>BA</Text>{" "}
            <Text style={{ color: "#521886" }}>Backend</Text> Developer
          </Text>
          <View style={{ height: 2, width: 235, backgroundColor: "#521886" }} />

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              width: 100,
            }}
          >
            Full Stack <Text style={{ color: "#521886" }}>Javascript</Text>{" "}
            Developer
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              color: "#521886",
            }}
          >
            Networking
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="github-square" size={40} color="#521886" />
            <FontAwesome
              name="linkedin-square"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={styles.image}
            source={require("../../resources/images/migue.png")}
          />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Miguel <Text style={{ color: "#521886" }}>Hernandez</Text>
          </Text>
          <View style={{ height: 2, width: 165, backgroundColor: "#521886" }} />
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              /* width: 200 */
            }}
          >
            MO<Text style={{ color: "#521886" }}>BA</Text>{" "}
            <Text style={{ color: "#521886" }}>Frontend</Text> Developer
          </Text>
          <View style={{ height: 2, width: 240, backgroundColor: "#521886" }} />

          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              width: 100,
            }}
          >
            Full Stack <Text style={{ color: "#521886" }}>Javascript</Text>{" "}
            Developer
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 18,
              marginTop: 10,
              color: "#521886",
            }}
          >
            Networking
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <FontAwesome name="github-square" size={40} color="#521886" />
            <FontAwesome
              name="linkedin-square"
              size={40}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const content = [
    {
      title: "What is MOBA?",
      content: contentFirst,
    },
    {
      title: "Meet MOBA Staff",
      content: contentSecond,
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
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Animatable.View animation="slideInRight" style={styles.section}>
              <View style={styles.Wrapper}>
                  <View style={{alignItems: "center", marginBottom: 100}}>
                  <Text style={{fontFamily: "OpenSans_700Bold", fontSize: 30}}>Meet Us</Text>
                  <View style={{backgroundColor: "#521886", width: 200, height: 3, marginTop: 10}}/>
                  </View>
                <View style={styles.multipleToggle}>
                  <Text style={styles.multipleToggle__title}>
                    Multiple Select?
                  </Text>
                  <Switch
                    value={data.multipleSelect}
                    onValueChange={(a) => setData({ multipleSelect: a })}
                  />
                </View>
                <ScrollView style={{ width: 300 }}>
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
                </ScrollView>
              </View>
            </Animatable.View>
          </View>
        </Animatable.View>
      </TouchableWithoutFeedback>
    );
  }
};

export default Contactus;

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
    fontSize: 20,
  },
  body: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -70,
    alignItems: "center",
  },
  bodySuccess: {
    flex: 1,
    backgroundColor: "#521886",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginTop: 60,
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
    padding: 10,
    backgroundColor:"#521886",
    borderColor: "white",
    borderWidth: 0.5
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
    color: "white"
  },
  content: {
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    /* width: 300, */
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 200,
  },
});
