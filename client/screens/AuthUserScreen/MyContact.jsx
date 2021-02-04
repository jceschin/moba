import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// REDUX
import { deleteContact } from '../../redux/actions/user';

const MyContact = ({ name, surname, phone, username }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nameInitial = name.slice(0, 1).toUpperCase();
  const surnameInitial = surname.slice(0, 1).toUpperCase();

  const onDelete = () => {
    dispatch(deleteContact())
  }

  return (
    // Change onPress!!
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('SendMoney', {
        selectedContactUsername: username
      })}>
        <View style={styles.avatar}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{nameInitial} {surnameInitial}</Text>
        </View>
        <View>
          <Text style={styles.name}>{name} {surname}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btndelete}>
        <MaterialCommunityIcons style={styles.delete} name="account-remove" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MyContact;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 18,
    marginVertical: 15,
    height: 41
  },
  avatar: {
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: '#25D681',
    padding: 10,
    height: 41,
    width: 41,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btndelete: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  name: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left'
  },
  phone: {
    color: '#A7A7A7',
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 5
  },
  delete: {
    textAlign: 'left',
    marginTop: 5
  }
});