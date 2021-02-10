import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Fonts
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";

// REDUX
import { getUserInfo } from '../../redux/actions/user';
import {deleteContact} from '../../redux/actions/contactActions'

const MyContact = ({ name, surname, phone, username, alias }) => {
  // Fonts
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

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
          <Text 
          style={{
            color: '#000000',
            fontFamily: 'OpenSans_700Bold',
            fontSize: 18 
          }}>
              {nameInitial} {surnameInitial}
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 5,
            justifyContent: 'center',
            height: 48
          }}
        >
          <Text style={styles.name}>{name} {surname}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btndelete} onPress={onDelete}>
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
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    borderStyle: "solid",
    paddingBottom: 5
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
    backgroundColor: '#E5E5E5',
    height: 48,
    width: 45,
    borderRadius: 11,
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
    fontSize: 20,
    fontFamily: 'OpenSans_700Bold',
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