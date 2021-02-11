import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

// REDUX
import { editContact } from '../../redux/actions/contactActions';
import { useSelector, useDispatch } from "react-redux";

const EditContact = () => {
    return (
        <Animatable.View animation='slideInUp'>
            <View>
                <TextInput placeholder='contact alias' />
            </View>
            <TouchableOpacity>
                <Text>Edit</Text>
            </TouchableOpacity>
        </Animatable.View>
    )
}


const stlyes = StyleSheet.create({

})

export default EditContact;