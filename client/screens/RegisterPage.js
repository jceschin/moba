import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

// REDUX 
import { useDispatch } from 'react-redux';
import { createNewUser } from '../redux/actions/user';


const LastRegisterPage = ({ navigation }) => {

  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data) => {
    console.log('ESTO ES DATA', data);
  }

  const dispatch = useDispatch();

  return (
    <LinearGradient style={styles.container}
      colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')} style={styles.back} >
        <FontAwesome name="angle-left" size={24} color="#fff" />
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
        <View style={styles.subcontainer}>
          <View style={styles.inputcontainer}>
            <Controller
              defaultValue=''
              name='Country'
              control={control}
              render={({ onChange, value }) => (
                <TextInput style={styles.input}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder='Country'
                />
              )}
            />
          </View>
          <View style={styles.inputcontainer}>
            <TextInput style={styles.input}
              placeholder='Locality'
              maxLength={40}
            />
          </View>
          <View style={styles.inputcontainer}>
            <TextInput style={styles.input}
              placeholder='Address'
              maxLength={40}
            />
          </View>
          <View style={styles.inputcontainer}>
            <TextInput style={styles.input}
              placeholder='DNI, NIE or passport'
              maxLength={40}
            />
          </View>
          <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.btncontent}>
                Submit
            </Text>
            </TouchableOpacity>
          </View>
        </View>
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