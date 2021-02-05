import axios from 'axios';
import {

    addUserContact,
    removeContact,
    getContacts,

  } from '../types/contactTypes';



//User adds new contact

export function addNewContact(newContact) {
    return async (dispatch) => {
      try {
        const res = await axios.post(`http://localhost:8080/contacts/add`, { ...newContact }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('ESTO ES NEW CONTACT', newContact);
        console.log('nuevo contacto', res.data)
        dispatch(addUserContact(res.data));
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  // Delete user contact
  
  export const deleteContact = (alias) => {
    return async (dispatch) => {
      try {
  
        const res = await axios.delete(`http://localhost:8080/contacts/delete/${alias}`);
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
        const res = await axios.get(`http://localhost:8080/contacts/get/${username}`);
  
        dispatch(getContacts(res.data));
      } catch (error) {
        console.log(error);
      }
    }
  }