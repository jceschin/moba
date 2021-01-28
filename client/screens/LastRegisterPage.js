import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

// REDUX 
import { useDispatch } from 'react-redux';
import { createNewUser } from '../Redux/Actions/user';
import axios from 'axios';


const LastRegisterPage = ({ navigation }) => {

  const { handleSubmit, control, errors } = useForm();
  const { state, setState } = useState(
    {
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false
    }
  )

  const API_KEY = 'AIzaSyDxpDcXAqm5pXWmfv26_wiD2yDR2U9mEsc';
  const searchLocation = async (text) => {
    setState({ searchKeyword: text });
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${searchKeyword}`,
      })
      .then((response) => {
        console.log(response.data);
        setState({
          searchResults: response.data.predictions,
          isShowingResults: true
        });
      })
      .catch(e => {
        console.log(e.response)
      });

  }

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
                    onChangeText={(text) => onChange(searchLocation(text))}
                    value={value.searchKeyword}
                    placeholder='Country'
                  />
                )}
                name='Country'
                rules={{ required: true }}
                defaultValue=''
              /> {/* 
              {state.isShowingResults && (
                <FlatList
                  data={state.searchResults}
                  renderItem={(item, index) => {
                    return (
                      <TouchableOpacity onPress={() => state.setState({
                        searchKeyword: item.description,
                        isShowingResults: false
                      })}>
                        <Text>{item.description}</Text>
                      </TouchableOpacity>
                    )
                  }}
                  keyExtractor={(item) => item.id}
                />
              )} */}
              {errors.Country && <Text style={styles.textError}>Country is required.</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <TextInput style={styles.input}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='State'
                  />
                )}
                name='State'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.State && <Text style={styles.textError}>State is required.</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <TextInput style={styles.input}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='City'
                  />
                )}
                name='City'
                rules={{ required: true }}
                defaultValue=''
              />
              {errors.City && <Text style={styles.textError}>City is required.</Text>}
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
              {errors.Address && <Text style={styles.textError}>Adrress is required.</Text>}
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