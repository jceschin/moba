import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MyAccount = () => {
    const navigation = useNavigation();

    return (
        <LinearGradient
          style={styles.container}
          colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.greeting}>Hello Juan!</Text>
          </View>
          <View style={styles.whiteContainer}>
            <Text style={styles.accountTag}>Account</Text>
            <View style={styles.options}>
              <View style={styles.option}>
                <MaterialIcons name="credit-card" size={24} color="black" />
                <Text style={styles.optionName}>Credit Cards</Text>
              </View>
              <View style={styles.option}>
                <Ionicons name="add-circle-outline" size={24} color="black" />
                <Text style={styles.optionName}>Add Money</Text>
              </View>
              <View style={styles.option}>
                <MaterialIcons name="compare-arrows" size={24} color="black" />
                <Text style={styles.optionName}>Transfers</Text>
              </View>
              <View style={styles.option}>
                <Feather name="activity" size={24} color="black" />
                <Text style={styles.optionName}>Activity</Text>
              </View>
              <View style={styles.option}>
                <AntDesign name="contacts" size={24} color="black" />
                <Text style={styles.optionName}>Contacts</Text>
              </View>
            </View>

            <Text style={styles.settingsTag}>Account Settings</Text>
              <View style={styles.options}>
                <View style={styles.option}>
                  <MaterialCommunityIcons name="account-settings-outline" size={24} color="black" />
                  <Text style={styles.optionName}>Profile</Text>
                </View>
                <View style={styles.option}>
                  <Feather name="help-circle" size={24} color="black" />
                  <Text style={styles.optionName}>Help</Text>
                </View>
                <View style={styles.option}>
                  <MaterialCommunityIcons name="logout-variant" size={24} color="black" />
                  <Text style={styles.optionName}>Log Out</Text>
                </View>
              </View>
          </View>

        </LinearGradient>
    )
}

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 18,
    paddingRight: 18
  },
  greeting: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    top: 24
  },
  whiteContainer: {
    top: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '100%',
  },
  accountTag: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#A7A7A7',
    marginTop: 85,
    marginBottom: 25,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 167, 167, 0.83)',
    borderStyle: 'solid',
  },
  options: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20
  },
  optionName: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'normal',
    marginLeft: 30
  },
  settingsTag: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#A7A7A7',
    marginTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 167, 167, 0.83)',
    borderStyle: 'solid',
  },
})