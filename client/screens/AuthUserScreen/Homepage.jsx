
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import HomeNavbar from './HomeNavbar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Homepage = () => {
  const loggedUser = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getTransactions(loggedUser.username);
    getUser(loggedUser.username);
  }, []);

  async function getTransactions(username) {
    let response = await axios.get(`http://localhost:8080/transaction/users/${username}`);

    setTransactions(response.data);
  }

  async function getUser(username) {
    let response = await axios.get(`http://localhost:8080/users/${username}`);

    setUser(response.data);
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView>
        <View style={styles.mainContainer}>

          <View style={styles.upperContainer}>
            <Text style={styles.accountOwner}>{user.name} {user.surname}</Text>
            <Text style={styles.balanceTag}>Balance</Text>
            {
              user.account
              ? <Text style={styles.balance}>US$ {user.account.balance}</Text>
              : <Text style={styles.balance}>US$ 0</Text>
            }
            <View style={styles.options}>
              <View>
                <TouchableOpacity>
                  <AntDesign name="plus" size={24} color="black" style={styles.optionIcon}/>
                  <Text style={styles.option}>Add Money</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <MaterialIcons name="arrow-right-alt" size={24} color="black" style={styles.optionIcon}/>
                  <Text style={styles.option}>Transfer</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <Feather name="settings" size={24} color="black" style={styles.optionIcon}/>
                  <Text style={styles.option}>Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.movsContainer}>
            <Text style={styles.movsHeader}>Last Movements</Text>
            {
              transactions.map(t => {
                return (
                  <View style={styles.mov}>
                    <View style={styles.movDateContainer}>
                      <Text style={styles.movDate}>{t.date.substring(0, 10)}</Text>
                    </View>
                    <View style={styles.movDetails}>
                      {
                        t.type === 'sender'
                        ? (
                            <Text style={styles.movType}>Sended {t.description}</Text>
                        )
                        : <Text style={styles.movType}>Received US${t.amount}</Text>
                      }
                      {
                        t.type === 'sender'
                        ? (
                            <Text style={styles.movType}>− US${t.amount}</Text>
                        )
                        : <Text style={styles.movType}>US${t.amount}</Text>
                      }
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>

      </ScrollView>

      <HomeNavbar />

    </LinearGradient>
  )
}

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  movsContainer: {
    top: 70,
    minHeight: 290,
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  accountOwner: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 31
  },
  balanceTag: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: 25
  },
  balance: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30
  },
  options: {
    flexDirection: 'row',
    top: 45,
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
  movsHeader: {
    marginTop: 36,
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'normal'
  },
  mov: {
    marginTop: 15,
    marginBottom: 15,
  },
  movDate: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'normal',
    marginBottom: 5
  },
  movDateContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 167, 167, 0.83)',
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