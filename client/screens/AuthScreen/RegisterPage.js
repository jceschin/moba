import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

// REDUX 
import { useDispatch } from 'react-redux';
import { createNewUser } from '../../redux/actions/user';


const RegisterPage = ({ navigation }) => {

  const { handleSubmit, control, errors } = useForm();

  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: '',
    email: '',
    name: '',
    surname: '',
    birthdate: '',
    state: '',
    city: '',
    address: '',
    dni: '',
    phone: '',
    password: '',
  })



  const onSubmit = () => {
    dispatch(createNewUser(data));
  }

  return (
    <LinearGradient style={styles.container}
      colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity animation='fadeInUpBig' onPress={() => navigation.goBack()} style={styles.back} >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
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
              <TextInput style={styles.input}
                onChangeText={text => setData({ username: text })}
                value={data.username}
                placeholder='Username'
                maxLength={40}
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={text => setData({ ...data, email: text })}
                value={data.email}
                placeholder='Email'
                maxLength={40}
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={text => setData({ ...data, name: text })}
                value={data.name}
                placeholder='Firstname'
                maxLength={20}
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={text => setData({ ...data, surname: text })}
                value={data.surname}
                placeholder='Lastname'
                maxLength={20}
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={(text) => setData({ ...data, birthdate: text })}
                value={data.birthdate}
                placeholder='Birthdate'
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={text => setData({ ...data, phone: text })}
                value={data.phone}
                keyboardType='number-pad'
                placeholder='Phone Number'
                maxLength={15}
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={(text) => setData({ ...data, state: text })}
                value={data.state}
                placeholder='State'
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={(text) => setData({ ...data, city: text })}
                value={data.city}
                placeholder='City'
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={(text) => setData({ ...data, address: text })}
                value={data.address}
                placeholder='Address'
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={(text) => setData({ ...data, dni: text })}
                value={data.dni}
                placeholder='DNI'
                maxLength={8}
              />
            </View>
            <View style={styles.inputcontainer}>
              <TextInput style={styles.input}
                onChangeText={text => setData({ ...data, password: text })}
                value={data.password}
                textContentType="password"
                placeholder='Password'
                maxLength={40}
                secureTextEntry={true}
              />
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
  textError: {
    color: 'red',
    left: 8
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
