import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyContact = ( {name, surname, phone, username} ) => { 
  const navigation = useNavigation();
  const nameInitial = name.slice(0, 1).toUpperCase();
  const surnameInitial = surname.slice(0, 1).toUpperCase(); 

  return (
      // Change onPress!!
    <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('SendMoney', {
            selectedContactUsername: username,
            selectedContactNameInitial: nameInitial,
            selectedContactSurnameInitial: surnameInitial
        })}
    >
        <View style={styles.avatar}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{nameInitial}{surnameInitial}</Text>
        </View>
        <View>
            <Text style={styles.name}>{name} {surname}</Text>
            <Text style={styles.phone}>{phone}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default MyContact;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 18,
        marginVertical: 15,
        height: 41
    },
    avatar: {
        marginRight: 20,
        borderRadius: '50%',
        backgroundColor: '#25D681',
        padding: 10,
        heigth: 41,
        width: 41,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});