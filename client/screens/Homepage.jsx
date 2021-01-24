import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';

const Homepage = () => {
  return (
    <LinearGradient
    style={styles.container}
    colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    >
      <ScrollView>
        <Text style={styles.accountOwner}>Juan Ceschin</Text>
        <Text style={styles.balanceTag}>Money</Text>
        <Text style={styles.balance}>US$ 5,000</Text>
        <View style={styles.options}>
          <View>
            <AntDesign name="plus" size={24} color="black" style={styles.optionIcon}/>
            <Text style={styles.option}>Add Money</Text>
          </View>
          <View>
            <MaterialIcons name="arrow-right-alt" size={24} color="black" style={styles.optionIcon}/>
            <Text style={styles.option}>Transfer</Text>
          </View>
          <View>
            <Feather name="settings" size={24} color="black" style={styles.optionIcon}/>
            <Text style={styles.option}>Settings</Text>
          </View>
        </View>
        <View style={styles.movsContainer}>
          <Text style={styles.movsHeader}>Last Movements</Text>
          <View style={styles.mov}>
            <View style={styles.movDateContainer}>
              <Text style={styles.movDate}>January 2021</Text>
            </View>
            <View style={styles.movDetails}>
              <Text style={styles.movType}>Type of transfer</Text>
              <Text style={styles.movAmount}>US$999.99</Text>
            </View>
          </View>
          <View style={styles.mov}>
            <View style={styles.movDateContainer}>
              <Text style={styles.movDate}>January 2021</Text>
            </View>
            <View style={styles.movDetails}>
              <Text style={styles.movType}>Type of transfer</Text>
              <Text style={styles.movAmount}>US$999.99</Text>
            </View>
          </View>
          <View style={styles.mov}>
            <View style={styles.movDateContainer}>
              <Text style={styles.movDate}>January 2021</Text>
            </View>
            <View style={styles.movDetails}>
              <Text style={styles.movType}>Type of transfer</Text>
              <Text style={styles.movAmount}>US$999.99</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountOwner: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 31
  },
  balanceTag: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'normal',
    top: 70
  },
  balance: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 100
  },
  options: {
    flexDirection: 'row',
    top: 140,
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 18
  },
  option: {
    fontSize: 16
  },
  optionIcon: {
    textAlign: 'center',
    marginBottom: 5
  },
  movsContainer: {
    top: 160,
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  movsHeader: {
    marginTop: 36,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'normal'
  },
  mov: {
    marginTop: 10,
    marginBottom: 10,
  },
  movDate: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'normal',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'solid',
    marginBottom: 5
  },
  movDateContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderStyle: 'solid',
    paddingLeft: 18,
    paddingRight: 18
  },
  movDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 18,
    marginTop: 5
  },
  movType: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'normal'
  },
  movAmount: {
    fontSize: 14,
    textAlign: 'right',
    fontWeight: 'normal'
  }
})