import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import { useNavigation } from "@react-navigation/native";

const TransferReceipt = ({ route }) => {

  // Fonts
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const navigation = useNavigation();
  const lastTransaction = route.params;
  const loggedUser = useSelector((state) => state.user);
  const destinatary = useSelector((state) => state.contacts.selectedContact);

  return (
    <View style={styles.colorContainer}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.welcomeView}>
            <Text style={styles.text_header}>Successful transfer</Text>
          </View>
        </View>
        <View style={styles.whiteContainer}>
          <View style={styles.transferContainer}>
            <View style={styles.transferHeader}>
              <Text style={styles.transferTitle}> Transfer Receipt</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.title}>Amount</Text>
              <Text style={styles.info}>
                $ {lastTransaction.lastTransaction.amount}
              </Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.title}>From</Text>
              <Text style={styles.info}>
                {loggedUser.info.name} {loggedUser.info.surname}
              </Text>
              <Text style={styles.info}>
                {loggedUser.info.account.cvu}
              </Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.title}>To</Text>
              <Text style={styles.info}>
                {destinatary.name} {destinatary.surname}
              </Text>
              <Text style={styles.info}>
                {destinatary.account.cvu}
              </Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.title}>Transaction number</Text>
              <Text style={styles.info}>
                {"000".concat(lastTransaction.lastTransaction.number)}
              </Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.title}>Transaction date</Text>
              <Text style={styles.info}>
                {lastTransaction.lastTransaction.createdAt.slice(0, 10)}
              </Text>
            </View>

            <View style={{alignItems: 'right'}}>
              <Image
                style={styles.image}
                source={require("../../resources/images/mobapng.png")}
              />
            </View>
          </View>
        </View>

      <TouchableOpacity
      style={styles.buttonContinue}
      onPress={() => navigation.navigate("HomePage")}
      >
        <Text style={styles.btnContent}>Continue</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TransferReceipt;

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    backgroundColor: "#521886"
  },
  whiteContainer: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: "100%",
    minHeight: 1000
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    marginBottom: 12,
    top: 35
  },
  welcomeView: {
    flex: 1,
    alignItems: "center",
  },
  text_header: {
    color: "#fff",
    fontFamily: "OpenSans_700Bold",
    fontSize: 20
  },
  transferContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    top: 60,
    height: 450,
    marginLeft: 50,
    marginRight: 50,
  },
  transferHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderStyle: "solid",
  },
  transferTitle: {
    color: "#000000",
    fontFamily: "OpenSans_700Bold",
    fontSize: 18,
    textAlign: 'center'
  },
  data: {
    marginHorizontal: 15,
    marginVertical: 10
  },
  image: {
    flex: 1,
    width: 152,
    height: 37
  },
  title: {
    color: "#515151",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14
  },
  info: {
    color: "#000000",
    fontFamily: "OpenSans_700Bold",
    fontSize: 14
  },
  buttonContinue: {
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginRight: 18,
    marginLeft: 18,
    top: 365,
  },
  btnContent: {
    textAlign: "center",
    color: "#521886",
    fontSize: 20,
    fontFamily: 'OpenSans_700Bold'
  },
});