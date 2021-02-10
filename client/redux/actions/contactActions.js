import axios from 'axios';
import {

  addUserContact,
  removeContact,
  getContacts,
  contactInfo,
  updateContact

} from '../types/contactTypes';

import { apiEndpoint } from '../../const'
import AsyncStorage from "@react-native-async-storage/async-storage";


//User adds new contact

export function addNewContact(newContact) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`http://${apiEndpoint}/contacts/add`, { ...newContact }, {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem('token')}` },
      });
      console.log('ESTO ES NEW CONTACT', newContact);
      console.log('nuevo contacto', res.data)
      dispatch(addUserContact(res.data));
    } catch (error) {
      console.log(error);
    }
  };
}



//Update contact

export function editContact(alias, updateContact) {
  return async (dispatch) => {
    try {
      const res = await axios.put(`http://${apiEndpoint}/contacts/update/${alias}`, { ...updateContact }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(updateContact(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}

// Delete user contact

export const deleteContact = (alias) => {
  return async (dispatch) => {
    try {

      const res = await axios.delete(`http://${apiEndpoint}/contacts/delete/${alias}`);
      console.log('ESTE ES EL ALIAS', alias);
      dispatch(removeContact(res.data));
      alert('Contact eliminated')


    } catch (error) {
      console.log('ERROR EN DELETE CONTACT', error)
    }
  }
}

// Get user contacts

export function getUserContacts(username) {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://${apiEndpoint}/contacts/get/${username}`);

      dispatch(getContacts(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}


//get contact INFO
export function getContactInfo(username) {
  return (dispatch) => {
    return axios
      .get(`http://${apiEndpoint}/users/${username}`)
      .then((data) => {
        if (data.status !== 200) {
          alert('Sorry, an error ocurred')
        }
        else {
          console.log(data)
          var payload = data.data
          dispatch(contactInfo(payload))
        }
      })
      .catch((err) => console.log(err))

  }
}

