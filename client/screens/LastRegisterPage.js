import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';


const RegisterPage = ({ navigation }) => {

  const { handleSubmit, control, errors } = useForm();


  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");


  const onSubmit = (data) => {
    console.log('ESTO ES DATA', data);
  }

  return (
    <LinearGradient style={styles.container}
      colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('LandingPage')} style={styles.back} >
        <FontAwesome name="angle-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Animatable.View
        animation='fadeInUpBig'
        style={styles.section}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            Create Account
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.subcontainer}>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder='Firstname'
                    maxLength={20}
                  />
                )}
                name='Firstname'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.Firstname && <Text style={{
                color: 'red',
                left: 8
              }}>Firstname is required.</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder='Lastname'
                    maxLength={20}
                  />
                )}
                name='Lastname'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.Lastname && <Text style={{
                color: 'red',
                left: 8
              }}>Lastname is required.</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    keyboardType='number-pad'
                    placeholder='Phone Number'
                    maxLength={30}
                  />
                )}
                name='PhoneNumber'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.PhoneNumber && <Text style={{
                color: 'red',
                left: 8
              }}>Phone is required.</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    textContentType="password"
                    placeholder='Password'
                    maxLength={40}
                    secureTextEntry={true}
                  />
                )}
                name='Password'
                rules={{ required: true }, {
                  pattern: {
                    value: strongRegex,
                    message: 'Password most contain at least one uppercase letter, one lowercase, one special character and one number'
                  }
                }}
                defaultValue=''
              />
              {errors.Password && <Text style={{
                color: 'red',
                left: 8
              }}>Password is required.</Text>}
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.btncontent}>
                  Continue
            </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </LinearGradient>
  )
}

export default RegisterPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    justifyContent: 'center',
    marginLeft: 18,
    marginTop: 40,
    marginBottom: -20,
  },
  section: {
    flex: 1,
    width: '100%',
    marginTop: 80,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  header: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 10,
    width: '100%'
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingVertical: 20
  },
  subcontainer: {
    position: 'relative',
    justifyContent: 'center',
    width: 'auto'
  },
  inputcontainer: {
    width: 'auto',
    padding: 20,
  },
  input: {
    padding: 6,
    borderRadius: 15,
    backgroundColor: 'rgba(245, 244, 244, 1)'
  },
  buttoncontainer: {
    position: 'relative',
    width: 'auto',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    minWidth: '90%',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#567BFF'
  },
  btncontent: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontStyle: 'normal'
  }
})