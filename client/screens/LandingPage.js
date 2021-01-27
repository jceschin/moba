import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LandingPage = (props) => {

 const createAccount = () => {
   props.navigation.navigate('CreateAccount')
 }

  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.subcontainer}>
        <Text style={styles.title}>
          Welcome to MOBA
            </Text>
        <Text style={styles.subtitle}>
          Your finances simple and fast.
          Open your account now.
            </Text>
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.btncontent}>
            Log In
              </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={() => createAccount()}>
          <Text style={styles.btncontent}>
            Create Account
              </Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  subcontainer: {
    flex: 1,
    position: 'absolute',
    padding: 10
  },
  buttoncontainer: {
    flex: 1,
    alignItems: 'center',
    width: 'auto',
    justifyContent: 'flex-end',
    marginBottom: 80
  },
  title: {
    flex: 1,
    position: 'relative',
    marginLeft: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#fff',
    textShadowRadius: 5,
    lineHeight: 42,
    fontSize: 36,
    width: 239,
    height: 42
  },
  subtitle: {
    flex: 1,
    position: 'relative',
    marginLeft: 18,
    fontFamily: 'Roboto',
    fontWeight: '500',
    textShadowRadius: 5,
    color: '#fff',
    fontSize: 18,
    lineHeight: 21,
    width: 200,
    height: 63,
  },
  buttons: {
    width: '90%',
    marginBottom: 20,
    height: '10%',
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#567BFF'
  },
  btncontent: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 20
  }

})