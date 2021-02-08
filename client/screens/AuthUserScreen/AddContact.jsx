import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather, AntDesign } from "@expo/vector-icons";

//Redux
import { addNewContact } from '../../redux/actions/user';
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
    if (data.alias || data.contact_email || userLoggued) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }

  useEffect(() => {
    setPages('first')
  }, [])

  return (
    <View style={styles.container}>
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
            <View style={styles.section}>
              <View style={styles.Wrapper}>
                <TextInput
                  style={styles.input}
                  placeholder='Add an alias...'
                  onChangeText={value => handleInput('alias', value)}
                  placeholderTextColor={'rgba(0, 0, 0, 0.4);'}
                  fontWeight={'bold'}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity disabled={!disable} style={[styles.buttonConfirm, disable === true ? styles.buttonAble : styles.buttonDisable]} onPress={() => setPages('second')}>
                  <Text style={styles.textButton}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) :
            pages === 'second' ? (
              <View style={styles.section}>
                <View style={styles.Wrapper}>
                  <TextInput style={styles.input} value={userLoggued} />
                </View>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity disabled={!disable} style={[styles.buttonConfirm, disable === true ? styles.buttonAble : styles.buttonDisable]} onPress={() => setPages('third')}>
                    <Text style={styles.textButton}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : pages === 'third' ? (
              <View style={styles.section}>
                <View style={styles.Wrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder='Contact email...'
                    onChangeText={value => handleInput('contact_email', value)}
                    placeholderTextColor={'rgba(0, 0, 0, 0.4);'}
                    fontWeight={'bold'}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity disabled={!disable} style={[styles.buttonConfirm, disable === true ? styles.buttonAble : styles.buttonDisable]} onPress={submitData}>
                    <Text style={styles.textButton}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
        }
        {
          pages === 'success' ? (
            <View style={styles.container}>
              <View style={styles.bodySuccess}>
                <View>
                  <Text>Contact added</Text>
                </View>
                <AntDesign name="contacts" size={36} color="White" />
                <View>
                  <Text >Successfully added {data.alias} to your contact list</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('MyContacts')}>
                    <Text>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null
        }
      </View>
    </View>
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
    fontWeight: 600,
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
  }
})