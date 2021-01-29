import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

// REDUX 
import { useDispatch } from 'react-redux';
import { createNewUser } from '../../redux/actions/user';


const LastRegisterPage = ({ navigation }) => {

  const { handleSubmit, control, errors } = useForm();
  const [state, setState] = useState(
    {
      searchKeyword: '',
      searchResults: [],
      isShowingResults: false
    }
  )

  const searchLocation = async (text) => {
    setState({ searchKeyword: text });
    axios
      .request({
        method: 'post',
        url: `https://restcountries.eu/rest/v2/name/eesti/&${state.searchKeyword}`,
      })
      .then((response) => {
        console.log(response.data);
        setState({
          searchResults: response.data.name,
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
    <View style={styles.inputcontainer}>
      <TextInput style={styles.input}
        onChangeText={(text) => searchLocation(text)}
        value={state.searchKeyword}
        placeholder='Country'
      />
      {/* <Controller
        control={control}
        render={({ onChange, value }) => (
        )}
        name='Country'
        rules={{ required: true }}
        defaultValue=''
      /> */}
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
          style={styles.searchResultsContainer}
        />
      )}
      {errors.Country && <Text style={styles.textError}>Country is required.</Text>}
    </View>
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
    zIndex: 10
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
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