import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather, AntDesign } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

//Redux
import { addNewContact } from '../../redux/actions/contactActions';
import { useSelector, useDispatch } from "react-redux";

const AddContact = ({ navigation }) => {

  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({
    alias: '',
    contact_email: ''
  });
  const [pages, setPages] = useState('');
  const userLoggued = useSelector((state) => state.user.username);

  const dispatch = useDispatch();

  const submitData = () => {
    dispatch(addNewContact({ ...data, user_username: userLoggued }))
    setPages('success')
  }

  const handleInput = (name, value) => {
    setData({ ...data, [name]: value });
    if (data.alias) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }

  const handleEmail = (email, value) => {
    setData({ ...data, [email]: value });
    if (data.contact_email) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }

  useEffect(() => {
    setPages('first')
  }, [])

  if (pages === 'success') {
    return (
      <Animatable.View animation='zoomIn' style={styles.container}>
        <View style={styles.bodySuccess}>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
            <Text style={styles.headerSuccess}>Contact added</Text>
          </View>
          <AntDesign name="contacts" size={48} color="white" />
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={styles.textSuccess} >
              Successfully added {data.alias} to your contact list
            </Text>
          </View>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10, marginTop: 200 }}>
            <TouchableOpacity style={styles.buttonSuccess} onPress={() => navigation.navigate('MyContacts')}>
              <Text style={styles.textButtonSuccess}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    )
  }

  return (
    <Animatable.View animation='slideInRight' style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Add Contact</Text>
        </View>
      </View>
      <View style={styles.body}>
        {
          pages === 'first' ? (
            <Animatable.View animation='slideInRight' style={styles.section}>
              <View style={styles.Wrapper}>
                <TextInput
                  style={styles.input}
                  placeholder='Add an alias...'
                  value={data.alias}
                  onChangeText={value => handleInput('alias', value)}
                  placeholderTextColor={'rgba(0, 0, 0, 0.4);'}
                  fontWeight={'bold'}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity disabled={!disable} style={[styles.buttonConfirm, disable === false ? styles.buttonDisable : styles.buttonAble]} onPress={() => setPages('second')}>
                  <Text style={styles.textButton}>Continue</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          ) :
            pages === 'second' ? (
              <Animatable.View animation='slideInRight' style={styles.section}>
                <View style={styles.Wrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder='Contact email...'
                    value={data.contact_email}
                    onChangeText={value => handleEmail('contact_email', value)}
                    placeholderTextColor={'rgba(0, 0, 0, 0.4);'}
                    fontWeight={'bold'}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity disabled={!disable} style={[styles.buttonConfirm, disable === false ? styles.buttonDisable : styles.buttonAble]} onPress={submitData}>
                    <Text style={styles.textButton}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ) : null
        }
      </View>
    </Animatable.View>
  )
}

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38046C'
  },
  header: {
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  titleWrapper: {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  },
  body: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodySuccess: {
    flex: 1,
    backgroundColor: '#38046C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  Wrapper: {
    width: '80%',
    padding: 5,
    justifyContent: 'center'
  },
  input: {
    fontWeight: '600',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    padding: 5
  },
  buttonWrapper: {
    width: '90%',
    padding: 20,
  },
  buttonAble: {
    backgroundColor: '#38046C'
  },
  buttonDisable: {
    opacity: .5,
    backgroundColor: '#38046C'
  },
  buttonConfirm: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold'
  },
  headerSuccess: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800'
  },
  textSuccess: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  buttonSuccess: {
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10
  },
  textButtonSuccess: {
    color: '#38046C',
    fontWeight: 'bold'
  }
})