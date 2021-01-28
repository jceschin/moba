import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Autocompleter } from '@usig-gcba/autocompleter';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

// REDUX 
import { useDispatch } from 'react-redux';
import { createNewUser } from '../redux/actions/user';


const LastRegisterPage = ({ navigation }) => {

  const { handleSubmit, control, errors } = useForm();
  const { state, setState } = useState({
    autocompleter: '',
    showMap: false,
    loading: false,
    x: null,
    y: null,
    input: '',
    error: null,
    suggestions: [],
    selectedSuggestion: null,
    direccionesCaba: true,
    direccionesAmba: true,
    lugares: true,
    deficit: true,
    catastro: true,
    long: 3,
    pause: 300,
    maxSugg: 10
  })

  const dispatch = useDispatch();

  const onSubmit = (user) => {
    dispatch(createNewUser(user));
  }


  return (
    <LinearGradient style={styles.container}
      colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back} >
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <Animatable.View
        animation='fadeInUpBig'
        style={styles.section}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            Register
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.subcontainer}>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <TextInput style={styles.input}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='Country'
                  />
                )}
                name='Country'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.Country && <Text style={styles.textError}>Country is required.</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <TextInput style={styles.input}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='Locality'
                  />
                )}
                name='Locality'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.Locality && <Text style={styles.textError}>Locality is required.</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <TextInput style={styles.input}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='Address'
                  />
                )}
                name='Address'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.Address && <Text style={styles.textError}>Address is required.</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <TextInput style={styles.input}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='DNI, NIE or passport'
                    maxLength={8}
                  />
                )}
                name='DNI'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.DNI && <Text style={styles.textError}>DNI is required.</Text>}
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.btncontent}>
                  Submit
            </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </LinearGradient>
  )
}

export default LastRegisterPage;


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