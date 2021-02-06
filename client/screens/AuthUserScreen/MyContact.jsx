import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// REDUX
import { getUserInfo } from '../../redux/actions/user';
import {deleteContact} from '../../redux/actions/contactActions'

const MyContact = ({ name, surname, phone, username, alias }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nameInitial = name.slice(0, 1).toUpperCase();
  const surnameInitial = surname.slice(0, 1).toUpperCase();
  let loggedUser = useSelector((state) => state.user)


  const onDelete = () => {
    dispatch(deleteContact(alias))
  }

  return (
    // Change onPress!!
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('SendMoney', {
          selectedContactUsername: username,
          selectedContactNameInitial: nameInitial,
          selectedContactSurnameInitial: surnameInitial
        })}
      >
        <View style={styles.avatar}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{nameInitial} {surnameInitial}</Text>
        </View>
        <View>
          <Text style={styles.name}>{alias} ({name} {surname})</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btndelete}>
        <MaterialCommunityIcons style={styles.delete} onPress={onDelete} name="account-remove" size={24} color="black" />
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
    height: 51,
    width: 51,
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